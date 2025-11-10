import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, TrendingUp, Clock, ArrowUpRight } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { TokenDetailModal } from './TokenDetailModal';
import type { Token } from '../types/sds';

// Popular tokens on Somnia
const POPULAR_TOKENS: Token[] = [
  {
    symbol: 'STT',
    name: 'Somnia Token',
    address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    price: 1.23,
    change24h: 5.67,
    volume24h: 15000000,
    marketCap: 450000000,
    holders: 125000,
    liquidity: 25000000,
  },
  {
    symbol: 'WETH',
    name: 'Wrapped Ethereum',
    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    price: 2345.67,
    change24h: -2.34,
    volume24h: 89000000,
    marketCap: 5200000000,
    holders: 450000,
    liquidity: 120000000,
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    price: 1.0,
    change24h: 0.01,
    volume24h: 125000000,
    marketCap: 3500000000,
    holders: 890000,
    liquidity: 180000000,
  },
  {
    symbol: 'LUMA',
    name: 'LumaShy Protocol',
    address: '0x1234567890abcdef1234567890abcdef12345678',
    price: 0.45,
    change24h: 12.34,
    volume24h: 5500000,
    marketCap: 45000000,
    holders: 35000,
    liquidity: 8500000,
  },
  {
    symbol: 'DREAM',
    name: 'Somnia Dream',
    address: '0xabcdef1234567890abcdef1234567890abcdef12',
    price: 2.89,
    change24h: 8.92,
    volume24h: 12000000,
    marketCap: 125000000,
    holders: 67000,
    liquidity: 18000000,
  },
  {
    symbol: 'AURORA',
    name: 'Aurora Finance',
    address: '0x9876543210fedcba9876543210fedcba98765432',
    price: 0.78,
    change24h: -1.23,
    volume24h: 3200000,
    marketCap: 28000000,
    holders: 28000,
    liquidity: 5500000,
  },
];

interface SearchTokenProps {
  className?: string;
}

export function SearchToken({ className = '' }: SearchTokenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [recentSearches, setRecentSearches] = useState<Token[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter tokens based on search query
  const filteredTokens = searchQuery.trim()
    ? POPULAR_TOKENS.filter(
        (token) =>
          token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
          token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          token.address.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : POPULAR_TOKENS;

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('lumashy-recent-searches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse recent searches:', e);
      }
    }
  }, []);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isSearchOpen) return;

      const tokens = searchQuery.trim() ? filteredTokens : recentSearches;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < tokens.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedIndex >= 0 && tokens[selectedIndex]) {
            handleTokenSelect(tokens[selectedIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          setIsSearchOpen(false);
          setSelectedIndex(-1);
          inputRef.current?.blur();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, selectedIndex, filteredTokens, recentSearches, searchQuery]);

  const handleTokenSelect = (token: Token) => {
    // Add to recent searches
    const updatedRecent = [
      token,
      ...recentSearches.filter((t) => t.address !== token.address),
    ].slice(0, 5); // Keep only 5 recent
    setRecentSearches(updatedRecent);
    localStorage.setItem('lumashy-recent-searches', JSON.stringify(updatedRecent));

    // Open modal
    setSelectedToken(token);
    setIsSearchOpen(false);
    setSearchQuery('');
    setSelectedIndex(-1);
  };

  const clearSearch = () => {
    setSearchQuery('');
    inputRef.current?.focus();
  };

  const clearRecent = () => {
    setRecentSearches([]);
    localStorage.removeItem('lumashy-recent-searches');
  };

  const displayTokens = searchQuery.trim() ? filteredTokens : recentSearches;

  return (
    <>
      <div ref={searchRef} className={`relative ${className}`}>
        {/* Search Input */}
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300"
          />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search token by name, symbol, or address..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearchOpen(true);
              setSelectedIndex(-1);
            }}
            onFocus={() => setIsSearchOpen(true)}
            className="pl-10 pr-10 h-11 transition-all duration-300 text-white placeholder:text-gray-400"
            style={{
              borderColor: isSearchOpen
                ? 'var(--color-primary)'
                : 'var(--color-border)',
              backgroundColor: 'var(--color-bg)',
              boxShadow: isSearchOpen
                ? `0 0 20px var(--color-glow)`
                : 'none',
            }}
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Search Results Dropdown */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full mt-2 left-0 right-0 z-50 rounded-xl border overflow-hidden"
              style={{
                backgroundColor: 'var(--color-bg)',
                borderColor: 'var(--color-border)',
                boxShadow: `0 10px 40px rgba(0, 0, 0, 0.5), 0 0 20px var(--color-glow)`,
              }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-4 py-2 border-b bg-white/5"
                style={{
                  borderColor: 'var(--color-border)',
                }}
              >
                <div className="flex items-center gap-2">
                  {searchQuery.trim() ? (
                    <>
                      <TrendingUp
                        className="w-4 h-4"
                        style={{ color: 'var(--color-primary)' }}
                      />
                      <span className="text-sm text-white">
                        Search Results ({filteredTokens.length})
                      </span>
                    </>
                  ) : (
                    <>
                      <Clock
                        className="w-4 h-4"
                        style={{ color: 'var(--color-primary)' }}
                      />
                      <span className="text-sm text-white">
                        Recent Searches
                      </span>
                    </>
                  )}
                </div>
                {!searchQuery.trim() && recentSearches.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearRecent}
                    className="text-xs text-gray-300 hover:text-white"
                  >
                    Clear
                  </Button>
                )}
              </div>

              {/* Token List */}
              <div className="max-h-96 overflow-y-auto">
                {displayTokens.length > 0 ? (
                  displayTokens.map((token, index) => (
                    <motion.button
                      key={token.address}
                      onClick={() => handleTokenSelect(token)}
                      className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/10 transition-all duration-200 text-left"
                      style={{
                        backgroundColor:
                          selectedIndex === index
                            ? 'var(--color-primary)20'
                            : 'transparent',
                        borderLeft:
                          selectedIndex === index
                            ? `3px solid var(--color-primary)`
                            : '3px solid transparent',
                      }}
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {/* Token Icon */}
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{
                            background: `linear-gradient(135deg, var(--color-primary), var(--color-secondary))`,
                          }}
                        >
                          <span className="text-white text-sm">
                            {token.symbol.substring(0, 2)}
                          </span>
                        </div>

                        {/* Token Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span
                              className="font-medium text-white"
                            >
                              {token.symbol}
                            </span>
                            {token.change24h > 0 && (
                              <span className="text-xs text-green-400 flex items-center gap-0.5">
                                <ArrowUpRight className="w-3 h-3" />
                                {token.change24h.toFixed(2)}%
                              </span>
                            )}
                            {token.change24h < 0 && (
                              <span className="text-xs text-red-400">
                                {token.change24h.toFixed(2)}%
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-300 truncate">
                            {token.name}
                          </p>
                        </div>
                      </div>

                      {/* Token Price */}
                      <div className="text-right flex-shrink-0">
                        <p className="text-white">
                          ${token.price.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-300">
                          {token.holders.toLocaleString()} holders
                        </p>
                      </div>
                    </motion.button>
                  ))
                ) : (
                  <div className="px-4 py-8 text-center text-gray-300">
                    {searchQuery.trim() ? (
                      <>
                        <Search className="w-12 h-12 mx-auto mb-2 opacity-30" />
                        <p className="text-white">No tokens found</p>
                        <p className="text-xs mt-1">
                          Try searching by symbol, name, or address
                        </p>
                      </>
                    ) : (
                      <>
                        <Clock className="w-12 h-12 mx-auto mb-2 opacity-30" />
                        <p className="text-white">No recent searches</p>
                        <p className="text-xs mt-1">
                          Search for tokens to see them here
                        </p>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Footer */}
              {!searchQuery.trim() && displayTokens.length === 0 && (
                <div
                  className="px-4 py-2 text-center border-t bg-white/5"
                  style={{
                    borderColor: 'var(--color-border)',
                  }}
                >
                  <p className="text-xs text-gray-300">
                    Popular tokens on Somnia Network
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Token Detail Modal */}
      {selectedToken && (
        <TokenDetailModal
          token={selectedToken}
          isOpen={!!selectedToken}
          onClose={() => setSelectedToken(null)}
        />
      )}
    </>
  );
}
