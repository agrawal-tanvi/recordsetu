from pathlib import Path
from uuid import uuid4

from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware


# --------------------------------------------------
# App Configuration
# --------------------------------------------------

app = FastAPI(
    title="RecordSetu API",
    description="Backend API for intelligent land record digitization and validation",
    version="1.0.0",
)


# --------------------------------------------------
# CORS
# --------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------
# File Storage Configuration
# --------------------------------------------------

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

ALLOWED_EXTENSIONS = {".pdf", ".jpg", ".jpeg", ".png"}

MAX_FILE_SIZE = 50 * 1024 * 1024  # 50 MB


# --------------------------------------------------
# Health Check
# --------------------------------------------------

@app.get("/api/health")
def health_check():
    return {
        "status": "ok",
        "service": "RecordSetu Backend",
        "version": "1.0.0",
    }


# --------------------------------------------------
# Document Upload
# --------------------------------------------------

@app.post("/api/documents/upload")
async def upload_document(file: UploadFile = File(...)):
    """
    Upload a land record document.

    The uploaded document is temporarily stored locally.
    Later, it will be sent to the AI/OCR pipeline.
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