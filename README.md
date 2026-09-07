# 🏛️ AbhilekhSetu

### From Land Records to Trusted Digital Records

> **SIH26018 — Intelligent Land Record Digitization and Validation System**

AbhilekhSetu is an AI-assisted land-record digitization and validation platform designed to transform **scanned, photographed, and handwritten legacy land records** into structured digital records.

Instead of blindly trusting OCR output, AbhilekhSetu adds a **trust layer** through field-level confidence scoring, automated validation, human verification, re-validation, and an audit trail.

---

## ✨ Why AbhilekhSetu?

Legacy land records are often:

- 📄 Scanned or photographed
- ✍️ Handwritten
- 🌐 Available in regional languages
- 🧩 Stored in inconsistent formats
- ⚠️ Difficult to validate automatically

Traditional digitization can convert a document into text, but **digitization alone does not guarantee correctness**.

### Our approach

```text
Legacy Document
      ↓
     OCR
      ↓
Field Extraction
      ↓
Confidence Scoring
      ↓
Automated Validation
      ↓
 ┌────┴─────┐
 │          │
Valid    Needs Review
 │          │
 ↓          ↓
Verified   Human Correction
              ↓
         Re-validation
              ↓
           Verified
              ↓
         Audit Trail
AI proposes. Validation checks. Humans verify. The system records what changed.
🚀 Key Features
1. 📄 Legacy Document Digitization
Upload land-record documents in supported formats such as:
JPG
PNG
PDF
The system processes the uploaded document and extracts relevant land-record information.
2. 🔍 OCR & Information Extraction
AbhilekhSetu uses OCR to extract text from scanned and photographed records.
The pipeline combines:
Tesseract OCR
Hindi + English OCR data
OpenCV
Pillow
NumPy
Rule-based field extraction
Typical fields include:
Khasra Number
Owner Name
Village
District
Area
Area Unit
3. 🎯 Field-Level Confidence Scoring
Every extracted field is associated with a confidence score.
Example:
{
  "owner_name": {
    "value": "दीपक अग्रवाल",
    "confidence": 0.90
  },
  "district": {
    "value": "मथुरा",
    "confidence": 0.90
  },
  "area": {
    "value": null,
    "confidence": 0.00
  }
}
This allows the system to distinguish between:
high-confidence information
and
information that requires human attention.
✅ 4. Automated Validation Engine
OCR output is not automatically considered correct.
AbhilekhSetu performs validation checks such as:
Required Field Validation
Checks whether essential fields are missing.
Confidence Validation
Fields below the configured confidence threshold can be flagged for review.
Area Validation
Checks for invalid or excessive area values.
Unit Validation
Recognizes supported land-area units, including Hindi representations.
Duplicate Khasra Detection
Detects duplicate Khasra numbers within the same:
Village + District
A duplicate is treated as a warning requiring review, rather than automatically rejecting the record.
👤 5. Human-in-the-Loop Verification
When a record is uncertain or fails validation, it enters the Review Queue.
A reviewer can:
Open the original document
Inspect extracted fields
Correct incorrect values
Submit the corrected record
Trigger re-validation
This prevents the system from silently accepting unreliable OCR results.
🔄 6. Re-validation After Correction
Corrections are not simply stored as final values.
After human correction:
Correction
    ↓
Validation
    ↓
All checks pass?
   ↙     ↘
 YES      NO
 ↓        ↓
Verified  Review Required
This ensures that human-edited records still pass the same validation layer.
📝 7. Audit Trail
Every important correction can be tracked.
The audit trail records information such as:
Document
Reviewer
Timestamp
Original Value
Corrected Value
Action
Example:
Khasra:
00-020 → 975

Area:
Missing → 0.95

Reviewer:
Tanvi

Status:
Verified
This provides traceability instead of overwriting the original AI output without explanation.
🔎 8. Search & Digital Records
Verified records can be searched using key land-record information such as:
Khasra number
Owner
Village
District
This makes processed records easier to retrieve and demonstrate as structured digital data.
🗺️ 9. GIS-Ready Architecture
The platform is designed with GIS integration in mind.
The architecture supports future integration with:
Parcel geometry
Map-based visualization
Spatial search
Land-record GIS systems
The current prototype uses sample/prototype mapping data rather than claiming live government GIS integration.
🏗️ System Architecture
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │  Upload / Review /  │
                    │ Search / Dashboard  │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │    FastAPI Backend  │
                    │   REST API Layer    │
                    └──────────┬──────────┘
                               │
                ┌──────────────┼──────────────┐
                ▼              ▼              ▼
          ┌──────────┐  ┌────────────┐  ┌────────────┐
          │ OCR      │  │ Extraction │  │ Validation │
          │Tesseract │  │   Engine   │  │   Engine   │
          └──────────┘  └────────────┘  └──────┬─────┘
                                                │
                                                ▼
                                      ┌──────────────────┐
                                      │ Human Review     │
                                      │ & Correction     │
                                      └────────┬─────────┘
                                               │
                                               ▼
                                      ┌──────────────────┐
                                      │ Database +       │
                                      │ Audit Records    │
                                      └──────────────────┘
🛠️ Technology Stack
Layer
Technology
Frontend
React + Vite
Backend
FastAPI
API Server
Uvicorn
Database
SQLite prototype + SQLAlchemy
Target Database
PostgreSQL + PostGIS
OCR
Tesseract OCR
Image Processing
OpenCV, Pillow, NumPy
PDF Processing
pdf2image + Poppler
Maps
Leaflet
Communication
REST APIs + JSON
Deployment
Docker
Hosting
Render
📂 Project Structure
recordsetu/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── main.py
│   ├── routes/
│   ├── services/
│   ├── schemas/
│   ├── models/
│   ├── tests/
│   └── requirements.txt
│
├── ai/
│   └── src/
│       ├── ocr.py
│       ├── pdf.py
│       └── main.py
│
├── validation/
│   ├── specs/
│   ├── test_data/
│   └── tests/
│
├── database/
│
├── Dockerfile
├── .dockerignore
└── README.md
🔌 Core API Endpoints
Method
Endpoint
Purpose
GET
/api/health
Backend health check
POST
/api/documents/upload
Upload document
GET
/api/documents/{document_id}
Get document
POST
/api/documents/{document_id}/process
Process document
GET
/api/review-queue
Fetch records requiring review
PUT
/api/review/{document_id}
Submit human correction
GET
/api/audit/{document_id}
View audit history
GET
/api/search
Search digital records
🧪 Validation & Testing
The project includes dedicated validation and integration test suites covering:
Required fields
Confidence threshold
Area validation
Area-unit validation
Excessive area detection
Duplicate Khasra detection
Village/district scoping
Re-validation after correction
API integration
The implemented validation and integration test suites currently pass successfully.
🌐 Live Prototype
🚀 AbhilekhSetu
Live Demo:
https://abhilekhsetu.onrender.com⁠�
The deployed prototype demonstrates:
Upload
  ↓
OCR
  ↓
Extraction
  ↓
Confidence
  ↓
Validation
  ↓
Review Queue
  ↓
Human Correction
  ↓
Re-validation
  ↓
Verified Record
  ↓
Audit Trail
  ↓
Search
💻 Running Locally
Prerequisites
Install:
Python 3.11+
Node.js
Tesseract OCR
Poppler
1. Clone the Repository
git clone https://github.com/agrawal-tanvi/recordsetu.git
cd recordsetu
2. Start Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
Backend:
http://127.0.0.1:8000
Swagger API documentation:
http://127.0.0.1:8000/docs
3. Start Frontend
Open another terminal:
cd frontend
npm install
npm run dev
Then open the local URL shown by Vite.
🔐 Important Design Principle
We do not treat OCR output as ground truth.
A conventional digitization pipeline may look like:
Document → OCR → Database
AbhilekhSetu adds a trust layer:
Document
   ↓
OCR
   ↓
Extraction
   ↓
Confidence
   ↓
Validation
   ↓
Human Verification
   ↓
Audit Trail
   ↓
Trusted Digital Record
This is the core idea behind AbhilekhSetu.
🎯 How AbhilekhSetu Complements Existing Systems
AbhilekhSetu is designed as a legacy-record digitization and validation layer, not as a replacement for existing land-record or GIS platforms.
It can conceptually act as a bridge:
Legacy Records
      ↓
  AbhilekhSetu
      ↓
Validated Structured Data
      ↓
Existing Land Record / GIS Ecosystem
Live government database integration is not claimed in this prototype.
🔮 Future Scope
Potential future enhancements include:
🇮🇳 More Indian regional languages
✍️ Improved handwritten-document recognition
🧠 Domain-specific document classification
🗺️ PostgreSQL/PostGIS production deployment
🔗 Integration APIs for existing land-record systems
📊 Advanced anomaly detection
🧾 More land-record document formats
☁️ Scalable object storage for large document archives
🔐 Production-grade authentication and role management
👥 Team
Team AbhilekhSetu
Built as a student innovation project for:
Smart India Hackathon 2026
Problem Statement: SIH26018
Intelligent Land Record Digitization and Validation System
⚠️ Prototype Disclaimer
AbhilekhSetu is a student prototype developed for Smart India Hackathon 2026. It is not an official Government of India system and does not provide live access to government land-record databases.
All demonstration records should be treated as synthetic/prototype data.
⭐ The Vision
Digitization should not stop at extracting text.
It should produce records that are structured, validated, reviewable, and traceable.
AbhilekhSetu
From Land Records → To Trusted Digital Records.
