// Sidebar.tsx
// Users/matthewsimon/Documents/GitHub/acdc.solomon-electron/solomon-electron/next/src/app/dashboard/_components/Sidebar.tsx
'use client'

import SidebarHeader from '@/components/sidebar/Sidebarheader';
import SidebarFooter from '@/components/sidebar/Sidebarfooter';
import { Button } from '@/components/ui/button';
import { useMutation, useQuery } from 'convex/react';
import { ArrowLeftFromLine, ArrowRightFromLine, ChevronsLeftRight, PlusCircle, PlusSquare, Search, SquarePlusIcon } from 'lucide-react';
import React, { useState } from 'react';
import { api } from '../../../../convex/_generated/api';
import { toast } from 'sonner';
import { ProjectItem } from '@/components/sidebar/ProjectItem';

const Sidebar: React.FC = () => {
    // State to toggle the sidebar width
    const [isExpanded, setIsExpanded] = useState(true);

    // Function to toggle the state
    const toggleSidebar = () => {
        console.log("Toggling sidebar");
        setIsExpanded(!isExpanded);
      };

      const projects = useQuery(api.projects.get);
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
        <div className={`flex flex-col ${isExpanded ? 'w-48' : 'w-24'} h-screen border-r transition-width duration-300`}>
            <SidebarHeader title="" /> 
            <Button 
                variant="link"
                className={`flex justify-end items-center w-full ${isExpanded ? '' : 'pr-14'}`}
                onClick={toggleSidebar}>
                {isExpanded ? <ArrowLeftFromLine className='w-4 h-4'/> : <ArrowRightFromLine className='w-4 h-4'/> }
            </Button> 
            
            {/* New Project Button */} 
            <div className='mb-3'>
                <ProjectItem
                    onClick={() => {}}
                    label="Search"
                    icon={Search}
                    isSearch
                    /> 
            </div>
            
            <div>
                <ProjectItem
                    onClick={handleCreate}
                    label="New Project"
                    icon={PlusCircle}
                    /> 
            </div>

            {/* Sidebar content goes here */}
            <div className='m-4'>
                {projects?.map((project) => (
                    <p key={project._id}>
                      {project.title}
                    </p>
                ))}
            </div>
            {/* Sidebar Footer */}
            <SidebarFooter />
        </div>
    );
};

export default Sidebar;