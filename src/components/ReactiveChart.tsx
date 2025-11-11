import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { useMultipleTokenStreams as useTokenStream } from '../hooks/useSDS';
import { useTheme } from '../hooks/useTheme';
import { Skeleton } from './ui/skeleton';
import { TrendingUp } from 'lucide-react';

interface ChartDataPoint {
  time: string;
  price: number;
  timestamp: number;
}

export function ReactiveChart() {
  const { data } = useTokenStream('WETH');
  const { currentTheme } = useTheme();
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [maxDataPoints] = useState(20);

  useEffect(() => {
    if (!data) return;

    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });

    setChartData((prev) => {
      const newData = [
        ...prev,
        {
          time: timeString,
          price: data.price,
          timestamp: data.lastUpdate,
        },
      ];

      // Keep only the last N data points
      if (newData.length > maxDataPoints) {
        return newData.slice(newData.length - maxDataPoints);
      }

      return newData;
    });
  }, [data, maxDataPoints]);

  if (!data || chartData.length < 2) {
    return (
      <div 
        className="relative overflow-hidden rounded-2xl border backdrop-blur-xl p-6"
        style={{
          borderColor: 'var(--color-border)',
          background: 'linear-gradient(135deg, var(--color-background-secondary) 0%, var(--color-background) 100%)',
        }}
      >
        <Skeleton className="h-80 w-full bg-gray-800/50" />
      </div>
    );
  }

  const minPrice = Math.min(...chartData.map(d => d.price));
  const maxPrice = Math.max(...chartData.map(d => d.price));
  const currentPrice = chartData[chartData.length - 1].price;
  const previousPrice = chartData[0].price;
  const priceChange = ((currentPrice - previousPrice) / previousPrice) * 100;
  const isPositive = priceChange >= 0;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div 
          className="rounded-lg p-3 backdrop-blur-xl border"
          style={{
            backgroundColor: 'rgba(17, 24, 39, 0.95)',
            borderColor: 'var(--color-border)',
          }}
        >
          <p className="text-sm text-gray-400 mb-1">{payload[0].payload.time}</p>
          <p className="text-white">${payload[0].value.toFixed(2)}</p>
        </div>
      );
    }
    return null;
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
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-white">WETH Price Chart</h3>
            <motion.div
              className="flex items-center gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  boxShadow: `0 0 8px var(--color-glow)`,
                }}
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
          </div>
          <p className="text-sm text-gray-400">Real-time price updates via Somnia Data Streams</p>
        </div>
        
        <div className="text-right">
          <motion.div
            key={currentPrice}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
            className="text-2xl text-white mb-1"
          >
            ${currentPrice.toFixed(2)}
          </motion.div>
          <div className={`flex items-center gap-1 justify-end ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            <TrendingUp className={`w-4 h-4 ${!isPositive && 'rotate-180'}`} />
            <span className="text-sm">
              {isPositive ? '+' : ''}{priceChange.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="relative">
        {/* Glowing gradient background */}
        <motion.div
          className="absolute inset-0 rounded-lg"
          style={{
            background: `linear-gradient(to top, ${currentTheme.colors.primary}15, transparent)`,
          }}
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={currentTheme.colors.primary} stopOpacity={0.3} />
                <stop offset="95%" stopColor={currentTheme.colors.primary} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
            <XAxis 
              dataKey="time" 
              stroke="#6b7280" 
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              tickLine={{ stroke: '#ffffff10' }}
            />
            <YAxis 
              domain={[minPrice * 0.999, maxPrice * 1.001]}
              stroke="#6b7280"
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              tickLine={{ stroke: '#ffffff10' }}
              tickFormatter={(value) => `$${value.toFixed(0)}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="price"
              stroke={currentTheme.colors.primary}
              strokeWidth={2}
              fill="url(#colorPrice)"
              animationDuration={300}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-3 gap-4 pt-4 border-t border-white/5">
        <div>
          <p className="text-xs text-gray-400 mb-1">Min</p>
          <p className="text-sm text-gray-300">${minPrice.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-1">Max</p>
          <p className="text-sm text-gray-300">${maxPrice.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-1">Avg</p>
          <p className="text-sm text-gray-300">
            ${(chartData.reduce((sum, d) => sum + d.price, 0) / chartData.length).toFixed(2)}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
