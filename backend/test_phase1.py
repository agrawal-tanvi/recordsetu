import asyncio
import os
import sys
from pathlib import Path

# Add backend and project root to sys.path
backend_dir = Path(__file__).resolve().parent
project_root = backend_dir.parent

if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))
if str(project_root) not in sys.path:
    sys.path.insert(0, str(project_root))

from fastapi import UploadFile
from main import health_check
from models.database import SessionLocal
from models.document import Document
from models.land_record import LandRecord
from models.validation import ValidationResult
from models.audit import AuditLog
from routes.documents import upload_document
from routes.processing import process_uploaded_document
from routes.review import get_review_queue, review_document, get_audit_log, ReviewUpdate
from routes.document_details import get_document_details
from routes.search import search_land_records

async def main():
    print("==================================================")
    print("RUNNING PHASE 1 TEST SUITE")
    print("==================================================")

    db = SessionLocal()

    try:
        # TEST 1: Health Check
        print("\n[TEST 1] Testing Health Check Endpoint...")
        health = health_check()
        assert health["status"] == "ok"
        print(f"  PASS: Health check status: {health['status']}, service: {health['service']}")

        # TEST 2: Document Upload
        print("\n[TEST 2] Testing Document Upload...")
        sample_path = project_root / "ai" / "samples" / "land_record_sample.png"
        assert sample_path.exists(), f"Sample file not found: {sample_path}"

        with open(sample_path, "rb") as f:
            file_bytes = f.read()

        import io
        upload_file = UploadFile(
            file=io.BytesIO(file_bytes),
            filename="test_upload.png",
            headers={"content-type": "image/png"}
        )

        upload_res = await upload_document(file=upload_file, db=db)
        doc_id = upload_res["document_id"] if isinstance(upload_res, dict) else upload_res.document_id
        assert doc_id.startswith("DOC-")
        print(f"  PASS: Document uploaded. Generated document_id: {doc_id}")

        # TEST 3: Document Processing (OCR + AI + Validation)
        print("\n[TEST 3] Testing Document Processing Pipeline...")
        proc_res = await process_uploaded_document(document_id=doc_id, db=db)
        proc_doc_id = proc_res.document_id if hasattr(proc_res, "document_id") else proc_res["document_id"]
        proc_status = proc_res.status if hasattr(proc_res, "status") else proc_res["status"]
        assert proc_doc_id == doc_id
        print(f"  PASS: Document processed successfully.")
        print(f"  Initial document status: {proc_status}")
        ext_fields = proc_res.extraction.fields if hasattr(proc_res, "extraction") else proc_res["extraction"]["fields"]
        print(f"  Extracted owner_name: {getattr(ext_fields.owner_name, 'value', None)}")
        print(f"  Extracted village: {getattr(ext_fields.village, 'value', None)}")
        print(f"  Extracted area: {getattr(ext_fields.area, 'value', None)} {getattr(ext_fields.area_unit, 'value', None)}")

        # TEST 4: Review Queue
        print("\n[TEST 4] Testing Review Queue...")
        queue_res = get_review_queue(db=db)
        assert "count" in queue_res
        assert "items" in queue_res
        print(f"  PASS: Review queue returned {queue_res['count']} pending items.")

        # TEST 5: Low-Confidence Field Confirmation -> VERIFIED
        print("\n[TEST 5] Testing Human Confirmation of Low-Confidence Value -> VERIFIED...")
        test_doc_id = "DOC-CONFIRM-TEST"

        # Cleanup existing test document if any
        db.query(AuditLog).filter(AuditLog.document_id == test_doc_id).delete()
        db.query(ValidationResult).filter(ValidationResult.document_id == test_doc_id).delete()
        db.query(LandRecord).filter(LandRecord.document_id == test_doc_id).delete()
        db.query(Document).filter(Document.document_id == test_doc_id).delete()
        db.commit()

        # Insert a document with low-confidence owner_name (0.60 < 0.80) and no other errors
        doc = Document(
            document_id=test_doc_id,
            original_filename="sample_low_conf.png",
            stored_filename="sample_low_conf.png",
            file_type=".png",
            file_size_bytes=1024,
            status="REVIEW_REQUIRED"
        )
        db.add(doc)

        record = LandRecord(
            document_id=test_doc_id,
            khasra_no="999", # Not a duplicate
            khasra_confidence=0.95,
            owner_name="राम कुमार",
            owner_confidence=0.60, # LOW CONFIDENCE (< 0.80)
            village="दतावली",
            village_confidence=0.95,
            district="मेरठ",
            district_confidence=0.95,
            area=0.250,
            area_confidence=0.95,
            area_unit="हेक्टेयर",
            area_unit_confidence=0.95,
        )
        db.add(record)

        val_rec = ValidationResult(
            document_id=test_doc_id,
            valid=False,
            review_required=True,
            errors=[],
            warnings=["Low confidence fields require human review: owner_name"],
            low_confidence_fields=["owner_name"],
        )
        db.add(val_rec)
        db.commit()

        # Verify initial status before review
        details_before = get_document_details(document_id=test_doc_id, db=db)
        assert details_before["document"]["status"] == "REVIEW_REQUIRED"
        assert details_before["land_record"]["owner_name"]["confidence"] == 0.60
        print("  State before review: status=REVIEW_REQUIRED, owner_confidence=0.60")

        # Official reviewer confirms exact low-confidence value "राम कुमार"
        review_update = ReviewUpdate(
            reviewer="Officer Tanvi",
            khasra_no="999",
            owner_name="राम कुमार", # Confirmed exact value
            village="दतावली",
            district="मेरठ",
            area=0.250,
            area_unit="हेक्टेयर",
        )
        review_result = review_document(document_id=test_doc_id, update=review_update, db=db)

        # Assertions
        assert review_result["status"] == "VERIFIED", f"Expected VERIFIED, got: {review_result['status']}"
        assert review_result["validation"]["review_required"] is False
        assert len(review_result["validation"]["low_confidence_fields"]) == 0
        print(f"  PASS: Document status transitioned to: {review_result['status']}")
        print(f"  PASS: Validation review_required: {review_result['validation']['review_required']}")
        print(f"  PASS: Changes recorded: {review_result['changes']}")

        # Verify DB model was updated
        db.expire_all()
        updated_doc = db.query(Document).filter(Document.document_id == test_doc_id).first()
        updated_rec = db.query(LandRecord).filter(LandRecord.document_id == test_doc_id).first()
        assert updated_doc.status == "VERIFIED"
        assert updated_rec.owner_confidence == 1.0
        print("  PASS: LandRecord owner_confidence in database successfully upgraded to 1.0.")

        # TEST 6: Audit Log
        print("\n[TEST 6] Testing Audit Trail Endpoint...")
        audit_res = get_audit_log(document_id=test_doc_id, db=db)
        assert audit_res["count"] > 0
        actions = [item["action"] for item in audit_res["items"]]
        actors = [item["actor"] for item in audit_res["items"]]
        assert "CONFIRMED" in actions
        assert "Officer Tanvi" in actors
        print(f"  PASS: Audit log contains {audit_res['count']} entries. Actions: {actions}, Actors: {actors}")

        # TEST 7: Human Correction (Value Changed)
        print("\n[TEST 7] Testing Human Correction with Value Modification...")
        correction_update = ReviewUpdate(
            reviewer="Senior Officer",
            khasra_no="999/2",
            owner_name="राम कुमार शर्मा",
            village="दतावली",
            district="मेरठ",
            area=0.300,
            area_unit="हेक्टेयर",
        )
        corr_result = review_document(document_id=test_doc_id, update=correction_update, db=db)
        assert corr_result["status"] == "VERIFIED"
        corr_actions = [c["action"] for c in corr_result["changes"]]
        assert "CORRECTED" in corr_actions
        print(f"  PASS: Correction processed successfully. Actions: {corr_actions}")

        # Verify audit log appended correction
        audit_after = get_audit_log(document_id=test_doc_id, db=db)
        all_actions = [item["action"] for item in audit_after["items"]]
        assert "CONFIRMED" in all_actions and "CORRECTED" in all_actions
        print(f"  PASS: Full audit trail preserves history: {all_actions}")

        # TEST 8: Search Endpoint
        print("\n[TEST 8] Testing Search Endpoint...")
        search_res = search_land_records(village="दतावली", db=db)
        assert search_res["count"] >= 1
        print(f"  PASS: Search query 'दतावली' found {search_res['count']} records.")

        print("\n==================================================")
        print("ALL 8 PHASE 1 TESTS COMPLETED AND PASSED!")
        print("==================================================")

    finally:
        db.close()

if __name__ == "__main__":
    asyncio.run(main())
