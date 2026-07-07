import { useEffect, useState } from 'react';
import api from '../../services/api';
import type { Job } from '../../types';

export const JobsPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get('/jobs').then((res) => setJobs(res.data));
  }, []);

  const filtered = jobs.filter((job) => job.title.toLowerCase().includes(search.toLowerCase()) || job.company.toLowerCase().includes(search.toLowerCase()));

  const apply = async (jobId: number) => {
    try{
    await api.post('/applications', { jobId });
    alert('Applied successfully');
  }
    catch(err:any){
      alert(err.response.data.message)
    }
  };

  return (
    <div className="page">
      <h2>Browse Jobs</h2>
      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search jobs" />
      <div className="list-grid">
        {filtered.map((job) => (
          <div key={job.id} className="card">
            <h3>{job.title}</h3>
            <p>{job.company}</p>
            <p>{job.location}</p>
            <p>{job.employmentType}</p>
            <p>{job.description}</p>
            <button onClick={() => apply(job.id)}>Apply</button>
          </div>
        ))}
      </div>
    </div>
  );
};
