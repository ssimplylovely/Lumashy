import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X } from 'lucide-react';
import { Button } from './ui/button';
import { SearchToken } from './SearchToken';

export function MobileSearchButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Search Button */}
      <Button
        onClick={() => setIsOpen(true)}
        variant="ghost"
        size="sm"
        className="md:hidden"
        style={{
          color: 'var(--color-primary)',
        }}
      >
        <Search className="w-5 h-5" />
      </Button>

      {/* Mobile Search Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 md:hidden"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed top-20 left-4 right-4 z-50 md:hidden p-4 rounded-2xl border"
              style={{
                backgroundColor: 'var(--color-bg)',
                borderColor: 'var(--color-border)',
                boxShadow: `0 20px 60px rgba(0, 0, 0, 0.8), 0 0 40px var(--color-glow)`,
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-medium">Search Token</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search Component */}
              <SearchToken />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
