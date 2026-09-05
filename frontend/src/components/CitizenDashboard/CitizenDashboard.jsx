import {
  ArrowRight,
  ClipboardCheck,
  Download,
  FileCheck2,
  FileSearch,
  Map,
  UserRound,
} from 'lucide-react'
import './CitizenDashboard.css'

const dashboardActions = [
  {
    title: 'Search Records',
    hindi: 'भूमि अभिलेख खोजें',
    description: 'Search land records by Khasra, owner or location.',
    icon: FileSearch,
  },
  {
    title: 'View Map',
    hindi: 'भू-नक्शा देखें',
    description: 'Explore parcel boundaries and cadastral maps.',
    icon: Map,
  },
  {
    title: 'View Khatauni',
    hindi: 'खतौनी देखें',
    description: 'View ownership and land record details.',
    icon: FileCheck2,
  },
  {
    title: 'Download Records',
    hindi: 'रिकॉर्ड डाउनलोड करें',
    description: 'Download available digital land documents.',
    icon: Download,
  },
]

function CitizenDashboard() {
  return (
    <section className="citizen-dashboard-section">
      <div className="page-container">

        {/* Section heading */}

        <div className="citizen-dashboard-heading">

          <div className="citizen-dashboard-title">

            <div className="citizen-dashboard-main-icon">
              <UserRound size={19} />
            </div>

            <div>
              <span className="section-kicker">
                CITIZEN SERVICES
              </span>

              <h2>
                नागरिक डैशबोर्ड
                <span> | Citizen Dashboard</span>
              </h2>
            </div>

          </div>

          <button className="dashboard-view-all">
            View All
            <ArrowRight size={14} />
          </button>

        </div>

        {/* Dashboard card */}

        <div className="citizen-dashboard-card">

          {/* Welcome */}

          <div className="citizen-welcome">

            <div className="citizen-avatar">
              <UserRound size={25} />
            </div>

            <div className="citizen-welcome-text">
              <span>
                नमस्ते, स्वागत है
              </span>

              <h3>
                Welcome, Citizen
              </h3>

              <p>
                Access your land records, applications and
                digital documents from one place.
              </p>
            </div>

            <div className="citizen-status">
              <span className="status-dot" />
              Services Available
            </div>

          </div>

          {/* Quick actions */}

          <div className="citizen-actions">

            {dashboardActions.map((action) => {
              const Icon = action.icon

              return (
                <button
                  className="citizen-action"
                  key={action.title}
                >
                  <div className="citizen-action-icon">
                    <Icon size={20} />
                  </div>

                  <div className="citizen-action-content">

                    <h4>
                      {action.title}
                    </h4>

                    <span>
                      {action.hindi}
                    </span>

                    <p>
                      {action.description}
                    </p>

                  </div>

                  <ArrowRight
                    className="citizen-action-arrow"
                    size={16}
                  />
                </button>
              )
            })}

          </div>

          {/* Activity */}

          <div className="citizen-activity-grid">

            {/* Application */}

            <div className="citizen-activity-card">

              <div className="activity-header">

                <div className="activity-heading">

                  <div className="activity-icon application-icon">
                    <ClipboardCheck size={18} />
                  </div>

                  <div>
                    <h3>
                      Track Application
                    </h3>

                    <span>
                      आवेदन की स्थिति
                    </span>
                  </div>

                </div>

                <span className="activity-label">
                  ACTIVE
                </span>

              </div>

              <div className="application-number">
                RS-2026-00124
              </div>

              <div className="application-info">
                <span>
                  Land Record Request
                </span>

                <strong>
                  Processing
                </strong>
              </div>

              <div className="progress-track">
                <div className="progress-fill" />
              </div>

              <div className="progress-labels">
                <span>Submitted</span>
                <span>Under Review</span>
                <span>Completed</span>
              </div>

              <button className="activity-button">
                Track Application
                <ArrowRight size={14} />
              </button>

            </div>

            {/* Verification */}

            <div className="citizen-activity-card">

              <div className="activity-header">

                <div className="activity-heading">

                  <div className="activity-icon verification-icon">
                    <FileCheck2 size={18} />
                  </div>

                  <div>
                    <h3>
                      Verify Document
                    </h3>

                    <span>
                      दस्तावेज़ सत्यापन
                    </span>
                  </div>

                </div>

                <span className="verified-label">
                  VERIFIED
                </span>

              </div>

              <div className="verification-document">

                <div className="document-icon">
                  <FileCheck2 size={22} />
                </div>

                <div>
                  <strong>
                    Land Record Document
                  </strong>

                  <span>
                    Uploaded on 04 Sep 2026
                  </span>
                </div>

              </div>

              <div className="verification-result">
                <div>
                  <span>
                    Verification Result
                  </span>

                  <strong>
                    Successfully Verified
                  </strong>
                </div>

                <div className="verification-score">
                  98%
                </div>
              </div>

              <button className="activity-button secondary">
                View Verification
                <ArrowRight size={14} />
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

export default CitizenDashboard