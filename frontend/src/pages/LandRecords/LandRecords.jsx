import React from "react";
import "./LandRecords.css";

function LandRecords() {
  return (
    <div className="land-page">

      {/* Header */}
      <header className="gov-header">
        <div className="gov-container">
          <div className="gov-left">
            <div className="emblem">🇮🇳</div>

            <div>
              <div className="gov-title">
                Government of India
              </div>
              <div className="portal-title">
                RecordSetu
              </div>
            </div>
          </div>

          <div className="gov-right">
            <span>English</span>
            <span>हिन्दी</span>
            <span>मराठी</span>
            <span>বাংলা</span>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <a href="/">Home</a>
          <a href="/land-records" className="active">
            Land Records
          </a>
          <a href="#">Services</a>
          <a href="#">About</a>
          <a href="#">Contact</a>

          <button className="login-button">
            Login
          </button>
        </div>
      </nav>

      {/* Page heading */}
      <section className="page-heading">
        <div>
          <div className="breadcrumb">
            Home / Land Records
          </div>

          <h1>Land Records</h1>

          <p>
            Search and access land record information
            through the RecordSetu digital platform.
          </p>
        </div>
      </section>

      {/* Search */}
      <main className="main-content">

        <section className="search-section">

          <h2>Search Land Records</h2>

          <p>
            Enter the required details to find land
            records.
          </p>

          <div className="search-grid">

            <div className="form-group">
              <label>State</label>

              <select>
                <option>Select State</option>
                <option>Uttar Pradesh</option>
                <option>Maharashtra</option>
                <option>West Bengal</option>
                <option>Delhi</option>
              </select>
            </div>

            <div className="form-group">
              <label>District</label>

              <select>
                <option>Select District</option>
              </select>
            </div>

            <div className="form-group">
              <label>Village</label>

              <input
                type="text"
                placeholder="Enter village name"
              />
            </div>

            <div className="form-group">
              <label>Survey / Plot Number</label>

              <input
                type="text"
                placeholder="Enter survey number"
              />
            </div>

          </div>

          <button className="search-button">
            🔍 Search Land Records
          </button>

        </section>

        {/* Services */}
        <section className="services-section">

          <h2>Land Record Services</h2>

          <div className="services-grid">

            <div className="service-card">
              <div className="service-icon">📄</div>

              <h3>View Land Records</h3>

              <p>
                Search and view available land record
                information.
              </p>

              <button>View Records →</button>
            </div>

            <div className="service-card">
              <div className="service-icon">👤</div>

              <h3>Ownership Details</h3>

              <p>
                Check available ownership and
                landholder information.
              </p>

              <button>Check Ownership →</button>
            </div>

            <div className="service-card">
              <div className="service-icon">🗺️</div>

              <h3>Survey Information</h3>

              <p>
                Access survey, plot and cadastral
                information.
              </p>

              <button>View Survey →</button>
            </div>

          </div>

        </section>

      </main>

      {/* Footer */}
      <footer className="footer">

        <div className="footer-content">

          <div>
            <h3>RecordSetu</h3>

            <p>
              Digital platform for accessing and
              managing land record services.
            </p>
          </div>

          <div>
            <h4>Quick Links</h4>

            <p>Home</p>
            <p>Land Records</p>
            <p>Services</p>
            <p>Contact</p>
          </div>

          <div>
            <h4>Government Links</h4>

            <p>Digital India</p>
            <p>DILRMP</p>
            <p>India.gov.in</p>
          </div>

        </div>

        <div className="footer-bottom">
          © 2026 RecordSetu. Government Digital Land
          Records Platform.
        </div>

      </footer>

    </div>
  );
}

export default LandRecords;