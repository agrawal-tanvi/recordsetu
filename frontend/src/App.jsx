import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import BhuNakshaPage from './pages/BhuNakshaPage';
import UploadDocumentPage from './pages/UploadDocumentPage';
import AIVerificationPage from './pages/AIVerificationPage';
import NewApplicationPage from './pages/NewApplicationPage';
import CitizenDashboardPage from './pages/CitizenDashboardPage';
import ServicesPage from './pages/ServicesPage';
import GrievancePage from './pages/GrievancePage';
import AboutPage from './pages/AboutPage';
import LandRecordsSearchPage from './pages/LandRecordsSearchPage';
import LandRecordDetailPage from './pages/LandRecordDetailPage';
import CitizenLoginPage from './pages/CitizenLoginPage';
import ApplicationsPage from './pages/ApplicationsPage';
import NotFoundPage from './pages/NotFoundPage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="land-records/search" element={<LandRecordsSearchPage />} />
        <Route path="land-records/:id" element={<LandRecordDetailPage />} />
        <Route path="maps" element={<BhuNakshaPage />} />
        <Route path="bhu-naksha" element={<BhuNakshaPage />} />
        <Route path="upload" element={<UploadDocumentPage />} />
        <Route path="upload-document" element={<UploadDocumentPage />} />
        <Route path="verify" element={<AIVerificationPage />} />
        <Route path="ai-verification" element={<AIVerificationPage />} />
        <Route path="applications" element={<ApplicationsPage />} />
        <Route path="applications/new" element={<NewApplicationPage />} />
        <Route path="citizen/dashboard" element={<CitizenDashboardPage />} />
        <Route path="citizen/login" element={<CitizenLoginPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="grievance" element={<GrievancePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;