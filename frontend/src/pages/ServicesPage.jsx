import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Map, ShieldCheck, Upload, Compass, ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import './ServicesPage.css';

export const ServicesPage = () => {
  const services = [
    {
      id: 'ror',
      title: 'Digital Record of Rights (Bhulekh / Khatauni / 7/12)',
      desc: 'Access verified ownership certificates, crop details, land classification, and mutation history online.',
      icon: FileText,
      sla: 'Instant / Online',
      fee: 'Free Public Service',
      link: '/land-records/search',
      btnText: 'Search Land Records'
    },
    {
      id: 'naksha',
      title: 'Cadastral GIS Map Viewer (Bhu-Naksha)',
      desc: 'Interactive village cadastral maps with geo-referenced parcel boundaries, road connectivity, and canals.',
      icon: Map,
      sla: 'Instant / Online',
      fee: 'Free Public Service',
      link: '/maps',
      btnText: 'Open Bhu-Naksha'
    },
    {
      id: 'mutation',
      title: 'Online Mutation Application (Dakhil-Kharij)',
      desc: 'Apply for title transfer upon sale deed, succession, inheritance, or family partition with automated SMS updates.',
      icon: Upload,
      sla: '15 Working Days',
      fee: 'Nominal Stamp Duty',
      link: '/applications/new',
      btnText: 'Apply for Mutation'
    },
    {
      id: 'ai-ocr',
      title: 'AI Legacy Deed Digitization & Verification',
      desc: 'Scan antique Urdu, Hindi, or Modi-script revenue deeds for automated field extraction and ledger matching.',
      icon: ShieldCheck,
      sla: 'Real-time AI Parsing',
      fee: 'Free Public Service',
      link: '/upload',
      btnText: 'Upload Document'
    },
    {
      id: 'verify',
      title: 'Digital Certificate Verification Desk',
      desc: 'Verify cryptographic hashes and authenticity of issued RoRs and mutation orders under IT Act 2000.',
      icon: CheckCircle2,
      sla: 'Instant Real-time Verification',
      fee: 'Free Public Service',
      link: '/verify',
      btnText: 'Verify Certificate'
    },
    {
      id: 'grievance',
      title: 'Public Revenue Grievance Redressal',
      desc: 'Submit grievances regarding clerical discrepancies, delay in mutation, or disputed land demarcations.',
      icon: Clock,
      sla: '30 Days Resolution',
      fee: 'Free Public Service',
      link: '/grievance',
      btnText: 'Lodge Grievance'
    }
  ];

  return (
    <div className="services-page">
      <div className="page-header-bar">
        <div className="container header-bar-inner">
          <div>
            <div className="breadcrumbs">
              <span>Home</span> / <strong>Citizen Services Directory</strong>
            </div>
            <h1 className="page-title">नागरिक राजस्व सेवाएं • Government Digital Services</h1>
            <p className="page-subtitle">Transparent, paperless, citizen-centric land administration services under DILRMP.</p>
          </div>
        </div>
      </div>

      <div className="container page-body-container">
        <div className="services-directory-grid">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.id} className="service-directory-card">
                <div className="service-card-top">
                  <div className="service-icon-box">
                    <Icon size={24} />
                  </div>
                  <span className="sla-tag">⏳ {s.sla}</span>
                </div>
                <h3 className="service-title">{s.title}</h3>
                <p className="service-desc">{s.desc}</p>
                <div className="service-card-footer">
                  <span className="fee-badge">{s.fee}</span>
                  <Link to={s.link} className="btn btn-outline btn-sm">
                    {s.btnText} <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;