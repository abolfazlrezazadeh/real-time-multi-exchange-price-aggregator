import { Injectable } from '@nestjs/common';
import { ExchangeService } from '../exchange/exchange.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class SchedularService {
  constructor(private readonly exchangeService: ExchangeService) {}
  @Cron('*/1 * * * * *') // every one minute
  async handleCron() {
    console.log('Fetching prices from all exchanges...');
    await this.exchangeService.fetchAll();
  }
}
