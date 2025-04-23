import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LogDocument = Log & Document;

@Schema({ timestamps: true })
export class Log {
  @Prop()
  exchange: string;

  @Prop()
  message: string;

  @Prop()
  stack?: string;

  @Prop()
  url?: string;

  @Prop({ default: 'error' })
  level: 'error' | 'warn' | 'info';
}

export const LogSchema = SchemaFactory.createForClass(Log);
