import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import CaseList from './CaseList';

const Dashboard: React.FC = () => {
  const metrics = [
    { title: "Total Cases", value: 24, icon: TrendingUp, color: "text-blue-600" },
    { title: "Open Cases", value: 8, icon: Clock, color: "text-yellow-500" },
    { title: "Closed Cases", value: 16, icon: CheckCircle, color: "text-green-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <Link to="/cases/new" className="btn-primary flex items-center">
          <Plus size={20} className="mr-2" />
          New Case
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{metric.value}</p>
              </div>
              <metric.icon size={24} className={`${metric.color}`} />
            </div>
          </div>
        ))}
      </div>
      
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Cases</h2>
        <CaseList limit={5} />
      </div>
    </div>
  );
};

export default Dashboard;