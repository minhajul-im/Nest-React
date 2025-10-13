import React, { useState, useEffect, useRef } from "react";
import io, { Socket } from "socket.io-client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./components/ui/dialog";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";

interface UserType {
  id: string;
  name: string;
  avatar?: string;
  isOnline?: boolean;
  lastSeen?: string;
}
interface MessageType {
  id: string;
  message: string;
  senderId: string;
  recipientId: string;
  timestamp: string;
}

interface Typing {
  user: string;
  isTyping: boolean;
}

const App = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(true);
  const socketRef = useRef<Socket | null>(null);
  const [typing, setTyping] = useState<Typing[]>([]);
  const messageRef = useRef<HTMLInputElement>(null);
  const [users, setUsers] = useState<UserType[]>([]);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [myself, setMyself] = useState<UserType | null>(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:8080", {
      transports: ["websocket"],
    });

    socketRef.current.on("connect", () => {
      console.log("CONNECTED TO SERVER");
    });

    socketRef.current.on("users", (users: UserType[]) => {
      setUsers(users);
      console.log({ users });

      const u = users?.find((user) => user?.name === nameRef.current?.value);

      console.log(u);
      console.log("name", nameRef.current?.value);

      if (u) setMyself(u);
    });

    socketRef.current.on("message", (mgs: MessageType[]) => {
      setMessages(mgs);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [socketRef, users, messages]);

  console.log({ messages });

  if (isOpen) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Enter Your Username</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (nameRef.current?.value) {
                const user = {
                  name: nameRef.current.value,
                  avatar: "/placeholder-user.jpg",
                };
                socketRef.current?.emit("join", user);
                setIsOpen(false);
              }
            }}
            className="space-y-4">
            <Input ref={nameRef} placeholder="Your username" autoFocus />
            <Button type="submit">Join Chat</Button>
          </form>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div className="container h-screen mx-auto p-4 flex flex-col">
      <h1 className="text-3xl font-bold text-center py-4">Chat App</h1>
      <div className="flex flex-1 overflow-hidden">
        {/* User List */}
        <div className="w-[300px] border rounded-lg bg-white shadow-sm">
          <h2 className="text-xl font-semibold text-center py-3 border-b">
            Users
          </h2>
          <div className="p-2 space-y-2 overflow-y-auto h-[calc(100%-56px)]">
            {users?.map((user) => (
              <div
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedUser?.id === user.id
                    ? "bg-blue-100 border-blue-300"
                    : "bg-gray-50 hover:bg-gray-100"
                } border`}>
                <p className="font-medium">
                  {user.name}
                  <span className="text-sm text-gray-500">
                    {user.isOnline
                      ? "(Online)"
                      : `(Last seen: ${user.lastSeen})`}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* Chat Section */}
        <div className="flex-1 ml-4 border rounded-lg bg-white shadow-sm flex flex-col">
          {/* Chat Header */}
          <div className="h-16 border-b p-4 flex items-center">
            <h3 className="text-lg font-semibold">
              {selectedUser
                ? `Chat with ${selectedUser.name}`
                : "Select a user to chat"}
            </h3>
          </div>
          {/* Chat Body */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {selectedUser ? (
              messages
                .filter(
                  (msg) =>
                    (msg.senderId === nameRef.current?.value &&
                      msg.recipientId === selectedUser.name) ||
                    (msg.senderId === selectedUser.name &&
                      msg.recipientId === nameRef.current?.value)
                )
                .map((msg) => (
                  <div
                    key={msg.id}
                    className={`mb-2 p-2 rounded-lg max-w-[70%] ${
                      msg.senderId === nameRef.current?.value
                        ? "ml-auto bg-blue-100 text-right"
                        : "mr-auto bg-gray-200"
                    }`}>
                    <p className="text-sm">{msg.message}</p>
                    <p className="text-xs text-gray-500">{msg.timestamp}</p>
                  </div>
                ))
            ) : (
              <p className="text-center text-gray-500">No user selected</p>
            )}
          </div>
          {/* Chat Footer */}
          <div className="p-4 border-t">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (selectedUser && messageRef.current?.value) {
                  if (!myself) {
                    console.log("myself", myself);
                    return;
                  }

                  const message = {
                    senderId: myself?.id,
                    recipientId: selectedUser?.id,
                    message: messageRef.current.value,
                  };
                  socketRef.current?.emit("message", message);
                }
              }}
              className="flex gap-2">
              <Input
                placeholder="Type your message here"
                disabled={!selectedUser}
                ref={messageRef}
                className="flex-1"
              />
              <Button
                type="submit"
                className="cursor-pointer"
                disabled={!selectedUser}>
                Send
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;
