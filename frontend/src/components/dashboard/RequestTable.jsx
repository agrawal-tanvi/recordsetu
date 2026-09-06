import React, { useState } from 'react';
import Badge from '../common/Badge';
import Button from '../common/Button';
import Modal from '../common/Modal';

const RequestTable = ({ requests = [] }) => {
  const [selectedReq, setSelectedReq] = useState(null);

  const handleAction = (req, action) => {
    alert(`Order for application ${req.id}: ${action} recorded in government ledger.`);
    setSelectedReq(null);
  };

  return (
    <div className="table-responsive">
      <table className="gov-table">
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Citizen Name</th>
            <th>Service Requested</th>
            <th>Submission Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((r) => (
            <tr key={r.id}>
              <td><strong>{r.id}</strong></td>
              <td>{r.applicantName}</td>
              <td>{r.service}</td>
              <td>{r.date}</td>
              <td><Badge status={r.status} /></td>
              <td>
                <Button variant="secondary" size="sm" onClick={() => setSelectedReq(r)}>
                  Scrutinize
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Scrutiny Modal */}
      <Modal
        isOpen={!!selectedReq}
        onClose={() => setSelectedReq(null)}
        title={`Scrutiny Desk: ${selectedReq?.id}`}
        footer={
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button variant="secondary" onClick={() => setSelectedReq(null)}>
              Close
            </Button>
            <Button variant="outline" onClick={() => handleAction(selectedReq, 'Information Requested')}>
              Request Additional Info
            </Button>
            <Button variant="success" onClick={() => handleAction(selectedReq, 'Approved')}>
              Approve Order
            </Button>
          </div>
        }
      >
        {selectedReq && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div><strong>Applicant:</strong> {selectedReq.applicantName}</div>
              <div><strong>Mobile:</strong> {selectedReq.mobile}</div>
            </div>
            <div style={{ background: 'var(--light-bg)', padding: '0.75rem', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.85rem' }}>
              <div><strong>Jurisdiction:</strong> {selectedReq.village}, {selectedReq.tehsil}, {selectedReq.district}</div>
              <div><strong>Survey / Khasra:</strong> {selectedReq.surveyNumber}</div>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>
              {selectedReq.remarks || 'Verification pending inspection by Revenue Inspector.'}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default RequestTable;