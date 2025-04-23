import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from "@nestjs/common";
import { ExchangeService } from "./exchange.service";
import { EXCHANGES } from "./exchangee.config";

@Controller("exchange")
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}

  @Get()
  getAllExchanges() {
    return EXCHANGES.map((ex) => ({
      name: ex.name,
      enabled: ex.enabled,
      supportsMultipleSymbols: ex.supportsMultipleSymbols,
      method: ex.method,
      url: ex.url,
    }));
  }
  @Patch("/:name/toggle")
  toggleExchange(@Param("name") name: string) {
    const exchange = EXCHANGES.find((ex) => ex.name === name);
    if (!exchange) {
      throw new NotFoundException("Exchange not found");
    }

    exchange.enabled = !exchange.enabled;
    return {
      name: exchange.name,
      enabled: exchange.enabled,
    };
  }
}
