from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from models.database import get_db
from models.document import Document
from models.land_record import LandRecord
from models.validation import ValidationResult
from models.audit import AuditLog
from schemas.document import ExtractionResult, ExtractedFields, FieldValue
from services.validation_service import validate_extraction

router = APIRouter(
    prefix="/api",
    tags=["Review"],
)


# ---------------------------------------------------------
# REVIEW QUEUE
# ---------------------------------------------------------

@router.get("/review-queue")
def get_review_queue(
    db: Session = Depends(get_db),
):
    """
    Return documents that require human review.
    """

    documents = (
        db.query(Document)
        .filter(Document.status == "REVIEW_REQUIRED")
        .order_by(Document.created_at.desc())
        .all()
    )

    queue = []

    for document in documents:

        land_record = (
            db.query(LandRecord)
            .filter(LandRecord.document_id == document.document_id)
            .order_by(LandRecord.id.desc())
            .first()
        )

        validation = (
            db.query(ValidationResult)
            .filter(
                ValidationResult.document_id == document.document_id
            )
            .order_by(ValidationResult.id.desc())
            .first()
        )

        queue.append(
            {
                "document_id": document.document_id,
                "filename": document.original_filename,
                "status": document.status,
                "created_at": document.created_at,

                "land_record": (
                    {
                        "khasra_no": land_record.khasra_no,
                        "owner_name": land_record.owner_name,
                        "village": land_record.village,
                        "district": land_record.district,
                        "area": land_record.area,
                        "area_unit": land_record.area_unit,
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
                        "low_confidence_fields": (
                            validation.low_confidence_fields
                        ),
                    }
                    if validation
                    else None
                ),
            }
        )

    return {
        "count": len(queue),
        "items": queue,
    }


# ---------------------------------------------------------
# REVIEW UPDATE SCHEMA
# ---------------------------------------------------------

class ReviewUpdate(BaseModel):
    reviewer: str

    khasra_no: str | None = None
    owner_name: str | None = None
    village: str | None = None
    district: str | None = None
    area: float | None = None
    area_unit: str | None = None


# ---------------------------------------------------------
# HUMAN REVIEW / CORRECTION
# ---------------------------------------------------------

@router.put("/review/{document_id}")
def review_document(
    document_id: str,
    update: ReviewUpdate,
    db: Session = Depends(get_db),
):
    """
    Apply human corrections to a land record,
    validate the correction, and create an audit
    log for every changed field.
    """

    # ---------------------------------------------
    # Validate reviewer
    # ---------------------------------------------

    if not update.reviewer.strip():
        raise HTTPException(
            status_code=400,
            detail="Reviewer name is required.",
        )

    # ---------------------------------------------
    # Find document
    # ---------------------------------------------

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

    # ---------------------------------------------
    # Find latest land record
    # ---------------------------------------------

    land_record = (
        db.query(LandRecord)
        .filter(LandRecord.document_id == document_id)
        .order_by(LandRecord.id.desc())
        .first()
    )

    if not land_record:
        raise HTTPException(
            status_code=404,
            detail=f"Land record not found: {document_id}",
        )

    # ---------------------------------------------
    # Fields that can be corrected
    # ---------------------------------------------

    fields = [
        "khasra_no",
        "owner_name",
        "village",
        "district",
        "area",
        "area_unit",
    ]

    changes = []

    # ---------------------------------------------
    # Apply only fields explicitly provided
    # ---------------------------------------------

    for field_name in fields:

        new_value = getattr(update, field_name)

        # None means reviewer did not modify this field
        if new_value is None:
            continue

        # Area validation
        if field_name == "area" and new_value <= 0:
            raise HTTPException(
                status_code=400,
                detail="Area must be greater than zero.",
            )

        old_value = getattr(land_record, field_name)

        # Only create an audit record when value actually changes
        if str(old_value) != str(new_value):

            setattr(
                land_record,
                field_name,
                new_value,
            )

            changes.append(
                {
                    "field_name": field_name,
                    "old_value": (
                        str(old_value)
                        if old_value is not None
                        else None
                    ),
                    "new_value": str(new_value),
                }
            )

            # -------------------------------------
            # Audit log
            # -------------------------------------

            db.add(
                AuditLog(
                    document_id=document_id,
                    field_name=field_name,
                    old_value=(
                        str(old_value)
                        if old_value is not None
                        else None
                    ),
                    new_value=str(new_value),
                    action="CORRECTED",
                    actor=update.reviewer,
                )
            )

    # ---------------------------------------------
    # At least one change must be made
    # ---------------------------------------------

    if not changes:
        raise HTTPException(
            status_code=400,
            detail="No changes were provided for review.",
        )

       # ---------------------------------------------
    # Re-validate after human correction
    # ---------------------------------------------

    def make_field(value, confidence):
        return FieldValue(
            value=str(value) if value is not None else None,
            confidence=confidence,
        )

    corrected_extraction = ExtractionResult(
        document_id=document_id,
        fields=ExtractedFields(
            khasra_no=make_field(
                land_record.khasra_no,
                1.0 if "khasra_no" in [c["field_name"] for c in changes]
                else land_record.khasra_confidence,
            ),
            owner_name=make_field(
                land_record.owner_name,
                1.0 if "owner_name" in [c["field_name"] for c in changes]
                else land_record.owner_confidence,
            ),
            village=make_field(
                land_record.village,
                1.0 if "village" in [c["field_name"] for c in changes]
                else land_record.village_confidence,
            ),
            district=make_field(
                land_record.district,
                1.0 if "district" in [c["field_name"] for c in changes]
                else land_record.district_confidence,
            ),
            area=make_field(
                land_record.area,
                1.0 if "area" in [c["field_name"] for c in changes]
                else land_record.area_confidence,
            ),
            area_unit=make_field(
                land_record.area_unit,
                1.0 if "area_unit" in [c["field_name"] for c in changes]
                else land_record.area_unit_confidence,
            ),
        ),
    )

    validation = validate_extraction(corrected_extraction)

    # ---------------------------------------------
    # Save second validation result
    # ---------------------------------------------

    validation_record = ValidationResult(
        document_id=document_id,
        valid=validation.valid,
        review_required=validation.review_required,
        errors=validation.errors,
        warnings=validation.warnings,
        low_confidence_fields=validation.low_confidence_fields,
    )

    db.add(validation_record)

    # ---------------------------------------------
    # Determine final status
    # ---------------------------------------------

    if validation.review_required:
        document.status = "REVIEW_REQUIRED"
    else:
        document.status = "VERIFIED"

    # ---------------------------------------------
    # Save everything
    # ---------------------------------------------

    db.commit()

    return {
        "success": True,
        "document_id": document_id,
        "status": document.status,
        "reviewer": update.reviewer,
        "changes": changes,
        "validation": {
            "valid": validation.valid,
            "review_required": validation.review_required,
            "errors": validation.errors,
            "warnings": validation.warnings,
            "low_confidence_fields": validation.low_confidence_fields,
        },
        "message": (
            "Human review completed and record verified."
            if document.status == "VERIFIED"
            else "Human correction saved, but the record still requires review."
        ),
    }
# ---------------------------------------------------------
# AUDIT LOG
# ---------------------------------------------------------

@router.get("/audit/{document_id}")
def get_audit_log(
    document_id: str,
    db: Session = Depends(get_db),
):
    """
    Return the audit history of human corrections
    for a document.
    """

    # ---------------------------------------------
    # Find document
    # ---------------------------------------------

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

    # ---------------------------------------------
    # Get audit records
    # ---------------------------------------------

    logs = (
        db.query(AuditLog)
        .filter(AuditLog.document_id == document_id)
        .order_by(AuditLog.created_at.asc())
        .all()
    )

    # ---------------------------------------------
    # Return audit history
    # ---------------------------------------------

    return {
        "document_id": document_id,
        "count": len(logs),

        "items": [
            {
                "field_name": log.field_name,
                "old_value": log.old_value,
                "new_value": log.new_value,
                "action": log.action,
                "actor": log.actor,
                "created_at": log.created_at,
            }
            for log in logs
        ],
    }