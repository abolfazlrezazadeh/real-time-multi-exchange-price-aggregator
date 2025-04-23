import { Module } from '@nestjs/common';
import { PriceService } from './price.service';
import { PriceController } from './price.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PriceExchange, PriceExchangeSchema } from './entities/price.entity';
import { WebsocketGateway } from '../websocket/websocket.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PriceExchange.name, schema: PriceExchangeSchema },
    ]),
  ],
  controllers: [PriceController],
  providers: [PriceService,WebsocketGateway],
  exports: [PriceService],
})
export class PriceModule {}
