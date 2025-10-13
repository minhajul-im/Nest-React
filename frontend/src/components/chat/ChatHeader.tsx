"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { User, ChatType } from "@/types/chat";
import { Phone, Video, MoreVertical, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatHeaderProps {
  chatType: ChatType;
  user?: User;
  onBack?: () => void;
  className?: string;
}

export function ChatHeader({ user, onBack, className }: ChatHeaderProps) {
  const formatLastSeen = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (minutes < 1) return "Active now";
    if (minutes < 60) return `Active ${minutes}m ago`;
    return `Active ${hours}h ago`;
  };

  return (
    <div
      className={cn(
        "flex items-center justify-between p-4 border-b bg-card",
        className
      )}>
      <div className="flex items-center gap-3">
        {onBack && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="md:hidden">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}
        <div className="relative">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback>
              {user?.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          {user?.isOnline && (
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 rounded-full border-2 border-background" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-semibold text-base truncate">{user?.name}</h2>
          <p className="text-sm text-muted-foreground truncate">
            {user?.isOnline
              ? "Online"
              : user?.lastSeen
              ? formatLastSeen(user.lastSeen)
              : "Offline"}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
          <Phone className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
          <Video className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
