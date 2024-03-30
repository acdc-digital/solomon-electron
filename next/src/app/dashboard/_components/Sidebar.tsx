// Sidebar.tsx
// Users/matthewsimon/Documents/GitHub/acdc.solomon-electron/solomon-electron/next/src/app/dashboard/_components/Sidebar.tsx
'use client'

import SidebarHeader from '@/components/sidebar/Sidebarheader';
import SidebarFooter from '@/components/sidebar/Sidebarfooter';
import { Button } from '@/components/ui/button';
import { useMutation } from 'convex/react';
import { ArrowLeftFromLine, ArrowRightFromLine, ChevronsLeftRight, Plus, PlusCircle, PlusSquare, RefreshCcw, Search, SquarePlusIcon, Trash, Trash2Icon } from 'lucide-react';
import React, { useState } from 'react';
import { api } from '../../../../convex/_generated/api';
import { toast } from 'sonner';
import { ProjectItem } from '@/components/sidebar/ProjectItem';
import { ProjectList } from '@/components/sidebar/Project-List';
import { Separator } from '@/components/ui/separator';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Trashbox } from '@/components/sidebar/Trashbox';

const Sidebar: React.FC = () => {
    // State to toggle the sidebar width
    const [isExpanded, setIsExpanded] = useState(true);

    // Function to toggle the state
    const toggleSidebar = () => {
        console.log("Toggling sidebar");
        setIsExpanded(!isExpanded);
      };

      const create = useMutation(api.projects.create); 

      const handleCreate = () => {
        const promise = create ({ title: " New Project" });

        toast.promise(promise, {
            loading: "Creating a new Project...",
            success: "New Project Created!",
            error: "Failed to Create a new Project"
        });
      };

    return (
        <div className={`flex flex-col ${isExpanded ? 'w-52' : 'w-24'} h-screen border-r transition-width duration-300`}>
            <SidebarHeader title="" /> 
            <Button 
                variant="link"
                className={`flex justify-end items-center w-full ${isExpanded ? '' : 'pr-14'}`}
                onClick={toggleSidebar}>
                {isExpanded ? <ArrowLeftFromLine className='w-4 h-4'/> : <ArrowRightFromLine className='w-4 h-4'/> }
            </Button> 
            
            {/* New Project Button */} 
            <div className='mb-0 ml-1'>
                <ProjectItem
                    onClick={() => {}}
                    label="Search"
                    icon={Search}
                    isSearch
                    />
            </div>
            
            <div className='mb-4 ml-1'>
                <ProjectItem
                    onClick={handleCreate}
                    label="New Project"
                    icon={PlusCircle}
                    />
                    {/* <ProjectItem
                    href="/dashboard"
                    label="Collapse All"
                    icon={RefreshCcw}
                    /> */}
                    <div>
                    <Separator
                    className='mt-4'
                    />
                    </div>
            </div>

            {/* Sidebar content goes here */}
            <div className='flex flex-grow flex-col'>
                <ProjectList />
                <div className='mt-auto mb-3'>
                <Popover>
                    <PopoverTrigger className='w-full mt-4'>
                        <ProjectItem label="Trashcan" icon={Trash2Icon} />
                    </PopoverTrigger>
                    <PopoverContent className='ml-3 p-0 w-72'>
                        <Trashbox />
                    </PopoverContent>
                </Popover>
                </div>
            </div>
            {/* Sidebar Footer */}
            <SidebarFooter />
        </div>
    );
};

export default Sidebar;