import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import {
  Search,
  FileText,
  Map,
  ClipboardCheck,
  Download,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Building2,
  Users,
  Database,
  Landmark,
  Bell,
  ExternalLink,
  Accessibility,
  HelpCircle,
} from "lucide-react";

import "./Home.css";

const statistics = [
  {
    value: "6.2 Cr+",
    label: "Land Records Digitized",
    icon: Database,
  },
  {
    value: "98%",
    label: "Records Digitized",
    icon: FileText,
  },
  {
    value: "36",
    label: "States & UTs Covered",
    icon: Map,
  },
  {
    value: "12.4 L+",
    label: "Applications Processed",
    icon: ClipboardCheck,
  },
];

const services = [
  {
    icon: Search,
    title: "Search Land Records",
    description:
      "Search and view available land ownership and property records online.",
    link: "/land-records",
  },
  {
    icon: FileText,
    title: "View Record Details",
    description:
      "Access available Record of Rights and other land-related information.",
    link: "/land-records",
  },
  {
    icon: ClipboardCheck,
    title: "Track Application",
    description:
      "Check the current status of your land record or mutation application.",
    link: "/application-status",
  },
  {
    icon: Download,
    title: "Download Records",
    description:
      "Download available digitally generated land record documents.",
    link: "/land-records",
  },
];

const notices = [
  {
    date: "05 Sep 2026",
    title: "RecordSetu digital land record services are now available.",
  },
  {
    date: "02 Sep 2026",
    title: "Citizens can search available land records through the online portal.",
  },
  {
    date: "28 Aug 2026",
    title: "Digital land record verification services have been updated.",
  },
];

function Home() {
  return (
    <div className="home-page">
      {/* Government Utility Bar */}
      <div className="gov-bar">
        <div className="home-container gov-bar-inner">
          <div className="gov-left">
            <span>Government of India</span>
            <span className="gov-divider">|</span>
            <span>Digital India</span>
          </div>

          <div className="gov-right">
            <button type="button">
              <Accessibility size={15} />
              Accessibility
            </button>

            <button type="button">
              <HelpCircle size={15} />
              Help
            </button>

            <div className="language-mini">
              <button type="button" className="language-active">
                English
              </button>
              <button type="button">हिन्दी</button>
              <button type="button">मराठी</button>
              <button type="button">বাংলা</button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="main-header">
        <div className="home-container header-inner">
          <Link to="/" className="brand">
            <div className="brand-emblem">
              <Landmark size={32} strokeWidth={1.8} />
            </div>

            <div className="brand-text">
              <span className="brand-government">
                Government Digital Service
              </span>
              <strong>RecordSetu</strong>
              <span>Digital Land Records Portal</span>
            </div>
          </Link>

          <div className="header-actions">
            <button className="header-search" type="button">
              <Search size={19} />
              <span>Search</span>
            </button>

            <Link to="/login" className="header-login">
              Login
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="main-nav">
        <div className="home-container nav-inner">
          <Link className="nav-active" to="/">
            Home
          </Link>

          <Link to="/land-records">Land Records</Link>
          <Link to="/services">Services</Link>
          <Link to="/application-status">Applications</Link>
          <Link to="/notices">Notices</Link>

          <div className="nav-spacer" />

          <Link to="/official-login" className="official-link">
            <Building2 size={16} />
            Government Official
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <main>
        <section className="hero-section">
          <div className="home-container hero-grid">
            <div className="hero-content">
              <div className="hero-badge">
                <span className="badge-dot" />
                Digital Land Records Portal
              </div>

              <h1>
                Your Land Records,
                <span> Connected Digitally.</span>
              </h1>

              <p className="hero-description">
                RecordSetu provides citizens with convenient access to
                digital land record services, helping you search, verify and
                track land-related information through a single platform.
              </p>

              <div className="hero-buttons">
                <Link to="/land-records" className="primary-button">
                  <Search size={19} />
                  Search Land Records
                  <ArrowRight size={18} />
                </Link>

                <Link to="/application-status" className="secondary-button">
                  Track Application
                  <ChevronRight size={18} />
                </Link>
              </div>

              <div className="hero-note">
                <ShieldCheck size={17} />
                Secure digital access to government land record services
              </div>
            </div>

            <div className="hero-panel">
              <div className="hero-panel-header">
                <div>
                  <span>Quick Access</span>
                  <h3>Land Record Services</h3>
                </div>

                <div className="hero-panel-icon">
                  <Map size={25} />
                </div>
              </div>

              <div className="quick-search">
                <label>Find a land record</label>

                <div className="quick-search-input">
                  <Search size={18} />
                  <span>Search by location, district or record</span>
                </div>

                <Link to="/land-records" className="quick-search-button">
                  Search Records
                  <ArrowRight size={16} />
                </Link>
              </div>

              <div className="hero-panel-footer">
                <div>
                  <span>Available services</span>
                  <strong>Online</strong>
                </div>

                <div>
                  <span>Portal status</span>
                  <strong className="status-online">
                    <i />
                    Operational
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="statistics-section">
          <div className="home-container">
            <div className="section-heading centered">
              <span>AT A GLANCE</span>
              <h2>Digital Land Records Across India</h2>
              <p>
                Key indicators from the digital land records ecosystem.
              </p>
            </div>

            <div className="statistics-grid">
              {statistics.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div className="stat-card" key={stat.label}>
                    <div className="stat-icon">
                      <Icon size={23} />
                    </div>

                    <div>
                      <strong>{stat.value}</strong>
                      <span>{stat.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="services-section">
          <div className="home-container">
            <div className="section-heading">
              <span>CITIZEN SERVICES</span>
              <h2>Access Services Online</h2>
              <p>
                Find the land record service you need without visiting an
                office.
              </p>
            </div>

            <div className="services-grid">
              {services.map((service) => {
                const Icon = service.icon;

                return (
                  <Link
                    to={service.link}
                    className="service-card"
                    key={service.title}
                  >
                    <div className="service-icon">
                      <Icon size={24} />
                    </div>

                    <h3>{service.title}</h3>

                    <p>{service.description}</p>

                    <span className="service-link">
                      Access service
                      <ArrowRight size={16} />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Notices + About */}
        <section className="information-section">
          <div className="home-container information-grid">
            <div className="notices-box">
              <div className="box-heading">
                <div>
                  <span>UPDATES</span>
                  <h2>Latest Notices</h2>
                </div>

                <Link to="/notices">
                  View all
                  <ArrowRight size={16} />
                </Link>
              </div>

              <div className="notice-list">
                {notices.map((notice) => (
                  <div className="notice-item" key={notice.title}>
                    <div className="notice-date">
                      <Bell size={17} />
                      <span>{notice.date}</span>
                    </div>

                    <p>{notice.title}</p>

                    <ExternalLink size={15} />
                  </div>
                ))}
              </div>
            </div>

            <div className="about-box">
              <div className="about-icon">
                <Users size={25} />
              </div>

              <span>ABOUT RECORDSETU</span>

              <h2>One portal for easier access to land records.</h2>

              <p>
                RecordSetu is designed to provide citizens and government
                officials with a unified digital interface for land record
                services and related applications.
              </p>

              <Link to="/about">
                Learn more
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section">
          <div className="home-container cta-inner">
            <div>
              <span>NEED A LAND RECORD?</span>
              <h2>Start your search online.</h2>
              <p>
                Search available records by selecting the relevant location
                and property details.
              </p>
            </div>

            <Link to="/land-records" className="cta-button">
              Search Land Records
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="main-footer">
        <div className="home-container footer-top">
          <div className="footer-brand">
            <div className="footer-brand-icon">
              <Landmark size={27} />
            </div>

            <div>
              <strong>RecordSetu</strong>
              <span>Digital Land Records Portal</span>
            </div>
          </div>

          <div className="footer-links">
            <div>
              <strong>Portal</strong>
              <Link to="/">Home</Link>
              <Link to="/land-records">Land Records</Link>
              <Link to="/services">Services</Link>
            </div>

            <div>
              <strong>Information</strong>
              <Link to="/notices">Notices</Link>
              <Link to="/about">About</Link>
              <Link to="/help">Help</Link>
            </div>

            <div>
              <strong>Login</strong>
              <Link to="/login">Citizen Login</Link>
              <Link to="/official-login">Official Login</Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="home-container footer-bottom-inner">
            <span>
              © 2026 RecordSetu. All Rights Reserved.
            </span>

            <span>
              Designed for digital delivery of public services
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;