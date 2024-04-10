// ChatLayout.tsx
// /Users/matthewsimon/Documents/GitHub/acdc.solomon-electron/solomon-electron/next/src/components/chat/Chatlayout.tsx
'use client'

import { useAction, useQuery } from 'convex/react';
import React, { useState } from 'react';
import { api } from '../../../convex/_generated/api';

export default function ChatLayout() {
    const handleUserAction = useAction(api.chat.handleUserAction);
    const entries = useQuery(api.chat.getAllEntries);
    const [message, setMessage] = useState("");

    return (
        <div className='flex flex-col'>
            <div className='m-4 bg-gray-100 rounded-xl h-[500px] border border-gray-400 overflow-y-auto'>
                {entries?.map((entry) => {
                    return (
                        <div key={entry._id} className='flex flex-col gap-2 text-black p-2'>
                            <div>{entry.input}</div>
                            <div>{entry.response}</div>
                        </div>
                    );
                })}
            </div>

            <form 
            className="m-4"
            onSubmit={(e) => {
                e.preventDefault();
                // Convex Action
                handleUserAction({ message });
            }}
            >
                <input 
                    name="message" 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    className="form-input px-4 py-2 bg-gray-100 border border-gray-400 rounded-md" 
                /> 
                <button>Submit</button>
            </form>
        </div>
    )
};
