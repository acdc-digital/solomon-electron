// Sidebar.tsx
'use client'

import { Button } from '@/components/ui/button';
import { ArrowLeftFromLine, ArrowRightFromLine, ChevronsLeftRight } from 'lucide-react';
import React, { useState } from 'react';

const Sidebar: React.FC = () => {
    // State to toggle the sidebar width
    const [isExpanded, setIsExpanded] = useState(true);

    // Function to toggle the state
    const toggleSidebar = () => {
        console.log("Toggling sidebar");
        setIsExpanded(!isExpanded);
      };

    return (
        <div className={`flex flex-col ${isExpanded ? 'w-52' : 'w-34'} h-screen border-r transition-width duration-300`}>
            <Button 
                variant="link"
                className={`flex justify-end items-center w-full ${isExpanded ? '' : 'pr-24'}`}
                onClick={toggleSidebar}>
                {isExpanded ? <ArrowLeftFromLine className='w-4 h-4'/> : <ArrowRightFromLine className='w-4 h-4'/> }
            </Button>
            <h2 className="pl-4">Projects</h2>
            {/* Sidebar content goes here */}
        </div>
    );
};

export default Sidebar;
