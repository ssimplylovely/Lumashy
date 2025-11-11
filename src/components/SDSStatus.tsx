import { useEffect, useState, useCallback } from 'react';
import { ethers } from 'ethers';

export function useSDSConnection() {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);

  // fungsi untuk connect ke MetaMask
  const connect = useCallback(async () => {
    if (typeof window.ethereum === 'undefined') {
      console.error('MetaMask not found');
      return;
    }

    try {
      const newProvider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await newProvider.send('eth_requestAccounts', []);
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setProvider(newProvider);
        setIsConnected(true);
      }
    } catch (error) {
      console.error('Failed to connect MetaMask:', error);
      setIsConnected(false);
    }
  }, []);

  // pantau perubahan akun / disconnect
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          setIsConnected(false);
          setAccount(null);
        } else {
          setIsConnected(true);
          setAccount(accounts[0]);
        }
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, []);

  return { isConnected, account, connect, provider };
}
