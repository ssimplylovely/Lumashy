import { useState, useEffect, useCallback } from 'react';
import { sdsService, TokenData } from '../services/sdsService';

/* ============================================================
   ✅ Hook 1 — Stream satu token
   ============================================================ */
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
    return () => unsubscribe?.();
  }, [symbol]);

  return { data, isLoading, error };
}

/* ============================================================
   ✅ Hook 2 — Stream beberapa token sekaligus
   ============================================================ */
export function useMultipleTokenStreams(symbols: string[]) {
  const [tokenDataList, setTokenDataList] = useState<TokenData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let unsubscribers: (() => void)[] = [];

    const initStreams = async () => {
      try {
        setIsLoading(true);

        if (!sdsService.getConnectionStatus()) {
          await sdsService.connect();
        }

        unsubscribers = symbols.map((symbol) =>
          sdsService.subscribeToStream(symbol, (data) => {
            setTokenDataList((prev) => {
              const existing = prev.filter((t) => t.symbol !== symbol);
              return [...existing, data];
            });
            setIsLoading(false);
          })
        );
      } catch (err) {
        console.error('❌ Gagal subscribe SDS streams:', err);
        setIsLoading(false);
      }
    };

    initStreams();
    return () => unsubscribers.forEach((unsub) => unsub());
  }, [symbols]);

  return { tokenDataList, isLoading };
}

/* ============================================================
   ✅ Hook 3 — Sinkronisasi koneksi SDS dengan MetaMask
   ============================================================ */
export function useSDSConnection() {
  const [isConnected, setIsConnected] = useState(sdsService.getConnectionStatus());

  const connect = useCallback(async () => {
    try {
      await sdsService.connect();
      setIsConnected(true);
    } catch (err) {
      console.error('❌ Failed to connect SDS:', err);
      setIsConnected(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    try {
      sdsService.disconnect();
      setIsConnected(false);
    } catch (err) {
      console.error('❌ Failed to disconnect SDS:', err);
    }
  }, []);

  useEffect(() => {
    const ethereum = (window as any).ethereum;
    if (!ethereum) return;

    // Event dari MetaMask
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length > 0) {
        console.log('🦊 Wallet aktif → SDS connect');
        connect();
      } else {
        console.log('🦊 Wallet dilepas → SDS disconnect');
        disconnect();
      }
    };

    const handleConnect = () => {
      console.log('🦊 MetaMask connected');
      connect();
    };

    const handleDisconnect = () => {
      console.log('🦊 MetaMask disconnected');
      disconnect();
    };

    // Pasang listener
    ethereum.on('accountsChanged', handleAccountsChanged);
    ethereum.on('connect', handleConnect);
    ethereum.on('disconnect', handleDisconnect);

    // Cek awal (kalau MetaMask udah login duluan)
    ethereum.request({ method: 'eth_accounts' }).then((accounts: string[]) => {
      if (accounts.length > 0) {
        connect();
      }
    });

    // Bersihkan listener
    return () => {
      ethereum.removeListener('accountsChanged', handleAccountsChanged);
      ethereum.removeListener('connect', handleConnect);
      ethereum.removeListener('disconnect', handleDisconnect);
    };
  }, [connect, disconnect]);

  return { isConnected, connect, disconnect };
}
