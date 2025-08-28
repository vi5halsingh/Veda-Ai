import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ChatScreen from "../components/ChatScreen.jsx";
import { io } from "socket.io-client";

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io("http://localhost:3000", {
      withCredentials: true,
    });
    setSocket(newSocket);

    // Cleanup on unmount
    return () => newSocket.close();
  }, []);

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
  
    // Socket handling will be implemented here
  };

  return (
    <div className="flex">
      <Sidebar
        onSelectChat={handleSelectChat}
        selectedChatId={selectedChat?.id}
      />
      <ChatScreen chat={selectedChat} socket={socket} />
    </div>
  );
};

export default Chat;
