import "./Home.css";
import Header from "../../components/Header/Header";

function Home() {
  return (
    <div className="home-page">

      {/* Real RecordSetu Header */}
      <Header />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-content">

          <div className="hero-text">

            <span className="hero-badge">
              DIGITAL INDIA LAND RECORDS
            </span>

            <h2>
              Your Land Records,
              <br />
              <span>Accessible & Transparent</span>
            </h2>

            <p>
              Access land records, ownership details, survey information,
              and digital property services through RecordSetu.
            </p>

            <div className="hero-actions">

              <a
                href="/land-records"
                className="primary-button"
              >
                Search Land Records
              </a>

              <button className="secondary-button">
                View Services
              </button>

            </div>

          </div>


          {/* Search Card */}
          <div className="hero-search-card">

            <h3>Search Land Records</h3>

            <p>
              Find land records using your location and property details.
            </p>

            <div className="search-field">
              <label>State</label>

              <select>
                <option>Select State</option>
                <option>Uttar Pradesh</option>
                <option>Maharashtra</option>
                <option>West Bengal</option>
                <option>Bihar</option>
                <option>Madhya Pradesh</option>
              </select>
            </div>

            <div className="search-field">
              <label>District</label>

              <select>
                <option>Select District</option>
              </select>
            </div>

            <div className="search-field">
              <label>Village / Survey Number</label>

              <input
                type="text"
                placeholder="Enter village or survey number"
              />
            </div>

            <button className="search-button">
              Search Records
            </button>

          </div>

        </div>
      </section>


      {/* Statistics Section */}
      <section className="stats-section">

        <div className="container">

          <div className="section-heading">

            <span>DILRMP PROGRESS</span>

            <h2>
              Digital Land Records Across India
            </h2>

            <p>
              RecordSetu brings important land-record services together
              through a simple and transparent digital platform.
            </p>

          </div>


          <div className="stats-grid">

            <div className="stat-card">
              <div className="stat-icon">🏛️</div>
              <h3>36</h3>
              <p>States & UTs</p>
            </div>

            <div className="stat-card">
              <div className="stat-icon">📍</div>
              <h3>700+</h3>
              <p>Districts Covered</p>
            </div>

            <div className="stat-card">
              <div className="stat-icon">🗺️</div>
              <h3>6 Lakh+</h3>
              <p>Villages Digitized</p>
            </div>

            <div className="stat-card">
              <div className="stat-icon">📄</div>
              <h3>100 Cr+</h3>
              <p>Land Records</p>
            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;