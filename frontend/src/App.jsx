import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import "./App.css";

/* =========================================================
   COMMON HEADER
========================================================= */

function Header() {
  const navigate = useNavigate();

  return (
    <header className="top-header">
      <div className="header-left">
        <div className="emblem">🏛️</div>

        <div>
          <div className="gov-title">Government of India</div>
          <div className="department-title">
            Department of Land Resources
          </div>
        </div>
      </div>

      <div className="header-right">
        <select className="language-select">
          <option>English</option>
          <option>हिन्दी</option>
          <option>मराठी</option>
          <option>বাংলা</option>
        </select>

        <button
          className="header-login"
          onClick={() => navigate("/citizen-login")}
        >
          Login
        </button>
      </div>
    </header>
  );
}

/* =========================================================
   HOME PAGE
========================================================= */

function Home() {
  const navigate = useNavigate();

  return (
    <div className="app-page">
      <Header />

      <nav className="navbar">
        <div className="nav-logo">RecordSetu</div>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <a href="#services">Services</a>
          <a href="#about">About Us</a>

          <button onClick={() => navigate("/citizen-login")}>
            Citizen Login
          </button>

          <button onClick={() => navigate("/official-login")}>
            Official Login
          </button>
        </div>
      </nav>

      {/* HERO */}

      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            DIGITAL INDIA • LAND RECORDS
          </div>

          <h1>
            Your Land Records,
            <br />
            <span>Accessible, Transparent & Secure</span>
          </h1>

          <p>
            RecordSetu provides a unified digital platform for accessing
            land records, ownership details, survey information and
            government land services.
          </p>

          <div className="hero-buttons">
            <button
              className="primary-btn"
              onClick={() => navigate("/citizen-login")}
            >
              🔍 Search Land Records
            </button>

            <button
              className="secondary-btn"
              onClick={() => navigate("/citizen-login")}
            >
              View Services
            </button>
          </div>
        </div>

        <div className="hero-card">
          <div className="hero-card-title">
            DILRMP Progress
          </div>

          <div className="hero-stat">
            <strong>92%</strong>
            <span>Digitization Progress</span>
          </div>

          <div className="progress-bar">
            <div style={{ width: "92%" }}></div>
          </div>

          <div className="mini-stats">
            <div>
              <strong>29</strong>
              <span>States</span>
            </div>

            <div>
              <strong>6</strong>
              <span>UTs</span>
            </div>

            <div>
              <strong>5.4Cr+</strong>
              <span>Records</span>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}

      <section className="stats-section">
        <div className="stat-box">
          <span>📄</span>
          <div>
            <strong>5.4 Cr+</strong>
            <p>Digital Land Records</p>
          </div>
        </div>

        <div className="stat-box">
          <span>🗺️</span>
          <div>
            <strong>3.2 Cr+</strong>
            <p>Digitized Maps</p>
          </div>
        </div>

        <div className="stat-box">
          <span>🏢</span>
          <div>
            <strong>700+</strong>
            <p>Districts Covered</p>
          </div>
        </div>

        <div className="stat-box">
          <span>👥</span>
          <div>
            <strong>10 Cr+</strong>
            <p>Citizens Served</p>
          </div>
        </div>
      </section>

      {/* SERVICES */}

      <section className="services-section" id="services">
        <div className="section-heading">
          <div>OUR SERVICES</div>
          <h2>Land Record Services</h2>
          <p>
            Access important land-related services through one
            integrated platform.
          </p>
        </div>

        <div className="service-grid">
          <ServiceCard
            icon="🔎"
            title="Search Land Records"
            text="Search ownership and land record information."
          />

          <ServiceCard
            icon="📜"
            title="View RoR"
            text="Access digitally available Records of Rights."
          />

          <ServiceCard
            icon="🗺️"
            title="Cadastral Maps"
            text="View available digitized cadastral maps."
          />

          <ServiceCard
            icon="📍"
            title="Property Details"
            text="Check available property and survey details."
          />

          <ServiceCard
            icon="📋"
            title="Application Status"
            text="Track your submitted land-related applications."
          />

          <ServiceCard
            icon="🏛️"
            title="Government Services"
            text="Explore state and central land services."
          />
        </div>
      </section>

      {/* ABOUT */}

      <section className="about-section" id="about">
        <div>
          <div className="section-label">ABOUT RECORDSETU</div>

          <h2>
            One Platform for
            <br />
            Digital Land Records
          </h2>
        </div>

        <div className="about-text">
          <p>
            RecordSetu is designed as a citizen-centric digital
            platform for making land record services easier to
            discover and access.
          </p>

          <p>
            Citizens can search records and track applications,
            while authorized government officials can manage
            records and monitor service activity.
          </p>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="footer">
        <div>
          <strong>RecordSetu</strong>
          <p>Digital Land Records Platform</p>
        </div>

        <div>
          <p>Government of India</p>
          <p>Department of Land Resources</p>
        </div>

        <div>
          <p>Accessibility</p>
          <p>Privacy Policy</p>
        </div>
      </footer>
    </div>
  );
}

function ServiceCard({ icon, title, text }) {
  return (
    <div className="service-card">
      <div className="service-icon">{icon}</div>

      <h3>{title}</h3>

      <p>{text}</p>

      <button>Explore →</button>
    </div>
  );
}

/* =========================================================
   CITIZEN LOGIN
========================================================= */

function CitizenLogin() {
  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    if (!mobile || !password) {
      alert("Please enter mobile number and password.");
      return;
    }

    alert("Citizen login successful.");
    navigate("/");
  }

  return (
    <div className="login-page">
      <div className="login-header">
        <div className="emblem">🏛️</div>
        <div>
          <strong>Government of India</strong>
          <span>RecordSetu</span>
        </div>
      </div>

      <div className="login-wrapper">
        <div className="login-info">
          <div className="hero-badge">CITIZEN SERVICES</div>

          <h1>
            Access Your
            <br />
            <span>Land Records</span>
          </h1>

          <p>
            Securely access your land records and government
            services through RecordSetu.
          </p>

          <div className="login-features">
            <div>✓ Search land records</div>
            <div>✓ View ownership details</div>
            <div>✓ Track applications</div>
            <div>✓ Access digital services</div>
          </div>
        </div>

        <form className="login-card" onSubmit={handleLogin}>
          <div className="login-card-heading">
            <h2>Citizen Login</h2>
            <p>Sign in to continue</p>
          </div>

          <label>Mobile Number</label>

          <input
            type="text"
            placeholder="Enter mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            maxLength={10}
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="login-options">
            <label className="remember">
              <input type="checkbox" />
              Remember me
            </label>

            <a href="#forgot">Forgot Password?</a>
          </div>

          <button className="login-submit">
            Login
          </button>

          <div className="login-divider">
            <span>OR</span>
          </div>

          <button
            type="button"
            className="outline-login"
            onClick={() => navigate("/")}
          >
            Continue as Guest
          </button>

          <p className="login-bottom">
            New user? <a href="#register">Create Account</a>
          </p>
        </form>
      </div>
    </div>
  );
}

/* =========================================================
   OFFICIAL LOGIN
========================================================= */

function OfficialLogin() {
  const navigate = useNavigate();

  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    if (!employeeId || !password) {
      alert("Please enter Employee ID and Password.");
      return;
    }

    navigate("/official-dashboard");
  }

  return (
    <div className="official-login-page">
      <div className="official-login-box">
        <div className="official-logo">
          🏛️
        </div>

        <div className="official-heading">
          <div>GOVERNMENT OF INDIA</div>
          <h1>RecordSetu</h1>
          <p>Official Administration Portal</p>
        </div>

        <div className="official-divider"></div>

        <form onSubmit={handleLogin}>
          <label>Employee ID</label>

          <input
            type="text"
            placeholder="Enter employee ID"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="official-options">
            <label>
              <input type="checkbox" />
              Remember me
            </label>

            <a href="#forgot">Forgot Password?</a>
          </div>

          <button className="official-login-btn">
            Secure Login
          </button>
        </form>

        <button
          className="back-home"
          onClick={() => navigate("/")}
        >
          ← Back to Citizen Portal
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   OFFICIAL DASHBOARD
========================================================= */

function OfficialDashboard() {
  const navigate = useNavigate();

  const [active, setActive] = useState("Dashboard");

  const menu = [
    ["Dashboard", "▦"],
    ["Land Records", "▤"],
    ["Applications", "☑"],
    ["Citizen Requests", "♙"],
    ["Maps", "⌖"],
    ["Reports", "▥"],
    ["Users", "♧"],
    ["Settings", "⚙"],
  ];

  return (
    <div className="dashboard">
      {/* SIDEBAR */}

      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-emblem">🏛️</div>

          <div>
            <strong>RecordSetu</strong>
            <span>Official Portal</span>
          </div>
        </div>

        <div className="sidebar-menu">
          {menu.map(([name, icon]) => (
            <button
              key={name}
              className={active === name ? "active-menu" : ""}
              onClick={() => setActive(name)}
            >
              <span>{icon}</span>
              {name}
            </button>
          ))}
        </div>

        <button
          className="logout-btn"
          onClick={() => navigate("/official-login")}
        >
          ↪ Logout
        </button>
      </aside>

      {/* MAIN */}

      <main className="dashboard-main">
        <div className="dashboard-topbar">
          <div>
            <h1>{active}</h1>
            <p>
              Government of India • Department of Land Resources
            </p>
          </div>

          <div className="official-profile">
            <div className="notification">🔔</div>

            <div className="profile-avatar">A</div>

            <div>
              <strong>Admin Officer</strong>
              <span>District Administration</span>
            </div>
          </div>
        </div>

        {active === "Dashboard" ? (
          <DashboardContent />
        ) : (
          <DashboardPlaceholder title={active} />
        )}
      </main>
    </div>
  );
}

/* =========================================================
   DASHBOARD CONTENT
========================================================= */

function DashboardContent() {
  return (
    <>
      <div className="dashboard-welcome">
        <div>
          <span>OVERVIEW</span>
          <h2>Welcome back, Officer</h2>
          <p>
            Here's what's happening across your land records
            administration today.
          </p>
        </div>

        <button>+ New Application</button>
      </div>

      <div className="dashboard-cards">
        <DashboardCard
          title="Total Records"
          value="12,48,392"
          change="+8.2%"
          icon="📄"
        />

        <DashboardCard
          title="Pending Applications"
          value="1,284"
          change="+4.1%"
          icon="⏳"
        />

        <DashboardCard
          title="Approved Today"
          value="438"
          change="+12.5%"
          icon="✓"
        />

        <DashboardCard
          title="Citizen Requests"
          value="286"
          change="-2.4%"
          icon="♙"
        />
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-panel">
          <div className="panel-heading">
            <div>
              <h3>Application Overview</h3>
              <p>Current application processing status</p>
            </div>

            <button>View All</button>
          </div>

          <div className="application-chart">
            <div className="chart-bar">
              <span style={{ height: "82%" }}></span>
              <small>Jan</small>
            </div>

            <div className="chart-bar">
              <span style={{ height: "65%" }}></span>
              <small>Feb</small>
            </div>

            <div className="chart-bar">
              <span style={{ height: "91%" }}></span>
              <small>Mar</small>
            </div>

            <div className="chart-bar">
              <span style={{ height: "74%" }}></span>
              <small>Apr</small>
            </div>

            <div className="chart-bar">
              <span style={{ height: "88%" }}></span>
              <small>May</small>
            </div>

            <div className="chart-bar">
              <span style={{ height: "96%" }}></span>
              <small>Jun</small>
            </div>
          </div>
        </div>

        <div className="dashboard-panel">
          <div className="panel-heading">
            <div>
              <h3>Recent Applications</h3>
              <p>Latest citizen requests</p>
            </div>
          </div>

          <Application
            id="RS-2026-00182"
            name="Rajesh Kumar"
            type="Land Record"
            status="Approved"
          />

          <Application
            id="RS-2026-00181"
            name="Priya Sharma"
            type="Mutation"
            status="Pending"
          />

          <Application
            id="RS-2026-00180"
            name="Amit Verma"
            type="RoR Request"
            status="Under Review"
          />

          <Application
            id="RS-2026-00179"
            name="Neha Singh"
            type="Map Request"
            status="Approved"
          />
        </div>
      </div>

      <div className="quick-actions">
        <h3>Quick Actions</h3>

        <div className="quick-grid">
          <QuickAction icon="🔎" title="Search Records" />
          <QuickAction icon="📄" title="Verify Document" />
          <QuickAction icon="🗺️" title="View Maps" />
          <QuickAction icon="📊" title="Generate Report" />
        </div>
      </div>
    </>
  );
}

function DashboardCard({ title, value, change, icon }) {
  return (
    <div className="dashboard-stat-card">
      <div className="stat-card-top">
        <div className="stat-card-icon">{icon}</div>
        <span>{change}</span>
      </div>

      <p>{title}</p>
      <h2>{value}</h2>
    </div>
  );
}

function Application({ id, name, type, status }) {
  return (
    <div className="application-row">
      <div className="application-icon">📄</div>

      <div className="application-info">
        <strong>{id}</strong>
        <span>
          {name} • {type}
        </span>
      </div>

      <span
        className={
          status === "Approved"
            ? "status approved"
            : status === "Pending"
            ? "status pending"
            : "status review"
        }
      >
        {status}
      </span>
    </div>
  );
}

function QuickAction({ icon, title }) {
  return (
    <button className="quick-action">
      <span>{icon}</span>
      <strong>{title}</strong>
      <small>→</small>
    </button>
  );
}

function DashboardPlaceholder({ title }) {
  return (
    <div className="dashboard-placeholder">
      <div>🏛️</div>
      <h2>{title}</h2>
      <p>
        This module is ready for integration with the RecordSetu
        backend.
      </p>
    </div>
  );
}

/* =========================================================
   ADMIN LOGIN
========================================================= */

function AdminLogin() {
  const navigate = useNavigate();

  return (
    <div className="admin-login-page">
      <div className="admin-card">
        <div className="admin-icon">🔐</div>

        <h1>Administrator Login</h1>

        <p>
          Authorized access to RecordSetu administration.
        </p>

        <input placeholder="Administrator ID" />

        <input type="password" placeholder="Password" />

        <button
          onClick={() => navigate("/official-dashboard")}
        >
          Login
        </button>

        <button
          className="admin-back"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   APP ROUTER
========================================================= */

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/citizen-login"
          element={<CitizenLogin />}
        />

        <Route
          path="/official-login"
          element={<OfficialLogin />}
        />

        <Route
          path="/official-dashboard"
          element={<OfficialDashboard />}
        />

        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />

        {/* fallback */}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;