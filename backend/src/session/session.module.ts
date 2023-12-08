import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';

@Module({
  imports: [ConfigModule],
  controllers: [SessionController],
  providers: [SessionService, WebsocketGateway],
})
export class SessionModule {}
