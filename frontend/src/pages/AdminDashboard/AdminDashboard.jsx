import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Users,
  ClipboardCheck,
  Map,
  BarChart3,
  Settings,
  Bell,
  LogOut,
  UserCog,
  Menu,
  X,
  ChevronRight,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  AlertCircle,
  Search,
  MapPinned,
  ShieldCheck,
} from "lucide-react";

import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState(false);

  const logout = () => {
    navigate("/");
  };

  return (
    <div className="admin-dashboard">

      {/* ================= SIDEBAR ================= */}

      <aside
        className={`admin-sidebar ${
          mobileMenu ? "admin-sidebar-open" : ""
        }`}
      >

        <div className="admin-sidebar-brand">

          <div className="admin-sidebar-logo">
            <ShieldCheck size={23} />
          </div>

          <div>
            <strong>RecordSetu</strong>
            <span>Administration</span>
          </div>

        </div>


        <div className="admin-menu">

          <span className="admin-menu-title">
            ADMINISTRATION
          </span>

          <button className="admin-nav active">
            <LayoutDashboard size={18} />
            Dashboard
          </button>

          <button className="admin-nav">
            <FileText size={18} />
            Land Records
          </button>

          <button className="admin-nav">
            <Users size={18} />
            Citizens
          </button>

          <button className="admin-nav">
            <ClipboardCheck size={18} />
            Applications
          </button>

          <button className="admin-nav">
            <Map size={18} />
            Maps & Surveys
          </button>

          <button className="admin-nav">
            <BarChart3 size={18} />
            Reports
          </button>

        </div>


        <div className="admin-menu admin-menu-bottom">

          <span className="admin-menu-title">
            SYSTEM
          </span>

          <button className="admin-nav">
            <Bell size={18} />
            Notifications
          </button>

          <button className="admin-nav">
            <Settings size={18} />
            Settings
          </button>

          <button
            className="admin-nav admin-logout"
            onClick={logout}
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

      </aside>


      {/* ================= OVERLAY ================= */}

      {mobileMenu && (
        <div
          className="admin-sidebar-overlay"
          onClick={() => setMobileMenu(false)}
        />
      )}


      {/* ================= MAIN ================= */}

      <div className="admin-dashboard-content">

        {/* ================= TOPBAR ================= */}

        <header className="admin-topbar">

          <button
            className="admin-mobile-menu"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}
          </button>


          <div className="admin-government">

            <span>
              Government of India
            </span>

            <strong>
              Department of Land Resources
            </strong>

          </div>


          <div className="admin-top-actions">

            <button className="admin-notification">
              <Bell size={19} />
              <span />
            </button>


            <div className="admin-profile">

              <div className="admin-profile-avatar">
                <UserCog size={18} />
              </div>

              <div>
                <strong>Administrator</strong>
                <span>System Administrator</span>
              </div>

            </div>

          </div>

        </header>


        {/* ================= MAIN CONTENT ================= */}

        <main className="admin-main">

          {/* HEADER */}

          <div className="admin-page-heading">

            <div>

              <span>
                ADMINISTRATION
              </span>

              <h1>
                Dashboard Overview
              </h1>

              <p>
                Monitor land records, citizen services and
                departmental activities.
              </p>

            </div>


            <div className="admin-date">

              <span>Last updated</span>

              <strong>
                05 September 2026
              </strong>

            </div>

          </div>


          {/* ================= STATISTICS ================= */}

          <section className="admin-stat-grid">

            <div className="admin-stat-card">

              <div className="admin-stat-top">

                <div className="admin-stat-icon blue">
                  <FileText size={21} />
                </div>

                <ArrowUpRight size={17} />

              </div>

              <span>
                Total Land Records
              </span>

              <strong>
                24,86,412
              </strong>

              <small>
                +4.8% from last month
              </small>

            </div>


            <div className="admin-stat-card">

              <div className="admin-stat-top">

                <div className="admin-stat-icon green">
                  <CheckCircle2 size={21} />
                </div>

                <ArrowUpRight size={17} />

              </div>

              <span>
                Verified Records
              </span>

              <strong>
                21,92,084
              </strong>

              <small>
                88.2% verification rate
              </small>

            </div>


            <div className="admin-stat-card">

              <div className="admin-stat-top">

                <div className="admin-stat-icon orange">
                  <Clock3 size={21} />
                </div>

                <ArrowUpRight size={17} />

              </div>

              <span>
                Pending Applications
              </span>

              <strong>
                8,426
              </strong>

              <small>
                Requires verification
              </small>

            </div>


            <div className="admin-stat-card">

              <div className="admin-stat-top">

                <div className="admin-stat-icon red">
                  <AlertCircle size={21} />
                </div>

                <ArrowUpRight size={17} />

              </div>

              <span>
                Pending Mutations
              </span>

              <strong>
                2,184
              </strong>

              <small>
                Awaiting approval
              </small>

            </div>

          </section>


          {/* ================= CONTENT GRID ================= */}

          <section className="admin-dashboard-grid">


            {/* APPLICATIONS */}

            <div className="admin-panel">

              <div className="admin-panel-header">

                <div>

                  <span>
                    RECENT ACTIVITY
                  </span>

                  <h2>
                    Recent Applications
                  </h2>

                </div>

                <button>
                  View All
                  <ChevronRight size={15} />
                </button>

              </div>


              <div className="admin-application-list">

                <div className="admin-application">

                  <div className="admin-application-icon">
                    <FileText size={18} />
                  </div>

                  <div className="admin-application-info">

                    <strong>
                      Certified Land Record
                    </strong>

                    <span>
                      RS-2026-004821 • Meerut
                    </span>

                  </div>

                  <div className="admin-status pending">
                    <Clock3 size={13} />
                    Pending
                  </div>

                </div>


                <div className="admin-application">

                  <div className="admin-application-icon">
                    <FileText size={18} />
                  </div>

                  <div className="admin-application-info">

                    <strong>
                      Property Mutation
                    </strong>

                    <span>
                      RS-2026-004817 • Ghaziabad
                    </span>

                  </div>

                  <div className="admin-status verified">
                    <CheckCircle2 size={13} />
                    Verified
                  </div>

                </div>


                <div className="admin-application">

                  <div className="admin-application-icon">
                    <FileText size={18} />
                  </div>

                  <div className="admin-application-info">

                    <strong>
                      Ownership Certificate
                    </strong>

                    <span>
                      RS-2026-004801 • Noida
                    </span>

                  </div>

                  <div className="admin-status pending">
                    <Clock3 size={13} />
                    Pending
                  </div>

                </div>


                <div className="admin-application">

                  <div className="admin-application-icon">
                    <FileText size={18} />
                  </div>

                  <div className="admin-application-info">

                    <strong>
                      Record Correction
                    </strong>

                    <span>
                      RS-2026-004796 • Lucknow
                    </span>

                  </div>

                  <div className="admin-status verified">
                    <CheckCircle2 size={13} />
                    Approved
                  </div>

                </div>

              </div>

            </div>


            {/* QUICK ACTIONS */}

            <div className="admin-panel">

              <div className="admin-panel-header">

                <div>

                  <span>
                    ADMINISTRATION
                  </span>

                  <h2>
                    Quick Actions
                  </h2>

                </div>

              </div>


              <div className="admin-quick-grid">

                <button>
                  <Search size={20} />
                  <strong>Search Records</strong>
                  <span>Find land information</span>
                </button>

                <button>
                  <ClipboardCheck size={20} />
                  <strong>Verify Application</strong>
                  <span>Review pending requests</span>
                </button>

                <button>
                  <Users size={20} />
                  <strong>Citizen Management</strong>
                  <span>Manage citizen accounts</span>
                </button>

                <button>
                  <BarChart3 size={20} />
                  <strong>Generate Report</strong>
                  <span>View departmental reports</span>
                </button>

              </div>

            </div>

          </section>


          {/* ================= LOWER SECTION ================= */}

          <section className="admin-lower-grid">


            {/* STATE STATISTICS */}

            <div className="admin-panel">

              <div className="admin-panel-header">

                <div>

                  <span>
                    LAND RECORD COVERAGE
                  </span>

                  <h2>
                    State Statistics
                  </h2>

                </div>

                <button>
                  View Report
                  <ChevronRight size={15} />
                </button>

              </div>


              <div className="admin-state-list">

                <div className="admin-state-row">

                  <div>
                    <strong>Uttar Pradesh</strong>
                    <span>6,84,120 records</span>
                  </div>

                  <div className="admin-state-progress">
                    <div>
                      <span style={{ width: "91%" }} />
                    </div>

                    <strong>91%</strong>
                  </div>

                </div>


                <div className="admin-state-row">

                  <div>
                    <strong>Maharashtra</strong>
                    <span>4,82,615 records</span>
                  </div>

                  <div className="admin-state-progress">
                    <div>
                      <span style={{ width: "86%" }} />
                    </div>

                    <strong>86%</strong>
                  </div>

                </div>


                <div className="admin-state-row">

                  <div>
                    <strong>Bihar</strong>
                    <span>3,76,240 records</span>
                  </div>

                  <div className="admin-state-progress">
                    <div>
                      <span style={{ width: "79%" }} />
                    </div>

                    <strong>79%</strong>
                  </div>

                </div>


                <div className="admin-state-row">

                  <div>
                    <strong>Rajasthan</strong>
                    <span>3,12,870 records</span>
                  </div>

                  <div className="admin-state-progress">
                    <div>
                      <span style={{ width: "74%" }} />
                    </div>

                    <strong>74%</strong>
                  </div>

                </div>

              </div>

            </div>


            {/* SYSTEM STATUS */}

            <div className="admin-panel">

              <div className="admin-panel-header">

                <div>

                  <span>
                    SYSTEM
                  </span>

                  <h2>
                    System Status
                  </h2>

                </div>

              </div>


              <div className="admin-system-status">

                <div>

                  <div className="system-status-icon">
                    <CheckCircle2 size={17} />
                  </div>

                  <div>
                    <strong>
                      Land Records Service
                    </strong>

                    <span>
                      Operational
                    </span>
                  </div>

                  <b />
                </div>


                <div>

                  <div className="system-status-icon">
                    <CheckCircle2 size={17} />
                  </div>

                  <div>
                    <strong>
                      Citizen Portal
                    </strong>

                    <span>
                      Operational
                    </span>
                  </div>

                  <b />
                </div>


                <div>

                  <div className="system-status-icon">
                    <CheckCircle2 size={17} />
                  </div>

                  <div>
                    <strong>
                      Map Services
                    </strong>

                    <span>
                      Operational
                    </span>
                  </div>

                  <b />
                </div>


                <div>

                  <div className="system-status-icon">
                    <CheckCircle2 size={17} />
                  </div>

                  <div>
                    <strong>
                      Authentication
                    </strong>

                    <span>
                      Operational
                    </span>
                  </div>

                  <b />
                </div>

              </div>

            </div>

          </section>

        </main>


        {/* ================= FOOTER ================= */}

        <footer className="admin-footer">

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

export default AdminDashboard;