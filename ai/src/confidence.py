import re


def is_valid_khasra(value):
    if value is None:
        return False

    value = str(value).strip()

    return bool(
        re.fullmatch(
            r"\d+(?:[/-]\d+)*",
            value
        )
    )


def is_valid_area(value):
    if value is None:
        return False

    value = str(value).strip().replace(",", ".")

    try:
        return float(value) > 0
    except ValueError:
        return False


def calculate_confidence(fields, ocr_confidence=None):
    """
    Calculate final confidence and verification status.
    """

    required_fields = [
        "khasra_no",
        "owner_name",
        "village",
        "district",
        "area",
        "area_unit"
    ]

    extracted = 0

    for field in required_fields:
        value = fields.get(field)

        if value is not None and str(value).strip() != "":
            extracted += 1

    field_completeness = extracted / len(required_fields)

    numeric_checks = []

    if fields.get("khasra_no") is not None:
        numeric_checks.append(
            1.0 if is_valid_khasra(fields["khasra_no"]) else 0.0
        )

    if fields.get("area") is not None:
        numeric_checks.append(
            1.0 if is_valid_area(fields["area"]) else 0.0
        )

    if numeric_checks:
        numeric_confidence = (
            sum(numeric_checks) / len(numeric_checks)
        )
    else:
        numeric_confidence = 0.0

    if ocr_confidence is not None:
        final_confidence = (
            0.50 * ocr_confidence
            + 0.30 * field_completeness
            + 0.20 * numeric_confidence
        )
    else:
        final_confidence = (
            0.70 * field_completeness
            + 0.30 * numeric_confidence
        )

    final_confidence = round(
        max(0.0, min(1.0, final_confidence)),
        2
    )

    # Flag incomplete or low-confidence results
    needs_verification = (
        final_confidence < 0.75
        or extracted < len(required_fields)
    )

    return final_confidence, needs_verification