import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="brand">Job Application Tracker</div>
      <div className="nav-links">
        {user ? (
          <>
            <Link to={user.role === 'ADMIN' ? '/admin/dashboard' : '/candidate/dashboard'}>Dashboard</Link>
            <Link to={user.role === 'ADMIN' ? '/admin/jobs' : '/candidate/jobs'}>{user.role === 'ADMIN' ? 'Jobs' : 'Browse Jobs'}</Link>
            <Link to={user.role === 'ADMIN' ? '/admin/applications' : '/candidate/applications'}>Applications</Link>
            <Link to={user.role === 'ADMIN' ? '/admin/candidates' : '/candidate/profile'}>Profile</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};
