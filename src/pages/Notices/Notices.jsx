import React, { useState } from 'react'
import { Bell, Calendar, Eye, AlertCircle, Info, FileText } from 'lucide-react'
import './Notices.css'

function Notices() {
  const [notices] = useState([
    {
      id: 1,
      title: 'सर्वेक्षण कार्य 2024 - Survey Work 2024',
      date: '2024-02-15',
      type: 'important',
      summary: 'Land survey work for the year 2024 will commence from March 1st. All landowners are requested to cooperate.'
    },
    {
      id: 2,
      title: 'नए पंजीकरण केंद्र - New Registration Centers',
      date: '2024-02-10',
      type: 'info',
      summary: 'New sub-registrar offices have been opened in 12 districts. Check the list for updated service locations.'
    },
    {
      id: 3,
      title: 'डिजिटल रिकॉर्ड अपडेट - Digital Record Update',
      date: '2024-02-05',
      type: 'info',
      summary: 'Digital land records have been updated for the last quarter. Please verify your records online.'
    },
    {
      id: 4,
      title: 'आधार लिंकिंग अनिवार्य - Aadhaar Linking Mandatory',
      date: '2024-01-28',
      type: 'important',
      summary: 'Aadhaar linking with land records is now mandatory. Complete the process by March 31st.'
    },
    {
      id: 5,
      title: 'सार्वजनिक सूचना - Public Notice',
      date: '2024-01-20',
      type: 'alert',
      summary: 'Public hearing for land acquisition in district Ujjain scheduled for February 20th.'
    },
  ])

  const getTypeIcon = (type) => {
    switch(type) {
      case 'important': return <AlertCircle size={18} className="type-icon important" />
      case 'info': return <Info size={18} className="type-icon info" />
      case 'alert': return <Bell size={18} className="type-icon alert" />
      default: return <FileText size={18} />
    }
  }

  const getTypeLabel = (type) => {
    switch(type) {
      case 'important': return 'Important'
      case 'info': return 'Information'
      case 'alert': return 'Alert'
      default: return 'Notice'
    }
  }

  return (
    <div className="notices">
      <div className="container">
        <div className="page-header">
          <h1>Notices & Updates</h1>
          <p>Stay informed about the latest land record announcements</p>
        </div>

        <div className="notices-list">
          {notices.map((notice) => (
            <div key={notice.id} className="notice-card">
              <div className="notice-type">
                {getTypeIcon(notice.type)}
                <span className={`type-label ${notice.type}`}>{getTypeLabel(notice.type)}</span>
              </div>
              <div className="notice-content">
                <h3>{notice.title}</h3>
                <p>{notice.summary}</p>
              </div>
              <div className="notice-meta">
                <div className="notice-date">
                  <Calendar size={16} />
                  <span>{notice.date}</span>
                </div>
                <button className="notice-read-btn">
                  <Eye size={16} /> Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Notices