import React from 'react';

import { Settings } from 'lucide-react';
import { Button } from '../ui/button';
import { ProjectItem } from '@/components/sidebar/ProjectItem';
import { useSettings } from '@/hooks/use-settings';

const SidebarFooter: React.FC = () => {
    const settings = useSettings();

    return (
        <div className="border-t py-4 mt-auto">
            {/* Footer content goes here */}
            <div className='mb-2 ml-1'>
                <ProjectItem
                    onClick={settings.onOpen}
                    label="Settings"
                    icon={Settings}
                    /> 
            </div>
            <p className="ml-5 text-sm text-gray-500">
                © 2024 Solomon
            </p>
        </div>
    );
};

export default SidebarFooter;