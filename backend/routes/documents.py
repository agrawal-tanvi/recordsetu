from pathlib import Path
from uuid import uuid4

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from sqlalchemy.orm import Session

from models.database import get_db
from models.document import Document
from schemas.document import DocumentUploadResponse


router = APIRouter(
    prefix="/api/documents",
    tags=["Documents"],
)


UPLOAD_DIR = Path(__file__).resolve().parent.parent / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)

ALLOWED_EXTENSIONS = {".pdf", ".jpg", ".jpeg", ".png"}

MAX_FILE_SIZE = 50 * 1024 * 1024  # 50 MB


@router.post("/upload", response_model=DocumentUploadResponse)
async def upload_document(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    """
    Upload a land record document.

    The uploaded document is stored locally and
    its metadata is saved in the database.
    """

    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="No filename provided",
        )

    extension = Path(file.filename).suffix.lower()

    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type. Allowed: {sorted(ALLOWED_EXTENSIONS)}",
        )

    document_id = f"DOC-{uuid4().hex[:8].upper()}"

    safe_filename = f"{document_id}{extension}"
    file_path = UPLOAD_DIR / safe_filename

    contents = await file.read()

    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=413,
            detail="File too large. Maximum size is 50 MB.",
        )

    file_path.write_bytes(contents)

    document = Document(
        document_id=document_id,
        original_filename=file.filename,
        stored_filename=safe_filename,
        file_type=extension,
        file_size_bytes=len(contents),
        status="UPLOADED",
    )

    db.add(document)
    db.commit()

    return {
        "success": True,
        "document_id": document_id,
        "filename": file.filename,
        "stored_as": safe_filename,
        "file_type": extension,
        "file_size_bytes": len(contents),
        "status": "UPLOADED",
        "message": "Document uploaded successfully. Ready for AI processing.",
    }