import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  CheckSquare, 
  Search, 
  Bell, 
  User, 
  HelpCircle, 
  LogOut, 
  Map, 
  BarChart3, 
  Settings, 
  Users 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ type = 'citizen' }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(type === 'official' ? '/official/login' : '/citizen/login');
  };

  const citizenMenu = [
    { to: '/citizen/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/citizen/records', label: 'My Land Records', icon: FileText },
    { to: '/citizen/applications', label: 'My Applications', icon: CheckSquare },
    { to: '/citizen/track', label: 'Track Application', icon: Search },
    { to: '/notices', label: 'Notifications', icon: Bell },
    { to: '/citizen/profile', label: 'Profile', icon: User },
    { to: '/services', label: 'Help & Support', icon: HelpCircle }
  ];

  const officialMenu = [
    { to: '/official/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/official/records', label: 'Land Records Master', icon: FileText },
    { to: '/official/requests', label: 'Citizen Requests', icon: Users },
    { to: '/official/maps', label: 'Maps & Surveys GIS', icon: Map },
    { to: '/official/search', label: 'Record Search', icon: Search },
    { to: '/official/reports', label: 'Reports & Analytics', icon: BarChart3 },
    { to: '/official/settings', label: 'System Settings', icon: Settings }
  ];

  const menuItems = type === 'official' ? officialMenu : citizenMenu;

  return (
    <aside className="sidebar" aria-label="Portal Sidebar">
      <div className="sidebar-header">
        <span className="role-title">
          {type === 'official' ? 'Government Administration' : 'Citizen Services'}
        </span>
        <div className="user-name">
          {user?.name || (type === 'official' ? 'Admin Officer' : 'Citizen User')}
        </div>
      </div>

      <ul className="sidebar-menu">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/citizen/dashboard' || item.to === '/official/dashboard'}
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>

      <div className="sidebar-footer">
        <button
          type="button"
          onClick={handleLogout}
          className="sidebar-link"
          style={{ width: '100%', color: '#DC2626' }}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;