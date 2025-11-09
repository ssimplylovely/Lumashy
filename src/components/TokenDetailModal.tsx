import { motion, AnimatePresence } from 'motion/react';
import { X, TrendingUp, TrendingDown, BarChart3, DollarSign, Radio } from 'lucide-react';
import { Button } from './ui/button';
import { TokenData } from '../services/sdsService';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface TokenDetailModalProps {
  token: TokenData | null;
  isOpen: boolean;
  onClose: () => void;
  onSubscribe?: (symbol: string) => void;
}

export function TokenDetailModal({ token, isOpen, onClose, onSubscribe }: TokenDetailModalProps) {
  if (!token) return null;

  const isPositive = token.change24h >= 0;

  // Generate mock chart data
  const chartData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}h`,
    price: token.price * (1 + (Math.random() - 0.5) * 0.1),
  }));

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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl"
            >
              {/* Glowing background */}
              <div 
                className="absolute inset-0 rounded-3xl blur-xl"
                style={{
                  background: `radial-gradient(circle, var(--color-primary)20, var(--color-secondary)20, var(--color-accent)20)`,
                }}
              />

              {/* Content */}
              <div 
                className="relative rounded-3xl backdrop-blur-lg overflow-hidden border"
                style={{
                  background: 'linear-gradient(135deg, #111827 0%, #1f2937 100%)',
                  borderColor: 'var(--color-border)',
                }}
              >
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-gray-800/80 hover:bg-gray-700 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>

                {/* Header */}
                <div className="p-6 border-b border-white/10">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <motion.div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                        style={{
                          background: `linear-gradient(135deg, var(--color-primary), var(--color-secondary))`,
                          boxShadow: `0 0 30px var(--color-glow)`,
                        }}
                        animate={{
                          boxShadow: [
                            `0 0 20px var(--color-glow)`,
                            `0 0 40px var(--color-glow)`,
                            `0 0 20px var(--color-glow)`,
                          ],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      >
                        <span className="text-2xl">{token.symbol.substring(0, 2)}</span>
                      </motion.div>
                      
                      <div>
                        <h2 className="text-2xl text-white mb-1">{token.symbol}</h2>
                        <p className="text-gray-400">{token.name}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <motion.div
                        className="text-3xl text-white mb-1"
                        key={token.price}
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                      >
                        ${token.price.toFixed(token.price < 1 ? 4 : 2)}
                      </motion.div>
                      <div className={`flex items-center gap-1 justify-end ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                        {isPositive ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                        <span>{isPositive ? '+' : ''}{token.change24h.toFixed(2)}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 p-6 border-b border-white/10">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                      <BarChart3 className="w-4 h-4" />
                      <span className="text-sm">24h Volume</span>
                    </div>
                    <p className="text-xl text-white">{formatNumber(token.volume24h)}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20">
                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                      <DollarSign className="w-4 h-4" />
                      <span className="text-sm">Market Cap</span>
                    </div>
                    <p className="text-xl text-white">{formatNumber(token.marketCap)}</p>
                  </div>
                </div>

                {/* Chart */}
                <div className="p-6 border-b border-white/10">
                  <h3 className="text-white mb-4">24h Price Chart</h3>
                  <div className="h-48 bg-gray-900/50 rounded-xl p-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <XAxis 
                          dataKey="time" 
                          stroke="#6b7280" 
                          tick={{ fill: '#9ca3af', fontSize: 11 }}
                        />
                        <YAxis 
                          stroke="#6b7280"
                          tick={{ fill: '#9ca3af', fontSize: 11 }}
                          tickFormatter={(value) => `$${value.toFixed(0)}`}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#1f2937',
                            border: '1px solid rgba(168, 85, 247, 0.2)',
                            borderRadius: '8px',
                          }}
                          labelStyle={{ color: '#9ca3af' }}
                          itemStyle={{ color: '#fff' }}
                        />
                        <Line
                          type="monotone"
                          dataKey="price"
                          stroke="#a855f7"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-6">
                  <Button
                    onClick={() => {
                      onSubscribe?.(token.symbol);
                      onClose();
                    }}
                    className="w-full bg-gradient-to-r from-fuchsia-500 via-pink-500 to-purple-500 hover:from-fuchsia-600 hover:via-pink-600 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-fuchsia-500/30"
                  >
                    <Radio className="w-4 h-4 mr-2" />
                    Subscribe to Live Stream
                  </Button>

                  <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
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
                    <span>Real-time data via Somnia Data Streams</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
