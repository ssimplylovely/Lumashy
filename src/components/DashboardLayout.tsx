import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Github, FileText } from 'lucide-react';
import { Sidebar, SidebarView } from './Sidebar';
import { WalletConnect } from './WalletConnect';
import { MobileSearchButton } from './MobileSearchButton';
import { KeyboardShortcuts } from './KeyboardShortcuts';
import { LiveTokenFeed } from './LiveTokenFeed';
import { ReactiveChart } from './ReactiveChart';
import { MarketPulseIndicator } from './MarketPulseIndicator';
import { LiveDataIndicator } from './LiveDataIndicator';
import { OnChainEventFeed } from './OnChainEventFeed';
import { TokenDetailModal } from './TokenDetailModal';
import { DeveloperMonitor } from './DeveloperMonitor';
import { ThemeSelector } from './ThemeSelector';
import { AnimatedBackground } from './AnimatedBackground';
import { TokenData } from '../services/sdsService';

interface DashboardLayoutProps {
  onBackToLanding: () => void;
}

export function DashboardLayout({ onBackToLanding }: DashboardLayoutProps) {
  const [currentView, setCurrentView] = useState<SidebarView>('overview');
  const [selectedToken, setSelectedToken] = useState<TokenData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTokenClick = (token: TokenData) => {
    setSelectedToken(token);
    setIsModalOpen(true);
  };

  const handleSubscribe = (symbol: string) => {
    console.log(`Subscribed to ${symbol} stream`);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'overview':
        return <OverviewView onTokenClick={handleTokenClick} onViewChange={setCurrentView} />;
      case 'tokens':
        return <TokensView onTokenClick={handleTokenClick} />;
      case 'events':
        return <EventsView />;
      case 'charts':
        return <ChartsView />;
      case 'developer':
        return <DeveloperView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <OverviewView onTokenClick={handleTokenClick} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden">
      {/* Animated background effects - Theme responsive */}
      <AnimatedBackground />

      {/* Main Layout */}
      <div className="relative z-10 flex h-screen">
        {/* Sidebar */}
        <Sidebar 
          currentView={currentView} 
          onViewChange={setCurrentView}
          onBackToLanding={onBackToLanding}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="border-b border-white/10 backdrop-blur-xl bg-gray-900/30">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <h2 className="text-2xl text-white bg-gradient-to-r from-fuchsia-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                    {currentView === 'overview' && 'Dashboard Overview'}
                    {currentView === 'tokens' && 'Live Token Feed'}
                    {currentView === 'events' && 'On-Chain Events'}
                    {currentView === 'charts' && 'Market Charts'}
                    {currentView === 'developer' && 'Developer Monitor'}
                    {currentView === 'settings' && 'Settings'}
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">
                    Real-time data powered by Somnia Data Streams
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-4"
                >
                  <SearchToken className="hidden md:block w-80" />
                  <MobileSearchButton />
                  <LiveDataIndicator />
                  <WalletConnect />
                </motion.div>
              </div>
            </div>
          </header>

          {/* Scrollable Content */}
          <main className="flex-1 overflow-y-auto">
            <div className="p-6">
              {renderContent()}
            </div>

            {/* Footer */}
            <footer className="border-t border-white/10 mt-12">
              <div className="px-6 py-6">
                <div className="flex items-center justify-center">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-gray-400 bg-gradient-to-r from-fuchsia-500 via-pink-500 to-purple-500 bg-clip-text text-transparent"
                  >
                    Soft Light. Sharp Data. — LumaShy
                  </motion.p>
                </div>
              </div>
            </footer>
          </main>
        </div>
      </div>

      {/* Token Detail Modal */}
      <TokenDetailModal
        token={selectedToken}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubscribe={handleSubscribe}
      />

      {/* Keyboard Shortcuts */}
      <KeyboardShortcuts
        shortcuts={[
          {
            key: '/',
            description: 'Focus search',
            action: () => {
              const searchInput = document.querySelector('input[placeholder*="Search token"]') as HTMLInputElement;
              searchInput?.focus();
            },
          },
          {
            key: 'o',
            description: 'Go to Overview',
            action: () => setCurrentView('overview'),
          },
          {
            key: 't',
            description: 'Go to Tokens',
            action: () => setCurrentView('tokens'),
          },
          {
            key: 'e',
            description: 'Go to Events',
            action: () => setCurrentView('events'),
          },
          {
            key: 'c',
            description: 'Go to Charts',
            action: () => setCurrentView('charts'),
          },
          {
            key: 'd',
            description: 'Go to Developer',
            action: () => setCurrentView('developer'),
          },
        ]}
      />
    </div>
  );
}

// Overview View Component
function OverviewView({ 
  onTokenClick,
  onViewChange 
}: { 
  onTokenClick: (token: TokenData) => void;
  onViewChange: (view: SidebarView) => void;
}) {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <MarketPulseIndicator />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1"
        >
          <h3 className="text-xl text-white mb-4">Live Token Feed</h3>
          <LiveTokenFeed onTokenClick={onTokenClick} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <h3 className="text-xl text-white mb-4">Market Chart</h3>
          <ReactiveChart />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <OnChainEventFeed />
      </motion.div>

      {/* Info section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-6 rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-pink-500/5 backdrop-blur-xl"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <FileText className="w-6 h-6 text-purple-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-white mb-2">About Somnia Data Streams (SDS)</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              This dashboard demonstrates the integration of Somnia Data Streams SDK for real-time DeFi data.
              SDS provides low-latency, high-throughput data streaming for blockchain applications on the Somnia network.
              All data updates are received via WebSocket connections and rendered reactively.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
              >
                <Github className="w-4 h-4" />
                View on GitHub
              </a>
              <a
                href="https://somnia.network"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                Somnia Network
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Tokens View Component
function TokensView({ onTokenClick }: { onTokenClick: (token: TokenData) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Search Token */}
      <div className="p-6 rounded-2xl border backdrop-blur-xl"
        style={{
          borderColor: 'var(--color-border)',
          background: `linear-gradient(135deg, var(--color-primary)05, var(--color-secondary)05)`,
        }}
      >
        <h3 className="text-white mb-4">Search Tokens</h3>
        <SearchToken />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl text-white mb-4">Live Token Feed</h3>
          <LiveTokenFeed onTokenClick={onTokenClick} />
        </div>
        <div>
          <h3 className="text-xl text-white mb-4">Market Data</h3>
          <div className="p-6 rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-pink-500/5 backdrop-blur-xl">
            <p className="text-gray-400 text-center">
              Click on any token to view detailed information
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Events View Component
function EventsView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <OnChainEventFeed />
    </motion.div>
  );
}

// Charts View Component
function ChartsView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <ReactiveChart />
      <MarketPulseIndicator />
    </motion.div>
  );
}

// Developer View Component
function DeveloperView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <DeveloperMonitor />
    </motion.div>
  );
}

// Settings View Component
function SettingsView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Theme Selector */}
      <div className="p-6 rounded-2xl border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-primary)]/5 to-[var(--color-accent)]/5 backdrop-blur-xl">
        <ThemeSelector />
      </div>

      {/* Dashboard Settings */}
      <div className="p-6 rounded-2xl border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-primary)]/5 to-[var(--color-accent)]/5 backdrop-blur-xl">
        <h3 className="text-white mb-4">Dashboard Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 border border-white/10">
            <div>
              <p className="text-white text-sm">Real-time Updates</p>
              <p className="text-xs text-gray-400">Enable live data streaming</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          </div>
          
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 border border-white/10">
            <div>
              <p className="text-white text-sm">Network</p>
              <p className="text-xs text-gray-400">Somnia Testnet</p>
            </div>
            <span className="text-xs" style={{ color: 'var(--color-primary)' }}>Active</span>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 border border-white/10">
            <div>
              <p className="text-white text-sm">Update Interval</p>
              <p className="text-xs text-gray-400">Data refresh rate</p>
            </div>
            <span className="text-xs text-white">2 seconds</span>
          </div>
        </div>
      </div>

      {/* Connection Info */}
      <div className="p-6 rounded-2xl border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-primary)]/5 to-[var(--color-accent)]/5 backdrop-blur-xl">
        <h3 className="text-white mb-4">Connection Info</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">SDS Status:</span>
            <span className="text-green-400">Connected</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Network:</span>
            <span className="text-white">Somnia Testnet</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Chain ID:</span>
            <span className="text-white">50311</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">RPC Endpoint:</span>
            <span className="text-white text-xs">testnet-rpc.somnia.network</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
