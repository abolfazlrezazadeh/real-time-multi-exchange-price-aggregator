import { Injectable } from "@nestjs/common";
import { PriceService } from "../price/price.service";
import { EXCHANGES } from "./exchangee.config";
import axios from "axios";
import { LoggerService } from "../log/logger.service";
// import { LoggerService } from "../log/logger.service";

@Injectable()
export class ExchangeService {
  constructor(
    private readonly priceService: PriceService,
    private readonly logger: LoggerService
  ) {}
  async fetchAll() {
    const tasks = EXCHANGES.filter((ex) => ex.enabled).map(async (ex) => {
      try {
        const res = await axios.request({
          url: ex.url,
          method: ex.method,
          headers: ex.headers || {},
        });

        const result = await ex.parseFn(res.data, ex.currencyPair);

        if (Array.isArray(result)) {
          // insert array
          await this.priceService.bulkInsert(
            result.map((item) => ({
              exchangeName: ex.name,
              symbol: item.symbol,
              price: item.price,
              isUpdated: item.isUpdated,
            }))
          );
        } else {
          // insert one
          await this.priceService.upsert({
            exchangeName: ex.name,
            currencyPair: ex.currencyPair,
            price: result,
            isUpdated: true,
          });
        }
      } catch (err) {
        console.error(`Error from ${ex.name}:`, err.message);
        await this.logger.logError({
          exchange: ex.name,
          message: err.message,
          url: ex.url,
          stack: err.stack,
        });
        
        await this.priceService.upsert({
          exchangeName: ex.name,
          currencyPair: ex.currencyPair,
          price: 0,
          isUpdated: false,
        });
      }
    });

    await Promise.all(tasks);
  }
}
