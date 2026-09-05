import {
  Download,
  Layers,
  LocateFixed,
  Map,
  Minus,
  Plus,
  Search,
} from 'lucide-react'
import './BhuNakshaPreview.css'

const parcels = [
  { number: '123', className: 'parcel parcel-1' },
  { number: '124/1', className: 'parcel parcel-2' },
  { number: '124/2', className: 'parcel parcel-selected' },
  { number: '125', className: 'parcel parcel-4' },
  { number: '126', className: 'parcel parcel-5' },
  { number: '127', className: 'parcel parcel-6' },
]

function BhuNakshaPreview() {
  return (
    <section className="bhu-section">
      <div className="page-container">

        {/* Heading */}

        <div className="bhu-heading">

          <div>
            <span className="section-kicker">
              DIGITAL CADASTRAL MAP
            </span>

            <h2>
              भू-नक्शा <span>| Bhu-Naksha</span>
            </h2>

            <p>
              Explore cadastral maps, parcel boundaries and
              location-based land information.
            </p>
          </div>

          <button className="bhu-full-button">
            <Map size={15} />
            View Full Map
          </button>

        </div>

        {/* Main map panel */}

        <div className="bhu-map-card">

          {/* Map */}

          <div className="map-area">

            {/* Map toolbar */}

            <div className="map-topbar">

              <div className="map-layers">
                <button className="map-tab active">
                  Map
                </button>

                <button className="map-tab">
                  Satellite
                </button>

                <button className="map-tab">
                  Hybrid
                </button>
              </div>

              <div className="map-search">
                <Search size={13} />
                Search Parcel
              </div>

            </div>

            {/* Fake map */}

            <div className="fake-map">

              <div className="map-grid-lines" />

              <div className="road road-one" />
              <div className="road road-two" />
              <div className="road road-three" />

              {parcels.map((parcel) => (
                <div
                  key={parcel.number}
                  className={parcel.className}
                >
                  <span>{parcel.number}</span>
                </div>
              ))}

              {/* Location marker */}

              <div className="map-marker">
                <LocateFixed size={15} />
              </div>

              {/* Controls */}

              <div className="map-controls">

                <button>
                  <Plus size={17} />
                </button>

                <button>
                  <Minus size={17} />
                </button>

                <button>
                  <LocateFixed size={16} />
                </button>

                <button>
                  <Layers size={16} />
                </button>

              </div>

              {/* Scale */}

              <div className="map-scale">
                <span />
                <small>0</small>
                <small>100</small>
                <small>200</small>
                <small>400 m</small>
              </div>

              {/* Legend */}

              <div className="map-legend">

                <div>
                  <i className="legend-village" />
                  Village Boundary
                </div>

                <div>
                  <i className="legend-parcel" />
                  Parcel Boundary
                </div>

                <div>
                  <i className="legend-selected" />
                  Selected Parcel
                </div>

              </div>

            </div>

          </div>

          {/* Parcel information */}

          <aside className="parcel-details">

            <div className="parcel-details-header">

              <div className="parcel-details-icon">
                <Map size={17} />
              </div>

              <div>
                <h3>
                  Parcel Details
                </h3>

                <span>
                  चयनित भूमि विवरण
                </span>
              </div>

            </div>

            <div className="parcel-number">
              <span>KHASRA NO.</span>
              <strong>124/2</strong>
            </div>

            <div className="parcel-info">

              <div>
                <span>Owner Name</span>
                <strong>Ram Kumar</strong>
              </div>

              <div>
                <span>Village</span>
                <strong>Khairpur</strong>
              </div>

              <div>
                <span>Tehsil</span>
                <strong>Rampur</strong>
              </div>

              <div>
                <span>District</span>
                <strong>Sitapur</strong>
              </div>

              <div>
                <span>Area</span>
                <strong>1.25 Hectare</strong>
              </div>

              <div>
                <span>Land Type</span>
                <strong>Agricultural</strong>
              </div>

            </div>

            <div className="parcel-status">
              <span>Status</span>

              <strong>
                Verified
              </strong>
            </div>

            <div className="parcel-actions">

              <button className="parcel-primary">
                View Khatauni
              </button>

              <button className="parcel-secondary">
                <Download size={14} />
                Download Map
              </button>

            </div>

          </aside>

        </div>

      </div>
    </section>
  )
}

export default BhuNakshaPreview