import { useEffect, useState } from 'react';
import api from '../../services/api';
import type { Application } from '../../types';
import { StatusBadge } from '../../components/StatusBadge';

export const ApplicationsPage = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [status, setStatus] = useState('');
  const [company, setCompany] = useState('');

  useEffect(() => {
    api.get('/applications').then((res) => setApplications(res.data));
  }, []);

  const filtered = applications.filter((app) => (status ? app.status === status : true) && (company ? (app.company || '').toLowerCase().includes(company.toLowerCase()) : true));

  return (
    <div className="page">
      <h2 style={{color:"white"}}>My Applications</h2>
      <div className="filters">
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All Status</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
        <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company" />
      </div>
      <div className="list-grid">
        {filtered.map((app) => 
          (
          <div key={app.id} className="card">
            <h3>{app.title}</h3>
            <p>{app.company}</p>
            <StatusBadge status={app.status} />
            <p>{app.coverLetter}</p>
          </div>
        )
        )}
      </div>
    </div>
  );
};
