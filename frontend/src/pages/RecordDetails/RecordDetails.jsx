import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Download,
  Printer,
  MapPin,
  User,
  FileText,
  Ruler,
  CalendarDays,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Hash,
} from "lucide-react";

import "./RecordDetails.css";

function RecordDetails() {
  const navigate = useNavigate();

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert("Digital land record download will be available when the backend is connected.");
  };

  return (
    <div className="record-details-page">

      {/* ================= HEADER ================= */}

      <header className="record-details-header">

        <div className="record-header-left">

          <button
            className="record-back-button"
            onClick={() => navigate("/land-records")}
          >
            <ArrowLeft size={18} />
            Back to Search
          </button>

          <div className="record-brand-divider"></div>

          <div className="record-brand">
            <div className="record-brand-icon">
              <Building2 size={22} />
            </div>

            <div>
              <strong>RecordSetu</strong>
              <span>Digital Land Records</span>
            </div>
          </div>

        </div>


        <div className="record-government">

          <span>Government of India</span>

          <strong>
            Department of Land Resources
          </strong>

        </div>

      </header>


      {/* ================= MAIN ================= */}

      <main className="record-details-main">

        {/* Page Heading */}

        <div className="record-page-heading">

          <div>

            <span className="record-eyebrow">
              LAND RECORD DETAILS
            </span>

            <h1>Digital Land Record</h1>

            <p>
              Official information available through RecordSetu
            </p>

          </div>


          <div className="record-actions">

            <button
              className="record-secondary-button"
              onClick={handlePrint}
            >
              <Printer size={17} />
              Print
            </button>

            <button
              className="record-primary-button"
              onClick={handleDownload}
            >
              <Download size={17} />
              Download Record
            </button>

          </div>

        </div>


        {/* ================= STATUS CARD ================= */}

        <section className="record-status-card">

          <div className="record-status-left">

            <div className="record-status-icon">
              <CheckCircle2 size={25} />
            </div>

            <div>
              <span>RECORD STATUS</span>

              <strong>Verified & Digitized</strong>

              <p>
                This land record has been digitally verified.
              </p>
            </div>

          </div>


          <div className="record-status-id">

            <span>RECORD ID</span>

            <strong>RS-UP-LR-2026-001842</strong>

          </div>

        </section>


        {/* ================= RECORD INFORMATION ================= */}

        <section className="record-section">

          <div className="record-section-heading">

            <div className="record-section-icon">
              <FileText size={19} />
            </div>

            <div>
              <span>RECORD INFORMATION</span>
              <h2>Property Record</h2>
            </div>

          </div>


          <div className="record-info-grid">

            <div className="record-info-item">
              <span>Record Type</span>
              <strong>Record of Rights</strong>
            </div>

            <div className="record-info-item">
              <span>Khasra / Survey Number</span>
              <strong>125/2</strong>
            </div>

            <div className="record-info-item">
              <span>Khata Number</span>
              <strong>KH-04821</strong>
            </div>

            <div className="record-info-item">
              <span>Record Year</span>
              <strong>2025–26</strong>
            </div>

          </div>

        </section>


        {/* ================= TWO COLUMN ================= */}

        <div className="record-two-column">


          {/* OWNER DETAILS */}

          <section className="record-section">

            <div className="record-section-heading">

              <div className="record-section-icon">
                <User size={19} />
              </div>

              <div>
                <span>OWNERSHIP</span>
                <h2>Owner Details</h2>
              </div>

            </div>


            <div className="owner-card">

              <div className="owner-avatar">
                <User size={24} />
              </div>

              <div className="owner-details">

                <span>REGISTERED OWNER</span>

                <h3>Rajesh Kumar</h3>

                <p>
                  Son of Mahesh Kumar
                </p>

              </div>

            </div>


            <div className="record-info-list">

              <div>
                <span>Ownership Type</span>
                <strong>Individual</strong>
              </div>

              <div>
                <span>Ownership Status</span>
                <strong>Active</strong>
              </div>

            </div>

          </section>


          {/* LAND DETAILS */}

          <section className="record-section">

            <div className="record-section-heading">

              <div className="record-section-icon">
                <Ruler size={19} />
              </div>

              <div>
                <span>PROPERTY</span>
                <h2>Land Details</h2>
              </div>

            </div>


            <div className="record-info-list">

              <div>
                <span>Total Area</span>
                <strong>2.4500 Hectare</strong>
              </div>

              <div>
                <span>Area in Local Unit</span>
                <strong>6.05 Bigha</strong>
              </div>

              <div>
                <span>Land Type</span>
                <strong>Agricultural</strong>
              </div>

              <div>
                <span>Land Classification</span>
                <strong>Irrigated Land</strong>
              </div>

            </div>

          </section>

        </div>


        {/* ================= LOCATION ================= */}

        <section className="record-section">

          <div className="record-section-heading">

            <div className="record-section-icon">
              <MapPin size={19} />
            </div>

            <div>
              <span>PROPERTY LOCATION</span>
              <h2>Location Details</h2>
            </div>

          </div>


          <div className="location-grid">

            <div className="location-item">
              <span>State</span>
              <strong>Uttar Pradesh</strong>
            </div>

            <div className="location-item">
              <span>District</span>
              <strong>Lucknow</strong>
            </div>

            <div className="location-item">
              <span>Tehsil</span>
              <strong>Mohanlalganj</strong>
            </div>

            <div className="location-item">
              <span>Village</span>
              <strong>Gosainganj</strong>
            </div>

          </div>


          {/* Map Placeholder */}

          <div className="record-map">

            <div className="map-grid"></div>

            <div className="map-center">

              <div className="map-pin">
                <MapPin size={25} />
              </div>

              <strong>Property Location</strong>

              <span>
                Khasra No. 125/2
              </span>

            </div>

          </div>

        </section>


        {/* ================= REGISTRATION ================= */}

        <section className="record-section">

          <div className="record-section-heading">

            <div className="record-section-icon">
              <Hash size={19} />
            </div>

            <div>
              <span>REGISTRATION</span>
              <h2>Record History</h2>
            </div>

          </div>


          <div className="record-history">

            <div className="history-row">

              <div className="history-icon">
                <CalendarDays size={18} />
              </div>

              <div>
                <span>Last Updated</span>
                <strong>12 August 2026</strong>
              </div>

            </div>


            <div className="history-row">

              <div className="history-icon">
                <ShieldCheck size={18} />
              </div>

              <div>
                <span>Verification Status</span>
                <strong>Digitally Verified</strong>
              </div>

            </div>


            <div className="history-row">

              <div className="history-icon">
                <FileText size={18} />
              </div>

              <div>
                <span>Source Department</span>
                <strong>Revenue Department</strong>
              </div>

            </div>

          </div>

        </section>


        {/* ================= DISCLAIMER ================= */}

        <div className="record-disclaimer">

          <ShieldCheck size={18} />

          <p>
            This digital record is provided through RecordSetu for
            informational and official service purposes. The record
            displayed above is subject to verification by the
            concerned revenue authority.
          </p>

        </div>


        {/* ================= FOOTER ================= */}

        <footer className="record-footer">

          <span>
            © 2026 Government of India
          </span>

          <span>
            Department of Land Resources
          </span>

          <span>
            RecordSetu Digital Land Records
          </span>

        </footer>

      </main>

    </div>
  );
}

export default RecordDetails;