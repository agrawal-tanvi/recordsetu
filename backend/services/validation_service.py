from schemas.document import ExtractionResult, ValidationResult


CONFIDENCE_THRESHOLD = 0.80

ALLOWED_AREA_UNITS = {
    "hectare",
    "hectares",
    "acre",
    "acres",
    "sq meter",
    "sq meters",
    "square meter",
    "square meters",
}


def validate_extraction(result: ExtractionResult) -> ValidationResult:
    """
    Validate AI-extracted land record fields.

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

    # Rule 2: Area must be positive
    if fields.area.value:
        try:
            area = float(fields.area.value)

            if area <= 0:
                errors.append("Area must be greater than zero.")

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