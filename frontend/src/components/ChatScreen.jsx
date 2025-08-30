import React, { useEffect, useState } from "react";
import api from "../config/Api";
import { toast } from "react-toastify";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// Using a light theme that's easier to customize for your needs
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FiArrowUp } from "react-icons/fi";

export default function ChatScreen({ chat, socket }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (chat) {
      loadMessage();
    } else {
      setMessages([]);
    }
  }, [chat]);

  const loadMessage = async () => {
    if (!chat) return;
    try {
      const allMessages = await api.get(`/chat/${chat.id}`);
      setMessages(allMessages.data.messages);
    } catch (error) {
      toast.error("Could not load conversation");
    }
  };

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
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    socket.emit("ai-message", { chat: chat.id, content: input });
    setInput("");
  };
  
  const markdownComponents = {
    // Override the 'pre' element to control the container of the code block
    pre: ({ node, ...props }) => <pre className="w-full" {...props} />,
    
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        // Apply width and custom styles to the code block container
        <div className="w-full "> 
          <SyntaxHighlighter
            style={oneLight} // Using a light theme as a base
            language={match[1]}
            PreTag="div"
            {...props}
            // Custom style to override the theme for background and text color
            customStyle={{
              backgroundColor: '#ffff', 
              color: '#000000', // Black text
              borderRadius: '0.5rem',
              padding: '1rem ',
              boxShadow:'0px 0px 10px #E5E7EB'
            }}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code className="bg-gray-200 text-black rounded px-1.5 py-1 font-mono text-sm" {...props}>
          {children}
        </code>
      );
    }
  };

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      <header className="h-12 border-b border-gray-200 flex items-center px-4 bg-white shadow-sm flex-shrink-0">
        <h1 className="text-lg font-semibold text-gray-800">Veda-Ai</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-full md:max-w-[70%] px-4 py-2 rounded-lg shadow-sm text-sm break-words ${
                msg.role === "user"
                  ? "bg-gray-200 text-black rounded-br-none"
                  : "bg-white text-gray-800 rounded-bl-none"
              }`}
            >
              <ReactMarkdown components={markdownComponents}>
                {msg.content}
              </ReactMarkdown>
            </div>
          </div>
        ))}
      </div>

      {chat ? (
        <form
          onSubmit={handleSend}
          className="border border-gray-200 py-3 px-2 flex items-center gap-3 bg-white flex-shrink-0 rounded-full w-full max-w-[80%] mx-auto  "
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Send a message..."
            className="flex-1 px-4 py-2 outline-none font-medium text-sm w-full"
          />
          <button
            type="submit"
            className={`${input ? 'bg-black text-white cursor-pointer' : 'bg-gray-200'} text-black p-3 rounded-full transition`}
          >
            <FiArrowUp/>
          </button>
        </form>
      ) : null}
    </div>
  );
}