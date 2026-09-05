import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  Filter,
  Eye,
  CheckCircle2,
  XCircle,
  Clock3,
  FileText,
  User,
  MapPin,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import "./AdminApplications.css";

function AdminApplications() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedApplication, setSelectedApplication] = useState(null);

  const [applications, setApplications] = useState([
    {
      id: "APP-2026-008421",
      applicant: "Rahul Sharma",
      service: "Land Record Copy",
      district: "Meerut",
      village: "Daurala",
      submitted: "05 Sep 2026",
      status: "Pending",
    },
    {
      id: "APP-2026-008415",
      applicant: "Priya Singh",
      service: "Mutation Request",
      district: "Ghaziabad",
      village: "Muradnagar",
      submitted: "05 Sep 2026",
      status: "Pending",
    },
    {
      id: "APP-2026-008397",
      applicant: "Amit Kumar",
      service: "Ownership Certificate",
      district: "Noida",
      village: "Salarpur",
      submitted: "04 Sep 2026",
      status: "Approved",
    },
    {
      id: "APP-2026-008381",
      applicant: "Neha Verma",
      service: "Land Record Correction",
      district: "Lucknow",
      village: "Mohan",
      submitted: "04 Sep 2026",
      status: "Pending",
    },
    {
      id: "APP-2026-008366",
      applicant: "Vijay Yadav",
      service: "Mutation Request",
      district: "Varanasi",
      village: "Sarnath",
      submitted: "03 Sep 2026",
      status: "Rejected",
    },
    {
      id: "APP-2026-008341",
      applicant: "Pooja Gupta",
      service: "Land Record Copy",
      district: "Agra",
      village: "Kiraoli",
      submitted: "02 Sep 2026",
      status: "Approved",
    },
  ]);

  const filteredApplications = applications.filter((application) => {
    const matchesSearch =
      application.id.toLowerCase().includes(search.toLowerCase()) ||
      application.applicant.toLowerCase().includes(search.toLowerCase()) ||
      application.service.toLowerCase().includes(search.toLowerCase()) ||
      application.district.toLowerCase().includes(search.toLowerCase()) ||
      application.village.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      application.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const updateStatus = (id, status) => {
    setApplications((prev) =>
      prev.map((application) =>
        application.id === id
          ? { ...application, status }
          : application
      )
    );

    setSelectedApplication(null);
  };

  return (
    <div className="admin-applications-page">

      {/* TOPBAR */}

      <header className="applications-topbar">

        <button
          className="applications-back"
          onClick={() => navigate("/admin-dashboard")}
        >
          <ArrowLeft size={18} />
          Dashboard
        </button>

        <div className="applications-title">
          <span>RECORDSETU ADMINISTRATION</span>
          <strong>Application Management</strong>
        </div>

        <span className="applications-government">
          Government of India
        </span>

      </header>


      {/* MAIN */}

      <main className="applications-main">

        {/* HEADING */}

        <section className="applications-heading">

          <div>

            <span className="applications-eyebrow">
              APPLICATIONS
            </span>

            <h1>
              Application Management
            </h1>

            <p>
              Review, verify and process citizen applications
              submitted through RecordSetu.
            </p>

          </div>

        </section>


        {/* STATISTICS */}

        <section className="applications-summary">

          <div>
            <FileText size={19} />
            <span>Total Applications</span>
            <strong>18,642</strong>
          </div>

          <div>
            <Clock3 size={19} />
            <span>Pending Review</span>
            <strong>1,284</strong>
          </div>

          <div>
            <CheckCircle2 size={19} />
            <span>Approved</span>
            <strong>16,927</strong>
          </div>

          <div>
            <XCircle size={19} />
            <span>Rejected</span>
            <strong>431</strong>
          </div>

        </section>


        {/* PANEL */}

        <section className="applications-panel">

          {/* TOOLBAR */}

          <div className="applications-toolbar">

            <div className="applications-search">

              <Search size={18} />

              <input
                type="text"
                placeholder="Search application ID, applicant, service..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

            </div>


            <div className="applications-filter">

              <Filter size={15} />

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
              >
                <option value="All">
                  All Applications
                </option>

                <option value="Pending">
                  Pending
                </option>

                <option value="Approved">
                  Approved
                </option>

                <option value="Rejected">
                  Rejected
                </option>

              </select>

            </div>

          </div>


          {/* TABLE */}

          <div className="applications-table-wrapper">

            <table className="applications-table">

              <thead>

                <tr>
                  <th>Application ID</th>
                  <th>Applicant</th>
                  <th>Service</th>
                  <th>Location</th>
                  <th>Submitted</th>
                  <th>Status</th>
                  <th>Action</th>
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
                      <span className="application-applicant">
                        {application.applicant}
                      </span>
                    </td>

                    <td>
                      <span className="application-service">
                        {application.service}
                      </span>
                    </td>

                    <td>

                      <div className="application-location">

                        <strong>
                          {application.district}
                        </strong>

                        <span>
                          {application.village}
                        </span>

                      </div>

                    </td>

                    <td>
                      {application.submitted}
                    </td>

                    <td>

                      <span
                        className={`application-status ${application.status.toLowerCase()}`}
                      >

                        {application.status === "Pending" && (
                          <Clock3 size={12} />
                        )}

                        {application.status === "Approved" && (
                          <CheckCircle2 size={12} />
                        )}

                        {application.status === "Rejected" && (
                          <XCircle size={12} />
                        )}

                        {application.status}

                      </span>

                    </td>

                    <td>

                      <button
                        className="application-view-btn"
                        onClick={() =>
                          setSelectedApplication(application)
                        }
                      >
                        <Eye size={15} />
                        Review
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>


          {/* PAGINATION */}

          <div className="applications-pagination">

            <span>
              Showing{" "}
              <strong>
                {filteredApplications.length}
              </strong>{" "}
              applications
            </span>

            <div>

              <button disabled>
                <ChevronLeft size={15} />
              </button>

              <button className="active-page">
                1
              </button>

              <button>2</button>
              <button>3</button>

              <span>...</span>

              <button>128</button>

              <button>
                <ChevronRight size={15} />
              </button>

            </div>

          </div>

        </section>

      </main>


      {/* REVIEW MODAL */}

      {selectedApplication && (

        <div
          className="application-modal-overlay"
          onClick={() => setSelectedApplication(null)}
        >

          <div
            className="application-modal"
            onClick={(e) => e.stopPropagation()}
          >

            {/* HEADER */}

            <div className="application-modal-header">

              <div>

                <span>
                  APPLICATION REVIEW
                </span>

                <h2>
                  {selectedApplication.id}
                </h2>

              </div>

              <button
                onClick={() =>
                  setSelectedApplication(null)
                }
              >
                <X size={19} />
              </button>

            </div>


            {/* APPLICANT */}

            <div className="application-modal-section">

              <div className="application-modal-section-title">

                <User size={17} />

                <strong>
                  Applicant Information
                </strong>

              </div>


              <div className="application-info-grid">

                <div>
                  <span>Applicant Name</span>
                  <strong>
                    {selectedApplication.applicant}
                  </strong>
                </div>

                <div>
                  <span>Application ID</span>
                  <strong>
                    {selectedApplication.id}
                  </strong>
                </div>

              </div>

            </div>


            {/* PROPERTY */}

            <div className="application-modal-section">

              <div className="application-modal-section-title">

                <MapPin size={17} />

                <strong>
                  Property Information
                </strong>

              </div>


              <div className="application-info-grid">

                <div>
                  <span>District</span>
                  <strong>
                    {selectedApplication.district}
                  </strong>
                </div>

                <div>
                  <span>Village</span>
                  <strong>
                    {selectedApplication.village}
                  </strong>
                </div>

                <div>
                  <span>Requested Service</span>
                  <strong>
                    {selectedApplication.service}
                  </strong>
                </div>

                <div>
                  <span>Submission Date</span>
                  <strong>
                    {selectedApplication.submitted}
                  </strong>
                </div>

              </div>

            </div>


            {/* CURRENT STATUS */}

            <div className="application-current-status">

              <span>
                CURRENT STATUS
              </span>

              <strong>
                {selectedApplication.status}
              </strong>

            </div>


            {/* ACTIONS */}

            {selectedApplication.status === "Pending" && (

              <div className="application-modal-actions">

                <button
                  className="reject-application-btn"
                  onClick={() =>
                    updateStatus(
                      selectedApplication.id,
                      "Rejected"
                    )
                  }
                >
                  <XCircle size={16} />
                  Reject Application
                </button>

                <button
                  className="approve-application-btn"
                  onClick={() =>
                    updateStatus(
                      selectedApplication.id,
                      "Approved"
                    )
                  }
                >
                  <CheckCircle2 size={16} />
                  Approve Application
                </button>

              </div>

            )}

          </div>

        </div>

      )}

    </div>
  );
}

export default AdminApplications;