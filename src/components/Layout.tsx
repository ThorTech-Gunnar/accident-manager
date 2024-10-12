import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout: React.FC = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-6">
          <div className="app-container">
            <Outlet />
          </div>
        </main>
        <footer className="bg-surface border-t border-border py-4 text-center text-sm text-text-light">
          © {new Date().getFullYear()} Altitude Trampoline Park. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Layout;
