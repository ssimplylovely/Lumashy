import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Radio, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { useSDSConnection } from '../hooks/useSDS';

export function SDSStatus() {
  const { isConnected, connect } = useSDSConnection();
  const [status, setStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');

  useEffect(() => {
    const initConnection = async () => {
      setStatus('connecting');
      await connect();
      setStatus('connected');
    };

    initConnection();
  }, [connect]);

  const getStatusIcon = () => {
    switch (status) {
      case 'connected':
        return <CheckCircle2 className="w-4 h-4 text-green-400" />;
      case 'disconnected':
        return <XCircle className="w-4 h-4 text-red-400" />;
      default:
        return <Loader2 className="w-4 h-4 text-yellow-400 animate-spin" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'connected':
        return 'SDS Connected';
      case 'disconnected':
        return 'SDS Disconnected';
      default:
        return 'Connecting to SDS...';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'connected':
        return 'from-green-500/20 to-emerald-500/20 border-green-500/30';
      case 'disconnected':
        return 'from-red-500/20 to-rose-500/20 border-red-500/30';
      default:
        return 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${getStatusColor()} border backdrop-blur-xl`}
    >
      <Radio className="w-4 h-4 text-purple-400" />
      {getStatusIcon()}
      <span className="text-sm text-gray-300">{getStatusText()}</span>
      {status === 'connected' && (
        <motion.div
          className="w-2 h-2 bg-green-500 rounded-full"
          animate={{
            opacity: [1, 0.3, 1],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}
    </motion.div>
  );
}
