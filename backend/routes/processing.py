from pathlib import Path

from fastapi import APIRouter, HTTPException

from schemas.document import DocumentProcessResponse
from services.ai_service import process_document
from services.validation_service import validate_extraction


router = APIRouter(
    prefix="/api/documents",
    tags=["Processing"],
)


UPLOAD_DIR = Path("uploads")


@router.post(
    "/{document_id}/process",
    response_model=DocumentProcessResponse,
)
async def process_uploaded_document(document_id: str):
    """
    Process an uploaded land record through AI/OCR and validation.
    """

    matching_files = list(UPLOAD_DIR.glob(f"{document_id}.*"))

    if not matching_files:
        raise HTTPException(
            status_code=404,
            detail=f"Document not found: {document_id}",
        )

    file_path = matching_files[0]

    extraction = process_document(
        document_id=document_id,
        file_path=str(file_path),
    )

    validation = validate_extraction(extraction)

    status = "REVIEW_REQUIRED" if validation.review_required else "VALIDATED"

    return DocumentProcessResponse(
        document_id=document_id,
        extraction=extraction,
        validation=validation,
        status=status,
    )