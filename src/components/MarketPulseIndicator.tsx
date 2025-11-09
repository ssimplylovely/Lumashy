import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { useMultipleTokenStreams } from '../hooks/useSDS';

export function MarketPulseIndicator() {
  const { data } = useMultipleTokenStreams(['STT', 'USDC', 'WETH', 'DAI', 'USDT']);
  const [trend, setTrend] = useState<'bullish' | 'bearish' | 'neutral'>('neutral');
  const [avgChange, setAvgChange] = useState(0);

  useEffect(() => {
    if (data.size === 0) return;

    const tokens = Array.from(data.values());
    const totalChange = tokens.reduce((sum, token) => sum + token.change24h, 0);
    const average = totalChange / tokens.length;

    setAvgChange(average);

    if (average > 1) {
      setTrend('bullish');
    } else if (average < -1) {
      setTrend('bearish');
    } else {
      setTrend('neutral');
    }
  }, [data]);

  const getTrendColor = () => {
    switch (trend) {
      case 'bullish':
        return 'from-green-500 to-emerald-500';
      case 'bearish':
        return 'from-red-500 to-rose-500';
      default:
        return 'from-gray-500 to-slate-500';
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'bullish':
        return <TrendingUp className="w-6 h-6" />;
      case 'bearish':
        return <TrendingDown className="w-6 h-6" />;
      default:
        return <Activity className="w-6 h-6" />;
    }
  };

  const getTrendText = () => {
    switch (trend) {
      case 'bullish':
        return 'Bullish Market';
      case 'bearish':
        return 'Bearish Market';
      default:
        return 'Neutral Market';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl border backdrop-blur-xl p-6"
      style={{
        borderColor: 'var(--color-border)',
        background: 'linear-gradient(135deg, var(--color-background-secondary) 0%, var(--color-background) 100%)',
      }}
    >
      {/* Glowing background effect */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${getTrendColor()} opacity-10`}
        animate={{
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-400">Market Pulse</h3>
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {getTrendIcon()}
          </motion.div>
        </div>

        <div className="space-y-4">
          {/* Trend indicator */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${getTrendColor()} bg-opacity-20`}>
            <motion.div
              className={`w-3 h-3 rounded-full bg-gradient-to-r ${getTrendColor()}`}
              animate={{
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <span className="text-sm">{getTrendText()}</span>
          </div>

          {/* Average change */}
          <div className="flex items-baseline gap-2">
            <span className="text-sm text-gray-400">Avg. 24h Change:</span>
            <motion.span
              className={`${avgChange >= 0 ? 'text-green-400' : 'text-red-400'}`}
              key={avgChange}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {avgChange >= 0 ? '+' : ''}{avgChange.toFixed(2)}%
            </motion.span>
          </div>

          {/* Pulse visualization */}
          <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className={`absolute inset-y-0 left-0 bg-gradient-to-r ${getTrendColor()} rounded-full`}
              initial={{ width: '50%' }}
              animate={{
                width: `${Math.min(100, Math.max(0, 50 + avgChange * 5))}%`,
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
