from schemas.document import ExtractionResult


def process_document(document_id: str, file_path: str) -> ExtractionResult:
    """
    Process a land record document through the AI/OCR pipeline.

    This is the backend-facing contract for the AI service.
    The actual OCR and entity extraction implementation will be
    connected here later.
    """

    raise NotImplementedError(
        "AI/OCR pipeline is not connected yet."
    )