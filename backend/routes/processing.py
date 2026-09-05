from pathlib import Path

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from models.database import get_db
from models.document import Document
from models.land_record import LandRecord
from models.validation import ValidationResult
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
async def process_uploaded_document(
    document_id: str,
    db: Session = Depends(get_db),
):
    """
    Process an uploaded land record through AI/OCR and validation.

    The extracted fields and validation results are persisted
    in the database.
    """

    document = (
        db.query(Document)
        .filter(Document.document_id == document_id)
        .first()
    )

    if not document:
        raise HTTPException(
            status_code=404,
            detail=f"Document not found in database: {document_id}",
        )

    matching_files = list(UPLOAD_DIR.glob(f"{document_id}.*"))

    if not matching_files:
        raise HTTPException(
            status_code=404,
            detail=f"Uploaded file not found: {document_id}",
        )

    file_path = matching_files[0]

    extraction = process_document(
        document_id=document_id,
        file_path=str(file_path),
    )

    validation = validate_extraction(extraction)

    fields = extraction.fields

    land_record = LandRecord(
        document_id=document_id,
        khasra_no=fields.khasra_no.value,
        khasra_confidence=fields.khasra_no.confidence,
        owner_name=fields.owner_name.value,
        owner_confidence=fields.owner_name.confidence,
        village=fields.village.value,
        village_confidence=fields.village.confidence,
        district=fields.district.value,
        district_confidence=fields.district.confidence,
        area=float(fields.area.value) if fields.area.value else None,
        area_confidence=fields.area.confidence,
        area_unit=fields.area_unit.value,
        area_unit_confidence=fields.area_unit.confidence,
    )

    db.add(land_record)

    validation_record = ValidationResult(
        document_id=document_id,
        valid=validation.valid,
        review_required=validation.review_required,
        errors=validation.errors,
        warnings=validation.warnings,
        low_confidence_fields=validation.low_confidence_fields,
    )

    db.add(validation_record)

    status = (
        "REVIEW_REQUIRED"
        if validation.review_required
        else "VALIDATED"
    )

    document.status = status

    db.commit()

    return DocumentProcessResponse(
        document_id=document_id,
        extraction=extraction,
        validation=validation,
        status=status,
    )