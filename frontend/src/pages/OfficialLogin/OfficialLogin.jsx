import React, { useState } from "react";
import { ShieldCheck, Eye, EyeOff, ArrowLeft, LockKeyhole } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./OfficialLogin.css";

function OfficialLogin() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [officialId, setOfficialId] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!officialId || !password) {
      alert("Please enter Official ID and Password");
      return;
    }

    navigate("/official-dashboard");
  };

  return (
    <div className="official-login-page">

      {/* Top Header */}
      <header className="official-login-header">
        <button
          className="back-home-btn"
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={19} />
          Back to Home
        </button>

        <div className="official-brand">
          <div className="official-brand-icon">
            <ShieldCheck size={32} />
          </div>

          <div>
            <span>Government of India</span>
            <strong>RecordSetu</strong>
            <small>DEPARTMENT OF LAND RESOURCES</small>
          </div>
        </div>

        <div className="official-security-badge">
          <LockKeyhole size={18} />
          Secure Government Portal
        </div>
      </header>

      {/* Main */}
      <main className="official-login-main">

        {/* Left Information Section */}
        <section className="official-login-info">

          <div className="portal-label">
            OFFICIAL PORTAL
          </div>

          <h1>
            Secure Access for
            <span> Government Officials</span>
          </h1>

          <p className="official-description">
            Access land records, manage citizen requests and monitor
            digitization activities through the secure RecordSetu
            official portal.
          </p>

          <div className="security-points">

            <div className="security-point">
              <ShieldCheck size={22} />
              <div>
                <strong>Secure Government Access</strong>
                <span>Protected access for authorized officials</span>
              </div>
            </div>

            <div className="security-point">
              <ShieldCheck size={22} />
              <div>
                <strong>Authorized Personnel Only</strong>
                <span>Restricted access to government users</span>
              </div>
            </div>

            <div className="security-point">
              <ShieldCheck size={22} />
              <div>
                <strong>Protected Land Records</strong>
                <span>Government land data remains secure</span>
              </div>
            </div>

          </div>

        </section>

        {/* Login Card */}
        <section className="official-login-card">

          <div className="login-card-header">
            <div className="login-icon">
              <ShieldCheck size={28} />
            </div>

            <div>
              <span>OFFICIAL ACCESS</span>
              <h2>Official Login</h2>
            </div>
          </div>

          <p className="login-subtitle">
            Sign in to access the government official dashboard
          </p>

          <form onSubmit={handleLogin}>

            {/* Official ID */}
            <div className="form-group">
              <label htmlFor="officialId">
                Official ID
              </label>

              <input
                id="officialId"
                type="text"
                placeholder="Enter your official ID"
                value={officialId}
                onChange={(e) => setOfficialId(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">
                Password
              </label>

              <div className="password-wrapper">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="login-options">

              <label className="remember-option">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                className="forgot-password"
              >
                Forgot Password?
              </button>

            </div>

            {/* Login */}
            <button
              type="submit"
              className="official-login-btn"
            >
              <LockKeyhole size={19} />
              Sign In Securely
            </button>

          </form>

          <div className="login-security-note">
            <ShieldCheck size={18} />
            <span>
              Your connection is secure and protected.
            </span>
          </div>

        </section>

      </main>

      {/* Footer */}
      <footer className="official-login-footer">
        <span>© 2026 RecordSetu</span>
        <span>Department of Land Resources, Government of India</span>
        <span>Authorized Government Portal</span>
      </footer>

    </div>
  );
}

export default OfficialLogin;