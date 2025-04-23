import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayInit,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({
  cors: { origin: "*" },
})
export class WebsocketGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;
  private searchTerms = new Map<string, string>(); // socketId → term
  @SubscribeMessage("subscribe-search")
  handleSearch(@MessageBody() term: string, @ConnectedSocket() client: Socket) {
    this.searchTerms.set(client.id, term.toLowerCase());
  }

  @SubscribeMessage("disconnect")
  handleDisconnect(@ConnectedSocket() client: Socket) {
    this.searchTerms.delete(client.id);
  }
  afterInit() {
    console.log(" WebSocket initialized");
  }

  sendSinglePrice(data: any) {
    this.server.emit("price-update", data);
  }

  sendBulkPrices(data: any[]) {
    this.server.emit("bulk-price-update", data);
  }

  sendGroupedPrices(groupedData: Record<string, any[]>) {
    this.server.emit("grouped-price-update", groupedData);
  }
  // موقع دریافت قیمت جدید:
  sendFilteredPrices(
    prices: { symbol: string; exchangeName: string; price: number }[]
  ) {
    for (const [socketId, term] of this.searchTerms.entries()) {
      const client = this.server.sockets.sockets.get(socketId);
      if (!client) continue;

      const filtered = prices.filter(
        (p) =>
          p.symbol.toLowerCase().includes(term) ||
          p.exchangeName.toLowerCase().includes(term)
      );

      if (filtered.length) {
        client.emit("search-price-update", filtered);
      }
    }
  }
  sendErrorLog(log: any) {
    this.server.emit("error-log", log);
  }
}
