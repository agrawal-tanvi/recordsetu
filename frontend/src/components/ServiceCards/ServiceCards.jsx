import {
  ArrowRight,
  Bot,
  ClipboardList,
  FileCheck2,
  FileSearch,
  Map,
  MessageSquareWarning,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import './ServiceCards.css'

const services = [
  {
    title: 'Land Records',
    hindiTitle: 'भूमि अभिलेख',
    description:
      'Search and access land record information using location and survey details.',
    icon: FileSearch,
    path: '/land-records',
    tag: 'Search',
  },
  {
    title: 'Bhu-Naksha',
    hindiTitle: 'भू-नक्शा',
    description:
      'Explore digital cadastral maps and view parcel-level land information.',
    icon: Map,
    path: '/bhu-naksha',
    tag: 'Maps',
  },
  {
    title: 'Upload & Verify',
    hindiTitle: 'दस्तावेज़ अपलोड',
    description:
      'Upload land documents and submit them for verification through the platform.',
    icon: FileCheck2,
    path: '/upload-document',
    tag: 'Documents',
  },
  {
    title: 'AI Verification',
    hindiTitle: 'AI सत्यापन',
    description:
      'Use AI-assisted checks to identify document inconsistencies and verification signals.',
    icon: Bot,
    path: '/ai-verification',
    tag: 'AI Powered',
  },
  {
    title: 'Grievance',
    hindiTitle: 'शिकायत',
    description:
      'Register a grievance, receive a reference number and track its status.',
    icon: MessageSquareWarning,
    path: '/grievance',
    tag: 'Support',
  },
  {
    title: 'Application Status',
    hindiTitle: 'आवेदन स्थिति',
    description:
      'Track submitted applications and view the latest processing status.',
    icon: ClipboardList,
    path: '/application-status',
    tag: 'Track',
  },
]

function ServiceCards() {
  return (
    <section className="services-section">
      <div className="page-container">

        <div className="services-heading">
          <div>
            <span className="section-kicker">
              DIGITAL SERVICES
            </span>

            <h2>
              Everything you need in one place
            </h2>

            <p>
              Access Record Setu services for land records,
              documents, maps, verification and support.
            </p>
          </div>
        </div>

        <div className="services-grid">
          {services.map((service) => {
            const Icon = service.icon

            return (
              <article
                className="service-card"
                key={service.title}
              >
                <div className="service-card-header">

                  <div className="service-icon">
                    <Icon size={22} />
                  </div>

                  <span className="service-tag">
                    {service.tag}
                  </span>

                </div>

                <h3>
                  {service.title}
                </h3>

                <span className="service-hindi">
                  {service.hindiTitle}
                </span>

                <p>
                  {service.description}
                </p>

                <Link
                  to={service.path}
                  className="service-link"
                >
                  <span>
                    Open Service
                  </span>

                  <ArrowRight size={16} />
                </Link>
              </article>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default ServiceCards