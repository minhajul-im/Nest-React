"use client";

import { useMemo } from "react";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { ChatHeader } from "./ChatHeader";
import type { ChatType, User } from "@/types/chat";
import { cn } from "@/lib/utils";

export interface ChatMessage {
  id: string;
  userId: string; // fromUserId
  message: string;
  timestamp: Date;
  type: "text";
}

interface ChatAreaProps {
  selectedChatId: string | null;
  chatType: ChatType;
  onBack?: () => void;
  className?: string;
  onSendPrivate: (toUserId: string, message: string) => void;
  messages: { [toUserId: string]: ChatMessage[] };
  currentUserId: string;
}

export function ChatArea({
  selectedChatId,
  chatType,
  onSendPrivate,
  onBack,
  className,
  messages,
  currentUserId,
}: ChatAreaProps) {
  const user = useMemo(
    () => ({ id: selectedChatId, name: selectedChatId ? "User" : "" }),
    [selectedChatId]
  ) as User;

  const handleSendMessage = (messageText: string) => {
    if (!selectedChatId) return;
    onSendPrivate(selectedChatId, messageText);
  };

  if (!selectedChatId) {
    return (
      <div
        className={cn(
          "flex-1 flex items-center justify-center bg-muted/20",
          className
        )}>
        <div className="text-center text-muted-foreground">
          <div className="text-6xl mb-4">💬</div>
          <h3 className="text-lg font-medium mb-2">Welcome to Messages</h3>
          <p className="text-sm">Select a conversation to start messaging</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex-1 flex flex-col bg-background", className)}>
      <ChatHeader chatType={chatType} user={user} onBack={onBack} />
      <MessageList
        messages={messages}
        toUserId={selectedChatId}
        currentUserId={currentUserId}
        className="flex-1"
      />
      <MessageInput
        onSendMessage={handleSendMessage}
        placeholder={`Message ${user?.name}...`}
      />
    </div>
  );
}

// import { useState } from "react";
// import { ChatSidebar } from "@/components/chat/ChatSidebar";
// import { ChatArea } from "@/components/chat/ChatArea";
// import { useMobile } from "@/hooks/use-mobile";
// import { useChatController } from "./hooks/use-chat";
// import { UsernameModal } from "./components/chat/UserModal";

// export default function ChatPlatform() {
//   const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
//   const [showSidebar, setShowSidebar] = useState(true);
//   const isMobile = useMobile();

//   const {
//     userId,
//     username,
//     users,
//     messages,
//     sendPrivate,
//     fetchMessages,
//     registerUser,
//     error,
//   } = useChatController();

//   const handleChatSelect = (chatId: string) => {
//     setSelectedChatId(chatId);
//     if (isMobile) setShowSidebar(false);
//     fetchMessages(chatId);
//   };

//   const handleBack = () => {
//     if (isMobile) {
//       setShowSidebar(true);
//       setSelectedChatId(null);
//     }
//   };

//   if (!userId || !username) {
//     return <UsernameModal onRegister={registerUser} error={error} />;
//   }

//   return (
//     <div className="h-screen flex bg-background">
//       {/* Sidebar */}
//       <div
//         className={
//           isMobile
//             ? `fixed inset-y-0 left-0 z-50 w-full bg-background transform transition-transform duration-300 ease-in-out ${
//                 showSidebar ? "translate-x-0" : "-translate-x-full"
//               }`
//             : "w-80 flex-shrink-0"
//         }>
//         <ChatSidebar
//           username={username}
//           selectedChatId={selectedChatId}
//           onChatSelect={handleChatSelect}
//           className="h-full"
//           users={users} // Pass real users
//         />
//       </div>

//       {/* Chat Area */}
//       <div
//         className={`flex-1 flex flex-col ${
//           isMobile && showSidebar ? "hidden" : "flex"
//         }`}>
//         <ChatArea
//           selectedChatId={selectedChatId}
//           chatType="users"
//           onBack={handleBack}
//           onSendPrivate={sendPrivate}
//           messages={messages}
//           currentUserId={userId}
//           className="h-full"
//         />
//       </div>
//     </div>
//   );
// }
