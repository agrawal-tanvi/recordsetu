# =============================================================
# AbhilekhSetu — Unified Production Container Dockerfile
# Stage 1: Build React/Vite Frontend
# Stage 2: Production FastAPI + OCR Engine (Tesseract + Poppler)
# =============================================================

# -------------------------------------------------------------
# Stage 1: Build Frontend SPA
# -------------------------------------------------------------
FROM node:20-alpine AS frontend-builder

WORKDIR /app/frontend

# Install dependencies
COPY frontend/package*.json ./
RUN npm ci || npm install

# Copy source code and build production bundle
COPY frontend/ ./
ENV VITE_API_BASE_URL=""
RUN npm run build

# -------------------------------------------------------------
# Stage 2: Production Backend & OCR Engine
# -------------------------------------------------------------
FROM python:3.11-slim AS production

# Prevent Python bytecode and enable unbuffered output
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PORT=8000 \
    PYTHONPATH=/app

# Install system dependencies:
# - Tesseract OCR + Hindi and English language models
# - Poppler utilities (pdftoppm, pdfinfo) required by pdf2image
# - libgl1 and libglib2.0-0 required by OpenCV
# - curl for container health check
RUN apt-get update && apt-get install -y --no-install-recommends \
    tesseract-ocr \
    tesseract-ocr-hin \
    tesseract-ocr-eng \
    poppler-utils \
    libgl1 \
    libglib2.0-0 \
    curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy and install Python dependencies
COPY backend/requirements.txt /app/backend/requirements.txt
RUN pip install --no-cache-dir -r /app/backend/requirements.txt

# Copy backend application and AI processing pipeline
COPY backend /app/backend
COPY ai /app/ai

# Copy built frontend distribution from builder stage
COPY --from=frontend-builder /app/frontend/dist /app/frontend/dist

# Ensure upload directory exists inside container
RUN mkdir -p /app/backend/uploads

WORKDIR /app/backend

# Expose default HTTP port
EXPOSE 8000

# Container healthcheck using backend /api/health endpoint
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:${PORT:-8000}/api/health || exit 1

# Start Uvicorn listening on 0.0.0.0:$PORT
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}"]
