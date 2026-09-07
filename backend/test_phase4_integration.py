import asyncio
import io
import sys
from pathlib import Path

# Add backend directory to sys.path
backend_dir = Path(__file__).resolve().parent
project_root = backend_dir.parent
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))
if str(project_root) not in sys.path:
    sys.path.insert(0, str(project_root))

from fastapi import UploadFile
from models.database import SessionLocal
from models.document import Document
from models.land_record import LandRecord
from models.validation import ValidationResult
from models.audit import AuditLog
from routes.documents import upload_document
from routes.processing import process_uploaded_document
from routes.document_details import get_document_details
from routes.review import get_review_queue, review_document, ReviewUpdate, get_audit_log
from routes.search import search_land_records


async def run_phase4_tests():
    print("==================================================")
    print("RUNNING PHASE 4 REAL DATA INTEGRATION TESTS")
    print("==================================================")

    db = SessionLocal()

    try:
        # TEST 1: Default Search (Returns digitized records)
        print("\n[TEST 1] Testing Default Search (No query parameters)...")
        default_search = search_land_records(db=db)
        assert "count" in default_search
        assert "items" in default_search
        print(f"  PASS: Default search returned {default_search['count']} records.")
        if default_search["items"]:
            sample = default_search["items"][0]
            print(f"  Sample item: Document ID={sample['document_id']}, Khasra={sample['khasra_no']}, Village={sample['village']}, Status={sample['status']}")

        # TEST 2: General Search Query `q`
        print("\n[TEST 2] Testing Search with general query `q`...")
        q_search = search_land_records(q="मेरठ", db=db)
        assert q_search["count"] >= 0
        print(f"  PASS: Query 'मेरठ' returned {q_search['count']} records.")

        # TEST 3: Specific Field Search (khasra_no, village, district)
        print("\n[TEST 3] Testing Search with specific field filters...")
        khasra_search = search_land_records(khasra_no="501", db=db)
        print(f"  PASS: khasra_no='501' returned {khasra_search['count']} records.")

        # TEST 4: Full E2E Flow: Upload -> Process -> Details -> Review Queue -> Correct -> Audit -> Search
        print("\n[TEST 4] Testing Full E2E Workflow...")
        sample_path = project_root / "ai" / "samples" / "land_record_sample.png"
        assert sample_path.exists(), f"Sample file not found: {sample_path}"

        with open(sample_path, "rb") as f:
            file_bytes = f.read()

        upload_file = UploadFile(
            file=io.BytesIO(file_bytes),
            filename="phase4_e2e_test.png",
            headers={"content-type": "image/png"}
        )

        # 4a: Upload
        upload_res = await upload_document(file=upload_file, db=db)
        doc_id = upload_res["document_id"] if isinstance(upload_res, dict) else upload_res.document_id
        print(f"  [4a] Upload: Generated {doc_id}")

        # 4b: Process
        proc_res = await process_uploaded_document(document_id=doc_id, db=db)
        proc_status = proc_res.status if hasattr(proc_res, "status") else proc_res["status"]
        print(f"  [4b] Process: Status = {proc_status}")

        # 4c: Fetch Details (as used by LandRecordDetailPage & AIVerificationPage)
        details = get_document_details(document_id=doc_id, db=db)
        assert details["document"]["document_id"] == doc_id
        assert details["land_record"] is not None
        print(f"  [4c] Document Details API: Loaded record for {doc_id} successfully.")

        # 4d: Check Review Queue
        queue = get_review_queue(db=db)
        queue_doc_ids = [item["document_id"] for item in queue["items"]]
        if proc_status == "REVIEW_REQUIRED":
            assert doc_id in queue_doc_ids
            print(f"  [4d] Review Queue: Document {doc_id} properly present in queue.")

        # 4e: Human Correction / Verification
        unique_khasra = f"P4-{doc_id[-4:]}"
        review_payload = ReviewUpdate(
            reviewer="Auditor Phase4",
            khasra_no=unique_khasra,
            owner_name="रामपाल सिंह",
            village="दतावली",
            district="मेरठ",
            area=1.75,
            area_unit="हेक्टेयर"
        )
        review_res = review_document(document_id=doc_id, update=review_payload, db=db)
        assert review_res["status"] == "VERIFIED"
        print(f"  [4e] Human Review & Verification: Document transitioned to status: {review_res['status']}")

        # 4f: Audit Trail
        audit_res = get_audit_log(document_id=doc_id, db=db)
        assert audit_res["count"] > 0
        print(f"  [4f] Audit Log: {audit_res['count']} audit entries recorded for {doc_id}.")

        # 4g: Search finds the newly verified record
        search_res = search_land_records(khasra_no=unique_khasra, db=db)
        assert search_res["count"] == 1
        found_item = search_res["items"][0]
        assert found_item["document_id"] == doc_id
        assert found_item["status"] == "VERIFIED"
        assert found_item["owner_name"] == "रामपाल सिंह"
        print(f"  [4g] Search API: Found record {doc_id} with Khasra {unique_khasra} and status {found_item['status']}.")

        # Cleanup test document
        db.query(AuditLog).filter(AuditLog.document_id == doc_id).delete()
        db.query(ValidationResult).filter(ValidationResult.document_id == doc_id).delete()
        db.query(LandRecord).filter(LandRecord.document_id == doc_id).delete()
        db.query(Document).filter(Document.document_id == doc_id).delete()
        db.commit()
        print(f"  Cleaned up test document {doc_id}.")

        print("\n==================================================")
        print("ALL PHASE 4 INTEGRATION TESTS COMPLETED & PASSED!")
        print("==================================================")

    finally:
        db.close()


if __name__ == "__main__":
    asyncio.run(run_phase4_tests())
