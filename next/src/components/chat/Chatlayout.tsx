// ChatLayout.tsx
// /Users/matthewsimon/Documents/GitHub/acdc.solomon-electron/solomon-electron/next/src/components/chat/Chatlayout.tsx
'use client'

import React from 'react';
import useChatStore from '@/lib/store/chatStore'; // Adjust the import path as necessary
import Chat from './Chat';

export default function ChatLayout() {
    const { isChatActive } = useChatStore(); // Access the chat visibility state

    return (
        <div className='flex flex-col items-center h-full mt-4'>
            {isChatActive ? (
                <Chat />
            ) : (
                <p className='text-center text-gray-600'>Create a project to continue.</p>
            )}
        </div>
    );
}

