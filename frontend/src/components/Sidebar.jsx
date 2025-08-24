import React from "react";

export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-gray-100 border-r border-gray-300 p-4 flex flex-col">
      <h2 className="text-xl font-bold text-gray-800 mb-6">My Chat Model</h2>
      <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition">
        + New Chat
      </button>
      <div className="mt-6 flex-1 overflow-y-auto space-y-2">
        <div className="p-2 rounded-lg hover:bg-gray-200 cursor-pointer text-gray-700">
          Conversation 1
        </div>
        <div className="p-2 rounded-lg hover:bg-gray-200 cursor-pointer text-gray-700">
          Conversation 2
        </div>
      </div>
    </div>
  );
}
