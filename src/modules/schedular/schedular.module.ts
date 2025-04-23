import { Module } from '@nestjs/common';
import { SchedularService } from './schedular.service';
import { ExchangeModule } from '../exchange/exchange.module';

@Module({
  imports:[ExchangeModule],
  providers: [SchedularService],
})
export class SchedularModule {}
