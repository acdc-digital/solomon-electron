// ChatHeader.tsx
// /Users/matthewsimon/Documents/github/solomon-electron/solomon-electron/next/src/components/chat/Chatheader.tsx

'use client'

import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { SignOutButton, useUser } from '@clerk/clerk-react';
import { ChevronsLeftRight, Ghost, Settings } from 'lucide-react';
import { Button } from '../ui/button';

interface ChatHeaderProps {
    title: string;
    avatarUrl: string; // URL for the avatar image
    fallbackText: string; // Fallback text, e.g., user initials
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ title, avatarUrl, fallbackText }) => {
    const { user } = useUser();

    return (
        <div className="px-4 py-3 border-b flex items-center bg-gray-50">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className='flex gap-x-3 items-center text-sm p-0'>
                        <Avatar className='border border-gray-300'>
                            <AvatarImage src={user?.imageUrl || avatarUrl} alt="User Avatar" />
                            <AvatarFallback>{fallbackText}</AvatarFallback>
                        </Avatar>
                        <span className="text-start font-medium text-sm line-clamp-1">
                            {user?.fullName || title}
                        </span>
                        <ChevronsLeftRight className='rotate-90 text-muted-foreground h-4 2-4'/>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80" align="start" alignOffset={11} >
                    <div className='flex flex-col space-y-2 p-2'>
                        <p className='text-sm font-medium leading-none text-muted-foreground'>
                        {user?.emailAddresses[0].emailAddress}
                        </p>
                            <div className='space-y-0'>
                                <p className='text-sm font-medium'>
                                    {user?.fullName}
                                </p>
                                {/* <div>
                                <Settings className='mt-1 w-4 h-4'/>
                                </div> */}
                            </div>
                    </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className='w-full cursor-pointer text-muted-foreground'>
                    <SignOutButton>
                        Log Out
                    </SignOutButton>
                  </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default ChatHeader;
