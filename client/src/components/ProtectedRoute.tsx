import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ role }: { role?: 'ADMIN' | 'CANDIDATE' }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="loader">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/404" replace />;
  return <Outlet />;
};
