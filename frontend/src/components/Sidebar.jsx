import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import {
  FiPlus,
  FiMessageSquare,
  FiMenu,
  FiChevronLeft,
  FiSettings,
  FiLogOut,
  FiMoreHorizontal ,
} from "react-icons/fi";
import { HiMiniArrowRightEndOnRectangle ,HiMiniArrowLeftEndOnRectangle  } from "react-icons/hi2";
import api from "../config/Api";
import { toast } from "react-toastify";
import logo from '/logo.svg';

export default function Sidebar({ onSelectChat, selectedChatId }) {

  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [editingChatId, setEditingChatId] = useState(null);
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [newChatTitle, setNewChatTitle] = useState('');
  const [showSettingsCard, setShowSettingsCard] = useState(false);
  const Navigate = useNavigate();

  // refs for click-outside
  const menuRef = useRef(null);
  const settingsBtnRef = useRef(null);
  const settingsCardRef = useRef(null);

  useEffect(() => {
    fetchChats();
  }, []);

  const user = JSON.parse(localStorage.getItem('user'));
  const fetchChats = async () => {
    try {
      const response = await api.get("/chat");
      setChats(response.data.chats);
      setError(null);
    } catch (error) {
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
      const response = await api.post("/chat", { title: "New Chat" });
      if (response.status === 200) {
        const newChat = response.data.chat;
        setChats((prevChats) => [newChat, ...prevChats]);
        if (onSelectChat) onSelectChat(newChat);
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
    } finally {
      setIsCreating(false);
    }
  };

  const renameChat = async (chatId) => {
    if (!newChatTitle.trim()) {
      toast.error('Chat title cannot be empty',{
        position: "bottom-right",
        autoClose: 1000,
        closeOnClick: true,
      });
      return;
    }
    try {
      const response = await api.patch(`/chat/${chatId}`, { title: newChatTitle });
      setChats(prev => prev.map(chat => chat.id === chatId ? response.data.chat : chat));
      setEditingChatId(null);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to rename chat',{
        position: "bottom-right",
        autoClose: 1000,
        closeOnClick: true,
      });
    }
  };

  const deleteChat = async (chatId) => {
    try {
      await api.delete(`/chat/${chatId}`);
      setChats(prev => prev.filter(chat => chat.id !== chatId));
      if (selectedChatId === chatId) onSelectChat(null);
    } catch (error) {
      toast.error('Failed to delete chat',{
        position: "bottom-right",
        autoClose: 1000,
        closeOnClick: true,
      });
    }
  };

  const formatLastActivity = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
      localStorage.removeItem('user');
      Navigate('/auth-user')
    } catch (error) {
      toast.error('Logout failed',{
        position: "bottom-right",
        autoClose: 1000,
        closeOnClick: true,
      });
    }
  };

  // close menus on outside click / Esc
  useEffect(() => {
    const onDown = (e) => {
      // close chat row menu
      if (menuOpenId && menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpenId(null);
      }
      // close settings popover
      if (showSettingsCard) {
        const clickOnBtn = settingsBtnRef.current?.contains(e.target);
        const clickOnCard = settingsCardRef.current?.contains(e.target);
        if (!clickOnBtn && !clickOnCard) setShowSettingsCard(false);
      }
    };
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMenuOpenId(null);
        setEditingChatId(null);
        setShowSettingsCard(false);
      }
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [menuOpenId, showSettingsCard]);

  if (loading) {
    return (
      <div className="h-screen w-64 bg-[#fff] border-r border-gray-800 p-4 flex flex-col">
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
      className={`border-r border-gray-200 relative h-screen bg-[#fff] text-black flex flex-col transition-all duration-200 ${
        isMinimized ? "w-16" : "w-72"
      }`}
    >
    
      {/* Header */}
      <div className="p-2 flex items-center justify-between border-b border-gray-200">
        {!isMinimized && <img src={logo} alt="logo" className="w-7 h-7" />}
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="p-2 rounded hover:bg-gray-200 transition cursor-pointer"
        >
          {isMinimized ? <HiMiniArrowRightEndOnRectangle/> : <HiMiniArrowLeftEndOnRectangle />}
        </button>
      </div>

      {/* New Chat */}
      <div className="p-3">
        <button
          onClick={createChat}
          disabled={isCreating}
          className="w-full bg-[#ffff] hover:bg-gray-200 text-black py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer"
        >
          <FiPlus className={isCreating ? "animate-spin" : ""} />
          {!isMinimized && "New Chat"}
        </button>
      </div>

      {/* Error */}
      {error && !isMinimized && (
        <div className="mx-3 p-2 bg-red-900/20 border border-red-500/40 rounded-lg text-red-300 text-sm">
          {error}
        </div>
      )}

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto space-y-1 px-2 pb-16">
        {chats.map((chat, i) => {
          const isActive = selectedChatId === chat.id;
          return (
            <div
              key={i}
              onClick={() => onSelectChat?.(chat)}
              className={`group relative w-full px-3 py-2 rounded-md flex items-center gap-3 cursor-pointer transition-colors duration-150 ${
                isActive ? "bg-[#ffff]" : "hover:bg-gray-200"
              }`}
            >
              <FiMessageSquare className="flex-shrink-0" />
              {!isMinimized && (
                <div className="flex-1 min-w-0 flex items-center">
                  {/* title / rename */}
                  <div className="flex-1 min-w-0">
                    {editingChatId === chat.id ? (
                      <input
                        autoFocus
                        value={newChatTitle}
                        onChange={(e) => setNewChatTitle(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && renameChat(chat.id)}
                        className="w-full px-2 py-1 rounded bg-[#fff] text-black outline-none"
                      />
                    ) : (
                      <>
                        <p className="truncate">{chat.title}</p>
                        {chat.lastactivity && (
                          <p className="text-xs text-gray-400 truncate">
                            {formatLastActivity(chat.lastactivity)}
                          </p>
                        )}
                      </>
                    )}
                  </div>

                  {/* hover-only actions (three dots) */}
                  <div
                    className={`ml-2 -mr-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150 ${
                      menuOpenId === chat.id || editingChatId === chat.id ? "opacity-100" : ""
                    }`}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpenId(menuOpenId === chat.id ? null : chat.id);
                      }}
                      className="p-1.5 rounded hover:bg-[#e5e7eb] focus-visible:outline-none"
                      aria-label="More"
                      title="More"
                    >
                      <FiMoreHorizontal />
                    </button>
                  </div>

                  {/* context menu */}
                  {menuOpenId === chat.id && (
                    <div
                      ref={menuRef}
                      className="absolute right-0 top-10 z-20 rounded-md bg-[#fff] border border-[#e5e7eb] shadow-xl overflow-hidden"
                      onClick={(e)=> e.stopPropagation()}
                    >
                      <button
                        onClick={() => {
                          setEditingChatId(chat.id);
                          setNewChatTitle(chat.title);
                          setMenuOpenId(null);
                        }}
                        className="w-full px-2 py-2 text-left hover:bg-[#e5e7eb] cursor-pointer"
                      >
                        Rename
                      </button>
                      <button
                        onClick={() => {
                          deleteChat(chat.id);
                          setMenuOpenId(null);
                        }}
                        className="w-full px-2 py-2 text-left hover:bg-[#e5e7eb] cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom: Settings/Profile */}
      <div className="p-3 border-t border-gray-200">
        <button
          ref={settingsBtnRef}
          onClick={() => setShowSettingsCard((s) => !s)}
          className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-[#e5e7eb] transition cursor-pointer"
        >
          <FiSettings />
          {!isMinimized && <span>{user?.fullname?.firstname || 'User'}</span>}
        </button>
      </div>

    
      {showSettingsCard && !isMinimized && (
        <div
          ref={settingsCardRef}
          className="absolute bottom-16 left-3 z-30 w-64 rounded-xl border border-gray-200 bg-[#fff] shadow-2xl "
        >
          <div className="p-2">
            <div className="px-3 py-2 text-sm text-black border-b border-gray-200">
              {user?.fullname?.firstname || 'User'}
            </div>
            {/* keep only logout action as per existing functionality */}
            <button
              onClick={handleLogout}
              className="mt-1 w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-[#e5e7eb] text-left text-red-500 cursor-pointer"
            >
              <FiLogOut />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
