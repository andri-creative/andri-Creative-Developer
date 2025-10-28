// components/chat/ChatContent.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { IoPaperPlaneOutline } from "react-icons/io5";

const COLORS = [
  "from-rose-500 to-rose-400",
  "from-emerald-500 to-emerald-400",
  "from-amber-500 to-amber-400",
  "from-indigo-500 to-indigo-400",
  "from-pink-500 to-pink-400",
  "from-teal-500 to-teal-400",
  "from-lime-500 to-lime-400",
  "from-cyan-500 to-cyan-400",
];

function getUserColor(name?: string) {
  if (!name || name.trim() === "") return "from-neutral-600 to-neutral-500";
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % COLORS.length;
  return COLORS[index];
}

interface Message {
  name: string;
  email: string;
  avatar: string;
  content: string;
  fromMe?: boolean;
}

interface ChatContentProps {
  messages: Message[];
  onSend?: (message: string) => void;
}

export default function ChatContent({ messages, onSend }: ChatContentProps) {
  const [text, setText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }, 100);
  };

  const handleSend = () => {
    if (!text.trim()) return;
    onSend?.(text);
    setText("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col w-full h-full bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-xl border border-neutral-700 shadow-lg overflow-hidden">
      <div className="flex items-center gap-3 p-4 border-b border-neutral-700 bg-neutral-900/80 backdrop-blur-sm flex-shrink-0">
        <Avatar className="w-10 h-10 ring-2 ring-blue-500">
          <AvatarImage src="https://i.pravatar.cc/150?img=1" alt="Group Chat" />
          <AvatarFallback className="bg-blue-500 text-white">GC</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h3 className="text-white font-semibold">Group Chat</h3>
          <p className="text-gray-400 text-xs">{messages.length} pesan</p>
        </div>
      </div>

      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto max-h-[650px] p-6 space-y-4 bg-neutral-900/20 scrollbar-thin scrollbar-thumb-neutral-600 scrollbar-track-neutral-800"
      >
        {messages.map((msg, idx) => {
          const displayName = msg.name || msg.email || "Anonymous";
          const bubbleColor = msg.fromMe
            ? "from-blue-600 to-blue-500"
            : getUserColor(displayName);

          return (
            <div
              key={idx}
              className={`flex ${msg.fromMe ? "justify-end" : "justify-start"}`}
            >
              {!msg.fromMe && (
                <Avatar className="w-8 h-8 mr-2 ring-2 ring-neutral-600">
                  <AvatarImage src={msg.avatar} alt={displayName} />
                  <AvatarFallback>{displayName[0]}</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-[70%] px-4 py-2 rounded-2xl bg-gradient-to-r ${bubbleColor} text-white shadow-md ${
                  msg.fromMe ? "rounded-br-none" : "rounded-bl-none"
                }`}
              >
                {!msg.fromMe && (
                  <p className="text-xs font-semibold mb-1">{displayName}</p>
                )}
                <p className="text-sm whitespace-pre-wrap break-words">
                  {msg.content}
                </p>
              </div>
              {msg.fromMe && (
                <Avatar className="w-8 h-8 ml-2 ring-2 ring-blue-500">
                  <AvatarImage src={msg.avatar} alt={msg.name} />
                  <AvatarFallback>{msg.name[0]}</AvatarFallback>
                </Avatar>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-3 p-4 border-t border-neutral-700 bg-neutral-900/80 backdrop-blur-sm flex-shrink-0">
        <div className="flex-1 relative">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ketik pesan..."
            className="w-full bg-neutral-800 text-white rounded-full px-5 py-3 outline-none focus:ring-2 focus:ring-blue-500 border border-neutral-600 focus:border-blue-500 transition-all placeholder-gray-400"
          />
        </div>
        <Button
          onClick={handleSend}
          disabled={!text.trim()}
          className="rounded-full p-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <IoPaperPlaneOutline className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
