import type { User, Group, ChatMessage, Chat } from "@/types/chat"

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Alice Johnson",
    avatar: "/professional-woman.png",
    isOnline: true,
  },
  {
    id: "2",
    name: "Bob Smith",
    avatar: "/casual-man.png",
    isOnline: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
  {
    id: "3",
    name: "Carol Davis",
    avatar: "/business-woman.png",
    isOnline: true,
  },
]

export const mockGroups: Group[] = [
  {
    id: "g1",
    name: "Project Team",
    members: ["1", "2", "3"],
    avatar: "/team-workspace.png",
  },
  {
    id: "g2",
    name: "Design Squad",
    members: ["1", "3"],
    avatar: "/abstract-creative-design.png",
  },
]

export const mockMessages: ChatMessage[] = [
  {
    id: "m1",
    userId: "1",
    message: "Hey! How are you doing?",
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
    isGroup: false,
    type: "text",
  },
  {
    id: "m2",
    userId: "current",
    message: "I'm doing great! Just working on the new project.",
    timestamp: new Date(Date.now() - 1000 * 60 * 8),
    isGroup: false,
    type: "text",
  },
  {
    id: "m3",
    userId: "1",
    message: "That sounds exciting! Let me know if you need any help.",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    isGroup: false,
    type: "text",
  },
  {
    id: "m4",
    userId: "2",
    message: "Welcome to the team! 🎉",
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    isGroup: true,
    groupId: "g1",
    type: "text",
  },
  {
    id: "m5",
    userId: "3",
    message: "Looking forward to working with everyone!",
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    isGroup: true,
    groupId: "g1",
    type: "text",
  },
]

export const mockChats: Chat[] = [
  {
    id: "1",
    type: "user",
    participants: ["1", "current"],
    lastMessage: mockMessages[2],
    unreadCount: 0,
  },
  {
    id: "2",
    type: "user",
    participants: ["2", "current"],
    lastMessage: undefined,
    unreadCount: 0,
  },
  {
    id: "3",
    type: "user",
    participants: ["3", "current"],
    lastMessage: undefined,
    unreadCount: 2,
  },
  {
    id: "g1",
    type: "group",
    participants: ["1", "2", "3", "current"],
    lastMessage: mockMessages[4],
    unreadCount: 1,
  },
  {
    id: "g2",
    type: "group",
    participants: ["1", "3", "current"],
    lastMessage: undefined,
    unreadCount: 0,
  },
]
