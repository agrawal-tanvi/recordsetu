import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowLeft,
  UserCog,
  Building2,
  CheckCircle2,
} from "lucide-react";
import "./AdminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!adminId || !password) {
      setError("Please enter your Administrator ID and password.");
      return;
    }

    // Frontend demo login
    navigate("/admin-dashboard");
  };

  return (
    <div className="admin-login-page">

      {/* Back Button */}
      <button
        className="admin-back-btn"
        onClick={() => navigate("/")}
      >
        <ArrowLeft size={19} />
        Back to Home
      </button>

      <div className="admin-login-wrapper">

        {/* LEFT INFORMATION PANEL */}
        <section className="admin-info-panel">

          <div className="admin-brand">
            <div className="admin-brand-icon">
              <ShieldCheck size={32} />
            </div>

            <div>
              <span>Government of India</span>
              <h2>RecordSetu</h2>
              <p>Department of Land Resources</p>
            </div>
          </div>

          <div className="admin-info-content">
            <div className="admin-label">
              ADMINISTRATIVE ACCESS
            </div>

            <h1>
              Secure Administration
              <span> for Land Records</span>
            </h1>

            <p className="admin-description">
              Authorized administrators can manage government
              operations, monitor land-record activities and oversee
              citizen services through the RecordSetu administration
              portal.
            </p>

            <div className="admin-security-list">

              <div className="admin-security-item">
                <div className="security-icon">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <strong>Secure Government Access</strong>
                  <p>Restricted administrative access</p>
                </div>
              </div>

              <div className="admin-security-item">
                <div className="security-icon">
                  <Building2 size={20} />
                </div>
                <div>
                  <strong>Department Administration</strong>
                  <p>Manage departmental operations</p>
                </div>
              </div>

              <div className="admin-security-item">
                <div className="security-icon">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <strong>Authorized Personnel Only</strong>
                  <p>Access monitored and protected</p>
                </div>
              </div>

            </div>
          </div>

          <div className="admin-info-footer">
            <span>Digital India</span>
            <span>•</span>
            <span>Department of Land Resources</span>
          </div>

        </section>


        {/* RIGHT LOGIN CARD */}
        <section className="admin-login-section">

          <div className="admin-login-card">

            <div className="admin-login-icon">
              <UserCog size={31} />
            </div>

            <div className="admin-login-heading">
              <span>ADMINISTRATOR PORTAL</span>

              <h2>Administrator Login</h2>

              <p>
                Sign in to access the RecordSetu administration
                dashboard.
              </p>
            </div>

            <form onSubmit={handleLogin}>

              {/* ADMIN ID */}
              <div className="admin-form-group">
                <label htmlFor="adminId">
                  Administrator ID
                </label>

                <div className="admin-input-wrapper">
                  <UserCog size={19} />

                  <input
                    id="adminId"
                    type="text"
                    placeholder="Enter administrator ID"
                    value={adminId}
                    onChange={(e) => setAdminId(e.target.value)}
                    autoComplete="username"
                  />
                </div>
              </div>


              {/* PASSWORD */}
              <div className="admin-form-group">
                <div className="admin-password-label">
                  <label htmlFor="adminPassword">
                    Password
                  </label>

                  <button
                    type="button"
                    className="admin-forgot-btn"
                    onClick={() =>
                      setError(
                        "Password recovery will be available in the next version."
                      )
                    }
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="admin-input-wrapper">
                  <LockKeyhole size={19} />

                  <input
                    id="adminPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />

                  <button
                    type="button"
                    className="admin-password-toggle"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>


              {/* REMEMBER ME */}
              <div className="admin-options">

                <label className="admin-remember">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) =>
                      setRememberMe(e.target.checked)
                    }
                  />

                  <span>Keep me signed in</span>
                </label>

              </div>


              {/* ERROR */}
              {error && (
                <div className="admin-error">
                  {error}
                </div>
              )}


              {/* LOGIN */}
              <button
                type="submit"
                className="admin-login-btn"
              >
                <span>Sign In</span>
                <ArrowLeft
                  size={20}
                  className="admin-login-arrow"
                />
              </button>

            </form>


            {/* SECURITY NOTICE */}
            <div className="admin-secure-notice">

              <div className="admin-secure-icon">
                <ShieldCheck size={21} />
              </div>

              <div>
                <strong>Secure Government Service</strong>

                <p>
                  This portal is restricted to authorized
                  government personnel. Your information is
                  protected using secure authentication.
                </p>
              </div>

            </div>


            {/* BACK TO OFFICIAL LOGIN */}
            <div className="admin-other-login">
              <span>Are you a government official?</span>

              <button
                type="button"
                onClick={() => navigate("/official-login")}
              >
                Official Login
              </button>
            </div>

          </div>

          <footer className="admin-login-footer">
            © 2026 RecordSetu • Department of Land Resources •
            Government of India
          </footer>

        </section>

      </div>
    </div>
  );
}

export default AdminLogin;