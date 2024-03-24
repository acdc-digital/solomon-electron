// Canvasheader.tsx
// /Users/matthewsimon/Documents/GitHub/acdc.solomon-electron/solomon-electron/next/src/components/canvas/Canvasheader.tsx

import React from 'react';
import Link from "next/link";
import { Button } from '../ui/button';

interface CanvasHeaderProps {
    title: string; // You can add more props as needed
}

// Pass onClick callbacks for each button
const CanvasHeader: React.FC<CanvasHeaderProps & { onAdminClick: () => void, onNotesClick: () => void, onFilesClick: () => void }> = ({ title, onAdminClick, onNotesClick, onFilesClick }) => {
    // Modify your Button components to call the provided callbacks on click
    return (
        <div className="px-4 py-1 border-b flex items-center">
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

				<Button variant={"outline"} 
					onClick={onNotesClick}>
    				Notes
				</Button>
			</div> 
            <h3 className="text-lg font-semibold ml-3">{title}</h3>
            {/* You can add more header content here, like buttons or status indicators */}
        </div>
    );
};

export default CanvasHeader;

