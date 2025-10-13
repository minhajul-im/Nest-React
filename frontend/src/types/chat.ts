export type ChatType = "users"; // Only users, since groups are not supported

export interface User {
  id: string; // userId from backend
  name: string; // username
  avatar?: string;
  isOnline?: boolean;
  lastSeen?: Date;
}

export interface ChatMessage {
  id: string;
  userId: string; // fromUserId
  message: string;
  timestamp: Date;
  isGroup?: false; // No groups
  type: "text";
}

export interface IncomingMessage {
  event: "privateMessage" | "error" | "registered";
  fromUserId?: string;
  fromUsername?: string;
  toUserId?: string;
  message?: string;
  timestamp?: number;
  userId?: string; // For registered event
  username?: string; // For registered event
  error?: string; // For error event
}
