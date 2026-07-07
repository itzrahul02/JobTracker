import { useEffect, useState } from 'react';
import api from '../../services/api';
import type { User } from '../../types';

export const ManageCandidates = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get('/users').then((res) => setUsers(res.data));
  }, []);

  const filtered = users.filter((user) => user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="page">
      <h2>Manage Candidates</h2>
      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search candidates" />
      <div className="list-grid">
        {filtered.map((user) => (
          <div key={user.id} className="card">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <p>{user.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
