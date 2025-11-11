import { motion, AnimatePresence } from 'motion/react';
import { useSDSConnection } from '../hooks/useSDS';

export function LiveDataIndicator() {
  const { isConnected } = useSDSConnection();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={isConnected ? 'connected' : 'disconnected'}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-xl border"
        style={{
          backgroundColor: isConnected ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
          borderColor: isConnected ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)',
        }}
      >
        <motion.div
          className="w-2 h-2 rounded-full"
          style={{
            backgroundColor: isConnected ? 'var(--color-primary)' : '#ef4444',
            boxShadow: isConnected ? `0 0 8px var(--color-glow)` : '0 0 8px rgba(239, 68, 68, 0.5)',
          }}
          animate={{
            opacity: isConnected ? [1, 0.3, 1] : 1,
            scale: isConnected ? [1, 1.2, 1] : 1,
          }}
          transition={{
            duration: 2,
            repeat: isConnected ? Infinity : 0,
            ease: 'easeInOut',
          }}
        />
<span 
  className="text-xs"
  style={{ 
    color: isConnected ? 'var(--color-primary)' : '#f87171' 
  }}
>
  {isConnected ? 'Live via SDS' : 'Disconnected'}
</span>


      </motion.div>
    </AnimatePresence>
  );
}
