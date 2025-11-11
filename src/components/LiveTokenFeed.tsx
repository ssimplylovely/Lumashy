import { motion } from 'motion/react';
import { ArrowUpRight, ArrowDownRight, DollarSign, BarChart3 } from 'lucide-react';
import { useMultipleTokenStreams } from '../hooks/useSDS';
import { Skeleton } from './ui/skeleton';
import { TokenData } from '../services/sdsService';

interface LiveTokenFeedProps {
  onTokenClick?: (token: TokenData) => void;
}

export function LiveTokenFeed({ onTokenClick }: LiveTokenFeedProps) {
  const { tokenDataList, isLoading } = useMultipleTokenStreams(['BTC', 'ETH']);

  const formatNumber = (num: number, decimals: number = 2) => {
    if (num >= 1e9) {
      return `$${(num / 1e9).toFixed(2)}B`;
    } else if (num >= 1e6) {
      return `$${(num / 1e6).toFixed(2)}M`;
    } else if (num >= 1e3) {
      return `$${(num / 1e3).toFixed(2)}K`;
    }
    return `$${num.toFixed(decimals)}`;
  };

  if (isLoading || data?.size === 0) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-24 w-full bg-gray-800/50" />
        ))}
      </div>
    );
  }

  const tokens = Array.from(data.values()).sort((a, b) => b.marketCap - a.marketCap);

  return (
    <div className="space-y-3">
      {tokens.map((token, index) => {
        const isPositive = token.change24h >= 0;
        
        return (
          <motion.div
            key={token.symbol}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onTokenClick?.(token)}
            className="relative overflow-hidden rounded-xl border backdrop-blur-xl p-4 transition-all duration-300 group cursor-pointer"
            style={{
              borderColor: 'var(--color-border)',
              background: 'linear-gradient(135deg, var(--color-background-secondary) 0%, var(--color-background) 100%)',
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Glowing effect on hover */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
              style={{
                background: `linear-gradient(90deg, transparent, var(--color-glow), transparent)`,
              }}
            />
            
            <div className="relative z-10 flex items-center justify-between">
              {/* Token info */}
              <div className="flex items-center gap-4">
                <motion.div
                  className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, var(--color-primary), var(--color-secondary))`,
                    boxShadow: `0 4px 20px var(--color-glow)`,
                  }}
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(168, 85, 247, 0.2)',
                      '0 0 30px rgba(168, 85, 247, 0.4)',
                      '0 0 20px rgba(168, 85, 247, 0.2)',
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <span className="font-bold text-sm">{token.symbol.substring(0, 2)}</span>
                </motion.div>
                
                <div>
                  <h3 className="text-white">{token.symbol}</h3>
                  <p className="text-sm text-gray-400">{token.name}</p>
                </div>
              </div>

              {/* Price and change */}
              <div className="text-right">
                <motion.div
                  key={token.price}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="text-white mb-1"
                >
                  ${token.price.toFixed(token.price < 1 ? 4 : 2)}
                </motion.div>
                
                <div className={`flex items-center gap-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                  {isPositive ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  <span className="text-sm">
                    {isPositive ? '+' : ''}{token.change24h.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Additional metrics */}
            <div className="relative z-10 mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <BarChart3 className="w-4 h-4" />
                <span>Volume:</span>
                <span className="text-gray-300">{formatNumber(token.volume24h)}</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-400">
                <DollarSign className="w-4 h-4" />
                <span>MCap:</span>
                <span className="text-gray-300">{formatNumber(token.marketCap)}</span>
              </div>
            </div>

            {/* Live indicator */}
            <motion.div
              className="absolute top-4 right-4 flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="w-2 h-2 bg-green-500 rounded-full"
                animate={{
                  opacity: [1, 0.3, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <span className="text-xs text-gray-500">LIVE</span>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
