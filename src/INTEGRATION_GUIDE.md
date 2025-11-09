# LumaShy Integration Guide

A comprehensive guide for developers who want to integrate Somnia Data Streams into their own projects using LumaShy as a reference.

---

## 🎯 Who This Guide Is For

- Developers building DeFi dashboards
- Teams integrating real-time blockchain data
- Projects deploying on Somnia Testnet
- Anyone learning Somnia Data Streams SDK

---

## 📚 Quick Start: Using LumaShy as a Template

### Option 1: Clone and Customize

```bash
# Clone the repository
git clone https://github.com/yourusername/lumashy.git
cd lumashy

# Install dependencies
npm install

# Customize for your project
# 1. Update branding in /components/LandingPage.tsx
# 2. Add your tokens in /services/sdsService.ts
# 3. Customize theme in /styles/globals.css
# 4. Add your SDS API key in /config/somnia.ts

# Run your customized dashboard
npm run dev
```

### Option 2: Copy Specific Components

LumaShy is designed to be modular. You can copy individual components:

**Want real-time token feed?**
```bash
# Copy these files to your project:
/components/LiveTokenFeed.tsx
/hooks/useSDS.ts
/services/sdsService.ts
/types/sds.d.ts
```

**Want event monitoring?**
```bash
# Copy these files:
/components/OnChainEventFeed.tsx
/hooks/useEventStream.ts
/services/eventService.ts
```

---

## 🔌 Integration Patterns

### Pattern 1: Basic Token Price Display

**Use Case:** Show live price of a single token

```typescript
// YourComponent.tsx
import { useTokenStream } from './hooks/useSDS';

export function TokenPrice({ symbol }: { symbol: string }) {
  const { data, isLoading, error } = useTokenStream(symbol);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return null;

  return (
    <div>
      <h3>{data.name} ({data.symbol})</h3>
      <p className="text-2xl">${data.price.toFixed(2)}</p>
      <p className={data.change24h > 0 ? 'text-green-500' : 'text-red-500'}>
        {data.change24h > 0 ? '↑' : '↓'} {Math.abs(data.change24h).toFixed(2)}%
      </p>
    </div>
  );
}
```

---

### Pattern 2: Multi-Token Dashboard

**Use Case:** Display multiple tokens side-by-side

```typescript
import { useMultipleTokenStreams } from './hooks/useSDS';

export function TokenGrid() {
  const symbols = ['STT', 'USDC', 'WETH', 'DAI'];
  const { data, isLoading } = useMultipleTokenStreams(symbols);

  return (
    <div className="grid grid-cols-2 gap-4">
      {symbols.map(symbol => {
        const tokenData = data.get(symbol);
        return (
          <div key={symbol} className="p-4 border rounded-lg">
            <h4>{tokenData?.name || symbol}</h4>
            <p>${tokenData?.price.toFixed(2) || '...'}</p>
          </div>
        );
      })}
    </div>
  );
}
```

---

### Pattern 3: Real-Time Chart

**Use Case:** Chart that updates as new data arrives

```typescript
import { useEffect, useState } from 'react';
import { useTokenStream } from './hooks/useSDS';
import { LineChart, Line, XAxis, YAxis } from 'recharts';

export function PriceChart({ symbol }: { symbol: string }) {
  const { data } = useTokenStream(symbol);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setChartData(prev => [
        ...prev,
        {
          time: new Date().toLocaleTimeString(),
          price: data.price,
        }
      ].slice(-30)); // Keep last 30 data points
    }
  }, [data]);

  return (
    <LineChart width={500} height={300} data={chartData}>
      <XAxis dataKey="time" />
      <YAxis />
      <Line type="monotone" dataKey="price" stroke="#8884d8" />
    </LineChart>
  );
}
```

---

### Pattern 4: Connection Status Indicator

**Use Case:** Show users if data is live

```typescript
import { useSDSConnection } from './hooks/useSDS';
import { motion } from 'motion/react';

export function ConnectionStatus() {
  const { isConnected, connect, disconnect } = useSDSConnection();

  return (
    <div className="flex items-center gap-2">
      <motion.div
        animate={{ 
          scale: isConnected ? [1, 1.2, 1] : 1,
          opacity: isConnected ? 1 : 0.5 
        }}
        transition={{ repeat: Infinity, duration: 2 }}
        className={`w-3 h-3 rounded-full ${
          isConnected ? 'bg-green-500' : 'bg-gray-500'
        }`}
      />
      <span>{isConnected ? 'Live' : 'Offline'}</span>
      <button onClick={isConnected ? disconnect : connect}>
        {isConnected ? 'Disconnect' : 'Connect'}
      </button>
    </div>
  );
}
```

---

### Pattern 5: Event Feed

**Use Case:** Show recent blockchain events

```typescript
import { useEventStream } from './hooks/useEventStream';

export function EventFeed() {
  const { events } = useEventStream();

  return (
    <div className="space-y-2">
      <h3>Recent Events</h3>
      {events.slice(0, 10).map(event => (
        <div key={event.id} className="p-3 border rounded">
          <div className="flex items-center gap-2">
            <span>{getEventIcon(event.type)}</span>
            <span>{event.type}</span>
            <span className="text-sm text-gray-500">
              {new Date(event.timestamp).toLocaleTimeString()}
            </span>
          </div>
          <div className="text-sm mt-1">
            {event.token} - {event.amount?.toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  );
}

function getEventIcon(type: string) {
  const icons = {
    swap: '🔄',
    liquidity_add: '💧',
    liquidity_remove: '💸',
    price_update: '📈',
    transfer: '➡️',
  };
  return icons[type as keyof typeof icons] || '📊';
}
```

---

## 🔧 Customization Examples

### Custom Token List

```typescript
// /config/tokens.ts
export const MY_TOKENS = [
  { symbol: 'TOKEN1', address: '0x...' },
  { symbol: 'TOKEN2', address: '0x...' },
  { symbol: 'TOKEN3', address: '0x...' },
];

// In your component:
const symbols = MY_TOKENS.map(t => t.symbol);
const { data } = useMultipleTokenStreams(symbols);
```

### Custom Theme

```css
/* /styles/globals.css */
:root {
  /* Replace LumaShy purple theme with your brand colors */
  --color-primary: #your-color;
  --color-secondary: #your-color;
  --color-accent: #your-color;
}

/* Update gradients */
.your-gradient {
  background: linear-gradient(
    135deg,
    var(--color-primary),
    var(--color-secondary)
  );
}
```

### Custom Data Transformations

```typescript
// /services/sdsService.ts

// Add custom calculated fields
private transformData(rawData: any): EnhancedTokenData {
  const baseData = this.parseBaseData(rawData);
  
  return {
    ...baseData,
    // Add custom fields
    volatility: this.calculateVolatility(baseData),
    momentum: this.calculateMomentum(baseData),
    rsi: this.calculateRSI(baseData),
  };
}

private calculateVolatility(data: TokenData): number {
  // Your custom calculation
  return Math.abs(data.change24h) / data.price * 100;
}
```

---

## 🎨 UI Component Library

LumaShy uses Shadcn/ui components. Here's how to use them:

### Installing Shadcn Components

```bash
# Already included in LumaShy, but for your own project:
npx shadcn-ui@latest init
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog
```

### Example: Custom Token Card

```typescript
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';

export function TokenCard({ token }: { token: TokenData }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{token.name}</CardTitle>
        <Badge variant={token.change24h > 0 ? 'default' : 'destructive'}>
          {token.change24h > 0 ? '↑' : '↓'} {token.change24h.toFixed(2)}%
        </Badge>
      </CardHeader>
      <CardContent>
        <p className="text-3xl">${token.price.toFixed(2)}</p>
        <p className="text-sm text-gray-500">
          Vol: ${(token.volume24h / 1e6).toFixed(2)}M
        </p>
      </CardContent>
    </Card>
  );
}
```

---

## 🔐 Smart Contract Integration

### Reading On-Chain Data

```typescript
// /services/contractService.ts
import { ethers } from 'ethers';
import { SOMNIA_TESTNET } from '../config/somnia';

export class ContractService {
  private provider: ethers.JsonRpcProvider;

  constructor() {
    this.provider = new ethers.JsonRpcProvider(SOMNIA_TESTNET.rpcUrl);
  }

  async getTokenBalance(tokenAddress: string, walletAddress: string): Promise<string> {
    const abi = ['function balanceOf(address) view returns (uint256)'];
    const contract = new ethers.Contract(tokenAddress, abi, this.provider);
    const balance = await contract.balanceOf(walletAddress);
    return ethers.formatEther(balance);
  }

  async getTokenPrice(tokenAddress: string): Promise<number> {
    // Query price from DEX contract
    // This would integrate with your specific DEX
    const dexAbi = ['function getPrice(address) view returns (uint256)'];
    const dexContract = new ethers.Contract('DEX_ADDRESS', dexAbi, this.provider);
    const price = await dexContract.getPrice(tokenAddress);
    return parseFloat(ethers.formatEther(price));
  }
}

export const contractService = new ContractService();
```

### Using with SDS Data

```typescript
import { useTokenStream } from './hooks/useSDS';
import { contractService } from './services/contractService';
import { useState, useEffect } from 'react';

export function TokenWithBalance({ symbol, userAddress }: Props) {
  const { data } = useTokenStream(symbol);
  const [balance, setBalance] = useState<string>('0');

  useEffect(() => {
    if (data && userAddress) {
      contractService
        .getTokenBalance(data.address, userAddress)
        .then(setBalance);
    }
  }, [data, userAddress]);

  return (
    <div>
      <h3>{data?.name}</h3>
      <p>Price: ${data?.price}</p>
      <p>Your Balance: {balance} {symbol}</p>
      <p>Value: ${(parseFloat(balance) * (data?.price || 0)).toFixed(2)}</p>
    </div>
  );
}
```

---

## 📡 Advanced Integration: Custom Data Sources

### Combining SDS with Other APIs

```typescript
// Combine Somnia Data Streams with external price feeds
import { useTokenStream } from './hooks/useSDS';
import { useQuery } from '@tanstack/react-query';

export function HybridPriceDisplay({ symbol }: { symbol: string }) {
  // Real-time SDS data
  const { data: sdsData } = useTokenStream(symbol);
  
  // External API for comparison
  const { data: externalData } = useQuery({
    queryKey: ['external-price', symbol],
    queryFn: () => fetch(`https://api.example.com/price/${symbol}`).then(r => r.json()),
    refetchInterval: 60000, // 1 minute
  });

  const priceDiff = sdsData && externalData 
    ? ((sdsData.price - externalData.price) / externalData.price * 100)
    : 0;

  return (
    <div>
      <h3>{symbol}</h3>
      <div>
        <p>Somnia: ${sdsData?.price.toFixed(2)}</p>
        <p>External: ${externalData?.price.toFixed(2)}</p>
        <p>Difference: {priceDiff.toFixed(2)}%</p>
      </div>
    </div>
  );
}
```

### Historical Data Aggregation

```typescript
// Store and analyze historical data
import { useTokenStream } from './hooks/useSDS';
import { useState, useEffect } from 'react';

export function PriceHistory({ symbol }: { symbol: string }) {
  const { data } = useTokenStream(symbol);
  const [history, setHistory] = useState<Array<{time: number, price: number}>>([]);

  useEffect(() => {
    if (data) {
      setHistory(prev => [...prev, {
        time: Date.now(),
        price: data.price,
      }]);
    }
  }, [data]);

  const avgPrice = history.length > 0
    ? history.reduce((sum, d) => sum + d.price, 0) / history.length
    : 0;

  const maxPrice = Math.max(...history.map(d => d.price));
  const minPrice = Math.min(...history.map(d => d.price));

  return (
    <div>
      <h3>{symbol} Statistics</h3>
      <p>Current: ${data?.price.toFixed(2)}</p>
      <p>Average: ${avgPrice.toFixed(2)}</p>
      <p>High: ${maxPrice.toFixed(2)}</p>
      <p>Low: ${minPrice.toFixed(2)}</p>
    </div>
  );
}
```

---

## 🚀 Production Deployment Checklist

### Before Going Live

```markdown
- [ ] Replace mock SDS service with real SDK
- [ ] Add real SDS API key (environment variable)
- [ ] Test all features on Somnia Testnet
- [ ] Implement error boundaries
- [ ] Add analytics tracking
- [ ] Setup monitoring (Sentry, etc.)
- [ ] Optimize bundle size
- [ ] Test on mobile devices
- [ ] Setup CI/CD pipeline
- [ ] Configure CDN caching
- [ ] Add rate limiting
- [ ] Implement user authentication (if needed)
- [ ] Add terms of service
- [ ] Setup domain and SSL
```

### Environment Variables

```bash
# .env.production
VITE_SDS_API_KEY=your_production_api_key
VITE_SDS_ENDPOINT=wss://sds.somnia.network
VITE_SOMNIA_RPC=https://rpc.somnia.network
VITE_CHAIN_ID=50311
```

---

## 📖 API Reference

### SDS Service Methods

```typescript
// Connection
await sdsService.connect(): Promise<void>
sdsService.disconnect(): void
sdsService.getConnectionStatus(): boolean

// Subscriptions
sdsService.subscribeToStream(
  symbol: string, 
  callback: (data: TokenData) => void
): () => void

// Events
eventService.subscribe(
  callback: (event: BlockchainEvent) => void
): () => void
```

### Hook Signatures

```typescript
// Token hooks
useTokenStream(symbol: string): {
  data: TokenData | null;
  isLoading: boolean;
  error: Error | null;
}

useMultipleTokenStreams(symbols: string[]): {
  data: Map<string, TokenData>;
  isLoading: boolean;
  error: Error | null;
}

// Connection hook
useSDSConnection(): {
  isConnected: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
}

// Event hook
useEventStream(): {
  events: BlockchainEvent[];
}
```

### Type Definitions

```typescript
interface TokenData {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  lastUpdate: number;
}

interface BlockchainEvent {
  id: string;
  type: 'swap' | 'liquidity_add' | 'liquidity_remove' | 'price_update' | 'transfer';
  token: string;
  amount?: number;
  from?: string;
  to?: string;
  price?: number;
  timestamp: number;
  txHash: string;
}
```

---

## 🤝 Community Examples

### Example 1: Portfolio Tracker

```typescript
export function PortfolioTracker({ holdings }: { holdings: Array<{symbol: string, amount: number}> }) {
  const symbols = holdings.map(h => h.symbol);
  const { data } = useMultipleTokenStreams(symbols);
  
  const totalValue = holdings.reduce((sum, holding) => {
    const tokenData = data.get(holding.symbol);
    return sum + (tokenData?.price || 0) * holding.amount;
  }, 0);

  return (
    <div>
      <h2>Portfolio Value: ${totalValue.toFixed(2)}</h2>
      {holdings.map(holding => {
        const tokenData = data.get(holding.symbol);
        const value = (tokenData?.price || 0) * holding.amount;
        return (
          <div key={holding.symbol}>
            <span>{holding.symbol}: </span>
            <span>{holding.amount} tokens = ${value.toFixed(2)}</span>
          </div>
        );
      })}
    </div>
  );
}
```

### Example 2: Price Alert System

```typescript
export function PriceAlert({ symbol, targetPrice, type }: Props) {
  const { data } = useTokenStream(symbol);
  const [alerted, setAlerted] = useState(false);

  useEffect(() => {
    if (data && !alerted) {
      const triggered = type === 'above' 
        ? data.price >= targetPrice
        : data.price <= targetPrice;
      
      if (triggered) {
        setAlerted(true);
        // Send notification
        new Notification(`${symbol} price alert!`, {
          body: `Price is now $${data.price}`,
        });
      }
    }
  }, [data, targetPrice, type, alerted]);

  return (
    <div>
      <h3>Alert: {symbol} {type} ${targetPrice}</h3>
      <p>Current: ${data?.price.toFixed(2)}</p>
      <p>Status: {alerted ? '🔔 Triggered!' : '⏳ Waiting...'}</p>
    </div>
  );
}
```

---

## 📞 Support & Resources

### Documentation
- [LumaShy GitHub](https://github.com/yourusername/lumashy)
- [Somnia Docs](https://docs.somnia.network)
- [SDS API Reference](https://docs.somnia.network/data-streams)

### Community
- [Somnia Discord](https://discord.gg/somnia)
- [Developer Forum](https://forum.somnia.network)
- [Twitter/X](https://twitter.com/somnianetwork)

### Need Help?
- Open an issue on GitHub
- Ask in Somnia Discord #developers channel
- Email: support@somnia.network

---

**Happy Building! 🚀**

_Integrate once, stream forever. — LumaShy_
