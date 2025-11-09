import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Activity, 
  Zap, 
  BarChart3, 
  Code2, 
  Settings,
  Sparkles,
  ChevronLeft
} from 'lucide-react';
import { cn } from './ui/utils';
import lumaShyLogo from 'figma:asset/c350aab8e7dd7da24ad50eb64b5b28e4928a7d60.png';

export type SidebarView = 'overview' | 'tokens' | 'events' | 'charts' | 'developer' | 'settings';

interface SidebarProps {
  currentView: SidebarView;
  onViewChange: (view: SidebarView) => void;
  onBackToLanding: () => void;
}

interface MenuItem {
  id: SidebarView;
  label: string;
  icon: React.ElementType;
}

const menuItems: MenuItem[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'tokens', label: 'Live Tokens', icon: Activity },
  { id: 'events', label: 'Events', icon: Zap },
  { id: 'charts', label: 'Charts', icon: BarChart3 },
  { id: 'developer', label: 'Developer', icon: Code2 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ currentView, onViewChange, onBackToLanding }: SidebarProps) {
  return (
    <motion.aside
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-64 h-screen bg-gray-900/50 backdrop-blur-xl border-r border-white/10 flex flex-col"
    >
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <motion.div
          className="flex items-center gap-3 mb-4"
          whileHover={{ scale: 1.02 }}
        >
          <motion.div
            className="w-10 h-10 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <img 
              src={lumaShyLogo} 
              alt="LumaShy Logo" 
              className="w-10 h-10 object-contain"
            />
          </motion.div>
          <div>
            <h1 className="text-xl text-white tracking-tight">LumaShy</h1>
            <p className="text-xs text-gray-400">Dashboard</p>
          </div>
        </motion.div>

        {/* Back to Landing */}
        <button
          onClick={onBackToLanding}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-purple-400 transition-colors w-full"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Home
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => onViewChange(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all group",
                  isActive
                    ? "bg-gradient-to-r from-fuchsia-500/20 to-pink-500/20 text-white border border-fuchsia-500/30"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon className={cn(
                  "w-5 h-5 transition-colors",
                  isActive 
                    ? "text-fuchsia-400" 
                    : "text-gray-500 group-hover:text-fuchsia-400"
                )} />
                <span className="text-sm">{item.label}</span>
                
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="ml-auto w-2 h-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-pink-500"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </nav>

      {/* Footer Info */}
      <div className="p-4 border-t border-white/10">
        <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500/10 to-fuchsia-500/10 border border-purple-500/20">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-gray-400">SDS Connected</span>
          </div>
          <p className="text-xs text-gray-500">
            Somnia Data Streams Active
          </p>
        </div>
      </div>
    </motion.aside>
  );
}
