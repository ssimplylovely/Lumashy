// On-Chain Event Service for Somnia Data Streams

export interface OnChainEvent {
  id: string;
  type: 'swap' | 'liquidity_add' | 'liquidity_remove' | 'price_update' | 'transfer';
  token: string;
  change?: string;
  amount?: string;
  from?: string;
  to?: string;
  timestamp: string;
  emoji: string;
}

type EventCallback = (event: OnChainEvent) => void;

class EventStreamService {
  private subscribers: Set<EventCallback> = new Set();
  private events: OnChainEvent[] = [];
  private mockInterval: NodeJS.Timeout | null = null;

  // Subscribe to event stream
  subscribe(callback: EventCallback): () => void {
    this.subscribers.add(callback);
    
    // Send existing events to new subscriber
    this.events.forEach(event => callback(event));
    
    return () => {
      this.subscribers.delete(callback);
    };
  }

  // Start generating mock events
  startEventStream(): void {
    if (this.mockInterval) return;

    const tokens = ['SOMI/ETH', 'USDC/ETH', 'WETH/DAI', 'STT/USDC'];
    const eventTypes: OnChainEvent['type'][] = ['swap', 'liquidity_add', 'liquidity_remove', 'price_update', 'transfer'];
    const emojis = {
      swap: '🔄',
      liquidity_add: '💧',
      liquidity_remove: '💸',
      price_update: '📈',
      transfer: '➡️',
    };

    this.mockInterval = setInterval(() => {
      const type = eventTypes[Math.floor(Math.random() * eventTypes.length)];
      const token = tokens[Math.floor(Math.random() * tokens.length)];
      
      const event: OnChainEvent = {
        id: `${Date.now()}-${Math.random()}`,
        type,
        token,
        timestamp: new Date().toISOString(),
        emoji: emojis[type],
      };

      // Add type-specific data
      switch (type) {
        case 'price_update':
          const changeValue = (Math.random() * 10 - 5).toFixed(2);
          event.change = `${changeValue >= 0 ? '+' : ''}${changeValue}%`;
          break;
        case 'swap':
          event.amount = `$${(Math.random() * 10000).toFixed(2)}`;
          break;
        case 'liquidity_add':
        case 'liquidity_remove':
          event.amount = `$${(Math.random() * 50000).toFixed(2)}`;
          break;
        case 'transfer':
          event.from = `0x${Math.random().toString(16).substring(2, 10)}...`;
          event.to = `0x${Math.random().toString(16).substring(2, 10)}...`;
          event.amount = `${(Math.random() * 1000).toFixed(2)} ${token.split('/')[0]}`;
          break;
      }

      this.addEvent(event);
    }, 3000); // New event every 3 seconds
  }

  // Add event and notify subscribers
  private addEvent(event: OnChainEvent): void {
    this.events.unshift(event);
    
    // Keep only last 50 events in memory
    if (this.events.length > 50) {
      this.events = this.events.slice(0, 50);
    }

    // Notify all subscribers
    this.subscribers.forEach(callback => callback(event));
  }

  // Stop event stream
  stopEventStream(): void {
    if (this.mockInterval) {
      clearInterval(this.mockInterval);
      this.mockInterval = null;
    }
  }

  // Get recent events
  getRecentEvents(limit: number = 5): OnChainEvent[] {
    return this.events.slice(0, limit);
  }
}

// Singleton instance
export const eventStreamService = new EventStreamService();
