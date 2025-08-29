import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ChatScreen from "../components/ChatScreen.jsx";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [socket, setSocket] = useState(null);
const Navigate = useNavigate()
  const user = localStorage.getItem('user');
  if(!user){
    Navigate('/auth-user');
    return null;
  }
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
        user={user}
      />
      <ChatScreen chat={selectedChat} socket={socket} />
    </div>
  );
};

export default Chat;
