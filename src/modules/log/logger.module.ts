import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Log, LogSchema } from './logger.entitt';
import { WebsocketGateway } from '../websocket/websocket.gateway';
import { LoggerService } from './logger.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }])],
  providers: [LoggerService, WebsocketGateway],
//   controllers: [LoggerC],
  exports: [LoggerService],
})
export class LoggerModule {}
