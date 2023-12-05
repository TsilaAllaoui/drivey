// websocket.gateway.ts
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class WebsocketGateway implements OnGatewayInit {
  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    console.log('Socket.io Gateway initialized');
  }

  @SubscribeMessage('percentage')
  handleMessage(client: any, payload: string): string {
    return payload;
  }
}
