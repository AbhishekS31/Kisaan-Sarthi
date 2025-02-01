import React from 'react';
// import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/solid';

const ChatbotIcon = ({ onClick }) => {
  return (
    <div
      className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg cursor-pointer"
      onClick={onClick}
    >
      {/* <ChatBubbleLeftEllipsisIcon className="h-6 w-6" /> */}
    </div>
  );
};

export default ChatbotIcon;
