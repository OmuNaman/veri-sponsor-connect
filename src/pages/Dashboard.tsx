import React, { useState } from 'react';
import Layout from '@/components/Layout';

// For the formatMessageTime function in Dashboard.tsx
const formatMessageTime = (date) => {
  const now = new Date();
  const messageDate = new Date(date);
  const diffDays = Math.floor((now.getTime() - messageDate.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return messageDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return messageDate.toLocaleDateString('en-US', { weekday: 'short' });
  } else {
    return messageDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
};

const Dashboard = () => {
  // component implementation
};

export default Dashboard;
