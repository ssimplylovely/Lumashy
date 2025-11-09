import { useState, useEffect, useCallback } from 'react';
import { sdsService, TokenData } from '../services/sdsService';

// Hook for subscribing to SDS token streams
export function useTokenStream(symbol: string) {
  const [data, setData] = useState<TokenData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;

    const initStream = async () => {
      try {
        setIsLoading(true);
        
        // Ensure SDS is connected
        if (!sdsService.getConnectionStatus()) {
          await sdsService.connect();
        }

        // Subscribe to the token stream
        unsubscribe = sdsService.subscribeToStream(symbol, (tokenData) => {
          setData(tokenData);
          setIsLoading(false);
          setError(null);
        });
      } catch (err) {
        setError(err as Error);
        setIsLoading(false);
      }
    };

    initStream();

    return () => {
      unsubscribe?.();
    };
  }, [symbol]);

  return { data, isLoading, error };
}

// Hook for subscribing to multiple token streams
export function useMultipleTokenStreams(symbols: string[]) {
  const [data, setData] = useState<Map<string, TokenData>>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribers: (() => void)[] = [];

    const initStreams = async () => {
      try {
        setIsLoading(true);
        
        if (!sdsService.getConnectionStatus()) {
          await sdsService.connect();
        }

        symbols.forEach((symbol) => {
          const unsubscribe = sdsService.subscribeToStream(symbol, (tokenData) => {
            setData((prevData) => {
              const newData = new Map(prevData);
              newData.set(symbol, tokenData);
              return newData;
            });
            setIsLoading(false);
            setError(null);
          });
          unsubscribers.push(unsubscribe);
        });
      } catch (err) {
        setError(err as Error);
        setIsLoading(false);
      }
    };

    initStreams();

    return () => {
      unsubscribers.forEach((unsub) => unsub());
    };
  }, [symbols.join(',')]);

  return { data, isLoading, error };
}

// Hook for SDS connection status
export function useSDSConnection() {
  const [isConnected, setIsConnected] = useState(false);

  const connect = useCallback(async () => {
    if (!sdsService.getConnectionStatus()) {
      await sdsService.connect();
      setIsConnected(true);
    }
  }, []);

  const disconnect = useCallback(() => {
    sdsService.disconnect();
    setIsConnected(false);
  }, []);

  useEffect(() => {
    setIsConnected(sdsService.getConnectionStatus());
  }, []);

  return { isConnected, connect, disconnect };
}
