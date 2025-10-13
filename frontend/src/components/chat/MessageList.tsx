"use client";

import { useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockUsers } from "@/data/mockData";
import { cn } from "@/lib/utils";

export interface ChatMessage {
  id: string;
  userId: string; // fromUserId
  message: string;
  timestamp: Date;
  type: "text";
}

interface MessageListProps {
  messages: { [toUserId: string]: ChatMessage[] }; // Messages object from useChatController
  currentUserId: string;
  toUserId: string; // New prop to specify which conversation to display
  className?: string;
}

export function MessageList({
  messages,
  currentUserId,
  toUserId,
  className,
}: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, toUserId]); // Update dependency to include toUserId

  const getUserById = (id: string) => mockUsers.find((user) => user.id === id);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year:
          date.getFullYear() !== today.getFullYear() ? "numeric" : undefined,
      });
    }
  };

  // Get messages for the selected conversation
  const conversationMessages = messages[toUserId] || [];

  // Group messages by date
  const messageGroups = conversationMessages.reduce((groups, message) => {
    const date = new Date(message.timestamp);
    const dateString = date.toDateString();
    if (!groups[dateString]) {
      groups[dateString] = { date, messages: [] };
    }
    groups[dateString].messages.push(message);
    return groups;
  }, {} as { [date: string]: { date: Date; messages: ChatMessage[] } });

  // Convert to array for rendering
  const messageGroupsArray = Object.values(messageGroups).sort(
    (a, b) => a.date.getTime() - b.date.getTime()
  );

  if (conversationMessages.length === 0) {
    return (
      <div
        className={cn(
          "flex-1 flex items-center justify-center text-muted-foreground",
          className
        )}>
        <div className="text-center">
          <div className="text-6xl mb-4">💬</div>
          <p className="text-lg">No messages yet</p>
          <p className="text-sm">Start a conversation!</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex-1 overflow-y-auto p-4 space-y-4", className)}>
      {messageGroupsArray.map(({ date, messages: dayMessages }) => (
        <div key={date.toDateString()}>
          <div className="flex justify-center mb-4">
            <div className="bg-muted px-3 py-1 rounded-full text-xs text-muted-foreground">
              {formatDate(date)}
            </div>
          </div>

          <div className="space-y-4">
            {dayMessages.map((message) => {
              const isCurrentUser = message.userId === currentUserId;
              const user = getUserById(message.userId);

              return (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3 max-w-[80%]",
                    isCurrentUser ? "ml-auto flex-row-reverse" : "mr-auto"
                  )}>
                  {!isCurrentUser && (
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarImage
                        src={user?.avatar || "/placeholder.svg"}
                        alt={user?.name}
                      />
                      <AvatarFallback className="text-xs">
                        {user?.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("") || "U"}
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div
                    className={cn(
                      "flex flex-col",
                      isCurrentUser ? "items-end" : "items-start"
                    )}>
                    <div
                      className={cn(
                        "rounded-2xl px-4 py-2 max-w-full break-words",
                        isCurrentUser
                          ? "bg-primary text-primary-foreground rounded-br-md"
                          : "bg-muted text-foreground rounded-bl-md"
                      )}>
                      <p className="text-sm leading-relaxed">
                        {message.message}
                      </p>
                    </div>

                    <span className="text-xs text-muted-foreground mt-1 px-1">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
