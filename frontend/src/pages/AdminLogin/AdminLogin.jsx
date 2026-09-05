import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      alert("Please enter username and password.");
      return;
    }

    alert("Admin login submitted successfully.");

    // Later this will connect to the backend.
  };

  return (
    <main className="admin-login-page">

      <div className="admin-login-container">

        {/* Left information section */}
        <section className="admin-login-info">

          <div className="admin-badge">
            RECORDSETU
          </div>

          <h1>
            Department &
            <br />
            <span>Administrator Login</span>
          </h1>

          <p>
            Secure access to the RecordSetu administrative
            platform for managing digital land records,
            services, users and departmental operations.
          </p>

          <div className="admin-features">

            <div className="admin-feature">
              <span>✓</span>
              <div>
                <strong>Secure Access</strong>
                <small>
                  Protected administrative login
                </small>
              </div>
            </div>

            <div className="admin-feature">
              <span>✓</span>
              <div>
                <strong>Land Record Management</strong>
                <small>
                  Manage and review land record services
                </small>
              </div>
            </div>

            <div className="admin-feature">
              <span>✓</span>
              <div>
                <strong>Department Dashboard</strong>
                <small>
                  Access departmental operations and reports
                </small>
              </div>
            </div>

          </div>

        </section>


        {/* Login card */}
        <section className="admin-login-card">

          <div className="admin-card-header">

            <div className="admin-icon">
              🏛️
            </div>

            <div>
              <h2>Administrator Login</h2>

              <p>
                Sign in to continue to the administrative portal.
              </p>
            </div>

          </div>


          <form onSubmit={handleSubmit}>

            <div className="admin-form-group">

              <label htmlFor="username">
                Username / Department ID
              </label>

              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username or department ID"
                autoComplete="username"
              />

            </div>


            <div className="admin-form-group">

              <label htmlFor="password">
                Password
              </label>

              <div className="admin-password-wrapper">

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className="show-password-button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

            </div>


            <div className="admin-login-options">

              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                className="forgot-password"
                onClick={() =>
                  alert("Please contact your department administrator.")
                }
              >
                Forgot Password?
              </button>

            </div>


            <button
              type="submit"
              className="admin-submit-button"
            >
              Login to Administration
            </button>

          </form>


          <div className="admin-security-note">
            🔒 Your login credentials are protected.
          </div>


          <div className="admin-back-link">

            <Link to="/login">
              ← Back to Login Options
            </Link>

          </div>

        </section>

      </div>

    </main>
  );
}

export default AdminLogin;