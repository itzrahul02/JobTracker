import { useEffect, useState } from 'react';
import api from '../../services/api';

export const CandidateDashboard = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    api.get('/dashboard/candidate').then((res) => setStats(res.data.stats));
  }, []);

  return (
    <div className="page">
      <h2 style={{color:"white"}}>Candidate Dashboard</h2>
      {stats ? (
        <div className="stats-grid">
          <div className="card"><h3>Total Applications</h3><p>{stats.total}</p></div>
          <div className="card"><h3>Applied</h3><p>{stats.applied}</p></div>
          <div className="card"><h3>Interview</h3><p>{stats.interview}</p></div>
          <div className="card"><h3>Offer</h3><p>{stats.offer}</p></div>
          <div className="card"><h3>Rejected</h3><p>{stats.rejected}</p></div>
        </div>
      ) : <p>Loading...</p>}
    </div>
  );
};
