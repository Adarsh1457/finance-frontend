import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function RoleRoute({ roles, children }) {
  const auth = useAuth();
  if (!auth?.isAuthenticated) return <Navigate to="/login" replace />;
  if (!roles.includes(auth.role)) return <div className="page-card forbidden-card"><h2>403</h2><p>You do not have access to this page.</p></div>;
  return children;
}