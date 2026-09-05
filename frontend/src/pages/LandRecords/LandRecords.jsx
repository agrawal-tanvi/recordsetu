import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  MapPin,
  FileText,
  ShieldCheck,
  ChevronRight,
  Building2,
} from "lucide-react";
import "./LandRecords.css";

function LandRecords() {
  const [searchType, setSearchType] = useState("location");

  return (
    <div className="land-records-page">

      {/* ================= TOP BAR ================= */}
      <div className="lr-topbar">
        <div>
          Government of India
          <span>|</span>
          Digital India
        </div>

        <div className="lr-top-links">
          <button>Accessibility</button>
          <button>Help</button>
          <button>English</button>
          <button>हिन्दी</button>
          <button>मराठी</button>
          <button>বাংলা</button>
        </div>
      </div>

      {/* ================= HEADER ================= */}
      <header className="lr-header">
        <Link to="/" className="lr-back">
          <ArrowLeft size={19} />
          Back to Home
        </Link>

        <div className="lr-brand">
          <div className="lr-brand-icon">
            <Building2 size={28} />
          </div>

          <div>
            <span>Government of India</span>
            <strong>RecordSetu</strong>
            <small>Digital Land Records Portal</small>
          </div>
        </div>
      </header>

      {/* ================= PAGE HERO ================= */}
      <section className="lr-hero">
        <div className="lr-hero-inner">

          <div>
            <div className="lr-label">
              DIGITAL LAND RECORDS
            </div>

            <h1>
              Search & Access
              <span> Land Records</span>
            </h1>

            <p>
              Find land ownership details, survey information,
              property records and other government land services
              through the RecordSetu digital portal.
            </p>
          </div>

          <div className="lr-security">
            <ShieldCheck size={25} />
            <div>
              <strong>Secure Government Service</strong>
              <span>Your information is protected.</span>
            </div>
          </div>

        </div>
      </section>

      {/* ================= SEARCH SECTION ================= */}
      <section className="lr-search-section">

        <div className="lr-search-card">

          <div className="lr-search-heading">
            <div className="lr-search-icon">
              <Search size={25} />
            </div>

            <div>
              <h2>Find a Land Record</h2>
              <p>
                Search using location or property information.
              </p>
            </div>
          </div>

          {/* SEARCH TYPE */}
          <div className="lr-tabs">

            <button
              className={
                searchType === "location"
                  ? "lr-tab active"
                  : "lr-tab"
              }
              onClick={() => setSearchType("location")}
            >
              <MapPin size={18} />
              Search by Location
            </button>

            <button
              className={
                searchType === "record"
                  ? "lr-tab active"
                  : "lr-tab"
              }
              onClick={() => setSearchType("record")}
            >
              <FileText size={18} />
              Search by Record
            </button>

          </div>

          {/* FORM */}
          {searchType === "location" ? (
            <div className="lr-form">

              <div className="lr-field">
                <label>State</label>
                <select>
                  <option>Select State</option>
                  <option>Uttar Pradesh</option>
                  <option>Maharashtra</option>
                  <option>Delhi</option>
                  <option>Bihar</option>
                  <option>West Bengal</option>
                  <option>Rajasthan</option>
                </select>
              </div>

              <div className="lr-field">
                <label>District</label>
                <select>
                  <option>Select District</option>
                  <option>Lucknow</option>
                  <option>Kanpur</option>
                  <option>Varanasi</option>
                  <option>Agra</option>
                </select>
              </div>

              <div className="lr-field">
                <label>Tehsil</label>
                <select>
                  <option>Select Tehsil</option>
                  <option>Central</option>
                  <option>East</option>
                  <option>West</option>
                </select>
              </div>

              <div className="lr-field">
                <label>Village</label>
                <select>
                  <option>Select Village</option>
                  <option>Select from list</option>
                </select>
              </div>

            </div>
          ) : (
            <div className="lr-form">

              <div className="lr-field lr-field-wide">
                <label>Record Number</label>

                <input
                  type="text"
                  placeholder="Enter land record number"
                />
              </div>

              <div className="lr-field">
                <label>State</label>

                <select>
                  <option>Select State</option>
                  <option>Uttar Pradesh</option>
                  <option>Maharashtra</option>
                  <option>Delhi</option>
                </select>
              </div>

            </div>
          )}

          <div className="lr-search-actions">

            <button className="lr-primary-button">
              <Search size={19} />
              Search Records
              <ChevronRight size={18} />
            </button>

            <button className="lr-secondary-button">
              Clear
            </button>

          </div>

        </div>
      </section>

      {/* ================= INFORMATION ================= */}
      <section className="lr-info-section">

        <div className="lr-info-grid">

          <div className="lr-info-card">
            <div className="lr-info-icon">
              <FileText size={24} />
            </div>

            <h3>Digital Records</h3>

            <p>
              Access digitized land records and ownership
              information through a single platform.
            </p>
          </div>

          <div className="lr-info-card">
            <div className="lr-info-icon">
              <MapPin size={24} />
            </div>

            <h3>Location Based Search</h3>

            <p>
              Search records by state, district, tehsil
              and village.
            </p>
          </div>

          <div className="lr-info-card">
            <div className="lr-info-icon">
              <ShieldCheck size={24} />
            </div>

            <h3>Secure Access</h3>

            <p>
              Government-managed services with secure
              access to land record information.
            </p>
          </div>

        </div>

      </section>

      {/* ================= FOOTER ================= */}
      <footer className="lr-footer">

        <div>
          <strong>RecordSetu</strong>
          <p>
            Digital Land Records Portal
          </p>
        </div>

        <div>
          © 2026 Government of India
        </div>

      </footer>

    </div>
  );
}

export default LandRecords;