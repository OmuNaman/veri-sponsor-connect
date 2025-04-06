
import React from 'react';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        
        {user && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex items-center space-x-4">
              <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full" />
              <div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-gray-500 capitalize">{user.role}</p>
                {user.isVerified && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Verified
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <p className="text-gray-600">No recent activity to display.</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
            <p className="text-gray-600">No stats available yet.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
