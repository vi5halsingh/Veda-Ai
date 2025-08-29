import React, { useEffect, useState } from "react";
import api from "../config/Api";
import { toast } from "react-toastify";

export default function ChatScreen({ chat, socket }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    loadMessage();
  }, [chat?.id]);

  const loadMessage = async () => {
    if (!chat) {
      toast.info("Select any chat or create new !", {
        closeOnClick: true,
        autoClose: 1000,
        position: "bottom-right",
      });
      return;
    }
    try {
      const allMessages = await api.get(`/chat/${chat.id}`);
      setMessages(allMessages.data.messages);
    } catch (error) {
      toast.error("Could not load conversation", {
        position: "bottom-right",
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  // ✅ Setup socket listener ONCE
  useEffect(() => {
    if (!socket) return;

    const handleAiResponse = (messagePayload) => {
      setMessages((prev) => [
        ...prev,
        { role: "model", content: messagePayload.content },
      ]);
    };

    socket.on("ai-response", handleAiResponse);

    return () => {
      socket.off("ai-response", handleAiResponse);
    };
  }, [socket]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // ✅ append user message correctly
    setMessages((prev) => [...prev, { role: "user", content: input }]);

    socket.emit("ai-message", {
      chat: chat.id,
      content: input,
    });

    setInput("");
  };

  return (
    <div className="flex-1 flex flex-col h-screen">
      {/* Small Header */}
      <header className="h-12 border-b border-gray-300 flex items-center px-4 bg-white shadow-sm">
        <h1 className="text-lg font-semibold text-gray-800">Veda</h1>
      </header>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] px-4 py-2 rounded-lg shadow-sm ${
                msg.role === "user"
                  ? "bg-gray-200 text-black rounded-br-none"
                  : "bg-white text-gray-800 rounded-bl-none"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      {/* Input bar */}
      {chat ? (
        <form
          onSubmit={handleSend}
          className="border-t border-gray-300 p-4 flex items-center gap-3 bg-white"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Send a message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
          />
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
          >
            Send
          </button>
        </form>
      ) : null}
    </div>
  );
}
