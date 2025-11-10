import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Code2, Copy, Check, AlertCircle, MousePointerClick } from 'lucide-react';
import { useMultipleTokenStreams } from '../hooks/useSDS';
import { useEventStream } from '../hooks/useEventStream';
import { useTheme } from '../hooks/useTheme';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';

export function DeveloperMonitor() {
  const { data: tokenData } = useMultipleTokenStreams(['STT', 'USDC', 'WETH', 'DAI', 'USDT']);
  const events = useEventStream(10);
  const { currentTheme } = useTheme();
  const [copied, setCopied] = useState(false);

  const streamData = {
    connection: {
      status: 'connected',
      endpoint: 'wss://sds-testnet.somnia.network',
      protocol: 'Somnia Data Streams v1',
      uptime: '00:12:34',
    },
    tokens: Array.from(tokenData.values()),
    recentEvents: events,
    lastUpdate: new Date().toISOString(),
  };

  const jsonString = JSON.stringify(streamData, null, 2);
  const preRef = React.useRef<HTMLPreElement>(null);

  const selectAllText = () => {
    if (preRef.current) {
      const range = document.createRange();
      range.selectNodeContents(preRef.current);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
      toast.info('Text selected! 📝', {
        description: 'Press Ctrl+C (or Cmd+C) to copy',
      });
    }
  };

  const copyToClipboard = async () => {
    try {
      // Try modern Clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(jsonString);
        setCopied(true);
        toast.success('Copied to clipboard! 📋', {
          description: 'Stream data JSON copied successfully',
        });
        setTimeout(() => setCopied(false), 2000);
        return;
      }
      
      // Fallback method using textarea
      const textArea = document.createElement('textarea');
      textArea.value = jsonString;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        const successful = document.execCommand('copy');
        if (successful) {
          setCopied(true);
          toast.success('Copied to clipboard! 📋', {
            description: 'Stream data JSON copied successfully',
          });
          setTimeout(() => setCopied(false), 2000);
        } else {
          throw new Error('Copy command failed');
        }
      } catch (err) {
        console.error('Fallback: Failed to copy', err);
        toast.error('Failed to copy', {
          description: 'Please try selecting and copying manually',
        });
      } finally {
        textArea.remove();
      }
    } catch (err) {
      console.error('Failed to copy text: ', err);
      toast.error('Copy failed', {
        description: 'Clipboard access is blocked. Please copy manually.',
      });
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
          <Code2 
            className="w-5 h-5" 
            style={{ color: 'var(--color-primary)' }}
          />
          <h3 className="text-white">Developer Stream Monitor</h3>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={selectAllText}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
          >
            <MousePointerClick className="w-4 h-4 mr-2" />
            Select All
          </Button>
          <Button
            onClick={copyToClipboard}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2 text-green-400" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy JSON
              </>
            )}
          </Button>
        </div>
      </div>

      {/* JSON Display */}
      <div className="relative">
        <div 
          className="absolute top-3 right-3 px-2 py-1 rounded text-xs"
          style={{
            backgroundColor: `${currentTheme.colors.primary}20`,
            borderColor: `${currentTheme.colors.primary}30`,
            color: currentTheme.colors.primary,
            border: `1px solid ${currentTheme.colors.primary}30`,
          }}
        >
          LIVE
        </div>
        
        <pre 
          ref={preRef}
          className="text-xs p-4 rounded-xl overflow-auto max-h-[600px] border font-mono select-text cursor-text"
          style={{
            backgroundColor: '#111827',
            color: currentTheme.colors.primary,
            borderColor: `${currentTheme.colors.primary}20`,
            userSelect: 'text',
            WebkitUserSelect: 'text',
          }}
        >
          {jsonString}
        </pre>
      </div>

      {/* Info */}
      <div 
        className="mt-4 p-3 rounded-lg border"
        style={{
          backgroundColor: `${currentTheme.colors.primary}10`,
          borderColor: `${currentTheme.colors.primary}20`,
        }}
      >
        <p 
          className="text-xs"
          style={{ color: currentTheme.colors.primary }}
        >
          <strong>Developer Note:</strong> This panel shows the raw JSON data stream from the Somnia Data Streams SDK.
          You can use this to debug your integration or inspect the data structure.
        </p>
        <p 
          className="text-xs mt-2 opacity-70"
          style={{ color: currentTheme.colors.primary }}
        >
          💡 <strong>Tip:</strong> If "Copy JSON" doesn't work, click "Select All" then use Ctrl+C (Cmd+C on Mac) to copy manually.
        </p>
      </div>
    </motion.div>
  );
}
