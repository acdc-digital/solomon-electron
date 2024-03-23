// Canvas.tsx
'use client'

import React, { useState } from 'react';

import CanvasHeader from '@/components/canvas/Canvasheader';
import Admin from '@/components/canvas/Admin'; 
import Notes from '@/components/canvas/Notes';
import Files from '@/components/canvas/Files'; 

const Canvas: React.FC = () => {
    const [activeComponent, setActiveComponent] = useState('Admin'); // Default to Admin

    const renderComponent = () => {
        switch(activeComponent) {
            case 'Admin': return <Admin />;
            case 'Notes': return <Notes />;
            case 'Files': return <Files />;
            default: return <Admin />; // Default case
        }
    };

    return (
        <div style={{ flexGrow: 1, backgroundColor: '#fff' }}>
            <CanvasHeader
              title="Canvas"
              onAdminClick={() => setActiveComponent('Admin')}
              onNotesClick={() => setActiveComponent('Notes')}
              onFilesClick={() => setActiveComponent('Files')}
            /> 
            <h2 className='m-2'>Project Canvas</h2>
            {renderComponent()}
        </div>
    );
};

export default Canvas;
