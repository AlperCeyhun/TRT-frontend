"use client";

import { usePathname } from "next/navigation";
import { ChatToggleButton } from "@/components/chat/ChatIconButton";
import { MessageCircle } from "lucide-react";

export default function ClientChatToggle() {
  const pathname = usePathname();

  const isAuthRoute = pathname === "/register" || pathname === "/login";

  if (isAuthRoute) return null;

  return (
    <ChatToggleButton icon={MessageCircle} ariaLabel="Toggle Chat" />
  );
}