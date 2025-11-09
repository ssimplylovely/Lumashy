import { motion } from 'motion/react';
import { useTheme } from '../hooks/useTheme';

export function AnimatedBackground() {
  const { currentTheme } = useTheme();

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, ${currentTheme.colors.primary}30, ${currentTheme.colors.secondary}20, transparent)`,
        }}
        animate={{
          y: [0, 100, 0],
          x: [0, 50, 0],
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, ${currentTheme.colors.secondary}30, ${currentTheme.colors.accent}20, transparent)`,
        }}
        animate={{
          y: [0, -100, 0],
          x: [0, -50, 0],
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-[500px] h-[500px] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, ${currentTheme.colors.accent}20, ${currentTheme.colors.primary}20, transparent)`,
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}
