import asyncio
import sys
from pathlib import Path

# Ensure UTF-8 output streams on Windows console
if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass
if hasattr(sys.stderr, "reconfigure"):
    try:
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

backend_dir = Path(__file__).resolve().parent
project_root = backend_dir.parent

if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))
if str(project_root) not in sys.path:
    sys.path.insert(0, str(project_root))

from models.database import SessionLocal
from models.document import Document
from models.land_record import LandRecord
from models.validation import ValidationResult
from models.audit import AuditLog
from schemas.document import ExtractionResult, ExtractedFields, FieldValue
from services.validation_service import validate_extraction
from routes.review import review_document, ReviewUpdate


def make_extraction(doc_id, khasra_no, village="दतावली", district="मेरठ", owner="सुरेश कुमार"):
    return ExtractionResult(
        document_id=doc_id,
        fields=ExtractedFields(
            khasra_no=FieldValue(value=str(khasra_no), confidence=0.95),
            owner_name=FieldValue(value=owner, confidence=0.95),
            village=FieldValue(value=village, confidence=0.95),
            district=FieldValue(value=district, confidence=0.95),
            area=FieldValue(value="1.25", confidence=0.95),
            area_unit=FieldValue(value="हेक्टेयर", confidence=0.95),
        ),
    )


def test_phase3_duplicate_detection():
    print("==================================================")
    print("PHASE 3 DATABASE-BACKED DUPLICATE DETECTION TESTS")
    print("==================================================")

    db = SessionLocal()

    try:
        # Cleanup any test documents from prior runs
        test_ids = [
            "DOC-P3-EXISTING",
            "DOC-P3-NEW",
            "DOC-P3-DUP",
            "DOC-P3-DIFF-DISTRICT",
            "DOC-P3-DIFF-VILLAGE",
        ]
        for tid in test_ids:
            db.query(AuditLog).filter(AuditLog.document_id == tid).delete()
            db.query(ValidationResult).filter(ValidationResult.document_id == tid).delete()
            db.query(LandRecord).filter(LandRecord.document_id == tid).delete()
            db.query(Document).filter(Document.document_id == tid).delete()
        db.commit()

        # Seed baseline existing record in database: Khasra '501/A', Village 'दतावली', District 'मेरठ'
        base_doc = Document(
            document_id="DOC-P3-EXISTING",
            original_filename="existing_deed.png",
            stored_filename="existing_deed.png",
            file_type=".png",
            file_size_bytes=2048,
            status="VERIFIED",
        )
        base_rec = LandRecord(
            document_id="DOC-P3-EXISTING",
            khasra_no="501/A",
            khasra_confidence=0.98,
            owner_name="रमेश चंद",
            owner_confidence=0.98,
            village="दतावली",
            village_confidence=0.98,
            district="मेरठ",
            district_confidence=0.98,
            area=2.50,
            area_confidence=0.98,
            area_unit="हेक्टेयर",
            area_unit_confidence=0.98,
        )
        db.add(base_doc)
        db.add(base_rec)
        db.commit()
        print("  Setup: Seeded baseline record 'DOC-P3-EXISTING' with Khasra '501/A', Village 'दतावली', District 'मेरठ'.")

        # 1. Same Khasra + same Village + same District -> duplicate -> REVIEW_REQUIRED
        print("\n[TEST 1] Same Khasra + same Village + same District -> DUPLICATE...")
        rec_same = make_extraction("DOC-P3-DUP", "501/A", village="दतावली", district="मेरठ")
        res_same = validate_extraction(rec_same, db=db)
        assert res_same.valid is True, "Duplicate Khasra should NOT make valid=False (Rule 5)"
        assert res_same.review_required is True, "Duplicate Khasra must require review"
        assert any("Duplicate Khasra" in w for w in res_same.warnings)
        assert any("DOC-P3-EXISTING" in w for w in res_same.warnings)
        assert any("दतावली" in w for w in res_same.warnings)
        assert any("मेरठ" in w for w in res_same.warnings)
        print(f"  PASS: Flagged duplicate with warning: {res_same.warnings}")

        # 2. Same Khasra + same Village + DIFFERENT District -> NOT duplicate
        print("\n[TEST 2] Same Khasra + same Village + DIFFERENT District -> NOT DUPLICATE...")
        rec_diff_dist = make_extraction("DOC-P3-DIFF-DISTRICT", "501/A", village="दतावली", district="हापुड़")
        res_diff_dist = validate_extraction(rec_diff_dist, db=db)
        assert res_diff_dist.valid is True
        assert res_diff_dist.review_required is False
        assert not any("Duplicate Khasra" in w for w in res_diff_dist.warnings)
        print("  PASS: Same Khasra '501/A' in different District 'हापुड़' is NOT marked duplicate.")

        # 3. Same Khasra + DIFFERENT Village -> NOT duplicate
        print("\n[TEST 3] Same Khasra + DIFFERENT Village -> NOT DUPLICATE...")
        rec_diff_vil = make_extraction("DOC-P3-DIFF-VILLAGE", "501/A", village="सिकंदरा", district="मेरठ")
        res_diff_vil = validate_extraction(rec_diff_vil, db=db)
        assert res_diff_vil.valid is True
        assert res_diff_vil.review_required is False
        assert not any("Duplicate Khasra" in w for w in res_diff_vil.warnings)
        print("  PASS: Same Khasra '501/A' in different Village 'सिकंदरा' is NOT marked duplicate.")

        # 4. Same existing record being revalidated -> NOT self-duplicate
        print("\n[TEST 4] Same Existing Record Re-validated -> NOT SELF-DUPLICATE...")
        rec_self = make_extraction("DOC-P3-EXISTING", "501/A", village="दतावली", district="मेरठ")
        res_self = validate_extraction(rec_self, db=db)
        assert res_self.valid is True
        assert res_self.review_required is False, "Re-validating same record must NOT flag itself as duplicate!"
        assert not any("Duplicate Khasra" in w for w in res_self.warnings)
        print("  PASS: Self-duplicate prevention works! 'DOC-P3-EXISTING' has 0 duplicate warnings against itself.")

        # 5. Unique Khasra -> no duplicate warning
        print("\n[TEST 5] Unique Khasra -> NO DUPLICATE WARNING...")
        rec_uniq = make_extraction("DOC-P3-NEW", "502/B", village="दतावली", district="मेरठ")
        res_uniq = validate_extraction(rec_uniq, db=db)
        assert res_uniq.valid is True
        assert res_uniq.review_required is False
        assert not any("Duplicate Khasra" in w for w in res_uniq.warnings)
        print("  PASS: Unique Khasra '502/B' has no duplicate warning and review_required=False.")

        # 6. Additional verification: Human review workflow with duplicate vs unique Khasra
        print("\n[TEST 6] Human Review Workflow Transitions...")
        dup_doc = Document(
            document_id="DOC-P3-DUP",
            original_filename="dup_deed.png",
            stored_filename="dup_deed.png",
            file_type=".png",
            file_size_bytes=2048,
            status="REVIEW_REQUIRED",
        )
        dup_land_rec = LandRecord(
            document_id="DOC-P3-DUP",
            khasra_no="501/A",
            khasra_confidence=0.95,
            owner_name="सुरेश कुमार",
            owner_confidence=0.95,
            village="दतावली",
            village_confidence=0.95,
            district="मेरठ",
            district_confidence=0.95,
            area=1.25,
            area_confidence=0.95,
            area_unit="हेक्टेयर",
            area_unit_confidence=0.95,
        )
        db.add(dup_doc)
        db.add(dup_land_rec)
        db.commit()

        # Review submitting existing duplicate Khasra in same village & district
        update_still_dup = ReviewUpdate(
            reviewer="Inspector Verma",
            khasra_no="501/A",
            owner_name="सुरेश कुमार",
            village="दतावली",
            district="मेरठ",
            area=1.25,
            area_unit="हेक्टेयर",
        )
        res_review_dup = review_document("DOC-P3-DUP", update_still_dup, db=db)
        assert res_review_dup["status"] == "REVIEW_REQUIRED"
        assert res_review_dup["validation"]["review_required"] is True
        assert any("Duplicate Khasra" in w for w in res_review_dup["validation"]["warnings"])
        print("  PASS: Review with existing duplicate Khasra remains in 'REVIEW_REQUIRED'.")

        # Review correcting to a unique Khasra
        update_unique = ReviewUpdate(
            reviewer="Inspector Verma",
            khasra_no="503/C",
            owner_name="सुरेश कुमार",
            village="दतावली",
            district="मेरठ",
            area=1.25,
            area_unit="हेक्टेयर",
        )
        res_review_uniq = review_document("DOC-P3-DUP", update_unique, db=db)
        assert res_review_uniq["status"] == "VERIFIED"
        assert res_review_uniq["validation"]["review_required"] is False
        assert not any("Duplicate Khasra" in w for w in res_review_uniq["validation"]["warnings"])
        print("  PASS: Correcting to unique Khasra '503/C' successfully transitioned status to 'VERIFIED'!")

        print("\n==================================================")
        print("ALL PHASE 3 SCOPED DUPLICATE DETECTION TESTS PASSED!")
        print("==================================================")

    finally:
        db.close()


if __name__ == "__main__":
    test_phase3_duplicate_detection()
