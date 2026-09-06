import React from 'react';
import { useParams, Link } from 'react-router-dom';
import DocumentPreview from '../components/DocumentPreview';
import { ArrowLeft, Map } from 'lucide-react';

export const LandRecordDetailPage = () => {
  const { id } = useParams();

  const recordData = id === '2' ? {
    id: 'RS-UP-STP-2026-002',
    documentType: 'Record of Rights (खतौनी / RoR 7/12)',
    state: 'Uttar Pradesh',
    district: 'Sitapur',
    tehsil: 'Rampur',
    village: 'Khairpur',
    khasraNo: '124/2',
    khataNo: '00318',
    ulpin: 'UP-STP-124-33910',
    ownerName: 'Ram Kumar',
    fatherName: 'Late Harisharan Lal',
    areaHectares: '1.2500 Hectares (3.08 Acres)',
    landClassification: 'Agricultural (फसली भूमि - दोफसली)',
    revenueRate: '₹ 120.00 / annum',
    mortgageStatus: 'Unencumbered (भारमुक्त)',
    mutationDate: '10 Feb 2023 (Order No. 412/SDM)',
    issuingAuthority: 'Office of Sub-Divisional Magistrate & Tehsildar, Rampur, Sitapur',
    digitalSignDate: '06 Sep 2026, 10:15:30 IST',
    sha256Hash: '7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d'
  } : {
    id: 'RS-UP-LKO-2026-001',
    documentType: 'Record of Rights (खतौनी / RoR 7/12)',
    state: 'Uttar Pradesh',
    district: 'Lucknow',
    tehsil: 'Lucknow Sadar',
    village: 'Gomti Nagar',
    khasraNo: '45/2',
    khataNo: '00142',
    ulpin: 'UP-LKO-001-4528',
    ownerName: 'Rajesh Kumar Verma',
    fatherName: 'Late Ramprasad Verma',
    areaHectares: '1.4500 Hectares (3.58 Acres)',
    landClassification: 'Agricultural (फसली भूमि)',
    revenueRate: '₹ 145.00 / annum',
    mortgageStatus: 'Unencumbered (भारमुक्त)',
    mutationDate: '14 Jan 2024 (Order No. 892/SDM)',
    issuingAuthority: 'Office of Sub-Divisional Magistrate & Tehsildar, Lucknow Sadar',
    digitalSignDate: '06 Sep 2026, 11:42:18 IST',
    sha256Hash: '9a8f4c2e1b7d5e6a8f3b2c1d9e4a7b5f6c8d1e2f3a4b5c6d7e8f9a0b1c2d3e4f'
  };

  return (
    <div className="record-detail-page">
      <div className="page-header-bar">
        <div className="container header-bar-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link to="/land-records/search" className="btn btn-outline btn-sm">
              <ArrowLeft size={14} /> Back to Search
            </Link>
            <div>
              <div className="breadcrumbs">
                <span>Land Records</span> / <strong>Record #{recordData.id}</strong>
              </div>
              <h1 className="page-title">प्रमाणित अधिकार अभिलेख (खतौनी / RoR Copy)</h1>
            </div>
          </div>
          <div>
            <Link to="/maps" className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Map size={14} /> Inspect on Bhu-Naksha Map
            </Link>
          </div>
        </div>
      </div>

      <div className="container page-body-container" style={{ margin: '2rem auto' }}>
        <DocumentPreview record={recordData} />
      </div>
    </div>
  );
};

export default LandRecordDetailPage;
