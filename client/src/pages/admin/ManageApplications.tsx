import { useEffect, useState } from 'react';
import api from '../../services/api';
import type { Application } from '../../types';
import { StatusBadge } from '../../components/StatusBadge';

export const ManageApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [filter, setFilter] = useState('');
  const [status, setStatus] = useState('');

  const load = async () => {
    const res = await api.get('/applications');
    setApplications(res.data);
  };

  useEffect(() => { load(); }, []);

  const filtered = applications.filter((app) => (status ? app.status === status : true) && (filter ? (app.candidate_name || app.company || '').toLowerCase().includes(filter.toLowerCase()) : true));

  const updateStatus = async (id: number, nextStatus: string) => {
    await api.put(`/applications/${id}`, { status: nextStatus });
    load();
  };

  return (
    <div className="page">
      <h2>Manage Applications</h2>
      <div className="filters">
        <input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Search candidate/company" />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All Status</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
      <div className="list-grid">
        {filtered.map((app) => (
          <div key={app.id} className="card">
            <h3>{app.title}</h3>
            <p>{app.candidate_name}</p>
            <p>{app.company}</p>
            <StatusBadge status={app.status} />
            <div className="button-row">
              {['Applied','Interview','Offer','Rejected'].map((value) => (
                <button key={value} onClick={() => updateStatus(app.id, value)}>{value}</button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
