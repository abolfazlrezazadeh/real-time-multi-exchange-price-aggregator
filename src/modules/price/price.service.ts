import { Injectable } from "@nestjs/common";
import { CreatePriceDto } from "./dto/create-price.dto";
import { UpdatePriceDto } from "./dto/update-price.dto";
import { InjectModel } from "@nestjs/mongoose";
import { PriceExchange } from "./entities/price.entity";
import { Model } from "mongoose";
import { WebsocketGateway } from "../websocket/websocket.gateway";

@Injectable()
export class PriceService {
  constructor(
    @InjectModel(PriceExchange.name) private priceModel: Model<PriceExchange>,
    private readonly websocket: WebsocketGateway
  ) {}
  async upsert(createPriceDto: CreatePriceDto) {
    const { exchangeName, currencyPair, price, isUpdated } = createPriceDto;
    const updated = await this.priceModel.findOneAndUpdate(
      {
        exchangeName: createPriceDto.exchangeName,
        currencyPair: createPriceDto.currencyPair,
      },
      { ...createPriceDto, timestamp: new Date() },
      { upsert: true, new: true }
    );

    this.websocket.sendSinglePrice(updated); // send price to client
    return updated;
  }
  async bulkInsert(
    items: {
      exchangeName: string;
      price: number;
      symbol: string;
      isUpdated: boolean;
    }[]
  ) {
    const ops = items.map((item) => ({
      updateOne: {
        filter: { exchangeName: item.exchangeName, currencyPair: item.symbol },
        update: {
          price: item.price,
          isUpdated: item.isUpdated,
          timestamp: new Date(),
        },
        upsert: true,
      },
    }));

    await this.priceModel.bulkWrite(ops);

    
    this.websocket.sendGroupedPrices(this.groupByExchange(items));

    this.websocket.sendFilteredPrices(
      items.map((item) => ({
        symbol: item.symbol,
        exchangeName: item.exchangeName,
        price: item.price,
      }))
    );

  }
  groupByExchange(items: any[]) {
    return items.reduce((acc, item) => {
      if (!acc[item.exchangeName]) acc[item.exchangeName] = [];
      acc[item.exchangeName].push(item);
      return acc;
    }, {});
  }
  
}
