import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Command, X } from 'lucide-react';

interface KeyboardShortcut {
  key: string;
  description: string;
  action: () => void;
}

interface KeyboardShortcutsProps {
  shortcuts?: KeyboardShortcut[];
}

export function KeyboardShortcuts({ shortcuts = [] }: KeyboardShortcutsProps) {
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      // Show help with ?
      if (e.key === '?' && e.shiftKey) {
        e.preventDefault();
        setShowHelp(true);
        return;
      }

      // Hide help with Escape
      if (e.key === 'Escape' && showHelp) {
        e.preventDefault();
        setShowHelp(false);
        return;
      }

      // Execute custom shortcuts
      shortcuts.forEach((shortcut) => {
        if (e.key === shortcut.key && !e.metaKey && !e.ctrlKey && !e.shiftKey) {
          e.preventDefault();
          shortcut.action();
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts, showHelp]);

  const defaultShortcuts = [
    { key: '/', display: '/', description: 'Focus search' },
    { key: '?', display: '?', description: 'Show keyboard shortcuts' },
    { key: 'Escape', display: 'ESC', description: 'Close modals' },
    ...shortcuts.map((s) => ({
      key: s.key,
      display: s.key.toUpperCase(),
      description: s.description,
    })),
  ];

  return (
    <>
      {/* Help Button - Bottom Right */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowHelp(true)}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full flex items-center justify-center border shadow-lg backdrop-blur-xl"
        style={{
          backgroundColor: 'var(--color-bg)',
          borderColor: 'var(--color-primary)',
          boxShadow: `0 0 20px var(--color-glow)`,
        }}
      >
        <Command className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
      </motion.button>

      {/* Help Modal */}
      <AnimatePresence>
        {showHelp && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHelp(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md p-6 rounded-2xl border"
              style={{
                backgroundColor: 'var(--color-bg)',
                borderColor: 'var(--color-border)',
                boxShadow: `0 20px 60px rgba(0, 0, 0, 0.8), 0 0 40px var(--color-glow)`,
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, var(--color-primary), var(--color-secondary))`,
                    }}
                  >
                    <Command className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-white font-medium">Keyboard Shortcuts</h3>
                </div>
                <button
                  onClick={() => setShowHelp(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Shortcuts List */}
              <div className="space-y-2">
                {defaultShortcuts.map((shortcut, index) => (
                  <motion.div
                    key={shortcut.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-3 rounded-lg border"
                    style={{
                      backgroundColor: 'var(--color-bg)',
                      borderColor: 'var(--color-border)',
                    }}
                  >
                    <span className="text-gray-400 text-sm">
                      {shortcut.description}
                    </span>
                    <kbd
                      className="px-3 py-1 rounded text-xs font-mono border"
                      style={{
                        backgroundColor: 'var(--color-primary)10',
                        borderColor: 'var(--color-primary)',
                        color: 'var(--color-primary)',
                      }}
                    >
                      {shortcut.display}
                    </kbd>
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-6 pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
                <p className="text-xs text-gray-500 text-center">
                  Press <kbd className="px-2 py-0.5 rounded bg-gray-800 text-gray-400 text-xs">ESC</kbd> to close
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// Hook for registering keyboard shortcuts
export function useKeyboardShortcut(key: string, callback: () => void) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.key === key && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
        e.preventDefault();
        callback();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [key, callback]);
}
