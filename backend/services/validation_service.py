from typing import Optional, Set
from sqlalchemy.orm import Session

from schemas.document import ExtractionResult, ValidationResult


CONFIDENCE_THRESHOLD = 0.75
MAX_AREA_LIMIT = 1000.0

ALLOWED_AREA_UNITS = {
    "hectare",
    "hectares",
    "hectare(s)",
    "ha",
    "acre",
    "acres",
    "sq meter",
    "sq meters",
    "square meter",
    "square meters",

    # Hindi / Indian land-record notation
    "हे",
    "हे०",
    "हे.",
    "हेक्टेयर",
    "हैक्टेयर",
}


def validate_extraction(
    result: ExtractionResult,
    existing_khasras: Optional[Set[str]] = None,
    db: Optional[Session] = None,
) -> ValidationResult:
    """
    Validate AI-extracted land record fields.

    Performs validation checks and duplicate detection (database-backed when db is provided).
    Returns validation results and whether human review is required.
    """

    errors = []
    warnings = []

    fields = result.fields

    # Rule 1: Required fields
    required_fields = {
        "khasra_no": fields.khasra_no.value,
        "owner_name": fields.owner_name.value,
        "village": fields.village.value,
        "district": fields.district.value,
        "area": fields.area.value,
        "area_unit": fields.area_unit.value,
    }

    for field_name, value in required_fields.items():
        if value is None or not str(value).strip():
            errors.append(f"Missing required field: {field_name}")

    # Rule 1.5: Duplicate Khasra detection (Phase 3 database-backed with in-memory fallback)
    if fields.khasra_no.value:
        khasra_no = str(fields.khasra_no.value).strip()
        village = (
            str(fields.village.value).strip()
            if fields.village.value and str(fields.village.value).strip()
            else None
        )
        district = (
            str(fields.district.value).strip()
            if fields.district.value and str(fields.district.value).strip()
            else None
        )

        dup_found = False
        dup_warning = None

        if db is not None:
            # Real database-backed duplicate lookup
            from models.land_record import LandRecord

            query = db.query(LandRecord).filter(LandRecord.khasra_no == khasra_no)

            # Self-duplicate prevention: Exclude current document during re-validation or reprocessing
            if result.document_id:
                query = query.filter(LandRecord.document_id != result.document_id)

            # Duplicate identity scoping: Khasra Number + Village + District
            if village:
                query = query.filter(LandRecord.village.ilike(village))
            if district:
                query = query.filter(LandRecord.district.ilike(district))

            match = query.first()

            if match:
                dup_found = True
                matched_village = match.village or village or "unknown village"
                matched_district = match.district or district or "unknown district"
                dup_warning = (
                    f"Duplicate Khasra number already exists in database: {khasra_no} "
                    f"in village {matched_village}, district {matched_district} "
                    f"(Document ID: {match.document_id})"
                )

        elif existing_khasras is not None:
            # In-memory set fallback for standalone unit testing
            if khasra_no in existing_khasras:
                dup_found = True
                dup_warning = f"Duplicate Khasra number already exists: {khasra_no}"

        if dup_found and dup_warning:
            warnings.append(dup_warning)

    # Rule 2: Area must be positive and plausible
    if fields.area.value is not None and str(fields.area.value).strip() != "":
        try:
            area = float(fields.area.value)

            if area <= 0:
                errors.append("Area must be greater than zero.")
            elif area > MAX_AREA_LIMIT:
                errors.append(
                    f"Area exceeds maximum allowed limit ({MAX_AREA_LIMIT:g})."
                )

        except ValueError:
            errors.append("Area must be a valid number.")

    # Rule 3: Area unit must be supported
    if fields.area_unit.value:
        normalized_unit = fields.area_unit.value.strip().lower()

        if normalized_unit not in ALLOWED_AREA_UNITS:
            warnings.append(
                f"Unrecognized area unit: {fields.area_unit.value}"
            )

    # Rule 4: Low confidence fields require review
    low_confidence_fields = []

    for field_name, field in fields.model_dump().items():
        if field["value"] and field["confidence"] < CONFIDENCE_THRESHOLD:
            low_confidence_fields.append(field_name)

    if low_confidence_fields:
        warnings.append(
            "Low confidence fields require human review: "
            + ", ".join(low_confidence_fields)
        )

    review_required = bool(errors or warnings)

    return ValidationResult(
        document_id=result.document_id,
        valid=not errors,
        review_required=review_required,
        errors=errors,
        warnings=warnings,
        low_confidence_fields=low_confidence_fields,
    )