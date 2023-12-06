import {
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class WebsocketGateway implements OnGatewayInit {
  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    console.log('Socket.io Gateway initialized...');
  }
}
