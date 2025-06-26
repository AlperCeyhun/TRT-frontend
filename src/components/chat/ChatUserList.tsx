"use client";

import { useEffect, useState } from "react";
import { getUsers, User } from "@/lib/user/getusers";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ChatUserListProps {
  currentUser: string;
  selectedUser: string;
  onSelectUser: (username: string) => void;
}

export default function ChatUserList({
  currentUser,
  selectedUser,
  onSelectUser,
}: ChatUserListProps) {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  return (
    <Card className="w-1/3 border-r rounded-none bg-muted">
      <ScrollArea className="h-[400px]">
        <div className="flex flex-col">
          {users
            .filter((u) => u.username !== currentUser)
            .map((user) => (
              <button
                key={user.id}
                onClick={() => onSelectUser(user.username)}
                className={cn(
                  "text-left px-4 py-2 transition-colors rounded-md",
                  selectedUser === user.username
                    ? "bg-gray-900 text-primary-foreground"
                    : "hover:bg-accent"
                )}
              >
                <span className="font-medium">{user.username}</span>
              </button>
            ))}
        </div>
      </ScrollArea>
    </Card>
  );
}