// Canvasheader.tsx
// /Users/matthewsimon/Documents/GitHub/acdc.solomon-electron/solomon-electron/next/src/components/canvas/Canvasheader.tsx

import React from 'react';
import Link from "next/link";
import { Button } from '../ui/button';

interface CanvasHeaderProps {
    title: string; // You can add more props as needed
}

// Pass onClick callbacks for each button
const CanvasHeader: React.FC<CanvasHeaderProps & { 
	onAdminClick: () => void, 
	onProjectsClick: () => void, 
	onFilesClick: () => void, 
	onTasksClick: () => void, 
	}> = ({ title, onAdminClick, onProjectsClick, onFilesClick, onTasksClick }) => {
    // Modify your Button components to call the provided callbacks on click
    return (
        <div className="px-4 py-1 border-b flex items-center bg-gray-50">
			<div className='flex m-2'>
				<Button 
					className='mr-2'
					variant={"outline"} 
					onClick={onAdminClick}>
    				Admin
				</Button>

				<Button 
					className='mr-2'
					variant={"outline"} 
					onClick={onFilesClick}>
    				Files 
				</Button>

				<Button
					className='mr-2' 
					variant={"outline"} 
					onClick={onProjectsClick}>
    				Projects
				</Button>

				<Button 
					variant={"outline"} 
					onClick={onTasksClick}>
    				Tasks
				</Button>
			</div> 
            {/* You can add more header content here, like buttons or status indicators */}
        </div>
    );
};

export default CanvasHeader;

