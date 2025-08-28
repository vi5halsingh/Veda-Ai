import React, { useState, useEffect } from "react";
import { FiPlus, FiMessageSquare, FiMenu, FiChevronLeft, FiSettings } from "react-icons/fi";
import api from "../config/Api";
import { toast } from "react-toastify";
import logo from '/logo.svg'

export default function Sidebar({ onSelectChat, selectedChatId }) {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    fetchChats();
  }, [chats]);

  const fetchChats = async () => {
    try {
      const response = await api.get("/chat");
      setChats(response.data.chats);
      setError(null);
    } catch (error) {
      // setError("Failed to load chats");
      toast.error("Could not load chats", {
        position: "bottom-right",
        autoClose: 2000,
        closeOnClick: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const createChat = async () => {
    setIsCreating(true);
    try {
      const response = await api.post("/chat", {
        title: "New Chat",
      });

      if (response.status === 200) {
        const newChat = response.data.chat;
        setChats((prevChats) => [newChat, ...prevChats]);

        // Select the newly created chat
        if (onSelectChat) {
          onSelectChat(newChat);
        }

        toast.success("new chat created", {
          position: "bottom-right",
          autoClose: 1000,
          closeOnClick: true,
        });
      }
    } catch (error) {
      toast.error("Could not create new chat", {
        position: "bottom-right",
        autoClose: 2000,
        closeOnClick: true,
      });
      console.log(error);
    } finally {
      setIsCreating(false);
    }
  };

  // Format date for last activity
  const formatLastActivity = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Sidebar skeleton when loading
  if (loading) {
    return (
      <div className="h-screen w-64 bg-gray-100 border-r border-gray-200 p-4 flex flex-col">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`h-screen bg-gray-100 border-r border-gray-200 flex flex-col transition-all duration-300 ${
        isMinimized ? "w-16" : "w-64"
      }`}
    >
      {/* Header & New Chat Button */}
      <div className="p-3 flex items-center justify-between border-b border-gray-200">
        {/* {!isMinimized && <h2 className="text-lg font-semibold text-gray-800">chats</h2>} */}
         {!isMinimized && <img src={logo} alt="logo" className="w-8 h-8" /> }
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="p-2 rounded hover:bg-gray-200 transition"
        >
          {isMinimized ? <FiMenu /> : <FiChevronLeft />}
        </button>
      </div>

      {/* New Chat */}
      <div className="p-3">
        <button
          onClick={createChat}
          disabled={isCreating}
          className="w-full  hover:bg-gray-200 text-black font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer"
        >
          <FiPlus className={isCreating ? "animate-spin" : ""} />
          {!isMinimized && "New Chat"}
        </button>
      </div>

      {/* Error */}
      {error && !isMinimized && (
        <div className="mx-3 p-2 bg-red-100 border border-red-300 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto space-y-1 p-2">
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat?.(chat)}
            className={`w-full text-left p-3 rounded-lg transition-colors flex items-center gap-3 hover:bg-gray-200 ${
              selectedChatId === chat.id ? "bg-gray-200 font-semibold" : ""
            }`}
          >
            <FiMessageSquare className="flex-shrink-0" />
            {!isMinimized && (
              <div className="flex-1 min-w-0">
                <p className="truncate">{chat.title}</p>
                {chat.lastactivity && (
                  <p className="text-xs text-gray-500 truncate">
                    {formatLastActivity(chat.lastactivity)}
                  </p>
                )}
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Settings Button at bottom */}
      <div className="p-3 border-t border-gray-200">
        <button className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200 transition">
          <FiSettings />
          {!isMinimized && <span>Settings</span>}
        </button>
      </div>
    </div>
  );
}
