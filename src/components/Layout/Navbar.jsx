import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar({ onMenu }) {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <button className="menu-button" type="button" onClick={onMenu}>Menu</button>
      <div className="navbar-user">
        <span>{auth?.user?.name}</span>
        <span className="badge badge-neutral">{auth?.role}</span>
        <button type="button" onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
}