import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  Lock,
  User,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

import "./CitizenLogin.css";

function CitizenLogin() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Frontend-only login for now
    navigate("/citizen-dashboard");
  };

  return (
    <div className="citizen-login-page">

      {/* ================= HEADER ================= */}

      <header className="citizen-login-header">

        <button
          className="citizen-back-button"
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={17} />
          Back to Home
        </button>


        <div className="citizen-login-brand">

          <div className="citizen-login-logo">
            <FileText size={21} />
          </div>

          <div>
            <strong>RecordSetu</strong>
            <span>Land Records Portal</span>
          </div>

        </div>

      </header>


      {/* ================= MAIN ================= */}

      <main className="citizen-login-main">

        <div className="citizen-login-card">


          {/* CARD HEADER */}

          <div className="citizen-login-card-header">

            <div className="citizen-login-icon">
              <User size={21} />
            </div>

            <span className="citizen-login-overline">
              CITIZEN SERVICES
            </span>

            <h1>
              Citizen Login
            </h1>

            <p>
              Access your land records and track
              your applications securely.
            </p>

          </div>


          {/* ================= FORM ================= */}

          <form
            className="citizen-login-form"
            onSubmit={handleLogin}
          >

            {/* MOBILE */}

            <div className="citizen-form-group">

              <label>
                Mobile Number
              </label>

              <div className="citizen-input-wrapper">

                <User size={16} />

                <input
                  type="tel"
                  placeholder="Enter registered mobile number"
                  value={mobile}
                  onChange={(e) =>
                    setMobile(e.target.value)
                  }
                  maxLength={10}
                  required
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div className="citizen-form-group">

              <div className="citizen-label-row">

                <label>
                  Password
                </label>

                <button
                  type="button"
                  className="forgot-password"
                >
                  Forgot password?
                </button>

              </div>


              <div className="citizen-input-wrapper">

                <Lock size={16} />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>

              </div>

            </div>


            {/* REMEMBER */}

            <label className="remember-me">

              <input type="checkbox" />

              <span>
                Keep me signed in
              </span>

            </label>


            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="citizen-login-button"
            >

              Sign In

              <ArrowRight size={17} />

            </button>

          </form>


          {/* ================= SECURITY ================= */}

          <div className="citizen-login-security">

            <ShieldCheck size={17} />

            <div>

              <strong>
                Secure Government Service
              </strong>

              <span>
                Your information is protected
                using secure authentication.
              </span>

            </div>

          </div>


          {/* ================= REGISTER ================= */}

          <div className="citizen-register">

            <span>
              Don't have an account?
            </span>

            <button type="button">
              Register as Citizen
            </button>

          </div>

        </div>


        {/* ================= FOOTNOTE ================= */}

        <div className="citizen-login-footer">

          <span>
            © 2026 RecordSetu
          </span>

          <span>
            Department of Land Resources
          </span>

          <span>
            Government Portal
          </span>

        </div>

      </main>

    </div>
  );
}

export default CitizenLogin;