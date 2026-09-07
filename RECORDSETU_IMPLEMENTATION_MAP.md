# AbhilekhSetu — Implementation Map
## SIH26018 | Intelligent Land Record Digitization and Validation System

## 1. MISSION

Complete the EXISTING RecordSetu repository into a stable SIH MVP/prototype and deploy it.

DO NOT rebuild the project from scratch.

DO NOT delete working features unnecessarily.

DO NOT replace the existing architecture unless technically necessary.

The final MVP must demonstrate:

Document Upload
→ OCR
→ Structured Extraction
→ Confidence Scoring
→ Automated Validation
→ Review Queue
→ Human Correction
→ Re-validation
→ VERIFIED
→ Audit Trail
→ Search
→ Optional GIS visualization

The product is a prototype, NOT a live government system.

---

# 2. PROBLEM STATEMENT

SIH26018:
"Intelligent Land Record Digitization and Validation System"

The system addresses legacy land records that may be:

- scanned
- photographed
- old/poor quality
- inconsistent in format
- handwritten
- multilingual

The system assists digitization by:

1. extracting important land-record fields
2. assigning confidence
3. validating extracted information
4. identifying inconsistencies/duplicates
5. routing uncertain records to human reviewers
6. recording corrections in an audit trail

Core fields:

- khasra_no
- owner_name
- village
- district
- area
- area_unit

---

# 3. PRODUCT DIFFERENTIATOR

Do NOT position RecordSetu as "just OCR".

The important layer is:

OCR
+
Structured Extraction
+
Confidence
+
Validation
+
Duplicate Detection
+
Human Review
+
Re-validation
+
Audit Trail

Core principle:

"RecordSetu does not blindly trust AI extraction. It identifies uncertainty and sends questionable records to a human reviewer."

RecordSetu is a trust/digitization layer that can complement existing government LRMS/DILRMP/GIS systems.

DO NOT claim live integration with government systems.

---

# 4. CURRENT TECH STACK

## Frontend

- React
- Vite
- JavaScript
- CSS
- Leaflet

## Backend

- Python
- FastAPI
- Uvicorn
- REST APIs
- SQLAlchemy

## AI/OCR

- Tesseract OCR
- pytesseract
- OpenCV
- Pillow
- NumPy
- pdf2image
- Hindi OCR (`hin`)
- English OCR (`eng`)

## Current database

- SQLite

## Deployment target

Preferred:
- PostgreSQL
- PostGIS where GIS functionality requires it

## Version control

- Git
- GitHub

## Deployment architecture

Frontend:
React/Vite

Backend:
Containerized FastAPI

OCR environment:
Tesseract + Hindi/English trained data + Poppler

Database:
PostgreSQL/PostGIS where practical

---

# 5. AI/ML POSITIONING

The current implementation uses an AI-assisted OCR/extraction pipeline.

It does NOT contain a custom deep-learning model trained from scratch.

Current pipeline:

Document
→ Image preprocessing
→ Tesseract OCR
→ Text extraction
→ Regex/entity extraction
→ Confidence scoring
→ Validation
→ Human review when necessary

DO NOT claim:

- custom ML model training
- deep-learning handwriting model
- 100% OCR accuracy
- LLM extraction
- proprietary AI model

unless such functionality is actually implemented later.

---

# 6. ALREADY IMPLEMENTED

## Backend

Working APIs:

GET /api/health

POST /api/documents/upload

POST /api/documents/{document_id}/process

GET /api/documents/{document_id}

GET /api/review-queue

PUT /api/review/{document_id}

GET /api/audit/{document_id}

GET /api/search

Backend currently supports:

- document upload
- local file storage
- SQLite persistence
- OCR/AI processing
- structured extraction
- validation
- review queue
- human correction
- re-validation
- audit logging
- search

## AI

Existing:

ai/src/preprocess.py
ai/src/ocr.py
ai/src/extractor.py
ai/src/confidence.py
ai/src/pdf.py
ai/src/main.py
ai/src/evaluate.py
ai/src/test_all.py

AI sample dataset also exists.

## Frontend

Already connected:

- upload
- backend processing
- extraction result
- confidence display
- validation display
- review queue
- verification/review
- audit information

Do not rebuild these components.

---

# 7. CURRENT KNOWN GAPS

## GAP 1 — PDF processing

pdf2image requires Poppler.

Make PDF processing reliable.

For local development:
- support configurable Poppler path

For deployment:
- include Poppler inside the backend container

Do NOT depend on a developer's Downloads folder.

---

## GAP 2 — Duplicate Khasra

Current prototype uses:

EXISTING_KHASRA_NUMBERS

with hardcoded values.

Replace this with a database query.

Duplicate detection should consider context:

same Khasra
+
same village
+
same district

should be treated as a duplicate candidate.

A Khasra with the same number in a different village/district should not automatically be treated as the same parcel.

Expected:

Existing Khasra:
→ warning
→ REVIEW_REQUIRED

New Khasra:
→ no duplicate warning

---

## GAP 3 — Search

Backend `/api/search` already exists.

The frontend LandRecordsSearchPage currently uses static/mock data.

Replace static filtering with the real API.

Search should support:

- Khasra
- owner
- village
- district

Remove fake claims such as:

"DILRMP Central Ledger Synced"

unless an actual integration exists.

---

## GAP 4 — Human review verification

Current review logic can leave a low-confidence field in REVIEW_REQUIRED even when an official reviewer confirms the value without changing the text.

Fix this.

Reviewer confirmation must be able to resolve the review reason.

Expected:

LOW CONFIDENCE
→ reviewer confirms/corrects
→ re-validation
→ no remaining review reason
→ VERIFIED

Audit the review action appropriately.

---

## GAP 5 — Validation threshold

Inspect:

- validation/validation_rules.md
- ai/src/confidence.py
- backend/services/validation_service.py
- validation/expected_validation_results.json

These currently have inconsistent threshold definitions.

Use ONE consistent threshold across the system.

Preferred MVP threshold:
0.75

But verify the impact against the existing validation tests before changing it.

---

## GAP 6 — Validation cases

Support:

- missing Khasra
- missing owner
- missing village
- missing district
- zero area
- negative area
- excessive area
- missing area unit
- invalid area unit
- low confidence owner
- low confidence area
- multiple warnings
- duplicate Khasra

---

# 8. MISLEADING UI — MUST FIX

Never display functionality that is not actually implemented.

Remove or rewrite claims such as:

- "Indic-OCR Engine v3.2"
- cadastral master matching
- cryptographic verification hash
- authoritative digital certificate verification
- government ledger synchronization
- live DILRMP synchronization
- fake ULPIN generation
- official government authentication
- fake government certification

Use truthful pipeline wording:

1. Document Preprocessing
2. OCR Text Extraction
3. Land Record Field Extraction
4. Confidence Scoring
5. Automated Validation

---

# 9. GIS

GIS is optional for the core MVP.

If shown:

Label synthetic/demo geometry honestly.

Acceptable:

"Prototype Cadastral Visualizer"

Do NOT claim:

- official cadastral boundaries
- live Bhu-Naksha integration
- official ULPIN
- government GIS synchronization

unless actually implemented.

Preferred architecture if implemented:

PostGIS
→ FastAPI
→ GeoJSON
→ Leaflet

---

# 10. DATABASE STRATEGY

Current MVP uses SQLite.

Do not blindly merge the old database-gis branch.

The old database schema uses assumptions that do not match the current backend.

First inspect the current SQLAlchemy models.

For deployment choose:

Option A:
SQLite + persistent storage

OR

Option B:
PostgreSQL + PostGIS

Preferred deployment:
PostgreSQL + PostGIS where reliably supported.

Preserve existing API contracts.

---

# 11. SECURITY

A previous teammate database seed script contained a hardcoded database credential.

Treat it as compromised.

NEVER:

- use that credential
- copy it into source code
- commit credentials
- expose secrets in frontend code
- put secrets in README
- commit `.env`

Use environment variables.

Before deployment:

- scan Git history/files for secrets
- ensure `.env` is ignored
- ensure credentials are environment variables
- rotate/revoke the previously exposed credential

This is a MANUAL GATE.

STOP and ask the user to perform credential rotation before continuing.

---

# 12. ENVIRONMENT CONFIGURATION

Frontend:

VITE_API_BASE_URL

Backend:

DATABASE_URL
CORS_ORIGINS
UPLOAD_DIR
MAX_UPLOAD_SIZE

If needed:

SECRET_KEY

Never hardcode production values.

Replace frontend:

http://127.0.0.1:8000

with:

import.meta.env.VITE_API_BASE_URL

---

# 13. DEPLOYMENT REQUIREMENTS

Backend deployment environment must contain:

- Python
- FastAPI
- Uvicorn
- Tesseract
- Hindi OCR data
- English OCR data
- Poppler
- OpenCV
- Pillow
- NumPy
- pytesseract
- pdf2image
- SQLAlchemy
- database driver

Create:

Dockerfile
.dockerignore
.env.example

Frontend must support environment-based API configuration.

---

# 14. IMPLEMENTATION PHASES

## PHASE 1 — STABILIZATION

Fix:

1. Windows Unicode console issue
2. PDF/Poppler handling
3. unified backend dependencies
4. frontend route ordering
5. human review verification logic

Then test:

- health
- upload
- process
- review queue
- correction
- re-validation
- audit

STOP after Phase 1 and report results.

---

## PHASE 2 — VALIDATION

1. Align confidence threshold.
2. Test all validation scenarios.
3. Ensure Hindi area units such as `हे०` work.
4. Ensure status transitions are correct.

Expected:

Valid:
→ VERIFIED/validated state

Invalid or uncertain:
→ REVIEW_REQUIRED

Corrected and fully resolved:
→ VERIFIED

STOP and report.

---

## PHASE 3 — DATABASE-BACKED DUPLICATE DETECTION

Replace hardcoded duplicate set.

Implement database-backed duplicate checking.

Test:

Khasra 125 existing in same village/district
→ REVIEW_REQUIRED

New Khasra
→ no duplicate warning

Same Khasra in different village
→ not automatically duplicate

STOP and report.

---

## PHASE 4 — REAL FRONTEND DATA

Connect:

LandRecordsSearchPage
→ GET /api/search

Ensure:

Review Queue
→ real API

Verification
→ real backend

Audit
→ real backend

Remove static fake records from MVP paths.

STOP and report.

---

## PHASE 5 — UI TRANSPARENCY + POLISH

Fix:

- misleading technical claims
- fake progress
- `[object Object]`
- UNKNOWN values
- duplicate React keys
- console errors
- dead imports
- broken routes
- loading states
- API errors
- empty states

Do not redesign the whole frontend.

STOP and report.

---

## PHASE 6 — DATABASE / DEPLOYMENT ARCHITECTURE

Inspect current SQLite implementation.

If PostgreSQL is selected:

1. design compatible schema
2. preserve API contracts
3. migrate
4. test all endpoints
5. test persistence

Do NOT blindly merge old database-gis schema.

STOP if manual cloud/database setup is required.

---

## PHASE 7 — DOCKERIZATION

Create deployment-ready backend container.

Include:

- Python
- dependencies
- Tesseract
- Hindi OCR
- English OCR
- Poppler

Test the container locally.

STOP if a manual Docker/cloud action is required.

---

## PHASE 8 — SECURITY GATE

Scan for secrets.

Remove accidental secrets from current working tree.

Do NOT rewrite Git history automatically.

If credential rotation is required:

STOP.

Tell the user exactly what provider-side action is required.

---

## PHASE 9 — LOCAL PRODUCTION-LIKE TEST

Run complete E2E:

Upload
→ OCR
→ Extraction
→ Confidence
→ Validation
→ Review Queue
→ Correction
→ Re-validation
→ VERIFIED
→ Audit
→ Search
→ Duplicate detection

Also test:

- valid record
- missing field
- invalid area
- low confidence
- duplicate Khasra

Run:

npm run build

No deployment until this passes.

---

## PHASE 10 — CLOUD DEPLOYMENT

Possible architecture:

React/Vite
→ Frontend hosting

FastAPI container
→ Backend hosting

PostgreSQL/PostGIS
→ Managed database

Object/persistent storage
→ Uploaded documents

Do not assume a specific provider.

Verify provider availability first.

Manual gates may include:

- login
- account creation
- database creation
- credentials
- billing
- environment variables
- deployment permissions
- DNS

STOP at manual actions.

---

## PHASE 11 — DEPLOYED E2E

Verify:

Frontend opens
→ Upload
→ Backend receives
→ OCR runs
→ Extraction appears
→ Validation runs
→ Review works
→ Correction works
→ Re-validation works
→ Audit works
→ Search works
→ Duplicate detection works

Check:

- browser console
- backend logs
- deployment logs

---

## PHASE 12 — FINAL DEMO READINESS

Demo:

1. Upload old land record
2. Show OCR/extraction
3. Show confidence
4. Show validation issue
5. Open Review Queue
6. Correct record
7. Revalidate
8. Show VERIFIED
9. Show Audit Trail
10. Search by Khasra/owner
11. Optionally show prototype GIS

Core pitch:

"RecordSetu converts legacy land records into structured digital records, measures extraction confidence, validates the information, routes uncertain records to human review, and maintains an auditable correction history."

---

# 15. MANUAL GATE PROTOCOL

If ANY action requires the user to interact manually with:

- browser authentication
- Google/GitHub login
- cloud dashboard
- database provider
- credentials
- CAPTCHA
- billing
- DNS
- domain
- permission dialog
- local software installer
- account creation

STOP.

Use exactly:

MANUAL ACTION REQUIRED

Why:
<reason>

Do this:
1. ...
2. ...
3. ...

When complete, tell me:
MANUAL STEP COMPLETE

Do not continue until confirmation.

---

# 16. AGENT SAFETY RULES

DO NOT:

- rebuild from scratch
- delete working features unnecessarily
- use git reset --hard
- merge unrelated histories
- invent government integrations
- invent ML models
- claim 100% OCR accuracy
- commit secrets
- use old exposed credentials
- treat synthetic data as real government data
- spend the main implementation cycle tuning OCR accuracy

Before destructive changes:

inspect first.

Before changing architecture:

explain first.

After every phase:

implement
→ test
→ report
→ STOP

Wait for approval before next phase.

---

# 17. GIT

Use Conventional Commits:

feat:
fix:
refactor:
test:
docs:
chore:

Do not commit after every tiny edit.

Create commits at logical stable milestones.

Do not push to main automatically.

---

# 18. DEFINITION OF DONE

MVP is complete when:

- upload works
- OCR works
- extraction works
- confidence is displayed
- validation works
- duplicate detection is database-backed
- review queue works
- human correction works
- re-validation works
- VERIFIED state works
- audit trail works
- search uses backend data
- misleading claims are removed
- frontend builds
- backend runs
- deployment succeeds
- deployed E2E test passes
- secrets are secure
- limitations are documented

---

# 19. FINAL PRIORITY

P0 — MUST WORK

Upload
OCR
Extraction
Confidence
Validation
Review
Correction
Re-validation
Audit
Search
Deployment

P1 — IMPORTANT

Database duplicate detection
PostgreSQL
Docker
Error handling
UI cleanup

P2 — NICE TO HAVE

GIS/PostGIS
Dashboard improvements
More languages
Better OCR
Advanced anomaly detection

P3 — DO NOT PRIORITIZE

Custom ML training
Live government APIs
All-state support
Government authentication
Advanced cadastral integration