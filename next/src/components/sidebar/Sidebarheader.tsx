// Sidebarheader.tsx
// Users/matthewsimon/Documents/GitHub/acdc.solomon-electron/solomon-electron/next/src/components/sidebar/Sidebarheader.tsx

import { Button } from '@/components/ui/button';

import React from 'react';
import Link from "next/link";

interface SidebarHeaderProps {
	// You can add more props as needed
    title: string; 
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ title }) => {
    return (
        <div className="px-4 py-3 border-b flex items-center">
			<div className='flex'>
				<Button
					variant={"outline"} >
					<Link href="/">Home</Link> 
				</Button>
			</div> 
            <h3 className="text-lg font-semibold ml-3">{title}</h3>
            {/* You can add more header content here, like buttons or status indicators */}
        </div>
    );
};

export default SidebarHeader; 