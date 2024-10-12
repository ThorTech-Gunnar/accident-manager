import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, User, Menu, LogOut } from 'lucide-react';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="bg-surface border-b border-border sticky top-0 z-10">
      <div className="app-container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button className="md:hidden p-2 rounded-full hover:bg-background transition duration-200">
            <Menu size={24} className="text-primary" />
          </button>
          <Link to="/" className="flex items-center space-x-2">
            <img src="/altitude-logo.png" alt="Altitude Trampoline Park" className="h-10" />
            <span className="text-xl font-semibold text-primary hidden md:inline">Incident Management</span>
          </Link>
        </div>
        <nav className="hidden md:flex space-x-4">
          <Link to="/" className="text-text-light hover:text-primary transition duration-200">Dashboard</Link>
          <Link to="/cases" className="text-text-light hover:text-primary transition duration-200">Cases</Link>
          {user.role === 'Admin' && (
            <Link to="/admin" className="text-text-light hover:text-primary transition duration-200">Admin</Link>
          )}
          <Link to="/settings" className="text-text-light hover:text-primary transition duration-200">Settings</Link>
        </nav>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-background transition duration-200 relative">
            <Bell size={20} className="text-text-light" />
            <span className="absolute top-0 right-0 bg-accent w-2 h-2 rounded-full"></span>
          </button>
          <button className="p-2 rounded-full hover:bg-background transition duration-200">
            <User size={20} className="text-text-light" />
          </button>
          <button onClick={handleLogout} className="p-2 rounded-full hover:bg-background transition duration-200">
            <LogOut size={20} className="text-text-light" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;