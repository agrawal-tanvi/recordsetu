import { Link } from "react-router-dom";
import "./CitizenLogin.css";

function CitizenLogin() {
  return (
    <main className="citizen-login-page">
      <div className="citizen-login-container">

        {/* Left Information Section */}
        <section className="citizen-info">
          <span className="citizen-badge">
            RECORDSETU • CITIZEN SERVICES
          </span>

          <h1>
            Access Your
            <span> Land Records</span>
          </h1>

          <p>
            Securely access your land records, ownership information,
            property details and digital land services through RecordSetu.
          </p>

          <div className="citizen-features">

            <div className="citizen-feature">
              <div className="feature-icon">📄</div>
              <div>
                <h3>View Land Records</h3>
                <p>Access your digital land record information.</p>
              </div>
            </div>

            <div className="citizen-feature">
              <div className="feature-icon">🏠</div>
              <div>
                <h3>Ownership Details</h3>
                <p>View available property ownership information.</p>
              </div>
            </div>

            <div className="citizen-feature">
              <div className="feature-icon">🔒</div>
              <div>
                <h3>Secure Access</h3>
                <p>Your information is protected through secure login.</p>
              </div>
            </div>

          </div>
        </section>

        {/* Login Card */}
        <section className="citizen-login-card">

          <div className="login-card-header">
            <div className="login-user-icon">👤</div>

            <h2>Citizen Login</h2>

            <p>
              Login to access your RecordSetu services
            </p>
          </div>

          <form>

            <div className="form-group">
              <label htmlFor="mobile">
                Mobile Number
              </label>

              <input
                id="mobile"
                type="tel"
                placeholder="Enter your registered mobile number"
                maxLength="10"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="Enter your password"
              />
              <a href="#" className="forgot-password">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="citizen-login-submit"
              onClick={(e) => e.preventDefault()}
            >
              Login Securely
            </button>

          </form>

          <div className="login-divider">
            <span>OR</span>
          </div>

          <button className="otp-login-button">
            Login with OTP
          </button>

          <div className="new-user">
            <span>Don't have an account?</span>
            <a href="#">Register as Citizen</a>
          </div>

          <div className="back-home">
            <Link to="/login">
              ← Back to Login Options
            </Link>
          </div>

        </section>

      </div>
    </main>
  );
}

export default CitizenLogin;