import { Module } from '@nestjs/common';
import { WebsocketGateway } from './websocket.getway';

@Module({
  providers: [WebsocketGateway],
})
export class WebsocketModule {}
