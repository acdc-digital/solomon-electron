// Chat.tsx
// /Users/matthewsimon/Documents/GitHub/acdc.solomon-electron/solomon-electron/next/src/app/dashboard/_components/Chat.tsx

import React from 'react';
import ChatHeader from '@/components/chat/Chatheader';
import ChatLayout from '@/components/chat/Chatlayout';
import ChatFooter from '@/components/chat/Chatfooter';

const Chat: React.FC = () => {
    return (
        <div className='flex flex-col w-[27%] h-screen border-l'>
            <ChatHeader title="Chat" />
            <ChatLayout />
            <ChatFooter />
            {/* Chat content goes here */}
        </div>
    );
};

export default Chat;