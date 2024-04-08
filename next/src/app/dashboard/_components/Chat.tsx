// Chat.tsx
// /Users/matthewsimon/Documents/GitHub/acdc.solomon-electron/solomon-electron/next/src/app/dashboard/_components/Chat.tsx

import React, { useState } from 'react';
import ChatHeader from '@/components/chat/Chatheader';
import ChatLayout from '@/components/chat/Chatlayout';
import ChatFooter from '@/components/chat/Chatfooter';

const Chat: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]); // Assuming Message is a defined type/interface

    const sendMessage = (newMessage: Message) => {
        setMessages(prevMessages => [...prevMessages, newMessage]);
        // Here, you could also add a call to send this message to your backend
    };

    return (
        <div className='flex flex-col w-[27%] h-screen border-l'>
            <ChatHeader title="Chat" />
            <ChatLayout messages={messages} />
            <ChatFooter sendMessage={sendMessage} isMobile={false} /> {/* Adjust isMobile based on your needs */}
        </div>
    );
};

export default Chat;
