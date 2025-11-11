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
        if (!sdsService.getConnectionStatus()) {
          await sdsService.connect();
        }

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

// Hook untuk SDS connection yang sinkron ke MetaMask
export function useSDSConnection() {
  const [isConnected, setIsConnected] = useState(sdsService.getConnectionStatus());

  const connect = useCallback(async () => {
    try {
      await sdsService.connect();
      setIsConnected(true);
    } catch (err) {
      console.error('Failed to connect SDS:', err);
      setIsConnected(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    try {
      sdsService.disconnect();
      setIsConnected(false);
    } catch (err) {
      console.error('Failed to disconnect SDS:', err);
    }
  }, []);

  useEffect(() => {
    const ethereum = (window as any).ethereum;
    if (!ethereum) return;

    // Event: saat wallet MetaMask connect/disconnect
    const handleAccountsChanged = (accounts: string[]) => {
      console.log('🦊 MetaMask accountsChanged:', accounts);
      if (accounts.length > 0) {
        setIsConnected(true);
        sdsService.connect(); // sambungkan SDS otomatis
      } else {
        setIsConnected(false);
        sdsService.disconnect();
      }
    };

    const handleConnect = () => {
      console.log('🦊 MetaMask connected');
      setIsConnected(true);
      sdsService.connect();
    };

    const handleDisconnect = () => {
      console.log('🦊 MetaMask disconnected');
      setIsConnected(false);
      sdsService.disconnect();
    };

    // Pasang listener MetaMask
    ethereum.on('accountsChanged', handleAccountsChanged);
    ethereum.on('connect', handleConnect);
    ethereum.on('disconnect', handleDisconnect);

    // Cek awal (kalau MetaMask udah connect duluan)
    ethereum.request({ method: 'eth_accounts' }).then((accounts: string[]) => {
      if (accounts.length > 0) {
        setIsConnected(true);
        sdsService.connect();
      }
    });

    // Cleanup
    return () => {
      ethereum.removeListener('accountsChanged', handleAccountsChanged);
      ethereum.removeListener('connect', handleConnect);
      ethereum.removeListener('disconnect', handleDisconnect);
    };
  }, []);

  return { isConnected, connect, disconnect };
}
