import { Module } from '@nestjs/common';
import { ExchangeService } from './exchange.service';
import { PriceModule } from '../price/price.module';
import { ExchangeController } from './exchange.controller';
import { LoggerModule } from '../log/logger.module';

@Module({
  imports:[PriceModule,LoggerModule],
  controllers: [ExchangeController],
  providers: [ExchangeService],
  exports: [ExchangeService],
})
export class ExchangeModule {}
