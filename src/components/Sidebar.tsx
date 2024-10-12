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
    <aside className="bg-surface border-r border-border w-64 flex flex-col">
      <div className="p-4">
        <img src="/altitude-logo.png" alt="Altitude Trampoline Park" className="h-8 mx-auto" />
      </div>
      <nav className="flex-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center space-x-2 py-3 px-4 transition duration-200 ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-text-light hover:bg-background'
              }`
            }
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;