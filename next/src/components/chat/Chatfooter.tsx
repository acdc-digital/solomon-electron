// ChatFooter.tsx
// /Users/matthewsimon/Documents/GitHub/acdc.solomon-electron/solomon-electron/next/src/components/chat/Chatfooter.tsx

'use client'

import React, { useRef, useState } from 'react';
import {
  FileImage,
  Mic,
  Paperclip,
  PlusCircle,
  SendHorizontal,
  Smile,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
// import { Message, loggedInUserData } from '@/app/data'; 
import { Textarea } from '../ui/textarea';


interface ChatFooterProps {
  sendMessage: (newMessage: Message) => void;
  isMobile: boolean;
}

export const FooterIcons = [{ icon: FileImage }, { icon: Paperclip }];

const ChatFooter: React.FC<ChatFooterProps> = ({ sendMessage, isMobile }) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleThumbsUp = () => {
    const newMessage: Message = {
      id: Date.now(), // Consider using a more robust method for generating IDs
      name: loggedInUserData.name,
      avatar: loggedInUserData.avatar,
      message: '👍',
    };
    sendMessage(newMessage);
    setMessage('');
  };

  const handleSend = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now(), // Consider using a more robust method for generating IDs
        name: loggedInUserData.name,
        avatar: loggedInUserData.avatar,
        message: message.trim(),
      };
      sendMessage(newMessage);
      setMessage('');

      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }

    if (event.key === 'Enter' && event.shiftKey) {
      event.preventDefault();
      setMessage((prev) => `${prev}\n`);
    }
  };

  return (
    <div className="p-3 flex justify-between w-full items-center gap-3 mb-1">
      {/* Additional functionality and icons can be added here */}
      {/* Input field and send button logic */}
      <AnimatePresence initial={false}>
        <motion.div
          key="input"
          className="flex-grow relative flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Textarea
            placeholder="Type a message..."
            value={message}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            ref={inputRef}
            style={{ height: '20px' }}
          ></Textarea>
          <div className="flex items-center">
            {/* Emoji picker and other buttons */}
          </div>
        </motion.div>
      </AnimatePresence>
      {/* Handling of the send button appearance based on message content */}
      {message.trim() ? (
        <button
          onClick={handleSend}
          className="...">
          <SendHorizontal size={24} />
        </button>
      ) : (
        <button
          onClick={handleThumbsUp}
          className="...">
          <ThumbsUp 
		  	    className='mb-3 text-gray-700'
		  	    size={24} />
		      <ThumbsDown 
            className='text-gray-700'
            size={24} />
        </button>
      )}
    </div>
  );
};

export default ChatFooter;
