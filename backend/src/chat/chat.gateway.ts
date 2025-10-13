import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

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

interface CommonType {
  senderId: string;
  recipientId: string;
}

interface SendDataTye extends CommonType {
  message: string;
}

interface TypingType extends CommonType {
  isTyping: boolean;
}

@WebSocketGateway({
  cors: { origin: 'http://localhost:5173' },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  users: UserType[] = [];
  messages: MessageType[] = [];

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('join')
  handleJoin(
    @MessageBody() data: { name: string; avatar?: string },
    @ConnectedSocket() client: Socket,
  ) {
    const user: UserType = {
      id: client.id,
      name: data.name,
      avatar: data?.avatar,
      isOnline: true,
      lastSeen: new Date().toISOString(),
    };
    this.users.push(user);
    this.server.emit('users', this.users);
  }

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody()
    data: SendDataTye,
  ) {
    const payload = {
      id: new Date().toISOString(),
      message: data.message,
      recipientId: data.recipientId,
      senderId: data.senderId,
      timestamp: new Date().toISOString(),
    };
    this.messages.push(payload);
    this.server.to(data.recipientId).emit('message', payload);
    console.log(this.messages);
  }

  @SubscribeMessage('typing')
  handleTyping(@MessageBody() data: TypingType) {
    this.server.to(data.recipientId).emit('typing', data);
  }
}
