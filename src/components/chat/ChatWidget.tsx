"use client";

import { useEffect, useState } from "react";
import ChatUserList from "./ChatUserList";
import ChatWindow from "./ChatWindow";
import { useTranslations } from "next-intl";

export default function ChatWidget() {
  const [currentUser, setCurrentUser] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const t = useTranslations("chat");

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      setCurrentUser(username);
    }
  }, []);

  if (!currentUser) return <div className="p-4">{t("login_placeholder")}</div>;

  return (
    <div className="flex w-[400px] h-[500px] max-w-4xl border rounded-2xl shadow-lg overflow-hidden bg-white dark:bg-black">
      <ChatUserList
        currentUser={currentUser}
        selectedUser={selectedUser}
        onSelectUser={setSelectedUser}
      />
      {selectedUser ? (
        <ChatWindow
          currentUser={currentUser}
          selectedUser={selectedUser}
        />
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          {t("window_placeholder")}
        </div>
      )}
    </div>
  );
}