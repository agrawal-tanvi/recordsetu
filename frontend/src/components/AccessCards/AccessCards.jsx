import {
  ArrowRight,
  Building2,
  CheckCircle2,
  UserRound,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import './AccessCards.css'

const accessOptions = [
  {
    type: 'Citizen',
    title: 'Citizen Services',
    hindiTitle: 'नागरिक सेवाएँ',
    description:
      'Search land records, upload documents, verify records and track your service requests through Record Setu.',
    icon: UserRound,
    path: '/login/citizen',
    buttonText: 'Citizen Login',
    features: [
      'Search Land Records',
      'Upload Documents',
      'Track Requests',
    ],
  },
  {
    type: 'Government Official',
    title: 'Government Official',
    hindiTitle: 'सरकारी अधिकारी',
    description:
      'Access official workflows for document verification, land-record review, application processing and administrative services.',
    icon: Building2,
    path: '/login/official',
    buttonText: 'Official Login',
    features: [
      'Verify Documents',
      'Review Applications',
      'Official Dashboard',
    ],
  },
]

function AccessCards() {
  return (
    <section className="access-section">
      <div className="page-container">

        <div className="access-heading">
          <span className="section-kicker">
            ACCESS RECORD SETU
          </span>

          <h2>
            Choose your service
          </h2>

          <p>
            Select the access option that matches your role.
          </p>
        </div>

        <div className="access-grid">

          {accessOptions.map((option) => {
            const Icon = option.icon

            return (
              <article
                className="access-card"
                key={option.type}
              >
                <div className="access-card-top">

                  <div className="access-icon">
                    <Icon size={25} />
                  </div>

                  <div className="access-title">
                    <span>
                      {option.type}
                    </span>

                    <h3>
                      {option.title}
                    </h3>

                    <small>
                      {option.hindiTitle}
                    </small>
                  </div>

                </div>

                <p className="access-description">
                  {option.description}
                </p>

                <ul className="access-features">
                  {option.features.map((feature) => (
                    <li key={feature}>
                      <CheckCircle2 size={15} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={option.path}
                  className="access-button"
                >
                  {option.buttonText}

                  <ArrowRight size={17} />
                </Link>
              </article>
            )
          })}

        </div>

        <div className="access-note">
          <span className="access-note-dot" />

          <span>
            Administrator access is restricted to authorized
            personnel and is not available through the public
            citizen entry point.
          </span>
        </div>

      </div>
    </section>
  )
}

export default AccessCards