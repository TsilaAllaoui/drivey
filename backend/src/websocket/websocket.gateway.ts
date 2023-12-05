// websocket.gateway.ts
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class WebsocketGateway implements OnGatewayInit {
  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    console.log('Socket.io Gateway initialized');
  }

  emitMessage(percentage: string) {
    console.log('In server: ' + percentage);
    this.server.emit('percentage', percentage);
  }
}
