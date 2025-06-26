"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getConnection } from "@/lib/signalr/signalrConnection";
import { useSignalRChat } from "@/lib/signalr/useSignalrChat";

interface ChatWindowProps {
  currentUser: string;
  selectedUser: string;
}

type Message = {
  content: string;
  fromUserName: string;
  toUserName: string;
  createdAt: string;
};

export default function ChatWindow({
  currentUser,
  selectedUser,
}: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!currentUser || !selectedUser) return;

    fetch(`http://localhost:5195/api/message/${currentUser}/${selectedUser}`)
      .then((res) => res.json())
      .then(setMessages);
  }, [currentUser, selectedUser]);

  useSignalRChat(localStorage.getItem("token") || "", (message: string) => {
    try {
      const parsed: Message = JSON.parse(message);
      if (
        parsed.fromUserName === selectedUser ||
        parsed.toUserName === selectedUser
      ) {
        setMessages((prev) => [...prev, parsed]);
      }
    } catch (e) {
      console.error("Failed to parse message:", e);
    }
  });

  const sendMessage = () => {
    if (!input.trim()) return;

    const conn = getConnection();
    if (conn) {
      conn.invoke("SendPrivateMessage", currentUser, selectedUser, input);
      const newMsg = {
        content: input,
        fromUserName: currentUser,
        toUserName: selectedUser,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, newMsg]);
      setInput("");
    }
  };

  return (
    <div className="flex-1 p-4 flex flex-col justify-between">
      <ScrollArea className="flex-1 mb-4 border p-2 rounded">
        {messages.map((msg, i) => (
          <div key={i} className="mb-2">
            <strong>
              {msg.fromUserName === currentUser ? "Sen" : msg.fromUserName}
            </strong>
            : {msg.content}{" "}
            <span className="text-xs text-gray-500">
              ({new Date(msg.createdAt).toLocaleTimeString()})
            </span>
          </div>
        ))}
      </ScrollArea>

      <div className="flex gap-2">
        <Input
          placeholder="Mesaj yazın..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <Button onClick={sendMessage}>Gönder</Button>
      </div>
    </div>
  );
}