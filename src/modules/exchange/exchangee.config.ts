import axios from "axios";
import {
  AbanTetherResponse,
  ArzinjaMarket,
  bitpinResponse,
  ExchangeConfig,
  PriceItem,
} from "./exchange.interface";

export const EXCHANGES: ExchangeConfig[] = [
  {
    name: "bitpin",
    enabled: true,
    url: "https://api.bitpin.ir/api/v1/mkt/tickers/",
    method: "GET",
    parseFn: async (data: bitpinResponse[]) => {
      return Promise.resolve(
        data.map((item) => ({
          symbol: item.symbol,
          price: parseFloat(item.price),
          isUpdated: true,
        }))
      );
    },

    supportsMultipleSymbols: true,
    currencyPair: "",
  },
  {
    name: "abantether",
    enabled: true,
    url: "https://abantether.com/api/v1/otc/coin-price/",
    method: "GET",
    headers: {
      Authorization: `Token ${process.env.ABAN_TOKEN}`,
    },
    parseFn: async (data: AbanTetherResponse) => {
      return Promise.resolve(
        Object.entries(data).flatMap(([symbol, prices]) => [
          {
            symbol: `${symbol}_USDT`,
            price: parseFloat(prices.usdtPrice),
            isUpdated: true,
          },
          {
            symbol: `${symbol}_IRT`,
            price: parseFloat(prices.irtPriceBuy),
            isUpdated: true,
          },
        ])
      );
    },

    supportsMultipleSymbols: true,
    currencyPair: "",
  },
  {
    name: "arzinja",
    enabled: true,
    url: "https://api-v2.arzinja.app/api/v1/market/all-market?per_page=300&page=1",
    method: "GET",
    supportsMultipleSymbols: true,
    parseFn: async (): Promise<PriceItem[]> => {
      const allPrices: PriceItem[] = [];
      let currentPage = 1;
      let hasNext = true;

      try {
        while (hasNext) {
          const res = await axios.get(
            `https://api-v2.arzinja.app/api/v1/market/all-market?per_page=300&page=${currentPage}`
          );
          const markets = res.data.result as ArzinjaMarket[];
          for (const market of markets) {
            const [symbolKey] = Object.keys(market);
            const item = market[symbolKey];

            const symbol = `${item.baseAsset}_${item.quoteAsset}`;

            allPrices.push(
              {
                symbol,
                price: parseFloat(item.stats.lastPrice),
                isUpdated: true,
              },
              {
                symbol: `${item.baseAsset}_USDT`,
                price: parseFloat(item.stats.lastPriceUsd),
                isUpdated: true,
              }
            );
          }

          const next = res.data.pagination?.links?.next;
          hasNext = !!next;
          currentPage++;
        }

        return allPrices;
      } catch (err) {
        console.error(" Arzinja parse error:", err.message);
        return [];
      }
    },
    currencyPair: "",
  },
  // more exchanges ......
];
