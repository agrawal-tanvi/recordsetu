import React, { useState } from 'react'
import { Plus, Search, Eye, CheckCircle, Clock, XCircle, FileText } from 'lucide-react'
import './Applications.css'

function Applications() {
  const [applications] = useState([
    { id: 'APP-2024-001', type: 'Mutation', applicant: 'Rajesh Kumar', village: 'Dharmpur', date: '2024-01-15', status: 'Approved' },
    { id: 'APP-2024-002', type: 'New Registration', applicant: 'Priya Sharma', village: 'Govindpur', date: '2024-01-20', status: 'Pending' },
    { id: 'APP-2024-003', type: 'Correction', applicant: 'Amit Singh', village: 'Rampur', date: '2024-01-25', status: 'In Review' },
    { id: 'APP-2024-004', type: 'Mutation', applicant: 'Sunita Devi', village: 'Krishnapur', date: '2024-02-01', status: 'Rejected' },
    { id: 'APP-2024-005', type: 'New Registration', applicant: 'Vikram Patel', village: 'Shivpur', date: '2024-02-05', status: 'Pending' },
  ])

  const [filter, setFilter] = useState('all')

  const filteredApps = applications.filter(app => 
    filter === 'all' || app.status.toLowerCase() === filter
  )

  const getStatusIcon = (status) => {
    switch(status.toLowerCase()) {
      case 'approved': return <CheckCircle size={16} className="status-icon approved" />
      case 'pending': return <Clock size={16} className="status-icon pending" />
      case 'in review': return <Clock size={16} className="status-icon review" />
      case 'rejected': return <XCircle size={16} className="status-icon rejected" />
      default: return <FileText size={16} />
    }
  }

  return (
    <div className="applications">
      <div className="container">
        <div className="page-header">
          <h1>Applications</h1>
          <p>Submit and track your land record applications</p>
        </div>

        <div className="app-controls">
          <button className="btn-new-app">
            <Plus size={18} /> New Application
          </button>
          <div className="filter-tabs">
            <button 
              className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >All</button>
            <button 
              className={`filter-tab ${filter === 'pending' ? 'active' : ''}`}
              onClick={() => setFilter('pending')}
            >Pending</button>
            <button 
              className={`filter-tab ${filter === 'in review' ? 'active' : ''}`}
              onClick={() => setFilter('in review')}
            >In Review</button>
            <button 
              className={`filter-tab ${filter === 'approved' ? 'active' : ''}`}
              onClick={() => setFilter('approved')}
            >Approved</button>
            <button 
              className={`filter-tab ${filter === 'rejected' ? 'active' : ''}`}
              onClick={() => setFilter('rejected')}
            >Rejected</button>
          </div>
        </div>

        <div className="app-list">
          {filteredApps.map((app) => (
            <div key={app.id} className="app-card">
              <div className="app-header">
                <div className="app-id">{app.id}</div>
                <div className="app-status">
                  {getStatusIcon(app.status)}
                  <span className={`status-label ${app.status.toLowerCase()}`}>{app.status}</span>
                </div>
              </div>
              <div className="app-body">
                <div className="app-detail">
                  <span className="detail-label">Type</span>
                  <span className="detail-value">{app.type}</span>
                </div>
                <div className="app-detail">
                  <span className="detail-label">Applicant</span>
                  <span className="detail-value">{app.applicant}</span>
                </div>
                <div className="app-detail">
                  <span className="detail-label">Village</span>
                  <span className="detail-value">{app.village}</span>
                </div>
                <div className="app-detail">
                  <span className="detail-label">Date</span>
                  <span className="detail-value">{app.date}</span>
                </div>
              </div>
              <div className="app-actions">
                <button className="app-action-btn view">
                  <Eye size={16} /> View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredApps.length === 0 && (
          <div className="no-apps">
            <p>No applications found for the selected filter.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Applications