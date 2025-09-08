import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: { origin: 'http://localhost:5173' }, // Match frontend URL
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() data: { message: string; user: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log('Message received:', data);
    const payload = {
      ...data,
      senderId: client.id,
      timestamp: new Date().toISOString(),
    };
    console.log('Broadcasting:', payload);
    this.server.emit('message', payload);
  }

  // New typing event handler
  @SubscribeMessage('typing')
  handleTyping(
    @MessageBody() data: { user: string; isTyping: boolean },
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`${data.user} is typing: ${data.isTyping}`);
    // Broadcast to all clients except the sender
    client.broadcast.emit('typing', {
      user: data.user,
      isTyping: data.isTyping,
    });
  }
}
