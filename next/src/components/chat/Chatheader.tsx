// ChatHeader.tsx
// /Users/matthewsimon/Documents/GitHub/acdc.solomon-electron/solomon-electron/next/src/components/chat/Chatheader.tsx 

import React from 'react';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface ChatHeaderProps {
	// You can add more props as needed
    title: string; 
	avatarUrl: string; // URL for the avatar image
    fallbackText: string; // Fallback text, e.g., user initials
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ title, avatarUrl, fallbackText }) => {
    return (
        <div className="px-4 py-4 border-b flex items-center">
			<Avatar className='border border-gray-300'>
                <AvatarImage src={avatarUrl} alt="User Avatar" />
                <AvatarFallback>{fallbackText}</AvatarFallback>
            </Avatar>
            <h3 className="text-lg font-semibold ml-3">{title}</h3>
            {/* You can add more header content here, like buttons or status indicators */}
        </div>
    );
};

export default ChatHeader;
