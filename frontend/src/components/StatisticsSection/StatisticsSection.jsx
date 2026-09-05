import {
  Building2,
  FileCheck2,
  MapPinned,
  ScrollText,
} from 'lucide-react'
import './StatisticsSection.css'

const statistics = [
  {
    value: '6.30 Lakhs+',
    label: 'Villages Digitized',
    description: 'National progress indicator',
    icon: MapPinned,
  },
  {
    value: '3.33 Crore+',
    label: 'Maps Digitized',
    description: 'Cadastral map progress',
    icon: ScrollText,
  },
  {
    value: '5,000+',
    label: 'SROs Integrated',
    description: 'Registration offices',
    icon: Building2,
  },
  {
    value: '92%',
    label: 'RoR Digitized',
    description: 'Record of Rights',
    icon: FileCheck2,
  },
]

function StatisticsSection() {
  return (
    <section className="statistics-section">
      <div className="page-container">

        <div className="statistics-heading">
          <div>
            <span className="statistics-kicker">
              DILRMP PROGRESS
            </span>

            <h2>
              National Land Records Digitization
            </h2>

            <p>
              Key indicators reflecting the progress of
              land record digitization and integration.
            </p>
          </div>

          <span className="statistics-demo-label">
            Indicative / Demo Data
          </span>
        </div>

        <div className="statistics-grid">
          {statistics.map((stat) => {
            const Icon = stat.icon

            return (
              <article
                className="statistic-card"
                key={stat.label}
              >
                <div className="statistic-icon">
                  <Icon size={22} />
                </div>

                <div className="statistic-content">
                  <strong className="statistic-value">
                    {stat.value}
                  </strong>

                  <span className="statistic-label">
                    {stat.label}
                  </span>

                  <small className="statistic-description">
                    {stat.description}
                  </small>
                </div>
              </article>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default StatisticsSection