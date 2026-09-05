import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OfficialDashboard.css";

const OfficialDashboard = () => {
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [showNotifications, setShowNotifications] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: "▦" },
    { name: "Land Records", icon: "▤" },
    { name: "Mutation Requests", icon: "⇄" },
    { name: "Survey Records", icon: "⌖" },
    { name: "Citizen Requests", icon: "♙" },
    { name: "Reports", icon: "▥" },
    { name: "Users", icon: "♟" },
    { name: "Settings", icon: "⚙" },
  ];

  const notifications = [
    {
      title: "New Mutation Request",
      text: "Mutation request MR-2026-1045 requires verification.",
      time: "10 min ago",
    },
    {
      title: "Survey Update",
      text: "12 survey records were updated today.",
      time: "35 min ago",
    },
    {
      title: "Citizen Request",
      text: "A new citizen request has been submitted.",
      time: "1 hour ago",
    },
  ];

  const handleLogout = () => {
    navigate("/official-login");
  };

  return (
    <div className="official-dashboard">

      {/* SIDEBAR */}
      <aside className="dashboard-sidebar">

        <div className="sidebar-brand">
          <div className="brand-emblem">◉</div>

          <div>
            <h2>RecordSetu</h2>
            <span>Land Records Portal</span>
          </div>
        </div>

        <div className="sidebar-section-title">
          MAIN MENU
        </div>

        <nav className="sidebar-menu">
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={`sidebar-item ${
                activeMenu === item.name ? "active" : ""
              }`}
              onClick={() => setActiveMenu(item.name)}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button
            className="sidebar-item logout-item"
            onClick={handleLogout}
          >
            <span className="sidebar-icon">↪</span>
            <span>Logout</span>
          </button>
        </div>

      </aside>

      {/* MAIN CONTENT */}
      <main className="dashboard-main">

        {/* TOP HEADER */}
        <header className="dashboard-header">

          <div className="header-left">
            <div className="government-title">
              <span>GOVERNMENT OF INDIA</span>
              <strong>Department of Land Resources</strong>
            </div>
          </div>

          <div className="header-right">

            <button
              className="notification-button"
              onClick={() =>
                setShowNotifications(!showNotifications)
              }
            >
              🔔
              <span className="notification-dot"></span>
            </button>

            <div className="official-profile">
              <div className="profile-avatar">
                AO
              </div>

              <div className="profile-details">
                <strong>Admin Officer</strong>
                <span>District Land Records Office</span>
              </div>

              <span className="profile-arrow">⌄</span>
            </div>

          </div>

          {showNotifications && (
            <div className="notification-panel">

              <div className="notification-header">
                <strong>Notifications</strong>
                <span>3 New</span>
              </div>

              {notifications.map((notification, index) => (
                <div
                  className="notification-item"
                  key={index}
                >
                  <div className="notification-icon">
                    !
                  </div>

                  <div>
                    <strong>{notification.title}</strong>
                    <p>{notification.text}</p>
                    <small>{notification.time}</small>
                  </div>
                </div>
              ))}

            </div>
          )}

        </header>

        {/* PAGE CONTENT */}
        <section className="dashboard-content">

          <div className="page-heading">

            <div>
              <div className="breadcrumb">
                Home / Dashboard
              </div>

              <h1>Official Dashboard</h1>

              <p>
                Monitor and manage land records, citizen requests
                and digital land services.
              </p>
            </div>

            <div className="date-box">
              <span>Today</span>
              <strong>05 September 2026</strong>
            </div>

          </div>

          {/* STAT CARDS */}
          <div className="stats-grid">

            <div className="stat-card">
              <div className="stat-card-top">
                <div className="stat-icon blue">
                  ▤
                </div>

                <span className="stat-trend positive">
                  +8.4%
                </span>
              </div>

              <span className="stat-label">
                Total Land Records
              </span>

              <strong className="stat-number">
                12,48,563
              </strong>

              <p>
                Updated across the district
              </p>
            </div>

            <div className="stat-card">
              <div className="stat-card-top">
                <div className="stat-icon orange">
                  ⇄
                </div>

                <span className="stat-trend positive">
                  +12.2%
                </span>
              </div>

              <span className="stat-label">
                Pending Mutations
              </span>

              <strong className="stat-number">
                2,846
              </strong>

              <p>
                Require official verification
              </p>
            </div>

            <div className="stat-card">
              <div className="stat-card-top">
                <div className="stat-icon green">
                  ✓
                </div>

                <span className="stat-trend positive">
                  +5.8%
                </span>
              </div>

              <span className="stat-label">
                Records Verified
              </span>

              <strong className="stat-number">
                9,82,417
              </strong>

              <p>
                Successfully verified records
              </p>
            </div>

            <div className="stat-card">
              <div className="stat-card-top">
                <div className="stat-icon purple">
                  ♙
                </div>

                <span className="stat-trend positive">
                  +16.5%
                </span>
              </div>

              <span className="stat-label">
                Citizen Requests
              </span>

              <strong className="stat-number">
                1,294
              </strong>

              <p>
                Requests received this month
              </p>
            </div>

          </div>

          {/* MAIN GRID */}
          <div className="dashboard-grid">

            {/* RECORD ACTIVITY */}
            <div className="dashboard-card activity-card">

              <div className="card-heading">

                <div>
                  <h2>Land Record Activity</h2>
                  <p>
                    Overview of records processed during the week
                  </p>
                </div>

                <select className="period-select">
                  <option>This Week</option>
                  <option>This Month</option>
                  <option>This Year</option>
                </select>

              </div>

              <div className="chart-area">

                <div className="chart-y-axis">
                  <span>4000</span>
                  <span>3000</span>
                  <span>2000</span>
                  <span>1000</span>
                  <span>0</span>
                </div>

                <div className="chart">

                  <div className="chart-grid-line"></div>
                  <div className="chart-grid-line"></div>
                  <div className="chart-grid-line"></div>
                  <div className="chart-grid-line"></div>

                  <div className="bars">

                    <div className="bar-column">
                      <div
                        className="bar"
                        style={{ height: "58%" }}
                      ></div>
                      <span>Mon</span>
                    </div>

                    <div className="bar-column">
                      <div
                        className="bar"
                        style={{ height: "72%" }}
                      ></div>
                      <span>Tue</span>
                    </div>

                    <div className="bar-column">
                      <div
                        className="bar"
                        style={{ height: "64%" }}
                      ></div>
                      <span>Wed</span>
                    </div>

                    <div className="bar-column">
                      <div
                        className="bar"
                        style={{ height: "84%" }}
                      ></div>
                      <span>Thu</span>
                    </div>

                    <div className="bar-column">
                      <div
                        className="bar"
                        style={{ height: "76%" }}
                      ></div>
                      <span>Fri</span>
                    </div>

                    <div className="bar-column">
                      <div
                        className="bar"
                        style={{ height: "91%" }}
                      ></div>
                      <span>Sat</span>
                    </div>

                    <div className="bar-column">
                      <div
                        className="bar"
                        style={{ height: "48%" }}
                      ></div>
                      <span>Sun</span>
                    </div>

                  </div>

                </div>

              </div>

              <div className="chart-footer">

                <div>
                  <span className="legend-dot"></span>
                  Records Processed
                </div>

                <strong>
                  18,642 records this week
                </strong>

              </div>

            </div>

            {/* QUICK ACTIONS */}
            <div className="dashboard-card">

              <div className="card-heading">
                <div>
                  <h2>Quick Actions</h2>
                  <p>
                    Frequently used services
                  </p>
                </div>
              </div>

              <div className="quick-actions">

                <button>
                  <span>⌕</span>
                  <div>
                    <strong>Search Land Records</strong>
                    <small>Find property information</small>
                  </div>
                </button>

                <button>
                  <span>⇄</span>
                  <div>
                    <strong>Review Mutations</strong>
                    <small>Verify pending requests</small>
                  </div>
                </button>

                <button>
                  <span>▥</span>
                  <div>
                    <strong>Generate Report</strong>
                    <small>Create official reports</small>
                  </div>
                </button>

                <button>
                  <span>♙</span>
                  <div>
                    <strong>Citizen Requests</strong>
                    <small>View service requests</small>
                  </div>
                </button>

              </div>

            </div>

          </div>

          {/* LOWER SECTION */}
          <div className="lower-grid">

            {/* RECENT REQUESTS */}
            <div className="dashboard-card requests-card">

              <div className="card-heading">

                <div>
                  <h2>Recent Requests</h2>
                  <p>
                    Latest citizen and mutation requests
                  </p>
                </div>

                <button className="view-all">
                  View All →
                </button>

              </div>

              <div className="table-wrapper">

                <table>

                  <thead>
                    <tr>
                      <th>Request ID</th>
                      <th>Citizen</th>
                      <th>Service</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>

                    <tr>
                      <td>
                        <strong>RS-2026-1045</strong>
                      </td>
                      <td>Rajesh Kumar</td>
                      <td>Land Mutation</td>
                      <td>05 Sep 2026</td>
                      <td>
                        <span className="status pending">
                          Pending
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <strong>RS-2026-1044</strong>
                      </td>
                      <td>Sunita Devi</td>
                      <td>Record Copy</td>
                      <td>05 Sep 2026</td>
                      <td>
                        <span className="status approved">
                          Approved
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <strong>RS-2026-1043</strong>
                      </td>
                      <td>Amit Sharma</td>
                      <td>Property Search</td>
                      <td>04 Sep 2026</td>
                      <td>
                        <span className="status processing">
                          Processing
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <strong>RS-2026-1042</strong>
                      </td>
                      <td>Priya Singh</td>
                      <td>Land Mutation</td>
                      <td>04 Sep 2026</td>
                      <td>
                        <span className="status approved">
                          Approved
                        </span>
                      </td>
                    </tr>

                  </tbody>

                </table>

              </div>

            </div>

            {/* SYSTEM STATUS */}
            <div className="dashboard-card system-card">

              <div className="card-heading">

                <div>
                  <h2>System Status</h2>
                  <p>
                    RecordSetu services
                  </p>
                </div>

                <span className="system-live">
                  ● Live
                </span>

              </div>

              <div className="system-services">

                <div className="system-service">
                  <div>
                    <span className="service-status"></span>
                    <strong>Land Records Database</strong>
                  </div>
                  <span>Operational</span>
                </div>

                <div className="system-service">
                  <div>
                    <span className="service-status"></span>
                    <strong>Mutation Services</strong>
                  </div>
                  <span>Operational</span>
                </div>

                <div className="system-service">
                  <div>
                    <span className="service-status"></span>
                    <strong>Citizen Portal</strong>
                  </div>
                  <span>Operational</span>
                </div>

                <div className="system-service">
                  <div>
                    <span className="service-status"></span>
                    <strong>Document Services</strong>
                  </div>
                  <span>Operational</span>
                </div>

              </div>

              <div className="last-updated">
                Last updated: Just now
              </div>

            </div>

          </div>

        </section>

        {/* FOOTER */}
        <footer className="dashboard-footer">

          <span>
            © 2026 RecordSetu · Department of Land Resources,
            Government of India
          </span>

          <div>
            <span>Privacy Policy</span>
            <span>Accessibility</span>
            <span>Help & Support</span>
          </div>

        </footer>

      </main>

    </div>
  );
};

export default OfficialDashboard;