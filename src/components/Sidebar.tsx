import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, FileText, Settings, Users } from 'lucide-react';
import { getCurrentUser } from '../services/authService';

const Sidebar: React.FC = () => {
  const authState = getCurrentUser();
  const isAdmin = authState?.user?.role === 'Admin';

  const navItems = [
    { to: "/", icon: Home, label: "Dashboard" },
    { to: "/cases", icon: FileText, label: "Cases" },
    ...(isAdmin ? [{ to: "/admin", icon: Users, label: "Admin" }] : []),
    { to: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <aside className="bg-surface border-r border-border w-64 flex flex-col shadow-lg">
      <div className="p-4 border-b border-border">
        <img src="/altitude-logo.png" alt="Altitude Trampoline Park" className="h-10 mx-auto" />
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center space-x-2 py-3 px-4 transition-fast ${
                isActive
                  ? 'bg-primary text-white shadow-md'
                  : 'text-text-light hover:bg-background hover:text-primary'
              }`
            }
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-border text-center text-sm text-text-light">
        <p>Altitude Incident Management</p>
        <p>v1.0.0</p>
      </div>
    </aside>
  );
};

export default Sidebar;
