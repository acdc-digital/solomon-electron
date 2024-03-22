import React from 'react';
import DashboardLayout from './DashboardLayout';

import Sidebar from './_components/Sidebar'
import Canvas from './_components/Canvas';
import Chat from './_components/Chat';

const DashboardPage: React.FC = () => {
  return (
    <DashboardLayout >
      <div style={{ display: 'flex', height: '100vh' }}>
          <Sidebar />
          <Canvas />
          <Chat />
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;