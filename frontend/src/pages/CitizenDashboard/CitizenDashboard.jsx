import React from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Search,
  Map,
  ClipboardList,
  User,
  Bell,
  LogOut,
  ChevronRight,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  MapPinned,
  Menu,
  X,
} from "lucide-react";

import "./CitizenDashboard.css";

function CitizenDashboard() {
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = React.useState(false);

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="citizen-dashboard">

      {/* ================= SIDEBAR ================= */}

      <aside
        className={`citizen-sidebar ${
          mobileMenu ? "citizen-sidebar-open" : ""
        }`}
      >

        <div className="citizen-sidebar-brand">
          <div className="citizen-brand-icon">
            <MapPinned size={24} />
          </div>

          <div>
            <strong>RecordSetu</strong>
            <span>Citizen Portal</span>
          </div>
        </div>


        <div className="citizen-sidebar-section">
          <span className="citizen-sidebar-title">
            MAIN MENU
          </span>

          <button className="citizen-nav-item active">
            <LayoutDashboard size={19} />
            <span>Dashboard</span>
          </button>

          <button
            className="citizen-nav-item"
            onClick={() => navigate("/land-records")}
          >
            <FileText size={19} />
            <span>My Land Records</span>
          </button>

          <button className="citizen-nav-item">
            <Search size={19} />
            <span>Search Records</span>
          </button>

          <button className="citizen-nav-item">
            <ClipboardList size={19} />
            <span>My Applications</span>
          </button>

          <button className="citizen-nav-item">
            <Map size={19} />
            <span>Maps & Surveys</span>
          </button>
        </div>


        <div className="citizen-sidebar-section citizen-sidebar-bottom">

          <span className="citizen-sidebar-title">
            ACCOUNT
          </span>

          <button className="citizen-nav-item">
            <User size={19} />
            <span>My Profile</span>
          </button>

          <button className="citizen-nav-item">
            <Bell size={19} />
            <span>Notifications</span>
          </button>

          <button
            className="citizen-nav-item citizen-logout"
            onClick={handleLogout}
          >
            <LogOut size={19} />
            <span>Logout</span>
          </button>

        </div>

      </aside>


      {/* ================= MOBILE OVERLAY ================= */}

      {mobileMenu && (
        <div
          className="citizen-sidebar-overlay"
          onClick={() => setMobileMenu(false)}
        />
      )}


      {/* ================= MAIN AREA ================= */}

      <div className="citizen-dashboard-content">

        {/* ================= TOP BAR ================= */}

        <header className="citizen-topbar">

          <button
            className="citizen-mobile-menu"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}
          </button>


          <div className="citizen-topbar-title">
            <span>Government of India</span>
            <strong>
              Department of Land Resources
            </strong>
          </div>


          <div className="citizen-topbar-actions">

            <button className="citizen-notification">
              <Bell size={19} />
              <span />
            </button>


            <div className="citizen-profile">

              <div className="citizen-profile-avatar">
                <User size={18} />
              </div>

              <div className="citizen-profile-info">
                <strong>Citizen User</strong>
                <span>Registered Citizen</span>
              </div>

            </div>

          </div>

        </header>


        {/* ================= PAGE ================= */}

        <main className="citizen-main">

          {/* PAGE INTRO */}

          <div className="citizen-page-heading">

            <div>
              <span className="citizen-overline">
                CITIZEN SERVICES
              </span>

              <h1>
                Welcome back, Citizen
              </h1>

              <p>
                Access your land records, track applications
                and use digital land services.
              </p>
            </div>

            <div className="citizen-date">
              <span>Today</span>
              <strong>05 September 2026</strong>
            </div>

          </div>


          {/* ================= QUICK ACTIONS ================= */}

          <section className="citizen-quick-actions">

            <button
              className="citizen-primary-action"
              onClick={() => navigate("/land-records")}
            >
              <div className="action-icon">
                <Search size={21} />
              </div>

              <div>
                <strong>Search Land Records</strong>
                <span>
                  Find ownership and property details
                </span>
              </div>

              <ChevronRight size={19} />
            </button>


            <button className="citizen-secondary-action">

              <div className="action-icon">
                <ClipboardList size={21} />
              </div>

              <div>
                <strong>Track Application</strong>
                <span>
                  Check your application status
                </span>
              </div>

              <ChevronRight size={19} />

            </button>

          </section>


          {/* ================= STAT CARDS ================= */}

          <section className="citizen-stat-grid">

            <div className="citizen-stat-card">

              <div className="stat-card-top">
                <div className="stat-icon blue">
                  <FileText size={21} />
                </div>

                <ArrowUpRight size={18} />
              </div>

              <span>My Land Records</span>

              <strong>04</strong>

              <small>
                Registered properties
              </small>

            </div>


            <div className="citizen-stat-card">

              <div className="stat-card-top">
                <div className="stat-icon green">
                  <CheckCircle2 size={21} />
                </div>

                <ArrowUpRight size={18} />
              </div>

              <span>Verified Records</span>

              <strong>03</strong>

              <small>
                Digitally verified
              </small>

            </div>


            <div className="citizen-stat-card">

              <div className="stat-card-top">
                <div className="stat-icon orange">
                  <Clock3 size={21} />
                </div>

                <ArrowUpRight size={18} />
              </div>

              <span>Pending Applications</span>

              <strong>01</strong>

              <small>
                Requires attention
              </small>

            </div>

          </section>


          {/* ================= LOWER CONTENT ================= */}

          <section className="citizen-dashboard-grid">


            {/* LAND RECORDS */}

            <div className="citizen-panel">

              <div className="citizen-panel-header">

                <div>
                  <span className="citizen-panel-label">
                    PROPERTY RECORDS
                  </span>

                  <h2>
                    My Land Records
                  </h2>
                </div>

                <button
                  onClick={() => navigate("/land-records")}
                >
                  View All
                  <ChevronRight size={16} />
                </button>

              </div>


              <div className="citizen-record-list">

                <div className="citizen-record">

                  <div className="record-icon">
                    <FileText size={20} />
                  </div>

                  <div className="record-info">
                    <strong>
                      Survey No. 124/2A
                    </strong>

                    <span>
                      Meerut, Uttar Pradesh
                    </span>
                  </div>

                  <div className="record-status verified">
                    <CheckCircle2 size={14} />
                    Verified
                  </div>

                </div>


                <div className="citizen-record">

                  <div className="record-icon">
                    <FileText size={20} />
                  </div>

                  <div className="record-info">
                    <strong>
                      Survey No. 87/4B
                    </strong>

                    <span>
                      Ghaziabad, Uttar Pradesh
                    </span>
                  </div>

                  <div className="record-status verified">
                    <CheckCircle2 size={14} />
                    Verified
                  </div>

                </div>


                <div className="citizen-record">

                  <div className="record-icon">
                    <FileText size={20} />
                  </div>

                  <div className="record-info">
                    <strong>
                      Survey No. 52/1
                    </strong>

                    <span>
                      Noida, Uttar Pradesh
                    </span>
                  </div>

                  <div className="record-status pending">
                    <Clock3 size={14} />
                    Pending
                  </div>

                </div>

              </div>

            </div>


            {/* APPLICATIONS */}

            <div className="citizen-panel">

              <div className="citizen-panel-header">

                <div>
                  <span className="citizen-panel-label">
                    RECENT ACTIVITY
                  </span>

                  <h2>
                    Applications
                  </h2>
                </div>

                <button>
                  View All
                  <ChevronRight size={16} />
                </button>

              </div>


              <div className="citizen-application">

                <div className="application-number">
                  RS-2026-00124
                </div>

                <strong>
                  Certified Land Record
                </strong>

                <span>
                  Submitted on 02 September 2026
                </span>

                <div className="application-progress">

                  <div className="progress-line">
                    <span />
                  </div>

                  <small>
                    Application under verification
                  </small>

                </div>

              </div>


              <div className="citizen-application">

                <div className="application-number">
                  RS-2026-00091
                </div>

                <strong>
                  Property Mutation
                </strong>

                <span>
                  Submitted on 18 August 2026
                </span>

                <div className="application-complete">
                  <CheckCircle2 size={15} />
                  Completed
                </div>

              </div>

            </div>

          </section>


          {/* ================= SERVICES ================= */}

          <section className="citizen-services">

            <div className="citizen-section-heading">

              <div>
                <span className="citizen-panel-label">
                  DIGITAL SERVICES
                </span>

                <h2>
                  Land Services
                </h2>
              </div>

              <p>
                Quick access to important land record services.
              </p>

            </div>


            <div className="citizen-service-grid">

              <button
                onClick={() => navigate("/land-records")}
              >
                <Search size={22} />
                <strong>Search Records</strong>
                <span>Search property information</span>
              </button>


              <button>
                <FileText size={22} />
                <strong>Certified Copy</strong>
                <span>Request certified documents</span>
              </button>


              <button>
                <Map size={22} />
                <strong>View Land Maps</strong>
                <span>Explore digitized cadastral maps</span>
              </button>


              <button>
                <ClipboardList size={22} />
                <strong>Mutation Status</strong>
                <span>Track property mutation</span>
              </button>

            </div>

          </section>

        </main>


        {/* ================= FOOTER ================= */}

        <footer className="citizen-footer">

          <span>
            © 2026 RecordSetu
          </span>

          <span>
            Department of Land Resources
          </span>

          <span>
            Government of India
          </span>

          <span>
            Digital India Initiative
          </span>

        </footer>

      </div>

    </div>
  );
}

export default CitizenDashboard;