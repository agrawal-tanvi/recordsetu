import { useState } from 'react'
import {
  Home,
  Map,
  FileUp,
  ScanSearch,
  MessageSquareWarning,
  Info,
  Menu,
  X,
  FileText,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

const navigationItems = [
  {
    label: 'Home',
    path: '/',
    icon: Home,
  },
  {
    label: 'Land Records',
    path: '/land-records',
    icon: FileText,
  },
  {
    label: 'Bhu-Naksha',
    path: '/bhu-naksha',
    icon: Map,
  },
  {
    label: 'Upload Document',
    path: '/upload-document',
    icon: FileUp,
  },
  {
    label: 'AI Verification',
    path: '/ai-verification',
    icon: ScanSearch,
  },
  {
    label: 'Grievance',
    path: '/grievance',
    icon: MessageSquareWarning,
  },
  {
    label: 'About',
    path: '/about',
    icon: Info,
  },
]

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <nav className="main-navbar" aria-label="Main navigation">
      <div className="navbar-container">

        {/* Mobile brand */}
        <div className="mobile-nav-brand">
          <span className="mobile-brand-mark">
            RS
          </span>

          <span>
            RECORD SETU
          </span>
        </div>

        {/* Mobile menu button */}
        <button
          className="mobile-menu-button"
          type="button"
          aria-label={
            mobileMenuOpen
              ? 'Close navigation menu'
              : 'Open navigation menu'
          }
          aria-expanded={mobileMenuOpen}
          onClick={() =>
            setMobileMenuOpen((current) => !current)
          }
        >
          {mobileMenuOpen ? (
            <X size={23} />
          ) : (
            <Menu size={23} />
          )}
        </button>

        {/* Navigation */}
        <div
          className={`navbar-menu ${
            mobileMenuOpen ? 'navbar-menu-open' : ''
          }`}
        >
          {navigationItems.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `navbar-link ${
                    isActive ? 'navbar-link-active' : ''
                  }`
                }
                onClick={closeMobileMenu}
              >
                <Icon size={16} strokeWidth={2} />

                <span>{item.label}</span>
              </NavLink>
            )
          })}
        </div>

        {/* Right side */}
        <div className="navbar-right">
          <span className="demo-indicator">
            Prototype
          </span>

          <NavLink
            to="/login/citizen"
            className="navbar-login"
          >
            Login
          </NavLink>
        </div>

      </div>
    </nav>
  )
}

export default Navbar