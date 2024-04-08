// ChatLayout.tsx
// /Users/matthewsimon/Documents/GitHub/acdc.solomon-electron/solomon-electron/next/src/components/chat/Chatlayout.tsx

import React from 'react';

// Assuming Message is a defined type/interface
const ChatLayout: React.FC<{ messages: Message[] }> = ({ messages }) => {
    return (
        <div className="flex-grow overflow-hidden">
            <div className="m-4">
                {messages.map((message, index) => (
                    <div key={index}>{message.content}</div> // Customize this as needed
                ))}
            </div>
        </div>
    );
};

export default ChatLayout;
