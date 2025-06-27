import { Dispatch, SetStateAction } from "react";

type Message = {
  content: string;
  fromUserName: string;
  toUserName: string;
  createdAt: string;
};

export function handleIncomingMessage(
  message: string,
  selectedUser: string,
  setMessages: Dispatch<SetStateAction<Message[]>>
) {
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
}