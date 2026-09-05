from typing import Optional

from pydantic import BaseModel, Field


class FieldValue(BaseModel):
    value: Optional[str] = None
    confidence: float = Field(default=0.0, ge=0.0, le=1.0)


class ExtractedFields(BaseModel):
    khasra_no: FieldValue = Field(default_factory=FieldValue)
    owner_name: FieldValue = Field(default_factory=FieldValue)
    village: FieldValue = Field(default_factory=FieldValue)
    district: FieldValue = Field(default_factory=FieldValue)
    area: FieldValue = Field(default_factory=FieldValue)
    area_unit: FieldValue = Field(default_factory=FieldValue)


class ExtractionResult(BaseModel):
    document_id: str
    fields: ExtractedFields


class DocumentUploadResponse(BaseModel):
    success: bool
    document_id: str
    filename: str
    stored_as: str
    file_type: str
    file_size_bytes: int
    status: str
    message: str
class ValidationResult(BaseModel):
    document_id: str
    valid: bool
    review_required: bool
    errors: list[str] = Field(default_factory=list)
    warnings: list[str] = Field(default_factory=list)
    low_confidence_fields: list[str] = Field(default_factory=list)
class DocumentProcessResponse(BaseModel):
    document_id: str
    extraction: ExtractionResult
    validation: ValidationResult
    status: str