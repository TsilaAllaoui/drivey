import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SessionModule } from './session/session.module';
import { WebsocketGateway } from './websocket/websocket.gateway';
import { WebsocketModule } from './websocket/websocket.module';

@Module({
  imports: [SessionModule, WebsocketModule],
  controllers: [AppController],
  providers: [AppService, WebsocketGateway],
})
export class AppModule {}
