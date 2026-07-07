import { useEffect, useState } from 'react';
import api from '../../services/api';
import type { Job } from '../../types';

export const ManageJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [form, setForm] = useState({ title: '', company: '', location: '', description: '', employmentType: '', salary: '' });

  const loadJobs = () => api.get('/jobs').then((res) => setJobs(res.data));

  useEffect(() => { loadJobs(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post('/jobs', form);
    setForm({ title: '', company: '', location: '', description: '', employmentType: '', salary: '' });
    loadJobs();
  };

  const handleDelete = async (id: number) => {
    await api.delete(`/jobs/${id}`);
    loadJobs();
  };

  return (
    <div className="page">
      <h2>Manage Jobs</h2>
      <form className="card" onSubmit={handleSubmit}>
        <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
        <input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
        <input placeholder="Employment Type" value={form.employmentType} onChange={(e) => setForm({ ...form, employmentType: e.target.value })} />
        <input placeholder="Salary" value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })} />
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <button type="submit">Create Job</button>
      </form>
      <div className="list-grid">
        {jobs.map((job) => (
          <div key={job.id} className="card">
            <h3>{job.title}</h3>
            <p>{job.company}</p>
            <p>{job.location}</p>
            <button onClick={() => handleDelete(job.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};
