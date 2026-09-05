import { useNavigate } from 'react-router-dom'

import {
  Accessibility,
  CircleHelp,
  LogIn,
  Mail,
  Moon,
} from 'lucide-react'

import './Header.css'

function Header() {
  const navigate = useNavigate()

  return (
    <header className="site-header">

      {/* Government identity row */}
      <div className="government-header">
        <div className="header-container government-header-inner">

          {/* Government identity */}
          <div className="government-identity">

            <div
              className="emblem-placeholder"
              aria-label="Government emblem placeholder"
            >
              <span>भारत</span>
              <strong>सरकार</strong>
            </div>

            <div className="government-text">

              <span className="government-hindi">
                भारत सरकार
              </span>

              <span className="government-english">
                Government of India
              </span>

              <span className="department-hindi">
                भूमि संसाधन विभाग
              </span>

              <span className="department-english">
                Department of Land Resources
              </span>

            </div>
          </div>

          {/* RecordSetu brand */}
          <div className="record-setu-brand">

            <div className="brand-mark">
              <span className="brand-mark-line" />

              <span className="brand-mark-center">
                RS
              </span>

              <span className="brand-mark-line" />
            </div>

            <div className="brand-text">

              <strong>
                RECORD SETU
              </strong>

              <span>
                भूमि अभिलेखों से विश्वास तक
              </span>

              <small>
                From Land Records to Trusted Digital Records
              </small>

            </div>
          </div>

          {/* Digital India identity */}
          <div className="digital-identity">

            <div className="digital-mark">
              <span>Digital</span>
              <strong>India</strong>
            </div>

            <div className="service-message">

              <span>
                जन सेवा में सदैव तत्पर
              </span>

              <small>
                Always at your service
              </small>

            </div>

          </div>

        </div>
      </div>

      {/* Utility / navigation bar */}
      <div className="utility-bar">

        <div className="header-container utility-inner">

          {/* Main navigation */}
          <nav className="main-navigation">

            <button
              className="nav-link"
              onClick={() => navigate('/')}
            >
              Home
            </button>

            <button
              className="nav-link"
              onClick={() => navigate('/land-records')}
            >
              Land Records
            </button>

            <button className="nav-link">
              Services
            </button>

            <button className="nav-link">
              About Us
            </button>

          </nav>

          {/* Right-side utilities */}
          <div className="utility-group">

            {/* Language */}
            <div className="language-group">

              <button className="utility-link active-language">
                English
              </button>

              <span>|</span>

              <button className="utility-link">
                हिन्दी
              </button>

              <span>|</span>

              <button className="utility-link">
                मराठी
              </button>

              <span>|</span>

              <button className="utility-link">
                বাংলা
              </button>

            </div>

            {/* Font controls */}
            <button
              className="utility-icon-button"
              aria-label="Decrease font size"
            >
              A-
            </button>

            <button
              className="utility-icon-button font-normal"
              aria-label="Normal font size"
            >
              A
            </button>

            <button
              className="utility-icon-button"
              aria-label="Increase font size"
            >
              A+
            </button>

            <span className="utility-divider" />

            {/* Dark mode */}
            <button
              className="utility-icon-button"
              aria-label="Toggle dark mode"
            >
              <Moon size={15} />
            </button>

            {/* Accessibility */}
            <button
              className="utility-icon-button"
              aria-label="Accessibility options"
            >
              <Accessibility size={15} />
            </button>

            <span className="utility-divider" />

            {/* Help */}
            <button className="utility-text-button">
              <CircleHelp size={14} />
              Help
            </button>

            {/* Contact */}
            <button className="utility-text-button">
              <Mail size={14} />
              Contact Us
            </button>

            {/* Login */}
            <button
              className="header-login-button"
              onClick={() => navigate('/login')}
            >
              <LogIn size={15} />
              Login
            </button>

          </div>

        </div>

      </div>

    </header>
  )
}

export default Header