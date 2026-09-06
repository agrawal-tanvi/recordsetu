import React from 'react';
import { Link } from 'react-router-dom';
import Badge from '../common/Badge';
import EmptyState from '../common/EmptyState';

const RecordTable = ({ records = [] }) => {
  if (records.length === 0) {
    return <EmptyState title="No Records Match Your Filter" description="Try selecting a different district, tehsil or reset your search fields." />;
  }

  return (
    <div className="table-responsive">
      <table className="gov-table">
        <thead>
          <tr>
            <th>Record ID</th>
            <th>Owner Name</th>
            <th>State</th>
            <th>District</th>
            <th>Village</th>
            <th>Survey No.</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td><strong>{record.id}</strong></td>
              <td>{record.ownerName}</td>
              <td>{record.state}</td>
              <td>{record.district}</td>
              <td>{record.village}</td>
              <td>{record.surveyNumber}</td>
              <td><Badge status={record.status} /></td>
              <td>
                <Link to={`/land-records/${record.id}`} className="btn btn-primary btn-sm">
                  View Record
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecordTable;