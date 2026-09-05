import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  X,
  User,
  MapPin,
  FileText,
  LandPlot,
  CheckCircle2,
} from "lucide-react";

import "./AddLandRecord.css";

function AddLandRecord() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    ownerName: "",
    fatherName: "",
    mobile: "",
    district: "",
    tehsil: "",
    village: "",
    surveyNumber: "",
    khataNumber: "",
    area: "",
    landType: "",
    ownershipType: "",
    address: "",
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSaved(true);

    setTimeout(() => {
      navigate("/admin-land-records");
    }, 1800);
  };

  return (
    <div className="add-record-page">

      {/* ================= TOPBAR ================= */}

      <header className="add-record-topbar">

        <button
          className="add-record-back"
          onClick={() => navigate("/admin-land-records")}
        >
          <ArrowLeft size={18} />
          Back to Land Records
        </button>

        <div className="add-record-brand">

          <strong>RecordSetu</strong>

          <span>
            Department of Land Resources
          </span>

        </div>

        <div className="add-record-gov">
          Government of India
        </div>

      </header>


      {/* ================= MAIN ================= */}

      <main className="add-record-main">

        {/* PAGE HEADER */}

        <section className="add-record-heading">

          <div>

            <span>
              LAND RECORD MANAGEMENT
            </span>

            <h1>
              Add New Land Record
            </h1>

            <p>
              Enter verified land ownership and property
              information to create a new digital record.
            </p>

          </div>

          <div className="add-record-reference">

            <span>
              RECORD TYPE
            </span>

            <strong>
              New Land Record
            </strong>

          </div>

        </section>


        {/* ================= FORM ================= */}

        <form
          className="add-record-form"
          onSubmit={handleSubmit}
        >

          {/* OWNER INFORMATION */}

          <section className="add-record-section">

            <div className="add-record-section-header">

              <div className="add-record-section-icon">
                <User size={18} />
              </div>

              <div>
                <span>
                  SECTION 01
                </span>

                <h2>
                  Land Owner Information
                </h2>

                <p>
                  Enter the registered land owner's details.
                </p>
              </div>

            </div>


            <div className="add-record-fields">

              <div className="add-field">

                <label>
                  Owner Name
                  <b>*</b>
                </label>

                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  required
                />

              </div>


              <div className="add-field">

                <label>
                  Father's / Husband's Name
                  <b>*</b>
                </label>

                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  placeholder="Enter name"
                  required
                />

              </div>


              <div className="add-field">

                <label>
                  Mobile Number
                </label>

                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="10 digit mobile number"
                  maxLength="10"
                />

              </div>


              <div className="add-field">

                <label>
                  Ownership Type
                  <b>*</b>
                </label>

                <select
                  name="ownershipType"
                  value={formData.ownershipType}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select ownership type
                  </option>

                  <option value="Individual">
                    Individual
                  </option>

                  <option value="Joint">
                    Joint Ownership
                  </option>

                  <option value="Government">
                    Government
                  </option>

                  <option value="Institution">
                    Institution
                  </option>

                </select>

              </div>

            </div>

          </section>


          {/* LOCATION */}

          <section className="add-record-section">

            <div className="add-record-section-header">

              <div className="add-record-section-icon">
                <MapPin size={18} />
              </div>

              <div>
                <span>
                  SECTION 02
                </span>

                <h2>
                  Property Location
                </h2>

                <p>
                  Provide the administrative location of the land.
                </p>
              </div>

            </div>


            <div className="add-record-fields">

              <div className="add-field">

                <label>
                  District
                  <b>*</b>
                </label>

                <select
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select district
                  </option>

                  <option>Agra</option>
                  <option>Ghaziabad</option>
                  <option>Kanpur</option>
                  <option>Lucknow</option>
                  <option>Meerut</option>
                  <option>Noida</option>
                  <option>Varanasi</option>

                </select>

              </div>


              <div className="add-field">

                <label>
                  Tehsil
                  <b>*</b>
                </label>

                <input
                  type="text"
                  name="tehsil"
                  value={formData.tehsil}
                  onChange={handleChange}
                  placeholder="Enter tehsil"
                  required
                />

              </div>


              <div className="add-field">

                <label>
                  Village
                  <b>*</b>
                </label>

                <input
                  type="text"
                  name="village"
                  value={formData.village}
                  onChange={handleChange}
                  placeholder="Enter village"
                  required
                />

              </div>


              <div className="add-field">

                <label>
                  Khata Number
                </label>

                <input
                  type="text"
                  name="khataNumber"
                  value={formData.khataNumber}
                  onChange={handleChange}
                  placeholder="Enter khata number"
                />

              </div>

            </div>

          </section>


          {/* LAND DETAILS */}

          <section className="add-record-section">

            <div className="add-record-section-header">

              <div className="add-record-section-icon">
                <LandPlot size={18} />
              </div>

              <div>
                <span>
                  SECTION 03
                </span>

                <h2>
                  Land Details
                </h2>

                <p>
                  Enter survey and land classification information.
                </p>
              </div>

            </div>


            <div className="add-record-fields">

              <div className="add-field">

                <label>
                  Survey Number
                  <b>*</b>
                </label>

                <input
                  type="text"
                  name="surveyNumber"
                  value={formData.surveyNumber}
                  onChange={handleChange}
                  placeholder="e.g. 124/3A"
                  required
                />

              </div>


              <div className="add-field">

                <label>
                  Land Area
                  <b>*</b>
                </label>

                <div className="add-input-unit">

                  <input
                    type="number"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    placeholder="Enter area"
                    min="0"
                    step="0.01"
                    required
                  />

                  <span>
                    Acre
                  </span>

                </div>

              </div>


              <div className="add-field">

                <label>
                  Land Type
                  <b>*</b>
                </label>

                <select
                  name="landType"
                  value={formData.landType}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select land type
                  </option>

                  <option>
                    Agricultural
                  </option>

                  <option>
                    Residential
                  </option>

                  <option>
                    Commercial
                  </option>

                  <option>
                    Industrial
                  </option>

                  <option>
                    Government
                  </option>

                </select>

              </div>


              <div className="add-field">

                <label>
                  Record Category
                  <b>*</b>
                </label>

                <select
                  required
                >
                  <option value="">
                    Select category
                  </option>

                  <option>
                    RoR
                  </option>

                  <option>
                    Mutation Record
                  </option>

                  <option>
                    Property Register
                  </option>

                </select>

              </div>


              <div className="add-field add-field-full">

                <label>
                  Property Address
                </label>

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter complete property address"
                  rows="3"
                />

              </div>

            </div>

          </section>


          {/* DOCUMENT INFORMATION */}

          <section className="add-record-section">

            <div className="add-record-section-header">

              <div className="add-record-section-icon">
                <FileText size={18} />
              </div>

              <div>
                <span>
                  SECTION 04
                </span>

                <h2>
                  Record Verification
                </h2>

                <p>
                  Confirm that the submitted information has
                  been verified.
                </p>
              </div>

            </div>


            <div className="verification-box">

              <CheckCircle2 size={20} />

              <div>

                <strong>
                  Verification declaration
                </strong>

                <p>
                  I confirm that the information entered above
                  has been checked against the available
                  land records and supporting documents.
                </p>

              </div>

            </div>

          </section>


          {/* ACTIONS */}

          <div className="add-record-actions">

            <button
              type="button"
              className="add-cancel-btn"
              onClick={() =>
                navigate("/admin-land-records")
              }
            >
              <X size={16} />
              Cancel
            </button>

            <button
              type="submit"
              className="add-save-btn"
            >
              <Save size={16} />
              Save Land Record
            </button>

          </div>

        </form>

      </main>


      {/* SUCCESS */}

      {saved && (

        <div className="add-record-success-overlay">

          <div className="add-record-success">

            <div className="success-icon">
              <CheckCircle2 size={28} />
            </div>

            <h2>
              Record Saved Successfully
            </h2>

            <p>
              The new land record has been added to
              the RecordSetu system.
            </p>

            <span>
              Redirecting to Land Records...
            </span>

          </div>

        </div>

      )}

    </div>
  );
}

export default AddLandRecord;