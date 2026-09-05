import {
  ArrowRight,
  ExternalLink,
  FileText,
  Link2,
  Megaphone,
} from 'lucide-react'
import './GovernmentInfo.css'

const notices = [
  {
    title: 'Record Setu citizen services are available through the portal.',
    date: '05 Sep 2026',
    tag: 'NEW',
  },
  {
    title: 'Guidelines for uploading and verifying land documents.',
    date: '02 Sep 2026',
    tag: 'NOTICE',
  },
  {
    title: 'Digital land record services and cadastral map access.',
    date: '28 Aug 2026',
    tag: 'UPDATE',
  },
  {
    title: 'Citizen grievance registration and application tracking.',
    date: '22 Aug 2026',
    tag: 'INFO',
  },
]

const quickLinks = [
  'Digital India',
  'Department of Land Resources',
  'DILRMP',
  'Bhu-Naksha',
  'State Land Records',
  'Citizen Grievance Portal',
]

function GovernmentInfo() {
  return (
    <section className="government-info-section">
      <div className="page-container">

        <div className="government-info-heading">
          <span className="section-kicker">
            INFORMATION CENTRE
          </span>

          <h2>
            Notices & Government Resources
          </h2>

          <p>
            Stay informed about important updates, services
            and official resources.
          </p>
        </div>

        <div className="government-info-grid">

          {/* Notices */}

          <div className="info-panel">

            <div className="info-panel-header">
              <div className="info-panel-title">
                <div className="info-panel-icon">
                  <Megaphone size={19} />
                </div>

                <div>
                  <h3>
                    Important Notices
                  </h3>

                  <span>
                    महत्वपूर्ण सूचनाएँ
                  </span>
                </div>
              </div>

              <button className="text-button">
                View All
                <ArrowRight size={14} />
              </button>
            </div>

            <div className="notice-list">

              {notices.map((notice) => (
                <div
                  className="notice-item"
                  key={notice.title}
                >
                  <div className="notice-icon">
                    <FileText size={16} />
                  </div>

                  <div className="notice-content">
                    <div className="notice-title-row">
                      <h4>
                        {notice.title}
                      </h4>

                      <span className="notice-tag">
                        {notice.tag}
                      </span>
                    </div>

                    <span className="notice-date">
                      {notice.date}
                    </span>
                  </div>
                </div>
              ))}

            </div>

          </div>

          {/* Quick Links */}

          <div className="info-panel">

            <div className="info-panel-header">
              <div className="info-panel-title">
                <div className="info-panel-icon">
                  <Link2 size={19} />
                </div>

                <div>
                  <h3>
                    Quick Links
                  </h3>

                  <span>
                    उपयोगी लिंक
                  </span>
                </div>
              </div>

              <button className="text-button">
                View All
                <ArrowRight size={14} />
              </button>
            </div>

            <div className="quick-links-list">

              {quickLinks.map((link) => (
                <button
                  className="quick-link"
                  key={link}
                >
                  <span className="quick-link-left">
                    <ExternalLink size={14} />
                    {link}
                  </span>

                  <ArrowRight size={14} />
                </button>
              ))}

            </div>

          </div>

        </div>

        <div className="government-disclaimer">
          <span>
            Official information and service availability may
            vary by state and department.
          </span>

          <span>
            Record Setu Prototype
          </span>
        </div>

      </div>
    </section>
  )
}

export default GovernmentInfo