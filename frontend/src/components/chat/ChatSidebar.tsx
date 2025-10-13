import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import type { User } from "@/types/chat";

interface ChatSidebarProps {
  selectedChatId: string | null;
  onChatSelect: (chatId: string) => void;
  className?: string;
  username: string;
  users: User[];
}

export function ChatSidebar({
  selectedChatId,
  username,
  onChatSelect,
  className,
  users = [],
}: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users?.filter((user) => user.name !== username);

  const renderUserChat = (user: User) => (
    <Card
      key={user.id}
      className={`p-3 cursor-pointer transition-colors hover:bg-accent ${
        selectedChatId === user.id ? "bg-accent" : ""
      }`}
      onClick={() => onChatSelect(user.id)}>
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={user.avatar || "/placeholder.svg"}
              alt={user.name}
            />
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          {user.isOnline && (
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 rounded-full border-2 border-background" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm truncate">{user.name}</h3>
          <p className="text-xs text-muted-foreground truncate">
            {user.isOnline
              ? "Online"
              : user.lastSeen
              ? `Last seen ${new Date(user.lastSeen).toLocaleString()}`
              : "Offline"}
          </p>
        </div>
      </div>
    </Card>
  );

  return (
    <div className={`flex flex-col h-full bg-card border-r ${className}`}>
      <div className="p-4 border-b">
        <h1 className="text-xl font-semibold mb-4">Messages</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      <div className="flex-1 p-4 pt-2 space-y-2 overflow-y-auto">
        {filteredUsers.length > 0 ? (
          filteredUsers.map(renderUserChat)
        ) : (
          <div className="text-center text-muted-foreground py-8">
            <p>No users found</p>
          </div>
        )}
      </div>
    </div>
  );
}
