import { useEffect, useState } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const CandidateProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [resumeLink, setResumeLink] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put('/users/profile', { name, email, password, resumeLink });
      setMessage('Profile updated');
      setPassword('');
    } catch {
      setMessage('Unable to update profile');
    }
  };

  return (
    <div className="page">
      <h2>Profile</h2>
      <form className="card" onSubmit={handleSubmit}>
        {message && <p>{message}</p>}
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="New Password" />
        <input value={resumeLink} onChange={(e)=> setResumeLink(e.target.value)} placeholder = "Resume Link"/>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};
