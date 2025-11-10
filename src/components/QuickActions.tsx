import { motion } from 'motion/react';
import { 
  Search, 
  TrendingUp, 
  Zap, 
  BarChart3, 
  Activity,
  Wallet
} from 'lucide-react';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
}

interface QuickActionsProps {
  onSearchClick?: () => void;
  onTrendingClick?: () => void;
  onAnalyticsClick?: () => void;
  onEventsClick?: () => void;
}

export function QuickActions({
  onSearchClick,
  onTrendingClick,
  onAnalyticsClick,
  onEventsClick,
}: QuickActionsProps) {
  const actions: QuickAction[] = [
    {
      id: 'search',
      title: 'Search Token',
      description: 'Find tokens by symbol or address',
      icon: <Search className="w-5 h-5" />,
      color: 'from-blue-500 to-cyan-500',
      onClick: () => onSearchClick?.(),
    },
    {
      id: 'trending',
      title: 'Top Movers',
      description: 'View trending tokens',
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'from-green-500 to-emerald-500',
      onClick: () => onTrendingClick?.(),
    },
    {
      id: 'analytics',
      title: 'Analytics',
      description: 'Market insights & charts',
      icon: <BarChart3 className="w-5 h-5" />,
      color: 'from-purple-500 to-pink-500',
      onClick: () => onAnalyticsClick?.(),
    },
    {
      id: 'events',
      title: 'Live Events',
      description: 'Real-time blockchain events',
      icon: <Activity className="w-5 h-5" />,
      color: 'from-orange-500 to-red-500',
      onClick: () => onEventsClick?.(),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action, index) => (
        <motion.button
          key={action.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -4, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={action.onClick}
          className="group relative p-6 rounded-xl border overflow-hidden text-left transition-all duration-300"
          style={{
            borderColor: 'var(--color-border)',
            backgroundColor: 'var(--color-bg)',
          }}
        >
          {/* Gradient overlay on hover */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
          />

          {/* Icon */}
          <div className="relative mb-4">
            <div
              className={`w-12 h-12 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
            >
              <div className="text-white">{action.icon}</div>
            </div>
          </div>

          {/* Content */}
          <div className="relative">
            <h3 className="text-white font-medium mb-1 group-hover:text-white transition-colors">
              {action.title}
            </h3>
            <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
              {action.description}
            </p>
          </div>

          {/* Arrow indicator */}
          <motion.div
            className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100"
            initial={{ x: -10 }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className={`w-8 h-8 rounded-full bg-gradient-to-br ${action.color} flex items-center justify-center`}
            >
              <Zap className="w-4 h-4 text-white" />
            </div>
          </motion.div>

          {/* Glow effect */}
          <div
            className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10 bg-gradient-to-br ${action.color}`}
            style={{ filter: 'blur(40px)' }}
          />
        </motion.button>
      ))}
    </div>
  );
}
