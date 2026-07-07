import { useEffect, useState } from 'react';
import api from '../../services/api';

export const AdminDashboard = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    api.get('/dashboard/admin').then((res) => setData(res.data));
  }, []);

  return (
    <div className="page">
      <h2 style={{color:"white"}}>Admin Dashboard</h2>
      {data ? (
        <>
          <div className="stats-grid">
            <div className="card"><h3>Total Users</h3><p>{data.totals.users}</p></div>
            <div className="card"><h3>Total Jobs</h3><p>{data.totals.jobs}</p></div>
            <div className="card"><h3>Total Applications</h3><p>{data.totals.applications}</p></div>
            <div className="card"><h3>Offers</h3><p>{data.totals.offers}</p></div>
            <div className="card"><h3>Interviews</h3><p>{data.totals.interviews}</p></div>
          </div>
          <div className="card">
            <h3>Recently Added Jobs</h3>
            <ul>{data.recentJobs.map((job: any) => <li key={job.id}>{job.title} - {job.company}</li>)}</ul>
          </div>
          <div className="card">
            <h3>Recently Registered Candidates</h3>
            <ul>{data.recentCandidates.map((user: any) => <li key={user.id}>{user.name} ({user.email})</li>)}</ul>
          </div>
        </>
      ) : <p>Loading...</p>}
    </div>
  );
};
