export class Price {}
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'price_exchange' })
export class PriceExchange extends Document {
  @Prop({ required: true })
  exchangeName: string;

  @Prop({ required: true })
  currencyPair: string;

  @Prop({ required: true, type: Number })
  price: number;

  @Prop({ default: () => new Date() })
  timestamp: Date;

  @Prop({ default: true })
  isUpdated: boolean;
}

export const PriceExchangeSchema = SchemaFactory.createForClass(PriceExchange);
