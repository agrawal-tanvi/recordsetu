import re

from .confidence import calculate_confidence


def extract_fields(text, ocr_confidence=None):
    """
    Extract important land-record fields from OCR text.

    Args:
        text: OCR extracted text
        ocr_confidence: OCR confidence from Tesseract

    Returns:
        Dictionary containing extracted fields,
        final confidence and verification status.
    """

    fields = {
        "khasra_no": None,
        "owner_name": None,
        "village": None,
        "district": None,
        "area": None,
        "area_unit": None
    }

    # -------------------------------------------------
    # Normalize OCR text
    # -------------------------------------------------

    text = text.replace("\r", "")

    lines = [
        line.strip()
        for line in text.split("\n")
        if line.strip()
    ]

    # -------------------------------------------------
    # Khasra Number
    # -------------------------------------------------

    for line in lines:

        match = re.search(
            r"खसरा\s*(?:संख्या|संख्य|नं|नंबर)"
            r"\s*[:\-]?\s*([0-9]+(?:[\/\-][0-9]+)*)",
            line
        )

        if match:
            fields["khasra_no"] = match.group(1).strip()
            break

    # -------------------------------------------------
    # Owner Name
    # -------------------------------------------------

    for i, line in enumerate(lines):

        match = re.search(
            r"(?:स्वामी\s*का\s*नाम|स्वामी\s*का\s*नम|"
            r"खातेदार\s*का\s*नाम|मालिक\s*का\s*नाम|owner\s*name)"
            r"\s*[:\-]?\s*(.*)",
            line,
            re.IGNORECASE
        )

        if not match:
            continue

        # Owner name on same line
        value = match.group(1).strip()

        value = re.sub(
            r"^[\s:;,\-\.]+",
            "",
            value
        )

        if value:

            value = re.split(
                r",|\s+पिता\s+का\s*नाम|"
                r"\s+पिता\s+का\s*नम|\s+पता\s*:",
                value
            )[0].strip()

            if value:
                fields["owner_name"] = value
                break

        # Owner name on next OCR line
        for next_line in lines[i + 1:]:

            # Stop at another field
            if re.search(
                r"^(?:पिता\s*का\s*नाम|"
                r"पिता\s*का\s*नम|"
                r"पता|"
                r"ग्राम|गांव|गाँव|"
                r"जिला|जनपद|"
                r"खसरा|"
                r"क्षेत्रफल|क्षेफल|"
                r"भूमि)",
                next_line,
                re.IGNORECASE
            ):
                break

            candidate = re.sub(
                r"^[\s:;,\-\.]+",
                "",
                next_line
            ).strip()

            # Ignore OCR separators
            if re.fullmatch(
                r"[\|\-_=;:,.]+",
                candidate
            ):
                continue

            if candidate:
                fields["owner_name"] = candidate
                break

        if fields["owner_name"]:
            break

    # -------------------------------------------------
    # Village
    # -------------------------------------------------

    for line in lines:

        match = re.search(
            r"(?:ग्राम|गांव|गाँव|village)"
            r"\s*[:\-]?\s*(.+)",
            line,
            re.IGNORECASE
        )

        if match:

            value = match.group(1).strip()

            value = re.split(
                r",|\s+तहसील|\s+जनपद|\s+जिला",
                value
            )[0].strip()

            if value:
                fields["village"] = value
                break

    # -------------------------------------------------
    # District
    # -------------------------------------------------

    for line in lines:

        match = re.search(
            r"(?:जिला|जनपद|district)"
            r"\s*[:\-]?\s*(.+)",
            line,
            re.IGNORECASE
        )

        if match:

            value = match.group(1).strip()

            value = re.split(
                r",|\s+तहसील|\s+ग्राम",
                value
            )[0].strip()

            if value:
                fields["district"] = value
                break

    # -------------------------------------------------
    # Area
    # -------------------------------------------------

    for line in lines:

        # Normal area label
        match = re.search(
            r"(?:क्षेत्रफल|क्षेफल|रकबा|नक्शाफल|"
            r"नक्षेत्रफल|area)"
            r".*?"
            r"([0-9]+(?:[.,][0-9]+)?)"
            r"\s*(हे[०0oO॰\.]?|हेक्टेयर|ha|hectare)",
            line,
            re.IGNORECASE
        )

        # Fallback if area label was badly recognized
        if not match:

            match = re.search(
                r"([0-9]+(?:[.,][0-9]+)?)"
                r"\s*(हे[०0oO॰\.]?|हेक्टेयर|ha|hectare)",
                line,
                re.IGNORECASE
            )

        if match:

            fields["area"] = (
                match.group(1)
                .replace(",", ".")
                .strip()
            )

            fields["area_unit"] = (
                match.group(2)
                .strip()
            )

            break

    # -------------------------------------------------
    # Final Confidence + Verification
    # -------------------------------------------------

    confidence, needs_verification = calculate_confidence(
        fields,
        ocr_confidence
    )

    fields["confidence"] = confidence
    fields["needs_verification"] = needs_verification

    return fields