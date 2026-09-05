from schemas.document import ExtractionResult, ExtractedFields, FieldValue


def process_document(document_id: str, file_path: str) -> ExtractionResult:
    """
    Temporary mock AI/OCR adapter.

    This simulates the output that the real OCR + entity extraction
    pipeline will eventually provide.

    Replace this implementation when the AI pipeline is ready.
    """

    return ExtractionResult(
        document_id=document_id,
        fields=ExtractedFields(
            khasra_no=FieldValue(
                value="125",
                confidence=0.97,
            ),
            owner_name=FieldValue(
                value="Ram Kumar",
                confidence=0.93,
            ),
            village=FieldValue(
                value="Sikandra",
                confidence=0.89,
            ),
            district=FieldValue(
                value="Agra",
                confidence=0.95,
            ),
            area=FieldValue(
                value="2.5",
                confidence=0.91,
            ),
            area_unit=FieldValue(
                value="hectare",
                confidence=0.98,
            ),
        ),
    )