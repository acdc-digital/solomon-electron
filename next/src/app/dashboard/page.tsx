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