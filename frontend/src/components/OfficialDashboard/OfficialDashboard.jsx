import {
  AlertTriangle,
  ArrowRight,
  Bot,
  CheckCircle2,
  Clock3,
  FileCheck2,
  FileText,
  ScanText,
  ShieldCheck,
  UserRound,
  XCircle,
} from 'lucide-react'
import './OfficialDashboard.css'

const statistics = [
  {
    label: 'Documents Received',
    value: '1,284',
    change: '+12.4%',
    icon: FileText,
    type: 'blue',
  },
  {
    label: 'AI Verified',
    value: '942',
    change: '+18.2%',
    icon: Bot,
    type: 'green',
  },
  {
    label: 'Pending Review',
    value: '217',
    change: 'Needs attention',
    icon: Clock3,
    type: 'yellow',
  },
  {
    label: 'Approved',
    value: '1,025',
    change: '+9.8%',
    icon: CheckCircle2,
    type: 'teal',
  },
]

const verificationQueue = [
  {
    id: 'RS-DOC-10482',
    document: 'Khatauni Record',
    citizen: 'Ramesh Kumar',
    location: 'Khairpur, Rampur',
    confidence: '98%',
    status: 'AI Verified',
    statusType: 'verified',
  },
  {
    id: 'RS-DOC-10481',
    document: 'Sale Deed',
    citizen: 'Suresh Singh',
    location: 'Lakhanpur, Sitapur',
    confidence: '91%',
    status: 'Review Required',
    statusType: 'review',
  },
  {
    id: 'RS-DOC-10480',
    document: 'Land Ownership Record',
    citizen: 'Anita Devi',
    location: 'Bela, Lucknow',
    confidence: '76%',
    status: 'Manual Review',
    statusType: 'warning',
  },
  {
    id: 'RS-DOC-10479',
    document: 'Mutation Certificate',
    citizen: 'Vijay Sharma',
    location: 'Rampur, Hardoi',
    confidence: '99%',
    status: 'AI Verified',
    statusType: 'verified',
  },
]

function OfficialDashboard() {
  return (
    <section className="official-dashboard-section">
      <div className="page-container">

        {/* Heading */}

        <div className="official-heading">

          <div className="official-title">

            <div className="official-main-icon">
              <ShieldCheck size={19} />
            </div>

            <div>
              <span className="section-kicker">
                GOVERNMENT OPERATIONS
              </span>

              <h2>
                अधिकारी डैशबोर्ड
                <span> | Official Dashboard</span>
              </h2>
            </div>

          </div>

          <div className="official-user">

            <div className="official-user-icon">
              <UserRound size={15} />
            </div>

            <div>
              <strong>
                District Officer
              </strong>

              <span>
                Land Records Department
              </span>
            </div>

          </div>

        </div>

        {/* Dashboard */}

        <div className="official-dashboard-card">

          {/* Stats */}

          <div className="official-stat-grid">

            {statistics.map((stat) => {
              const Icon = stat.icon

              return (
                <div
                  className="official-stat"
                  key={stat.label}
                >

                  <div className={`official-stat-icon ${stat.type}`}>
                    <Icon size={18} />
                  </div>

                  <div className="official-stat-content">

                    <span>
                      {stat.label}
                    </span>

                    <strong>
                      {stat.value}
                    </strong>

                    <small>
                      {stat.change}
                    </small>

                  </div>

                </div>
              )
            })}

          </div>

          {/* Processing pipeline */}

          <div className="processing-section">

            <div className="processing-heading">

              <div>
                <h3>
                  Document Processing Pipeline
                </h3>

                <span>
                  दस्तावेज़ प्रसंस्करण स्थिति
                </span>
              </div>

              <span className="processing-live">
                <i />
                LIVE
              </span>

            </div>

            <div className="processing-pipeline">

              <div className="pipeline-step completed">

                <div className="pipeline-icon">
                  <FileText size={17} />
                </div>

                <strong>
                  Uploaded
                </strong>

                <span>
                  1,284
                </span>

              </div>

              <div className="pipeline-line completed-line" />

              <div className="pipeline-step completed">

                <div className="pipeline-icon">
                  <ScanText size={17} />
                </div>

                <strong>
                  OCR & Extraction
                </strong>

                <span>
                  1,201
                </span>

              </div>

              <div className="pipeline-line completed-line" />

              <div className="pipeline-step completed">

                <div className="pipeline-icon">
                  <Bot size={17} />
                </div>

                <strong>
                  AI Verification
                </strong>

                <span>
                  942
                </span>

              </div>

              <div className="pipeline-line pending-line" />

              <div className="pipeline-step pending">

                <div className="pipeline-icon">
                  <ShieldCheck size={17} />
                </div>

                <strong>
                  Official Review
                </strong>

                <span>
                  217
                </span>

              </div>

              <div className="pipeline-line pending-line" />

              <div className="pipeline-step">

                <div className="pipeline-icon">
                  <CheckCircle2 size={17} />
                </div>

                <strong>
                  Approved
                </strong>

                <span>
                  1,025
                </span>

              </div>

            </div>

          </div>

          {/* Verification queue */}

          <div className="verification-section">

            <div className="verification-heading">

              <div>
                <h3>
                  Verification Queue
                </h3>

                <span>
                  दस्तावेज़ सत्यापन कतार
                </span>
              </div>

              <button className="queue-view-all">
                View Full Queue
                <ArrowRight size={14} />
              </button>

            </div>

            <div className="queue-table-wrapper">

              <table className="queue-table">

                <thead>
                  <tr>
                    <th>Document ID</th>
                    <th>Document</th>
                    <th>Citizen</th>
                    <th>Location</th>
                    <th>AI Confidence</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>

                  {verificationQueue.map((item) => (
                    <tr key={item.id}>

                      <td>
                        <strong className="document-id">
                          {item.id}
                        </strong>
                      </td>

                      <td>
                        {item.document}
                      </td>

                      <td>
                        {item.citizen}
                      </td>

                      <td>
                        {item.location}
                      </td>

                      <td>
                        <span
                          className={`confidence ${
                            item.confidence === '76%'
                              ? 'low-confidence'
                              : ''
                          }`}
                        >
                          {item.confidence}
                        </span>
                      </td>

                      <td>

                        <span
                          className={`queue-status ${item.statusType}`}
                        >

                          {item.statusType === 'verified' && (
                            <CheckCircle2 size={12} />
                          )}

                          {item.statusType === 'review' && (
                            <AlertTriangle size={12} />
                          )}

                          {item.statusType === 'warning' && (
                            <Clock3 size={12} />
                          )}

                          {item.status}

                        </span>

                      </td>

                      <td>

                        <div className="queue-actions">

                          <button
                            className="approve-action"
                            title="Approve"
                          >
                            <CheckCircle2 size={14} />
                          </button>

                          <button
                            className="review-action"
                            title="Review"
                          >
                            <FileCheck2 size={14} />
                          </button>

                          <button
                            className="reject-action"
                            title="Reject"
                          >
                            <XCircle size={14} />
                          </button>

                        </div>

                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

export default OfficialDashboard