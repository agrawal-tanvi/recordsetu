import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { 
  KhatauniDocPreview, 
  CadastralSheetPreview, 
  AiExtractionGraphic, 
  FarmerAvatar 
} from '../../assets/visuals';

const KeyServicesAndBanner = () => {
  return (
    <div className="container key-services-container">
      
      {/* 1. Farmer Inspiration Banner */}
      <div className="farmer-mission-banner">
        <div className="farmer-avatar-holder">
          <FarmerAvatar size={92} />
        </div>
        <div className="farmer-text-holder">
          <div className="quote-hi">"डिजिटल भूमि, सुरक्षित अधिकार, उज्ज्वल भविष्य"</div>
          <div className="quote-en">Digital Land Records, Secure Rights, Brighter Future.</div>
        </div>
        <div>
          <Link to="/services" className="btn-farmer-mission">
            हमारा मिशन जानें Know Our Mission →
          </Link>
        </div>
      </div>

      {/* 2. Key Services Section Title */}
      <div className="services-section-heading">
        <h2>हमारी प्रमुख सेवाएं <span>| Our Key Services</span></h2>
      </div>

      {/* 3. Three Large Visual Service Cards */}
      <div className="key-services-cards-grid">
        
        {/* Service 1: Bhulekh */}
        <div className="key-service-card card-orange-accent">
          <div className="service-card-body">
            <div className="service-badge-num orange-num">1</div>
            <div className="service-meta">
              <h3 className="svc-title">भूमि अभिलेख (BHULEKH)</h3>
              <p className="svc-desc">
                View Record of Rights, Khatauni, Khasra and ownership details.
              </p>
              <Link to="/land-records/search" className="btn-service-action">
                <span>View Land Records</span>
                <ArrowRight size={14} />
              </Link>
            </div>
            <div className="service-doc-thumbnail">
              <KhatauniDocPreview />
            </div>
          </div>
        </div>

        {/* Service 2: Bhu-Naksha */}
        <div className="key-service-card card-teal-accent">
          <div className="service-card-body">
            <div className="service-badge-num teal-num">2</div>
            <div className="service-meta">
              <h3 className="svc-title">भू-नक्शा (BHU-NAKSHA)</h3>
              <p className="svc-desc">
                Explore cadastral maps, parcel boundaries and land location.
              </p>
              <Link to="/maps" className="btn-service-action">
                <span>Open Bhu-Naksha</span>
                <ArrowRight size={14} />
              </Link>
            </div>
            <div className="service-doc-thumbnail">
              <CadastralSheetPreview />
            </div>
          </div>
        </div>

        {/* Service 3: AI Verification */}
        <div className="key-service-card card-purple-accent">
          <div className="service-card-body">
            <div className="service-badge-num purple-num">3</div>
            <div className="service-meta">
              <h3 className="svc-title">AI सत्यापन (AI VERIFICATION)</h3>
              <p className="svc-desc">
                Digitize legacy documents and verify extracted land information.
              </p>
              <Link to="/verify" className="btn-service-action">
                <span>Upload & Verify</span>
                <ArrowRight size={14} />
              </Link>
            </div>
            <div className="service-doc-thumbnail ai-thumb">
              <AiExtractionGraphic />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default KeyServicesAndBanner;