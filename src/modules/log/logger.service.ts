import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Log, LogDocument } from "./logger.entitt";
import { Model } from "mongoose";
import { WebsocketGateway } from "../websocket/websocket.gateway";

@Injectable()
export class LoggerService {
  constructor(
    @InjectModel(Log.name) private logModel: Model<LogDocument>,
    private websocket: WebsocketGateway
  ) {}

  async logError(payload: {
    exchange: string;
    message: string;
    url?: string;
    stack?: string;
  }) {
    const log = await this.logModel.create({
      ...payload,
      level: "error",
    });

    this.websocket.sendErrorLog(log);
    return log;
  }
}
