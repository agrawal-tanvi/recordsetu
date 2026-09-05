import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  return (
    <main className="login-page">

      <div className="login-card">

        <div className="login-header">

          <h1>RecordSetu Login</h1>

          <p>
            Access Digital Land Record Services
          </p>

        </div>

        <div className="login-options">

          {/* Citizen */}
          <button
            className="login-option"
            onClick={() => navigate("/citizen-login")}
          >

            <span className="login-option-icon">
              👤
            </span>

            <div>
              <strong>
                Citizen Login
              </strong>

              <small>
                Login to access your land records and services
              </small>
            </div>

          </button>

          {/* Government Official */}
          <button
            className="login-option"
            onClick={() => navigate("/official-login")}
          >

            <span className="login-option-icon">
              🏛️
            </span>

            <div>
              <strong>
                Government Official
              </strong>

              <small>
                Login for official land record services
              </small>
            </div>

          </button>

          {/* Administrator */}
          <button
            className="login-option"
            onClick={() => navigate("/admin-login")}
          >

            <span className="login-option-icon">
              ⚙️
            </span>

            <div>
              <strong>
                Department / Administrator
              </strong>

              <small>
                Administrative access to RecordSetu
              </small>
            </div>

          </button>

        </div>

      </div>

    </main>
  );
}

export default Login;