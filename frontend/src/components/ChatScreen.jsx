import React, { useState } from "react";

export default function ChatScreen() {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello 👋, I’m your AI assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "This is a sample AI response to your query." },
      ]);
    }, 800);
  };

  return (
    <div className="flex-1 flex flex-col h-screen">
      {/* Small Header */}
      <header className="h-12 border-b border-gray-300 flex items-center px-4 bg-white shadow-sm">
        <h1 className="text-lg font-semibold text-gray-800">Chatgpt-Clone</h1>
      </header>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-md px-4 py-2 rounded-lg shadow-sm ${
                msg.sender === "user"
                  ? "bg-black text-white rounded-br-none"
                  : "bg-gray-200 text-gray-800 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input bar */}
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
    </div>
  );
}
