import csv
import json
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

from schemas.document import ExtractionResult, ExtractedFields, FieldValue
from services.validation_service import (
    validate_extraction,
    CONFIDENCE_THRESHOLD,
    MAX_AREA_LIMIT,
    ALLOWED_AREA_UNITS,
)


def create_record(
    khasra_no="125",
    khasra_conf=0.95,
    owner_name="राम कुमार",
    owner_conf=0.95,
    village="दतावली",
    village_conf=0.95,
    district="मेरठ",
    district_conf=0.95,
    area=2.5,
    area_conf=0.95,
    area_unit="हेक्टेयर",
    area_unit_conf=0.95,
    doc_id="DOC-TEST",
):
    return ExtractionResult(
        document_id=doc_id,
        fields=ExtractedFields(
            khasra_no=FieldValue(
                value=str(khasra_no) if khasra_no is not None else None,
                confidence=khasra_conf if khasra_no is not None else 0.0,
            ),
            owner_name=FieldValue(
                value=str(owner_name) if owner_name is not None else None,
                confidence=owner_conf if owner_name is not None else 0.0,
            ),
            village=FieldValue(
                value=str(village) if village is not None else None,
                confidence=village_conf if village is not None else 0.0,
            ),
            district=FieldValue(
                value=str(district) if district is not None else None,
                confidence=district_conf if district is not None else 0.0,
            ),
            area=FieldValue(
                value=str(area) if area is not None else None,
                confidence=area_conf if area is not None else 0.0,
            ),
            area_unit=FieldValue(
                value=str(area_unit) if area_unit is not None else None,
                confidence=area_unit_conf if area_unit is not None else 0.0,
            ),
        ),
    )


def test_validation_cases():
    print("==================================================")
    print("PHASE 2 VALIDATION SERVICE TEST SUITE")
    print("==================================================")
    print(f"System Confidence Threshold: {CONFIDENCE_THRESHOLD}")
    print(f"Max Area Limit: {MAX_AREA_LIMIT}")
    assert CONFIDENCE_THRESHOLD == 0.75, f"Expected 0.75, got {CONFIDENCE_THRESHOLD}"

    # 1. Missing Khasra
    print("\n[CASE 1] Missing Khasra...")
    rec = create_record(khasra_no=None)
    res = validate_extraction(rec)
    assert not res.valid
    assert res.review_required
    assert any("khasra_no" in e for e in res.errors)
    print("  PASS: Missing Khasra detected as invalid.")

    # 2. Missing Owner
    print("\n[CASE 2] Missing Owner...")
    rec = create_record(owner_name="")
    res = validate_extraction(rec)
    assert not res.valid
    assert res.review_required
    assert any("owner_name" in e for e in res.errors)
    print("  PASS: Missing Owner detected as invalid.")

    # 3. Missing Village
    print("\n[CASE 3] Missing Village...")
    rec = create_record(village=None)
    res = validate_extraction(rec)
    assert not res.valid
    assert res.review_required
    assert any("village" in e for e in res.errors)
    print("  PASS: Missing Village detected as invalid.")

    # 4. Missing District
    print("\n[CASE 4] Missing District...")
    rec = create_record(district="")
    res = validate_extraction(rec)
    assert not res.valid
    assert res.review_required
    assert any("district" in e for e in res.errors)
    print("  PASS: Missing District detected as invalid.")

    # 5. Zero Area
    print("\n[CASE 5] Zero Area...")
    rec = create_record(area=0)
    res = validate_extraction(rec)
    assert not res.valid
    assert res.review_required
    assert any("greater than zero" in e for e in res.errors)
    print("  PASS: Zero Area detected as invalid.")

    # 6. Negative Area
    print("\n[CASE 6] Negative Area...")
    rec = create_record(area=-2.5)
    res = validate_extraction(rec)
    assert not res.valid
    assert res.review_required
    assert any("greater than zero" in e for e in res.errors)
    print("  PASS: Negative Area detected as invalid.")

    # 7. Excessive Area (>1000)
    print("\n[CASE 7] Excessive Area...")
    rec = create_record(area=9999)
    res = validate_extraction(rec)
    assert not res.valid
    assert res.review_required
    assert any("exceeds maximum allowed limit" in e for e in res.errors)
    print("  PASS: Excessive Area detected as invalid.")

    # 8. Missing Area Unit
    print("\n[CASE 8] Missing Area Unit...")
    rec = create_record(area_unit=None)
    res = validate_extraction(rec)
    assert not res.valid
    assert res.review_required
    assert any("area_unit" in e for e in res.errors)
    print("  PASS: Missing Area Unit detected as invalid.")

    # 9. Invalid Area Unit
    print("\n[CASE 9] Invalid Area Unit...")
    rec = create_record(area_unit="unknown_unit")
    res = validate_extraction(rec)
    assert res.valid  # Not a fatal structural error, but a warning
    assert res.review_required
    assert any("Unrecognized area unit" in w for w in res.warnings)
    print("  PASS: Invalid Area Unit flagged for review.")

    # 10. Low Confidence Owner (< 0.75)
    print("\n[CASE 10] Low Confidence Owner (0.70 < 0.75)...")
    rec = create_record(owner_conf=0.70)
    res = validate_extraction(rec)
    assert res.valid
    assert res.review_required
    assert "owner_name" in res.low_confidence_fields
    assert any("owner_name" in w for w in res.warnings)
    print("  PASS: Low Confidence Owner (0.70) correctly flagged for review.")

    # 11. Low Confidence Area (< 0.75)
    print("\n[CASE 11] Low Confidence Area (0.65 < 0.75)...")
    rec = create_record(area_conf=0.65)
    res = validate_extraction(rec)
    assert res.valid
    assert res.review_required
    assert "area" in res.low_confidence_fields
    assert any("area" in w for w in res.warnings)
    print("  PASS: Low Confidence Area (0.65) correctly flagged for review.")

    # 12. Boundary Confidence (0.75 is Valid, not low confidence)
    print("\n[CASE 12] Boundary Confidence (0.75 >= 0.75)...")
    rec = create_record(owner_conf=0.75, area_conf=0.75)
    res = validate_extraction(rec)
    assert res.valid
    assert not res.review_required
    assert len(res.low_confidence_fields) == 0
    print("  PASS: Exactly 0.75 confidence passes automated validation without review.")

    # 13. Multiple Warnings (Low confidence + Unrecognized unit)
    print("\n[CASE 13] Multiple Warnings...")
    rec = create_record(owner_conf=0.72, area_unit="square_yards")
    res = validate_extraction(rec)
    assert res.valid
    assert res.review_required
    assert len(res.warnings) >= 2
    assert "owner_name" in res.low_confidence_fields
    print(f"  PASS: Multiple warnings captured: {res.warnings}")

    # 14. Duplicate Khasra Detection
    print("\n[CASE 14] Duplicate Khasra...")
    rec = create_record(khasra_no="125")
    res = validate_extraction(rec, existing_khasras={"125"})
    assert res.valid
    assert res.review_required
    assert any("Duplicate Khasra" in w for w in res.warnings)
    print("  PASS: Duplicate Khasra triggers review warning.")

    # 15. Hindi Area Unit Support
    print("\n[CASE 15] Hindi Area Units Support...")
    hindi_units = ["हे०", "हे.", "हे", "हेक्टेयर", "हैक्टेयर"]
    for hu in hindi_units:
        rec = create_record(area_unit=hu)
        res = validate_extraction(rec)
        assert res.valid, f"Failed for unit: {hu}"
        assert not res.review_required, f"Unexpected review for Hindi unit: {hu}, warnings: {res.warnings}"
    print(f"  PASS: All Hindi area units valid without review: {hindi_units}")


def test_expected_json_dataset():
    print("\n==================================================")
    print("TESTING AGAINST expected_validation_results.json")
    print("==================================================")

    json_path = project_root / "validation" / "expected_validation_results.json"
    csv_path = project_root / "validation" / "land_records.csv"

    with open(json_path, "r", encoding="utf-8") as f:
        expected_json = json.load(f)

    # Load CSV data
    csv_records = {}
    with open(csv_path, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            csv_records[row["record_id"]] = row

    for item in expected_json["records"]:
        rec_id = item["record_id"]
        row = csv_records.get(rec_id)
        assert row is not None, f"Record not found in CSV: {rec_id}"

        khasra = row["khasra_no"] if row["khasra_no"] != "" else None
        owner = row["owner_name"] if row["owner_name"] != "" else None
        village = row["village"] if row["village"] != "" else None
        district = row["district"] if row["district"] != "" else None
        area = row["area"] if row["area"] != "" else None
        area_unit = row["area_unit"] if row["area_unit"] != "" else None

        khasra_conf = float(row["khasra_confidence"])
        owner_conf = float(row["owner_confidence"])
        village_conf = float(row["village_confidence"])
        district_conf = float(row["district_confidence"])
        area_conf = float(row["area_confidence"])
        area_unit_conf = float(row["area_unit_confidence"])

        rec = create_record(
            khasra_no=khasra,
            khasra_conf=khasra_conf,
            owner_name=owner,
            owner_conf=owner_conf,
            village=village,
            village_conf=village_conf,
            district=district,
            district_conf=district_conf,
            area=area,
            area_conf=area_conf,
            area_unit=area_unit,
            area_unit_conf=area_unit_conf,
            doc_id=rec_id,
        )

        res = validate_extraction(rec)

        expected_status = item["expected_status"]
        if expected_status == "VALID":
            assert res.valid is True, f"{rec_id} expected valid=True"
            assert res.review_required is False, f"{rec_id} expected review_required=False"
        elif expected_status == "INVALID":
            assert res.valid is False, f"{rec_id} expected valid=False"
        elif expected_status == "REVIEW_REQUIRED":
            assert res.review_required is True, f"{rec_id} expected review_required=True"

        print(f"  PASS: {rec_id} -> expected {expected_status}, got valid={res.valid}, review_required={res.review_required}")


def test_full_csv_dataset():
    print("\n==================================================")
    print("TESTING FULL 30-RECORD CSV DATASET")
    print("==================================================")
    csv_path = project_root / "validation" / "land_records.csv"

    with open(csv_path, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        total = 0
        passed = 0
        for row in reader:
            total += 1
            rec_id = row["record_id"]
            khasra = row["khasra_no"] if row["khasra_no"] != "" else None
            owner = row["owner_name"] if row["owner_name"] != "" else None
            village = row["village"] if row["village"] != "" else None
            district = row["district"] if row["district"] != "" else None
            area = row["area"] if row["area"] != "" else None
            area_unit = row["area_unit"] if row["area_unit"] != "" else None

            rec = create_record(
                khasra_no=khasra,
                khasra_conf=float(row["khasra_confidence"]),
                owner_name=owner,
                owner_conf=float(row["owner_confidence"]),
                village=village,
                village_conf=float(row["village_confidence"]),
                district=district,
                district_conf=float(row["district_confidence"]),
                area=area,
                area_conf=float(row["area_confidence"]),
                area_unit=area_unit,
                area_unit_conf=float(row["area_unit_confidence"]),
                doc_id=rec_id,
            )

            res = validate_extraction(rec)
            expected = row["expected_status"]

            if expected == "VALID":
                assert res.valid is True and res.review_required is False
            elif expected == "INVALID":
                assert res.valid is False
            elif expected == "REVIEW_REQUIRED":
                assert res.review_required is True

            passed += 1

        print(f"  ALL {passed}/{total} records in land_records.csv validated successfully!")


if __name__ == "__main__":
    test_validation_cases()
    test_expected_json_dataset()
    test_full_csv_dataset()
    print("\n==================================================")
    print("ALL PHASE 2 VALIDATION TESTS COMPLETED & PASSED!")
    print("==================================================")
