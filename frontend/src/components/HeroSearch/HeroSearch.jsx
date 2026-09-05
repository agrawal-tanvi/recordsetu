import './HeroSearch.css'

function HeroSearch() {
  return (
    <section className="hero-search">

      <div className="hero-search-content">

        <span className="hero-search-hindi">
          भूमि अभिलेख खोज
        </span>

        <h1>
          भारत के भूमि अभिलेखों तक आसान और विश्वसनीय पहुंच
        </h1>

        <p>
          Simple, Secure & Trusted Access to Land Records
        </p>

        <div className="hero-search-box">

          <div className="hero-search-field">

            <label>
              राज्य / State
            </label>

            <select defaultValue="Uttar Pradesh">
              <option>Uttar Pradesh</option>
              <option>Maharashtra</option>
              <option>West Bengal</option>
              <option>Bihar</option>
            </select>

          </div>

          <div className="hero-search-field">

            <label>
              जिला / District
            </label>

            <select defaultValue="Sitapur">
              <option>Sitapur</option>
              <option>Lucknow</option>
              <option>Kanpur</option>
            </select>

          </div>

          <div className="hero-search-field">

            <label>
              तहसील / Tehsil
            </label>

            <select defaultValue="Rampur">
              <option>Rampur</option>
              <option>Sadar</option>
            </select>

          </div>

          <div className="hero-search-field">

            <label>
              ग्राम / Village
            </label>

            <select defaultValue="Khaipur">
              <option>Khaipur</option>
              <option>Lakhanpur</option>
            </select>

          </div>

        </div>

        <div className="hero-search-button-row">

          <button className="hero-search-button">
            🔍
            <span>खोजें / Search Records</span>
          </button>

        </div>

      </div>

    </section>
  )
}

export default HeroSearch