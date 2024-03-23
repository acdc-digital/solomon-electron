// Canvas.tsx
import React from 'react';

import { Routes, Route } from 'react-router-dom';

const Canvas: React.FC = () => {
    return (
        <div style={{ flexGrow: 1, backgroundColor: '#fff' }}>
            <h2 className='m-2'>Project Canvas</h2>
            {/* Canvas content goes here */}
        </div>
    );
};

export default Canvas;
