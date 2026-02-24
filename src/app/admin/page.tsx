"use client";
import React, { useState } from 'react';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { AdminDashboardContent } from '@/components/admin/AdminDashboardContent'; // We will move your dashboard code here

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <AdminLogin onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  return <AdminDashboardContent />;
}