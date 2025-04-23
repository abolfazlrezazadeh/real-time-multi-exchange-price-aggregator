export interface PriceItem {
  symbol: string;
  price: number;
  isUpdated: boolean;
}

export interface ExchangeConfig {
  name: string;
  enabled: boolean;
  url: string;
  method: "GET" | "POST";
  headers?: Record<string, string>;
  parseFn: (data?: any, symbol?: string) => Promise<number | PriceItem[]>;
  supportsMultipleSymbols?: boolean;
  currencyPair: string;
}
export interface bitpin {
  symbol: string;
  price: string;
  daily_change_price: number;
  low: string;
  high: string;
  timestamp: number;
}

export interface bitpinResponse {
  price: string;
  symbol: any;
  results: bitpin[];
}
export interface AbanTetherCoin {
  usdtPrice: string;
  irtPriceBuy: string;
  irtPriceSell: string;
}

export interface AbanTetherResponse {
  [symbol: string]: AbanTetherCoin;
}
export interface ArzinjaStats {
    lastPrice: string;
    lastPriceUsd: string;
  }
  
  export interface ArzinjaMarket {
    [symbol: string]: {
      pair_id: number;
      pair: string;
      baseAsset: string;
      quoteAsset: string;
      stats: ArzinjaStats;
    };
  }
  
  export interface ArzinjaResponse {
    data: ArzinjaMarket[];
    pagination: {
      total: number;
      count: number;
      per_page: number;
      current_page: number;
      total_pages: number;
      links: {
        previous: string | null;
        next: string | null;
      };
    };
  }
  