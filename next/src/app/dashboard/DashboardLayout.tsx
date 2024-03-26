// Dashboard Layout
// /Users/matthewsimon/Documents/GitHub/acdc.solomon-electron/solomon-electron/next/src/app/dashboard/DashboardLayout.tsx

'use client'

import { useConvexAuth } from 'convex/react';
import { redirect } from 'next/navigation';
import React from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div>
        <p className='text-sm'>
           Loading...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return redirect("/");
  }

  return (
    <div>
      <div className="dashboard-content">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
