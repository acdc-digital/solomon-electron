// /Users/matthewsimon/Documents/GitHub/acdc.solomon-electron/solomon-electron/next/src/app/dashboard/page.tsx

import React from 'react';
import DashboardLayout from './DashboardLayout';

import Sidebar from './_components/Sidebar'
import Canvas from './_components/Canvas';
import Chat from './_components/Chat';

const DashboardPage: React.FC = () => {
  return (
    <DashboardLayout >
      <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <Canvas />
          <Chat />
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;