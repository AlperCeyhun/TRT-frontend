"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getConnection } from "@/lib/signalr/signalrConnection";
import { useSignalRChat } from "@/lib/signalr/useSignalrChat";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { handleIncomingMessage } from "@/lib/signalr/handleIncomingMessage";
import { useCallback } from "react";

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
  const t = useTranslations("chat");
  const bottomRef = useRef<HTMLDivElement>(null);

  const onMessageReceived = useCallback(
    (message: string) => handleIncomingMessage(message, selectedUser, setMessages),
    [selectedUser, setMessages]
  );

  useEffect(() => {
    if (!currentUser || !selectedUser) return;

    fetch(`http://localhost:5195/api/message/${currentUser}/${selectedUser}`)
      .then((res) => res.json())
      .then(setMessages);
  }, [currentUser, selectedUser]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useSignalRChat(
    localStorage.getItem("token") || "",
    onMessageReceived
  );

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
      <ScrollArea className="mb-4 border p-2 rounded h-400 overflow-auto">
        {messages.map((msg, i) => (
          <div key={i} className="mb-2">
            <strong>
              {msg.fromUserName === currentUser ? t("you") : msg.fromUserName}
            </strong>
            : {msg.content}{" "}
            <span className="text-xs text-gray-500">
              ({new Date(msg.createdAt).toLocaleTimeString("tr-TR", {
                timeZone: "Europe/Istanbul",
              })})
            </span>
          </div>
        ))}
        <div ref={bottomRef} />
      </ScrollArea>

      <div className="flex gap-2">
        <Input
          placeholder={t("input_placeholder")}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <Button onClick={sendMessage}>{t("send")}</Button>
      </div>
    </div>
  );
}