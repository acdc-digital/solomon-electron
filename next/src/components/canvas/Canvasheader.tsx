// Canvasheader.tsx
// /Users/matthewsimon/Documents/GitHub/acdc.solomon-electron/solomon-electron/next/src/components/canvas/Canvasheader.tsx

import React from 'react';
import Link from "next/link";
import { Button } from '../ui/button';

interface CanvasHeaderProps {
    title: string; // You can add more props as needed
}

const CanvasHeader: React.FC<CanvasHeaderProps> = ({ title }) => {
    return (
        <div className="px-4 py-2 border-b flex items-center">
			<div className='flex m-2'>
				<Button 
					className='mr-2'
					variant={"outline"} >
					<Link href="/">Admin</Link> 
				</Button>

				<Button 
					className='mr-2'
					variant={"outline"} >
					<Link href="/">Notes</Link> 
				</Button>

				<Button variant={"outline"} >
					<Link href="/">Files</Link> 
				</Button>
			</div> 
            <h3 className="text-lg font-semibold ml-3">{title}</h3>
            {/* You can add more header content here, like buttons or status indicators */}
        </div>
    );
};

export default CanvasHeader;

