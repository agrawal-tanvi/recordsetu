from pathlib import Path

from schemas.document import (
    ExtractionResult,
    ExtractedFields,
    FieldValue,
)

from ai.src.main import run_pipeline
from ai.src.pdf import process_pdf


def make_field(value, confidence):
    return FieldValue(
        value=None if value is None else str(value),
        confidence=float(confidence) if value is not None else 0.0,
    )


def process_document(
    document_id: str,
    file_path: str,
) -> ExtractionResult:

    path = Path(file_path)

    if not path.exists():
        raise FileNotFoundError(
            f"Document not found: {file_path}"
        )

    suffix = path.suffix.lower()

    # Image input
    if suffix in {".png", ".jpg", ".jpeg"}:

        result = run_pipeline(str(path))
        fields = result["fields"]
        confidence = result["ocr_confidence"]

    # PDF input
    elif suffix == ".pdf":

        result = process_pdf(str(path))
        pages = result.get("pages", [])

        if not pages:
            raise ValueError(
                "No processable pages found in PDF."
            )

        best_page = max(
            pages,
            key=lambda page: page["fields"].get(
                "confidence",
                0.0
            )
        )

        fields = best_page["fields"]
        confidence = best_page.get(
            "ocr_confidence",
            0.0
        )

    else:
        raise ValueError(
            f"Unsupported document type: {suffix}"
        )

    return ExtractionResult(
        document_id=document_id,
        fields=ExtractedFields(
            khasra_no=make_field(
                fields.get("khasra_no"),
                confidence,
            ),
            owner_name=make_field(
                fields.get("owner_name"),
                confidence,
            ),
            village=make_field(
                fields.get("village"),
                confidence,
            ),
            district=make_field(
                fields.get("district"),
                confidence,
            ),
            area=make_field(
                fields.get("area"),
                confidence,
            ),
            area_unit=make_field(
                fields.get("area_unit"),
                confidence,
            ),
        ),
    )