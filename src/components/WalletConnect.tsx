import { useState } from 'react';
import { motion } from 'motion/react';
import { Wallet, LogOut, X, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { SOMNIA_TESTNET } from '../config/somnia';

export function WalletConnect() {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showMetaMaskPrompt, setShowMetaMaskPrompt] = useState(false);

  const connectWallet = async () => {
    setIsConnecting(true);
    setShowMetaMaskPrompt(false);

    try {
      // Check if MetaMask is installed
      if (!window.ethereum) {
        setShowMetaMaskPrompt(true);
        setIsConnecting(false);
        return;
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      // Try to switch to Somnia Testnet
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${SOMNIA_TESTNET.chainId.toString(16)}` }],
        });
      } catch (switchError: any) {
        // If the chain doesn't exist, add it
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: `0x${SOMNIA_TESTNET.chainId.toString(16)}`,
                chainName: SOMNIA_TESTNET.chainName,
                nativeCurrency: SOMNIA_TESTNET.nativeCurrency,
                rpcUrls: [SOMNIA_TESTNET.rpcUrl],
                blockExplorerUrls: [SOMNIA_TESTNET.blockExplorer],
              },
            ],
          });
        } else {
          // User rejected the request or other error
          console.log('Network switch cancelled or failed:', switchError);
        }
      }

      setAddress(accounts[0]);
    } catch (err: any) {
      // User rejected connection or other error
      console.log('Wallet connection cancelled or failed:', err);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAddress(null);
    setShowMetaMaskPrompt(false);
  };

  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  return (
    <div className="flex items-center gap-3">
      {/* MetaMask not installed prompt */}
      {showMetaMaskPrompt && (
        <div className="relative flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-lg text-orange-400">
          <div className="flex flex-col gap-1">
            <span className="text-sm">MetaMask not detected</span>
            <a
              href="https://metamask.io/download/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-orange-300 hover:text-orange-200 underline"
            >
              Install MetaMask <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <button
            onClick={() => setShowMetaMaskPrompt(false)}
            className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
      
      {!address ? (
        <motion.div
          whileHover={{ 
            scale: 1.05,
          }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={connectWallet}
            disabled={isConnecting}
            variant="outline"
            className={`relative transition-all duration-300 text-white hover:text-white font-medium group overflow-hidden ${
              isConnecting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            style={{
              borderColor: 'var(--color-primary)',
              backgroundColor: `var(--color-primary)10`,
              color: 'white',
              borderWidth: '2px',
            }}
          >
            {/* Glow effect on hover */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
              style={{
                background: 'var(--color-primary)',
              }}
            />
            <div className="relative flex items-center">
              <Wallet className="w-4 h-4 mr-2" style={{ color: 'var(--color-primary)' }} />
              <span className="text-white">
                {isConnecting ? 'Connecting...' : 'Connect Wallet'}
              </span>
            </div>
          </Button>
        </motion.div>
      ) : (
        <div className="flex items-center gap-2">
          <div 
            className="px-4 py-2 rounded-lg border"
            style={{
              background: `linear-gradient(90deg, var(--color-primary)10, var(--color-secondary)10)`,
              borderColor: 'var(--color-border)',
            }}
          >
            <div className="flex items-center gap-2">
              <div 
                className="w-2 h-2 rounded-full animate-pulse"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  boxShadow: `0 0 8px var(--color-glow)`,
                }}
              />
              <span 
                className="text-sm"
                style={{ color: 'var(--color-primary)' }}
              >
                {formatAddress(address)}
              </span>
            </div>
          </div>
          <Button
            onClick={disconnectWallet}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

// Extend window interface for TypeScript
declare global {
  interface Window {
    ethereum?: any;
  }
}
