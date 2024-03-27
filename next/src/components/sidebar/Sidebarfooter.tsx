import React from 'react';

import { Settings } from 'lucide-react';
import { Button } from '../ui/button';

const SidebarFooter: React.FC = () => {
    return (
        <div className="border-t py-4 mt-auto">
            {/* Footer content goes here */}
			<Button 
				className='text-gray-800'
				variant="link">
				<Settings
				className='h-5 w-5'
				/>
			</Button>
            <p className="ml-5 text-sm text-gray-500">
                © 2024 Solomon
            </p>
        </div>
    );
};

export default SidebarFooter;