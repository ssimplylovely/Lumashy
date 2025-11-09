import { motion } from 'motion/react';
import { Palette, Check } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { themes } from '../config/themes';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { toast } from 'sonner@2.0.3';

export function ThemeSelector() {
  const { currentTheme, changeTheme, resetToDefault } = useTheme();

  return (
    <div className="space-y-6 relative z-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center">
            <Palette className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-white">Theme</h3>
            <p className="text-sm text-gray-400">{currentTheme.name}</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={resetToDefault}
          className="border-[var(--color-border)] hover:bg-[var(--color-background-secondary)]"
        >
          Default
        </Button>
      </div>

      {/* Theme Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {themes.map((theme) => (
          <motion.div
            key={theme.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative z-10"
          >
            <Card
              className={`p-4 cursor-pointer transition-all border-2 pointer-events-auto ${
                currentTheme.id === theme.id
                  ? 'border-[var(--color-primary)] bg-[var(--color-background-secondary)]'
                  : 'border-gray-800 hover:border-gray-700 bg-gray-900/50'
              }`}
              onClick={() => changeTheme(theme)}
            >
              <div className="flex items-start gap-3">
                {/* Theme Preview */}
                <div 
                  className="w-12 h-12 rounded-lg flex-shrink-0"
                  style={{
                    background: theme.colors.gradient,
                    boxShadow: `0 0 20px ${theme.colors.glow}`,
                  }}
                />
                
                {/* Theme Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-white font-medium">{theme.name}</h4>
                    {currentTheme.id === theme.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ 
                          background: theme.colors.gradient,
                        }}
                      >
                        <Check className="w-3 h-3 text-white" />
                      </motion.div>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {theme.description}
                  </p>
                  
                  {/* Color Preview */}
                  <div className="flex gap-1.5 mt-3">
                    <div 
                      className="w-6 h-6 rounded border border-gray-700"
                      style={{ backgroundColor: theme.colors.primary }}
                      title="Primary"
                    />
                    <div 
                      className="w-6 h-6 rounded border border-gray-700"
                      style={{ backgroundColor: theme.colors.secondary }}
                      title="Secondary"
                    />
                    <div 
                      className="w-6 h-6 rounded border border-gray-700"
                      style={{ backgroundColor: theme.colors.accent }}
                      title="Accent"
                    />
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Preview Section */}
      <Card className="p-6 bg-gray-900/50 border-gray-800 relative z-10">
        <h4 className="text-white mb-4">Theme Preview</h4>
        <p className="text-xs text-gray-500 mb-4">
          ✨ Click the components below to test interactivity
        </p>
        <div className="space-y-4">
          {/* Gradient Preview */}
          <div 
            className="h-24 rounded-lg relative overflow-hidden"
            style={{
              background: currentTheme.colors.gradient,
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-medium text-lg">
                {currentTheme.name}
              </span>
            </div>
          </div>

          {/* Component Previews */}
          <div className="grid grid-cols-3 gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full"
            >
              <Button
                size="sm"
                className="w-full pointer-events-auto cursor-pointer"
                style={{
                  background: currentTheme.colors.gradient,
                  boxShadow: `0 0 20px ${currentTheme.colors.glow}`,
                }}
                onClick={() => {
                  toast.success('Button works! 🎉', {
                    description: `Theme: ${currentTheme.name}`,
                  });
                }}
              >
                Button
              </Button>
            </motion.div>
            <motion.button 
              className="h-9 rounded-md border-2 flex items-center justify-center text-sm pointer-events-auto cursor-pointer transition-all"
              style={{ 
                borderColor: currentTheme.colors.primary,
                color: currentTheme.colors.primary,
                background: 'transparent',
              }}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: `${currentTheme.colors.primary}10`,
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                toast.info('Border style works! ✨', {
                  description: `Theme: ${currentTheme.name}`,
                });
              }}
            >
              Border
            </motion.button>
            <motion.button 
              className="h-9 rounded-md flex items-center justify-center text-sm pointer-events-auto cursor-pointer transition-all"
              style={{ 
                backgroundColor: currentTheme.colors.backgroundSecondary,
                color: currentTheme.colors.text,
                border: 'none',
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: `0 0 10px ${currentTheme.colors.glow}`,
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                toast.info('Card style works! 🎨', {
                  description: `Theme: ${currentTheme.name}`,
                });
              }}
            >
              Card
            </motion.button>
          </div>

          {/* Live Indicator Preview */}
          <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-800/50">
            <div 
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ 
                backgroundColor: currentTheme.colors.primary,
                boxShadow: `0 0 8px ${currentTheme.colors.glow}`,
              }}
            />
            <span className="text-sm" style={{ color: currentTheme.colors.primary }}>
              Live Indicator
            </span>
          </div>
        </div>
      </Card>

      {/* Info */}
      <div className="text-center text-xs text-gray-500">
        Theme preferences are saved locally and persist across sessions
      </div>
    </div>
  );
}
