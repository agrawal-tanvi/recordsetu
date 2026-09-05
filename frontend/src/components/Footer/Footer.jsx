import './Footer.css'

const citizenLinks = [
  'Search Land Records',
  'Bhu-Naksha',
  'Khatauni',
  'Application Status',
  'Document Verification',
]

const officialLinks = [
  'Official Login',
  'Document Processing',
  'Verification Queue',
  'Reports & Analytics',
  'GIS Management',
]

const importantLinks = [
  'About Record Setu',
  'DILRMP',
  'Government Orders',
  'Notices',
  'Help & Support',
]

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <footer className="site-footer">

      {/* Main Footer */}

      <div className="footer-main">
        <div className="page-container">

          <div className="footer-grid">

            {/* Brand */}

            <div className="footer-brand">

              <div className="footer-brand-heading">

                <div className="footer-logo-mark">
                  🛡
                </div>

                <div>
                  <strong>Record Setu</strong>
                  <span>रिकॉर्ड सेतु</span>
                </div>

              </div>

              <p>
                A unified digital platform for secure,
                transparent and accessible land record
                services for citizens and government
                officials.
              </p>

              <div className="footer-socials">

                <button
                  aria-label="Facebook"
                  title="Facebook"
                >
                  f
                </button>

                <button
                  aria-label="X"
                  title="X"
                >
                  X
                </button>

                <button
                  aria-label="Instagram"
                  title="Instagram"
                >
                  ◎
                </button>

                <button
                  aria-label="YouTube"
                  title="YouTube"
                >
                  ▶
                </button>

              </div>

            </div>

            {/* Citizen Services */}

            <div className="footer-column">

              <h3>Citizen Services</h3>

              <span className="footer-column-hindi">
                नागरिक सेवाएं
              </span>

              <ul>
                {citizenLinks.map((link) => (
                  <li key={link}>
                    <a href="#">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>

            </div>

            {/* Official Services */}

            <div className="footer-column">

              <h3>Official Services</h3>

              <span className="footer-column-hindi">
                अधिकारी सेवाएं
              </span>

              <ul>
                {officialLinks.map((link) => (
                  <li key={link}>
                    <a href="#">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>

            </div>

            {/* Important Links */}

            <div className="footer-column">

              <h3>Important Links</h3>

              <span className="footer-column-hindi">
                महत्वपूर्ण लिंक
              </span>

              <ul>
                {importantLinks.map((link) => (
                  <li key={link}>
                    <a href="#">
                      {link} ↗
                    </a>
                  </li>
                ))}
              </ul>

            </div>

            {/* Contact */}

            <div className="footer-contact">

              <h3>Contact & Support</h3>

              <span className="footer-column-hindi">
                संपर्क एवं सहायता
              </span>

              <div className="contact-item">

                <div className="contact-icon">
                  ☎
                </div>

                <div>
                  <span>Helpline</span>
                  <strong>1800-XXX-XXXX</strong>
                </div>

              </div>

              <div className="contact-item">

                <div className="contact-icon">
                  ✉
                </div>

                <div>
                  <span>Email</span>
                  <strong>
                    support@recordsetu.gov.in
                  </strong>
                </div>

              </div>

              <div className="contact-item">

                <div className="contact-icon">
                  ●
                </div>

                <div>
                  <span>Department</span>
                  <strong>
                    Land Records Department
                  </strong>
                </div>

              </div>

              <button className="footer-help-button">
                ?
                <span>Help & Support</span>
              </button>

            </div>

          </div>

        </div>
      </div>

      {/* Government Strip */}

      <div className="footer-government-strip">

        <div className="page-container">

          <div className="government-strip-content">

            <div>
              <strong>Government of India</strong>
              <span>Digital India Initiative</span>
            </div>

            <div className="government-divider"></div>

            <div>
              <strong>
                Department of Land Resources
              </strong>

              <span>
                Ministry of Rural Development
              </span>
            </div>

            <div className="government-divider"></div>

            <div>
              <strong>DILRMP</strong>

              <span>
                Digital India Land Records
                Modernization Programme
              </span>
            </div>

          </div>

        </div>

      </div>

      {/* Bottom Bar */}

      <div className="footer-bottom">

        <div className="page-container">

          <div className="footer-bottom-content">

            <div className="footer-copyright">
              © 2026 Record Setu. All Rights Reserved.
            </div>

            <div className="footer-legal-links">

              <a href="#">
                Privacy Policy
              </a>

              <a href="#">
                Terms of Use
              </a>

              <a href="#">
                Accessibility
              </a>

              <a href="#">
                Sitemap
              </a>

            </div>

            <button
              className="back-to-top"
              onClick={scrollToTop}
            >
              ↑ Top
            </button>

          </div>

        </div>

      </div>

    </footer>
  )
}

export default Footer