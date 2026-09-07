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
    # Fields that can be corrected or confirmed
    # ---------------------------------------------

    fields = [
        "khasra_no",
        "owner_name",
        "village",
        "district",
        "area",
        "area_unit",
    ]

    confidence_attr_map = {
        "khasra_no": "khasra_confidence",
        "owner_name": "owner_confidence",
        "village": "village_confidence",
        "district": "district_confidence",
        "area": "area_confidence",
        "area_unit": "area_unit_confidence",
    }

    reviewed_fields = set()
    changes = []

    # ---------------------------------------------
    # Apply corrections or confirmations explicitly provided
    # ---------------------------------------------

    for field_name in fields:

        new_value = getattr(update, field_name)

        # None means reviewer did not inspect/submit this field
        if new_value is None:
            continue

        reviewed_fields.add(field_name)

        # Area validation
        if field_name == "area":
            try:
                area_num = float(new_value)
                if area_num <= 0:
                    raise HTTPException(
                        status_code=400,
                        detail="Area must be greater than zero.",
                    )
            except (ValueError, TypeError):
                raise HTTPException(
                    status_code=400,
                    detail="Area must be a valid number.",
                )

        old_value = getattr(land_record, field_name)
        conf_attr = confidence_attr_map.get(field_name)
        old_conf = getattr(land_record, conf_attr, 0.0) if conf_attr else 0.0

        old_str = str(old_value) if old_value is not None else None
        new_str = str(new_value) if new_value is not None else None

        if old_str != new_str:
            # Field value was corrected by reviewer
            setattr(
                land_record,
                field_name,
                new_value,
            )
            if conf_attr:
                setattr(land_record, conf_attr, 1.0)

            change_entry = {
                "field_name": field_name,
                "old_value": old_str,
                "new_value": new_str,
                "action": "CORRECTED",
            }
            changes.append(change_entry)

            # Audit log for correction
            db.add(
                AuditLog(
                    document_id=document_id,
                    field_name=field_name,
                    old_value=old_str,
                    new_value=new_str,
                    action="CORRECTED",
                    actor=update.reviewer,
                )
            )
        else:
            # Field value was confirmed as-is by official reviewer
            # If the value had low confidence (< 1.0), human confirmation resolves it
            if old_conf < 1.0:
                if conf_attr:
                    setattr(land_record, conf_attr, 1.0)

                change_entry = {
                    "field_name": field_name,
                    "old_value": old_str,
                    "new_value": new_str,
                    "action": "CONFIRMED",
                }
                changes.append(change_entry)

                # Audit log for confirmation
                db.add(
                    AuditLog(
                        document_id=document_id,
                        field_name=field_name,
                        old_value=old_str,
                        new_value=new_str,
                        action="CONFIRMED",
                        actor=update.reviewer,
                    )
                )

    # ---------------------------------------------
    # Re-validate after human correction/confirmation
    # ---------------------------------------------

    def make_field(field_name, value):
        conf_attr = confidence_attr_map.get(field_name)
        if field_name in reviewed_fields:
            conf = 1.0
        elif conf_attr:
            conf = getattr(land_record, conf_attr, 0.0)
        else:
            conf = 0.0

        return FieldValue(
            value=str(value) if value is not None else None,
            confidence=conf,
        )

    corrected_extraction = ExtractionResult(
        document_id=document_id,
        fields=ExtractedFields(
            khasra_no=make_field("khasra_no", land_record.khasra_no),
            owner_name=make_field("owner_name", land_record.owner_name),
            village=make_field("village", land_record.village),
            district=make_field("district", land_record.district),
            area=make_field("area", land_record.area),
            area_unit=make_field("area_unit", land_record.area_unit),
        ),
    )

    validation = validate_extraction(corrected_extraction, db=db)

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