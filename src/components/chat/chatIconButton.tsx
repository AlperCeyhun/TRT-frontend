"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import ChatWidget from "@/components/chat/ChatWidget";

interface ChatToggleButtonProps {
  icon: LucideIcon;
  className?: string;
  ariaLabel?: string;
}

export const ChatToggleButton: React.FC<ChatToggleButtonProps> = ({
  icon: Icon,
  className,
  ariaLabel,
}) => {
  const [chatVisible, setChatVisible] = useState(false);

  return (
    <>
      <Button
        variant="secondary"
        size="icon"
        onClick={() => setChatVisible((prev) => !prev)}
        className={cn(
          "rounded-full w-10 h-10 m-4 flex items-center justify-center",
          className
        )}
        aria-label={ariaLabel}
      >
        <Icon className="w-4 h-4" />
      </Button>

      {chatVisible && (
        <div className="fixed bottom-20 right-5 z-50 shadow-lg">
          <ChatWidget />
        </div>
      )}
    </>
  );
};