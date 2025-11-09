// Somnia Data Streams (SDS) Service Implementation
// 
// CURRENT STATUS: Mock implementation for demonstration
// PRODUCTION READY: Architecture designed for seamless SDK integration
// 
// To integrate real Somnia Data Streams SDK:
// 1. Install: npm install @somnia/data-streams
// 2. Replace mock methods with SDK calls (see SDS_INTEGRATION.md)
// 3. Update environment variables with your API key
// 
// This abstraction layer ensures all components work with both mock and real SDK
// without any code changes. See /SDS_INTEGRATION.md for complete guide.

import { SDS_CONFIG } from '../config/somnia';

export interface TokenData {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  lastUpdate: number;
}

export interface StreamCallback {
  (data: TokenData): void;
}

class SomniaDataStreamsService {
  private ws: WebSocket | null = null;
  private subscribers: Map<string, Set<StreamCallback>> = new Map();
  private isConnected: boolean = false;
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;
  private mockDataInterval: NodeJS.Timeout | null = null;

  // Initialize connection to SDS
  async connect(): Promise<void> {
    console.log(`[SDS] Connecting to Somnia Data Streams at ${SDS_CONFIG.endpoint}...`);
    
    // MOCK IMPLEMENTATION - For demonstration purposes
    // This simulates real SDS connection behavior
    // 
    // PRODUCTION CODE (uncomment when ready):
    /*
    import { SomniaDataStreams } from '@somnia/data-streams';
    
    this.sdsClient = new SomniaDataStreams({
      endpoint: SDS_CONFIG.endpoint,
      apiKey: SDS_CONFIG.apiKey,
      network: 'testnet',
      options: {
        reconnect: true,
        maxReconnectAttempts: this.maxReconnectAttempts,
      }
    });
    
    this.sdsClient.on('connect', () => {
      this.isConnected = true;
      console.log('[SDS] Connected successfully');
    });
    
    await this.sdsClient.connect();
    return;
    */
    
    // Mock connection logic (remove when using real SDK):
    // this.ws = new WebSocket(`${SDS_CONFIG.endpoint}?apiKey=${SDS_CONFIG.apiKey}`);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        this.isConnected = true;
        console.log('[SDS] Connected successfully');
        this.startMockDataStream();
        resolve();
      }, 1000);
    });
  }

  // Subscribe to a specific token stream
  subscribeToStream(symbol: string, callback: StreamCallback): () => void {
    console.log(`[SDS] Subscribing to ${symbol} stream...`);
    
    if (!this.subscribers.has(symbol)) {
      this.subscribers.set(symbol, new Set());
    }
    
    this.subscribers.get(symbol)!.add(callback);

    // PRODUCTION CODE (uncomment when using real SDK):
    /*
    const streamId = this.sdsClient?.subscribe({
      channel: 'token',
      symbol: symbol,
      events: ['price', 'volume', 'marketcap']
    }, (event) => {
      const tokenData = this.transformStreamData(event);
      this.onDataUpdate(symbol, tokenData);
    });
    */
    
    // Mock subscription (remove when using real SDK):
    // this.ws?.send(JSON.stringify({
    //   action: 'subscribe',
    //   channel: `token.${symbol}`,
    //   version: SDS_CONFIG.version
    // }));

    // Return unsubscribe function
    return () => {
      this.subscribers.get(symbol)?.delete(callback);
      console.log(`[SDS] Unsubscribed from ${symbol} stream`);
    };
  }

  // Handle incoming data updates
  private onDataUpdate(symbol: string, data: TokenData): void {
    const callbacks = this.subscribers.get(symbol);
    if (callbacks) {
      callbacks.forEach(callback => callback(data));
    }
  }

  // Mock data stream generator (replace with actual SDS in production)
  private startMockDataStream(): void {
    const tokens = ['STT', 'USDC', 'WETH', 'DAI', 'USDT'];
    const baseData: Record<string, TokenData> = {
      STT: { symbol: 'STT', name: 'Somnia Token', price: 1.23, change24h: 5.4, volume24h: 1200000, marketCap: 50000000, lastUpdate: Date.now() },
      USDC: { symbol: 'USDC', name: 'USD Coin', price: 1.00, change24h: 0.1, volume24h: 8500000, marketCap: 150000000, lastUpdate: Date.now() },
      WETH: { symbol: 'WETH', name: 'Wrapped Ether', price: 2345.67, change24h: -2.3, volume24h: 5600000, marketCap: 890000000, lastUpdate: Date.now() },
      DAI: { symbol: 'DAI', name: 'Dai Stablecoin', price: 0.999, change24h: -0.05, volume24h: 3200000, marketCap: 120000000, lastUpdate: Date.now() },
      USDT: { symbol: 'USDT', name: 'Tether USD', price: 1.00, change24h: 0.02, volume24h: 12000000, marketCap: 200000000, lastUpdate: Date.now() },
    };

    this.mockDataInterval = setInterval(() => {
      tokens.forEach(symbol => {
        if (this.subscribers.has(symbol)) {
          const currentData = baseData[symbol];
          const priceChange = (Math.random() - 0.5) * (currentData.price * 0.01);
          const updatedData: TokenData = {
            ...currentData,
            price: Math.max(0.01, currentData.price + priceChange),
            change24h: currentData.change24h + (Math.random() - 0.5) * 0.5,
            volume24h: currentData.volume24h * (1 + (Math.random() - 0.5) * 0.05),
            lastUpdate: Date.now(),
          };
          baseData[symbol] = updatedData;
          this.onDataUpdate(symbol, updatedData);
        }
      });
    }, 2000); // Update every 2 seconds
  }

  // Disconnect from SDS
  disconnect(): void {
    console.log('[SDS] Disconnecting...');
    this.ws?.close();
    this.isConnected = false;
    if (this.mockDataInterval) {
      clearInterval(this.mockDataInterval);
    }
    this.subscribers.clear();
  }

  getConnectionStatus(): boolean {
    return this.isConnected;
  }
}

// Singleton instance
export const sdsService = new SomniaDataStreamsService();
