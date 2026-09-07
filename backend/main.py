import os
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from routes.documents import router as documents_router
from routes.processing import router as processing_router
from routes.document_details import router as document_details_router
from routes.review import router as review_router
from routes.search import router as search_router

app = FastAPI(
    title="AbhilekhSetu API",
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
        "service": "AbhilekhSetu Backend",
        "version": "1.0.0",
    }


app.include_router(documents_router)
app.include_router(processing_router)
app.include_router(document_details_router)
app.include_router(review_router)
app.include_router(search_router)

# =============================================================
# Mount and Serve Built Frontend SPA (Unified Single Container)
# =============================================================
FRONTEND_DIST = Path(__file__).resolve().parent.parent / "frontend" / "dist"

if FRONTEND_DIST.exists() and (FRONTEND_DIST / "index.html").exists():
    # Mount hashed static assets (JS, CSS, SVGs in /assets)
    assets_dir = FRONTEND_DIST / "assets"
    if assets_dir.exists():
        app.mount("/assets", StaticFiles(directory=str(assets_dir)), name="assets")

    # SPA catch-all handler for root, client-side routes, and top-level public assets
    @app.get("/{full_path:path}", include_in_schema=False)
    async def serve_spa(full_path: str):
        # Prevent catching unmatched API endpoints
        if full_path == "api" or full_path.startswith("api/"):
            raise HTTPException(status_code=404, detail="API endpoint not found")

        # Serve static file if it directly exists in dist (e.g., favicon.svg, icons.svg)
        target_file = FRONTEND_DIST / full_path
        if full_path and target_file.is_file():
            return FileResponse(str(target_file))

        # Otherwise serve index.html to allow client-side SPA routing (e.g. /upload-document, /review-queue, /verify)
        return FileResponse(str(FRONTEND_DIST / "index.html"))


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=False)
