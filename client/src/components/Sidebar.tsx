import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Sidebar = () => {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <aside className="sidebar">
      <h3>{user.name}</h3>
      <p>{user.role}</p>
      {user.role === 'ADMIN' ? (
        <>
          <Link to="/admin/dashboard">Dashboard</Link>
          <Link to="/admin/jobs">Manage Jobs</Link>
          <Link to="/admin/candidates">Candidates</Link>
          <Link to="/admin/applications">Applications</Link>
        </>
      ) : (
        <>
          <Link to="/candidate/dashboard">Dashboard</Link>
          <Link to="/candidate/jobs">Browse Jobs</Link>
          <Link to="/candidate/applications">Applications</Link>
          <Link to="/candidate/profile">Profile</Link>
        </>
      )}
    </aside>
  );
};
