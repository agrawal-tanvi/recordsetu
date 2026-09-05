from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from models.database import get_db
from models.document import Document
from models.land_record import LandRecord
from models.validation import ValidationResult


router = APIRouter(
    prefix="/api/documents",
    tags=["Document Details"],
)


@router.get("/{document_id}")
def get_document_details(
    document_id: str,
    db: Session = Depends(get_db),
):
    """
    Get document metadata, extracted land record,
    confidence scores, and validation result.
    """

    document = (
        db.query(Document)
        .filter(Document.document_id == document_id)
        .first()
    )

    if not document:
        raise HTTPException(
            status_code=404,
            detail=f"Document not found: {document_id}",
        )

    land_record = (
        db.query(LandRecord)
        .filter(LandRecord.document_id == document_id)
        .order_by(LandRecord.id.desc())
        .first()
    )

    validation = (
        db.query(ValidationResult)
        .filter(ValidationResult.document_id == document_id)
        .order_by(ValidationResult.id.desc())
        .first()
    )

    return {
        "document": {
            "document_id": document.document_id,
            "original_filename": document.original_filename,
            "stored_filename": document.stored_filename,
            "file_type": document.file_type,
            "file_size_bytes": document.file_size_bytes,
            "status": document.status,
            "created_at": document.created_at,
            "updated_at": document.updated_at,
        },
        "land_record": (
            {
                "id": land_record.id,
                "khasra_no": {
                    "value": land_record.khasra_no,
                    "confidence": land_record.khasra_confidence,
                },
                "owner_name": {
                    "value": land_record.owner_name,
                    "confidence": land_record.owner_confidence,
                },
                "village": {
                    "value": land_record.village,
                    "confidence": land_record.village_confidence,
                },
                "district": {
                    "value": land_record.district,
                    "confidence": land_record.district_confidence,
                },
                "area": {
                    "value": land_record.area,
                    "confidence": land_record.area_confidence,
                },
                "area_unit": {
                    "value": land_record.area_unit,
                    "confidence": land_record.area_unit_confidence,
                },
            }
            if land_record
            else None
        ),
        "validation": (
            {
                "valid": validation.valid,
                "review_required": validation.review_required,
                "errors": validation.errors,
                "warnings": validation.warnings,
                "low_confidence_fields": validation.low_confidence_fields,
            }
            if validation
            else None
        ),
    }