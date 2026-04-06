import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Sidebar({ open, onClose }) {
  const auth = useAuth();
  const links = [
    { to: '/', label: 'Dashboard' },
    { to: '/records', label: 'Records' },
    { to: '/export', label: 'Export' },
    ...(auth?.role === 'ADMIN' ? [{ to: '/import', label: 'Import' }, { to: '/users', label: 'Users' }] : [])
  ];

  return (
    <aside className={`sidebar ${open ? 'open' : ''}`}>
      <div className="sidebar-brand">Finance Ops</div>
      <nav className="sidebar-nav">
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} onClick={onClose} className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`} end={link.to === '/'}>
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}