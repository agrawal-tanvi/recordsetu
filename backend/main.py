from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.documents import router as documents_router
from routes.processing import router as processing_router
from routes.document_details import router as document_details_router

app = FastAPI(
    title="RecordSetu API",
    description="Backend API for intelligent land record digitization and validation",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health_check():
    return {
        "status": "ok",
        "service": "RecordSetu Backend",
        "version": "1.0.0",
    }


app.include_router(documents_router)
app.include_router(processing_router)
app.include_router(document_details_router)