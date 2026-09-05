import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Users,
  CheckCircle2,
  Clock3,
  Search,
  Bell,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Eye,
  MoreHorizontal,
  TrendingUp,
  MapPin,
  ShieldCheck,
  ClipboardList,
  AlertCircle,
  ArrowUpRight,
} from "lucide-react";

import "./OfficialDashboard.css";

function OfficialDashboard() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Land Records",
      icon: FileText,
    },
    {
      name: "Citizen Requests",
      icon: Users,
    },
    {
      name: "Verification",
      icon: ShieldCheck,
    },
  ];

  const applications = [
    {
      id: "RS-2026-001842",
      applicant: "Rajesh Kumar",
      location: "Gosainganj, Lucknow",
      type: "Record Update",
      date: "05 Sep 2026",
      status: "Pending",
    },
    {
      id: "RS-2026-001841",
      applicant: "Sunita Devi",
      location: "Mohanlalganj, Lucknow",
      type: "Ownership Transfer",
      date: "05 Sep 2026",
      status: "Verified",
    },
    {
      id: "RS-2026-001840",
      applicant: "Amit Sharma",
      location: "Malihabad, Lucknow",
      type: "Land Record Copy",
      date: "04 Sep 2026",
      status: "Processing",
    },
    {
      id: "RS-2026-001839",
      applicant: "Priya Singh",
      location: "Bakshi Ka Talab",
      type: "Record Correction",
      date: "04 Sep 2026",
      status: "Pending",
    },
    {
      id: "RS-2026-001838",
      applicant: "Ramesh Verma",
      location: "Sarojini Nagar",
      type: "Ownership Transfer",
      date: "03 Sep 2026",
      status: "Verified",
    },
  ];

  const filteredApplications = applications.filter((application) => {
    const matchesSearch =
      application.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.applicant
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      application.location
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || application.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleLogout = () => {
    navigate("/official-login");
  };

  const handleMenuClick = (name) => {
    setActiveMenu(name);
    setSidebarOpen(false);
  };

  return (
    <div className="official-dashboard">

      {/* ================= SIDEBAR OVERLAY ================= */}

      {sidebarOpen && (
        <div
          className="dashboard-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ================= SIDEBAR ================= */}

      <aside className={`dashboard-sidebar ${sidebarOpen ? "open" : ""}`}>

        <div className="sidebar-brand">

          <div className="sidebar-logo">
            <FileText size={22} />
          </div>

          <div>
            <h2>RecordSetu</h2>
            <span>Land Records Portal</span>
          </div>

          <button
            className="sidebar-close"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>

        </div>


        <div className="sidebar-section-title">
          MAIN MENU
        </div>


        <nav className="sidebar-navigation">

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                className={`sidebar-menu-item ${
                  activeMenu === item.name ? "active" : ""
                }`}
                onClick={() => handleMenuClick(item.name)}
              >
                <Icon size={18} />
                <span>{item.name}</span>

                {item.name === "Citizen Requests" && (
                  <small>12</small>
                )}
              </button>
            );
          })}

        </nav>


        <div className="sidebar-section-title second">
          SERVICES
        </div>


        <nav className="sidebar-navigation">

          <button
            className="sidebar-menu-item"
            onClick={() => handleMenuClick("Reports")}
          >
            <ClipboardList size={18} />
            <span>Reports</span>
          </button>

          <button
            className="sidebar-menu-item"
            onClick={() => handleMenuClick("Activity")}
          >
            <TrendingUp size={18} />
            <span>Activity Logs</span>
          </button>

        </nav>


        <div className="sidebar-bottom">

          <div className="sidebar-security">
            <ShieldCheck size={18} />

            <div>
              <strong>Secure Session</strong>
              <span>Government Network</span>
            </div>
          </div>


          <button
            className="sidebar-logout"
            onClick={handleLogout}
          >
            <LogOut size={17} />
            Logout
          </button>

        </div>

      </aside>


      {/* ================= MAIN AREA ================= */}

      <div className="dashboard-content">

        {/* ================= TOPBAR ================= */}

        <header className="dashboard-topbar">

          <button
            className="mobile-menu-button"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={21} />
          </button>


          <div className="topbar-title">

            <span>GOVERNMENT PORTAL</span>

            <h1>Official Dashboard</h1>

          </div>


          <div className="topbar-right">

            <button className="notification-button">

              <Bell size={19} />

              <span></span>

            </button>


            <div className="topbar-divider"></div>


            <div className="official-profile">

              <div className="official-avatar">
                AK
              </div>

              <div className="official-profile-info">

                <strong>Ajay Kumar</strong>

                <span>Revenue Officer</span>

              </div>

              <ChevronDown size={16} />

            </div>

          </div>

        </header>


        {/* ================= PAGE CONTENT ================= */}

        <main className="dashboard-main">


          {/* WELCOME */}

          <section className="dashboard-welcome">

            <div>

              <span className="dashboard-label">
                OVERVIEW
              </span>

              <h2>
                Good morning, Ajay.
              </h2>

              <p>
                Here's what's happening with land records today.
              </p>

            </div>


            <div className="dashboard-location">

              <MapPin size={15} />

              <span>
                Lucknow District Office
              </span>

            </div>

          </section>


          {/* ================= STAT CARDS ================= */}

          <section className="dashboard-stat-grid">


            <div className="dashboard-stat-card">

              <div className="stat-card-top">

                <div className="stat-icon blue">
                  <FileText size={19} />
                </div>

                <span className="stat-period">
                  TOTAL
                </span>

              </div>

              <strong className="stat-number">
                48,291
              </strong>

              <div className="stat-footer">

                <span>
                  Digitized land records
                </span>

                <ArrowUpRight size={14} />

              </div>

            </div>


            <div className="dashboard-stat-card">

              <div className="stat-card-top">

                <div className="stat-icon purple">
                  <Users size={19} />
                </div>

                <span className="stat-period">
                  TODAY
                </span>

              </div>

              <strong className="stat-number">
                126
              </strong>

              <div className="stat-footer">

                <span>
                  Citizen requests
                </span>

                <span className="stat-positive">
                  +8.4%
                </span>

              </div>

            </div>


            <div className="dashboard-stat-card">

              <div className="stat-card-top">

                <div className="stat-icon orange">
                  <Clock3 size={19} />
                </div>

                <span className="stat-period">
                  ACTION NEEDED
                </span>

              </div>

              <strong className="stat-number">
                18
              </strong>

              <div className="stat-footer">

                <span>
                  Pending verification
                </span>

                <AlertCircle size={14} />

              </div>

            </div>


            <div className="dashboard-stat-card">

              <div className="stat-card-top">

                <div className="stat-icon green">
                  <CheckCircle2 size={19} />
                </div>

                <span className="stat-period">
                  THIS MONTH
                </span>

              </div>

              <strong className="stat-number">
                1,842
              </strong>

              <div className="stat-footer">

                <span>
                  Records verified
                </span>

                <span className="stat-positive">
                  +12.6%
                </span>

              </div>

            </div>

          </section>


          {/* ================= MAIN GRID ================= */}

          <section className="dashboard-grid">


            {/* ACTIVITY */}

            <div className="activity-card dashboard-panel">

              <div className="panel-header">

                <div>
                  <span className="panel-label">
                    PERFORMANCE
                  </span>

                  <h3>Record Activity</h3>
                </div>

                <button className="panel-dropdown">
                  This Month
                  <ChevronDown size={14} />
                </button>

              </div>


              <div className="activity-summary">

                <strong>1,842</strong>

                <span>
                  <TrendingUp size={13} />
                  12.6% from last month
                </span>

              </div>


              <div className="activity-chart">

                <div className="chart-y-axis">
                  <span>500</span>
                  <span>400</span>
                  <span>300</span>
                  <span>200</span>
                  <span>100</span>
                  <span>0</span>
                </div>


                <div className="chart-area">

                  <div className="chart-grid-line one"></div>
                  <div className="chart-grid-line two"></div>
                  <div className="chart-grid-line three"></div>
                  <div className="chart-grid-line four"></div>
                  <div className="chart-grid-line five"></div>


                  <svg
                    className="activity-line"
                    viewBox="0 0 600 220"
                    preserveAspectRatio="none"
                  >
                    <polyline
                      points="
                        0,170
                        70,145
                        140,155
                        210,105
                        280,125
                        350,80
                        420,95
                        490,50
                        560,65
                        600,35
                      "
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    />

                    <polyline
                      points="
                        0,170
                        70,145
                        140,155
                        210,105
                        280,125
                        350,80
                        420,95
                        490,50
                        560,65
                        600,35
                        600,220
                        0,220
                      "
                      fill="currentColor"
                      opacity="0.07"
                    />

                  </svg>


                  <div className="chart-months">
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                    <span>Jul</span>
                    <span>Aug</span>
                    <span>Sep</span>
                  </div>

                </div>

              </div>

            </div>


            {/* QUICK ACTIONS */}

            <div className="quick-actions-card dashboard-panel">

              <div className="panel-header">

                <div>
                  <span className="panel-label">
                    ACTIONS
                  </span>

                  <h3>Quick Actions</h3>
                </div>

              </div>


              <button className="quick-action">

                <div className="quick-action-icon">
                  <Search size={18} />
                </div>

                <div>
                  <strong>Search Land Records</strong>
                  <span>Find a record by ID or location</span>
                </div>

                <ArrowUpRight size={16} />

              </button>


              <button className="quick-action">

                <div className="quick-action-icon">
                  <ShieldCheck size={18} />
                </div>

                <div>
                  <strong>Verify Records</strong>
                  <span>18 records awaiting verification</span>
                </div>

                <ArrowUpRight size={16} />

              </button>


              <button className="quick-action">

                <div className="quick-action-icon">
                  <ClipboardList size={18} />
                </div>

                <div>
                  <strong>Generate Report</strong>
                  <span>Create monthly activity report</span>
                </div>

                <ArrowUpRight size={16} />

              </button>

            </div>

          </section>


          {/* ================= APPLICATIONS ================= */}

          <section className="applications-panel dashboard-panel">

            <div className="applications-header">

              <div>

                <span className="panel-label">
                  RECENT ACTIVITY
                </span>

                <h3>Recent Applications</h3>

              </div>


              <button className="view-all-button">
                View all
                <ArrowUpRight size={15} />
              </button>

            </div>


            {/* FILTER BAR */}

            <div className="applications-toolbar">

              <div className="table-search">

                <Search size={16} />

                <input
                  type="text"
                  placeholder="Search application, applicant or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />

              </div>


              <select
                className="status-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Verified">Verified</option>
              </select>

            </div>


            {/* TABLE */}

            <div className="applications-table-wrapper">

              <table className="applications-table">

                <thead>

                  <tr>
                    <th>APPLICATION ID</th>
                    <th>APPLICANT</th>
                    <th>LOCATION</th>
                    <th>REQUEST TYPE</th>
                    <th>DATE</th>
                    <th>STATUS</th>
                    <th></th>
                  </tr>

                </thead>


                <tbody>

                  {filteredApplications.map((application) => (

                    <tr key={application.id}>

                      <td>
                        <strong className="application-id">
                          {application.id}
                        </strong>
                      </td>

                      <td>
                        <div className="applicant-cell">

                          <div className="applicant-avatar">
                            {application.applicant
                              .split(" ")
                              .map((word) => word[0])
                              .join("")
                              .slice(0, 2)}
                          </div>

                          <span>
                            {application.applicant}
                          </span>

                        </div>
                      </td>

                      <td>
                        <span className="location-cell">
                          <MapPin size={13} />
                          {application.location}
                        </span>
                      </td>

                      <td>
                        {application.type}
                      </td>

                      <td>
                        {application.date}
                      </td>

                      <td>

                        <span
                          className={`application-status ${application.status
                            .toLowerCase()
                            .replace(" ", "-")}`}
                        >
                          {application.status}
                        </span>

                      </td>

                      <td>

                        <button
                          className="table-action"
                          title="View application"
                        >
                          <Eye size={16} />
                        </button>

                      </td>

                    </tr>

                  ))}


                  {filteredApplications.length === 0 && (

                    <tr>

                      <td
                        colSpan="7"
                        className="no-results"
                      >
                        No applications found.
                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </section>


          {/* ================= FOOTER ================= */}

          <footer className="dashboard-footer">

            <span>
              © 2026 RecordSetu · Department of Land Resources
            </span>

            <span>
              Official Government Portal
            </span>

          </footer>

        </main>

      </div>

    </div>
  );
}

export default OfficialDashboard;