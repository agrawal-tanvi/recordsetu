import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  Filter,
  Plus,
  Download,
  Eye,
  FileText,
  MapPin,
  ChevronLeft,
  ChevronRight,
  X,
  CheckCircle2,
  Clock3,
} from "lucide-react";

import "./AdminLandRecords.css";

function AdminLandRecords() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedRecord, setSelectedRecord] = useState(null);

  const records = [
    {
      id: "LR-2026-004821",
      owner: "Rajesh Kumar",
      district: "Meerut",
      village: "Daurala",
      survey: "124/3A",
      area: "2.48 Acre",
      type: "Agricultural",
      status: "Verified",
      updated: "05 Sep 2026",
    },
    {
      id: "LR-2026-004817",
      owner: "Sunita Devi",
      district: "Ghaziabad",
      village: "Muradnagar",
      survey: "87/2B",
      area: "1.72 Acre",
      type: "Residential",
      status: "Pending",
      updated: "04 Sep 2026",
    },
    {
      id: "LR-2026-004801",
      owner: "Amit Sharma",
      district: "Noida",
      village: "Salarpur",
      survey: "212/4",
      area: "3.15 Acre",
      type: "Agricultural",
      status: "Verified",
      updated: "04 Sep 2026",
    },
    {
      id: "LR-2026-004796",
      owner: "Neha Singh",
      district: "Lucknow",
      village: "Mohan",
      survey: "56/8C",
      area: "1.20 Acre",
      type: "Residential",
      status: "Approved",
      updated: "03 Sep 2026",
    },
    {
      id: "LR-2026-004782",
      owner: "Vijay Yadav",
      district: "Varanasi",
      village: "Sarnath",
      survey: "91/5A",
      area: "4.62 Acre",
      type: "Agricultural",
      status: "Pending",
      updated: "03 Sep 2026",
    },
    {
      id: "LR-2026-004761",
      owner: "Pooja Verma",
      district: "Agra",
      village: "Kiraoli",
      survey: "145/7",
      area: "2.06 Acre",
      type: "Residential",
      status: "Verified",
      updated: "02 Sep 2026",
    },
    {
      id: "LR-2026-004748",
      owner: "Manoj Gupta",
      district: "Kanpur",
      village: "Bilhaur",
      survey: "72/1B",
      area: "5.31 Acre",
      type: "Agricultural",
      status: "Verified",
      updated: "01 Sep 2026",
    },
  ];

  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      record.id.toLowerCase().includes(search.toLowerCase()) ||
      record.owner.toLowerCase().includes(search.toLowerCase()) ||
      record.district.toLowerCase().includes(search.toLowerCase()) ||
      record.village.toLowerCase().includes(search.toLowerCase()) ||
      record.survey.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      record.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="admin-records-page">

      {/* HEADER */}

      <header className="records-topbar">

        <button
          className="records-back"
          onClick={() => navigate("/admin-dashboard")}
        >
          <ArrowLeft size={18} />
          Dashboard
        </button>

        <div className="records-top-title">
          <span>RECORDSETU ADMINISTRATION</span>
          <strong>Land Records Management</strong>
        </div>

        <div className="records-top-right">
          <span>Government of India</span>
        </div>

      </header>


      {/* MAIN */}

      <main className="records-main">

        {/* PAGE HEADING */}

        <section className="records-heading">

          <div>
            <span className="records-eyebrow">
              LAND RECORDS
            </span>

            <h1>
              Land Records Management
            </h1>

            <p>
              Search, review and manage digitized land records
              across departments and districts.
            </p>
          </div>

          <div className="records-heading-actions">

            <button className="records-outline-btn">
              <Download size={16} />
              Export
            </button>

            <button className="records-primary-btn">
              <Plus size={17} />
              Add Record
            </button>

          </div>

        </section>


        {/* SUMMARY */}

        <section className="records-summary">

          <div>
            <FileText size={19} />
            <span>Total Records</span>
            <strong>24,86,412</strong>
          </div>

          <div>
            <CheckCircle2 size={19} />
            <span>Verified</span>
            <strong>21,92,084</strong>
          </div>

          <div>
            <Clock3 size={19} />
            <span>Pending</span>
            <strong>8,426</strong>
          </div>

          <div>
            <MapPin size={19} />
            <span>Districts Covered</span>
            <strong>75</strong>
          </div>

        </section>


        {/* RECORD PANEL */}

        <section className="records-panel">

          {/* TOOLBAR */}

          <div className="records-toolbar">

            <div className="records-search">

              <Search size={18} />

              <input
                type="text"
                placeholder="Search by record ID, owner, district, village..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="records-clear"
                >
                  <X size={15} />
                </button>
              )}

            </div>


            <div className="records-filters">

              <div className="records-filter-label">
                <Filter size={15} />
                Status
              </div>

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
              >
                <option value="All">All Records</option>
                <option value="Verified">Verified</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
              </select>

            </div>

          </div>


          {/* TABLE */}

          <div className="records-table-wrapper">

            <table className="records-table">

              <thead>

                <tr>
                  <th>Record ID</th>
                  <th>Land Owner</th>
                  <th>Location</th>
                  <th>Survey No.</th>
                  <th>Area</th>
                  <th>Land Type</th>
                  <th>Status</th>
                  <th>Updated</th>
                  <th>Action</th>
                </tr>

              </thead>


              <tbody>

                {filteredRecords.length > 0 ? (
                  filteredRecords.map((record) => (

                    <tr key={record.id}>

                      <td>
                        <strong className="record-id">
                          {record.id}
                        </strong>
                      </td>

                      <td>
                        <span className="record-owner">
                          {record.owner}
                        </span>
                      </td>

                      <td>
                        <div className="record-location">
                          <strong>
                            {record.district}
                          </strong>

                          <span>
                            {record.village}
                          </span>
                        </div>
                      </td>

                      <td>
                        {record.survey}
                      </td>

                      <td>
                        {record.area}
                      </td>

                      <td>
                        {record.type}
                      </td>

                      <td>

                        <span
                          className={`record-status ${
                            record.status.toLowerCase()
                          }`}
                        >
                          {record.status === "Pending" ? (
                            <Clock3 size={12} />
                          ) : (
                            <CheckCircle2 size={12} />
                          )}

                          {record.status}
                        </span>

                      </td>

                      <td>
                        {record.updated}
                      </td>

                      <td>

                        <button
                          className="record-view-btn"
                          onClick={() =>
                            setSelectedRecord(record)
                          }
                        >
                          <Eye size={15} />
                          View
                        </button>

                      </td>

                    </tr>

                  ))
                ) : (

                  <tr>

                    <td
                      colSpan="9"
                      className="records-empty"
                    >
                      <Search size={25} />

                      <strong>
                        No records found
                      </strong>

                      <span>
                        Try changing your search or filter.
                      </span>
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>


          {/* PAGINATION */}

          <div className="records-pagination">

            <span>
              Showing <strong>1–{filteredRecords.length}</strong>{" "}
              of <strong>24,86,412</strong> records
            </span>

            <div>

              <button disabled>
                <ChevronLeft size={16} />
              </button>

              <button className="pagination-active">
                1
              </button>

              <button>2</button>
              <button>3</button>

              <span>...</span>

              <button>249</button>

              <button>
                <ChevronRight size={16} />
              </button>

            </div>

          </div>

        </section>


        {/* FOOTER */}

        <footer className="records-footer">

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

      </main>


      {/* RECORD DETAILS MODAL */}

      {selectedRecord && (

        <div
          className="record-modal-overlay"
          onClick={() => setSelectedRecord(null)}
        >

          <div
            className="record-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="record-modal-header">

              <div>
                <span>
                  LAND RECORD
                </span>

                <h2>
                  Record Details
                </h2>
              </div>

              <button
                onClick={() => setSelectedRecord(null)}
              >
                <X size={19} />
              </button>

            </div>


            <div className="record-modal-id">
              <FileText size={18} />

              <div>
                <span>Record ID</span>
                <strong>{selectedRecord.id}</strong>
              </div>

            </div>


            <div className="record-details-grid">

              <div>
                <span>Land Owner</span>
                <strong>{selectedRecord.owner}</strong>
              </div>

              <div>
                <span>District</span>
                <strong>{selectedRecord.district}</strong>
              </div>

              <div>
                <span>Village</span>
                <strong>{selectedRecord.village}</strong>
              </div>

              <div>
                <span>Survey Number</span>
                <strong>{selectedRecord.survey}</strong>
              </div>

              <div>
                <span>Land Area</span>
                <strong>{selectedRecord.area}</strong>
              </div>

              <div>
                <span>Land Type</span>
                <strong>{selectedRecord.type}</strong>
              </div>

              <div>
                <span>Status</span>

                <strong>
                  {selectedRecord.status}
                </strong>

              </div>

              <div>
                <span>Last Updated</span>
                <strong>{selectedRecord.updated}</strong>
              </div>

            </div>


            <div className="record-modal-actions">

              <button className="records-outline-btn">
                <Download size={15} />
                Download Record
              </button>

              <button className="records-primary-btn">
                <Eye size={15} />
                Open Full Record
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default AdminLandRecords;