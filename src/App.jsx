import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/Layout/ProtectedRoute';
import RoleRoute from './components/Layout/RoleRoute';
import Sidebar from './components/Layout/Sidebar';
import Navbar from './components/Layout/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Records from './pages/Records';
import ImportPage from './pages/Import';
import ExportPage from './pages/Export';
import UsersPage from './pages/Users';
import NotFound from './pages/NotFound';

function Shell({ children }) {
  const auth = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  if (!auth?.isAuthenticated) return children;

  return (
    <div className="app-shell">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="app-main">
        <Navbar onMenu={() => setSidebarOpen((current) => !current)} />
        <main className="content-area">{children}</main>
      </div>
    </div>
  );
}

export default function App() {
  const auth = useAuth();
  return (
    <Shell>
      <Routes>
        <Route path="/login" element={!auth?.isAuthenticated ? <Login /> : <Navigate to="/" replace />} />
        <Route path="/register" element={!auth?.isAuthenticated ? <Register /> : <Navigate to="/" replace />} />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/records" element={<ProtectedRoute><Records /></ProtectedRoute>} />
        <Route path="/export" element={<ProtectedRoute><RoleRoute roles={[ 'VIEWER', 'ANALYST', 'ADMIN' ]}><ExportPage /></RoleRoute></ProtectedRoute>} />
        <Route path="/import" element={<ProtectedRoute><RoleRoute roles={[ 'ADMIN' ]}><ImportPage /></RoleRoute></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute><RoleRoute roles={[ 'ADMIN' ]}><UsersPage /></RoleRoute></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Shell>
  );
}