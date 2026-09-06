import React from 'react';
import ApplicationForm from '../components/applications/ApplicationForm';
import { Shield, Clock, FileCheck } from 'lucide-react';
import './NewApplicationPage.css';

export const NewApplicationPage = () => {
  return (
    <div className="new-app-page-wrapper">
      <div className="app-page-breadcrumbs-bar">
        <div className="container breadcrumb-container">
          <span className="breadcrumb-muted">Home</span>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-muted">Applications</span>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">New Revenue Application</span>
        </div>
      </div>

      <div className="container form-page-body-container">
        {/* Top Instructions Banner */}
        <div className="gov-info-callout-strip">
          <div className="callout-item">
            <Shield size={16} className="text-primary-navy" />
            <span>Digital India Land Records Portal • Direct Revenue Filing</span>
          </div>
          <div className="callout-item">
            <Clock size={16} className="text-primary-navy" />
            <span>Standard Processing Time: 15 Working Days</span>
          </div>
          <div className="callout-item">
            <FileCheck size={16} className="text-primary-navy" />
            <span>Free Public Service • No Intermediary Fees</span>
          </div>
        </div>

        {/* Main Application Form Component */}
        <ApplicationForm />
      </div>
    </div>
  );
};

export default NewApplicationPage;