import { motion, AnimatePresence } from 'motion/react';
import { Activity, Clock } from 'lucide-react';
import { useEventStream } from '../hooks/useEventStream';

export function OnChainEventFeed() {
  const events = useEventStream(5);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getEventDescription = (event: typeof events[0]) => {
    switch (event.type) {
      case 'price_update':
        return `${event.token} ${event.change}`;
      case 'swap':
        return `Swap ${event.token} - ${event.amount}`;
      case 'liquidity_add':
        return `Add Liquidity ${event.token} - ${event.amount}`;
      case 'liquidity_remove':
        return `Remove Liquidity ${event.token} - ${event.amount}`;
      case 'transfer':
        return `Transfer ${event.amount}`;
      default:
        return event.token;
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
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity 
            className="w-5 h-5" 
            style={{ color: 'var(--color-primary)' }}
          />
          <h3 className="text-white">Recent On-Chain Events</h3>
        </div>
        <motion.div
          className="w-2 h-2 rounded-full"
          style={{
            backgroundColor: 'var(--color-primary)',
            boxShadow: `0 0 8px var(--color-glow)`,
          }}
          animate={{
            opacity: [1, 0.3, 1],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Event list */}
      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: -100, scale: 0.9 }}
              transition={{
                duration: 0.3,
                delay: index * 0.05,
              }}
              className="relative overflow-hidden rounded-lg border p-3 transition-all duration-300 group"
              style={{
                borderColor: 'var(--color-border)',
                background: `linear-gradient(90deg, var(--color-primary)05, var(--color-secondary)05)`,
              }}
            >
              {/* Glowing effect on hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                style={{
                  background: `linear-gradient(90deg, transparent, var(--color-glow), transparent)`,
                }}
              />
              
              <div className="relative z-10 flex items-start justify-between gap-3">
                <div className="flex items-start gap-2 flex-1">
                  <span className="text-xl flex-shrink-0">{event.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-300 truncate">
                      {getEventDescription(event)}
                    </p>
                    {event.type === 'transfer' && (
                      <p className="text-xs text-gray-500 mt-1">
                        {event.from} → {event.to}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500 flex-shrink-0">
                  <Clock className="w-3 h-3" />
                  <span>{formatTime(event.timestamp)}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {events.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Waiting for events...</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-white/5 text-xs text-gray-500 text-center">
        Powered by Somnia Data Streams
      </div>
    </motion.div>
  );
}
