import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import CaseList from './components/CaseList';
import CaseFile from './components/CaseFile';
import NewCase from './components/NewCase';
import Settings from './components/Settings';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="cases" element={<CaseList />} />
            <Route path="cases/new" element={<NewCase />} />
            <Route path="case/:id" element={<CaseFile />} />
            <Route path="settings" element={<Settings />} />
            <Route element={<PrivateRoute allowedRoles={['Admin']} />}>
              <Route path="admin" element={<AdminDashboard />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;