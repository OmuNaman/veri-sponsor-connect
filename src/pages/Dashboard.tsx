
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { formatMessageTime } from '@/utils/formatTime';

const Dashboard = () => {
  // Using a simple placeholder return value
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <p className="text-gray-600">Your dashboard content will appear here.</p>
      </div>
    </Layout>
  );
};

export default Dashboard;
