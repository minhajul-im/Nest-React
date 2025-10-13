import { useState, useEffect, useRef, useCallback } from "react";

interface ChatController {
  userId: string | null;
  username: string | null;
  users: User[];
  messages: { [toUserId: string]: ChatMessage[] }; // Changed to map
  sendPrivate: (toUserId: string, message: string) => void;
  fetchMessages: (toUserId: string) => Promise<void>;
  registerUser: (username: string) => Promise<void>;
  error: string | null;
}

export function useChatController(): ChatController {
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<{
    [toUserId: string]: ChatMessage[];
  }>({});
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000"); // Match backend port (change to 8080 if needed)
    socketRef.current = ws;

    ws.onopen = () => {
      console.log("WebSocket connected");
      if (userId) {
        ws.send(JSON.stringify({ event: "register", data: { userId } }));
      }
    };

    ws.onmessage = (event) => {
      const parsed: IncomingMessage = JSON.parse(event.data);

      if (parsed.event === "registered") {
        setUsername(parsed.username || null);
        setUserId(parsed.userId || null);
      } else if (parsed.event === "privateMessage") {
        const chatKey =
          parsed.fromUserId === userId ? parsed.toUserId! : parsed.fromUserId!;
        const newMessage: ChatMessage = {
          id: `m${parsed.timestamp || Date.now()}`,
          userId: parsed.fromUserId!,
          message: parsed.message!,
          timestamp: new Date(parsed.timestamp!),
          type: "text",
        };
        setMessages((prevState) => {
          const existingMessages = prevState[chatKey] || [];

          if (existingMessages.some((msg) => msg.id === newMessage.id)) {
            return prevState;
          }
          return {
            ...prevState,
            [chatKey]: [...existingMessages, newMessage],
          };
        });
      } else if (parsed.event === "error" || parsed.event === "info") {
        setError(parsed.message || "Unknown error");
      }
    };

    ws.onerror = () => setError("WebSocket connection failed");
    ws.onclose = () => console.log("WebSocket closed");

    return () => ws.close();
  }, [userId]);

  const registerUser = useCallback(async (username: string) => {
    try {
      const response = await fetch("http://localhost:3000/chat/register", {
        // Match backend port
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }
      const { userId, username: registeredUsername } = await response.json();
      setUserId(userId);
      setUsername(registeredUsername);
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.send(
          JSON.stringify({ event: "register", data: { userId } })
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    }
  }, []);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3000/chat/users"); // Match backend port
      if (!response.ok) throw new Error("Failed to fetch users");
      const users: User[] = await response.json();
      setUsers(users);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch users");
    }
  }, []);

  const fetchMessages = useCallback(
    async (toUserId: string) => {
      if (!userId) return;
      try {
        const response = await fetch("http://localhost:3000/chat/messages", {
          // Match backend port
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, toUserId }),
        });
        if (!response.ok) throw new Error("Failed to fetch messages");

        const fetchedMessages: {
          fromUserId: string;
          toUserId: string;
          message: string;
          timestamp: number;
        }[] = await response.json();
        setMessages((prev) => ({
          ...prev,
          [toUserId]: fetchedMessages.map((msg) => ({
            id: `m${msg.timestamp}`,
            userId: msg.fromUserId,
            message: msg.message,
            timestamp: new Date(msg.timestamp),
            type: "text",
          })) as ChatMessage[],
        }));
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch messages"
        );
      }
    },
    [userId]
  );

  const sendPrivate = useCallback(
    (toUserId: string, message: string) => {
      if (!userId || !socketRef.current) return;

      const tempId = `temp${Date.now()}`;
      setMessages((prev) => {
        const existingMessages = prev[toUserId] || [];
        return {
          ...prev,
          [toUserId]: [
            ...existingMessages,
            {
              id: tempId,
              userId,
              message,
              timestamp: new Date(),
              type: "text",
            } as ChatMessage,
          ],
        };
      });
      socketRef.current.send(
        JSON.stringify({
          event: "privateMessage",
          data: { toUserId, message, userId },
        })
      );
    },
    [userId]
  );

  // Fetch users on mount or when userId/username changes
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    userId,
    username,
    users,
    messages,
    sendPrivate,
    fetchMessages,
    registerUser,
    error,
  };
}

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
  type: "text";
}

export interface IncomingMessage {
  event: "privateMessage" | "error" | "registered" | "info"; // Added 'info'
  fromUserId?: string;
  fromUsername?: string;
  toUserId?: string;
  message?: string;
  timestamp?: number;
  userId?: string; // For registered event
  username?: string; // For registered event
  error?: string; // For error/info event
}
