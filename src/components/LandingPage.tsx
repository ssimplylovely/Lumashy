import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Zap, Shield, TrendingUp, ArrowRight, Layers, Radio, Globe, BarChart3, Boxes, LineChart, Code2 } from 'lucide-react';
import { Button } from './ui/button';
import { useState, useRef } from 'react';
import lumaShyLogo from 'figma:asset/c350aab8e7dd7da24ad50eb64b5b28e4928a7d60.png';
import somniaLogo from 'figma:asset/11db50d4fbb40247b3c09c6b1bc55c53bfe56f78.png';
import doraHacksLogo from 'figma:asset/f90a84a5f2edd5630de21a8adc9e76ca9141810a.png';

interface LandingPageProps {
  onLaunchApp: () => void;
}

type FeatureKey = 'realtime' | 'multichain' | 'analytics' | 'sdk';

export function LandingPage({ onLaunchApp }: LandingPageProps) {
  const [selectedFeature, setSelectedFeature] = useState<FeatureKey>('realtime');
  
  // Refs for smooth scrolling
  const homeRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const integrationRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const featureContent = {
    realtime: {
      title: 'Access DeFi Data Without Complex Setup',
      description1: 'Our platform revolutionizes how you interact with smart contract data. Simply connect your wallet and instantly access real-time blockchain data streams. Each data point is handled with technical precision, completely removing the need for coding or infrastructure setup.',
      description2: 'Built with cutting-edge technology, LumaShy ensures an amazing data experience where we handle the technical intricacies of blockchain data aggregation. Every data stream is deployed on Somnia\'s Universal Chain, providing instant access to market movements and on-chain events.',
    },
    multichain: {
      title: 'Seamless Multi-Chain Data Aggregation',
      description1: 'Break free from single-chain limitations. LumaShy provides unified access to data across multiple blockchain networks through a single, elegant interface. Monitor Ethereum, BSC, Polygon, and more without switching platforms or managing multiple connections.',
      description2: 'Our cross-chain architecture automatically normalizes data formats, ensuring consistency regardless of the source blockchain. Track tokens, events, and transactions across all supported chains with real-time synchronization and zero latency.',
    },
    analytics: {
      title: 'Deep Insights with Advanced Analytics',
      description1: 'Transform raw blockchain data into actionable intelligence. Our analytics dashboard provides comprehensive metrics, customizable charts, and real-time visualizations that help you understand market trends and make informed decisions.',
      description2: 'Create custom dashboards tailored to your needs. Track price movements, volume trends, liquidity changes, and on-chain metrics with our powerful charting engine. Export data, set alerts, and share insights with your team effortlessly.',
    },
    sdk: {
      title: 'Build Faster with Developer Tools',
      description1: 'Integrate LumaShy\'s powerful data streams into your applications with our comprehensive SDK. Full TypeScript support, extensive documentation, and example code make integration seamless. From simple data queries to complex real-time subscriptions, our SDK has you covered.',
      description2: 'Join our developer community and access premium features including WebSocket connections, GraphQL APIs, and custom data pipelines. Our SDK is battle-tested, well-maintained, and designed for scalability from prototype to production.',
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden">
      {/* Animated background effects - Aurora theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-purple-600/30 via-fuchsia-500/20 to-transparent rounded-full blur-3xl"
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
          className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-gradient-to-tl from-fuchsia-500/30 via-blue-500/20 to-transparent rounded-full blur-3xl"
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
          className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/20 via-purple-600/20 to-fuchsia-500/20 rounded-full blur-3xl"
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

      {/* Main content */}
      <div className="relative z-10 flex flex-col">
        {/* Top Navigation Bar */}
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-gray-900/80">
          <div className="relative">
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-fuchsia-500/50 to-transparent" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-fuchsia-500/0 via-fuchsia-500 to-fuchsia-500/0 blur-sm" />
          </div>
          <div className="max-w-7xl mx-auto px-6 py-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-3 items-center gap-4"
            >
              {/* Logo - Left */}
              <div className="flex items-center justify-start">
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
              </div>

              {/* Navigation Menu - Center */}
              <nav className="hidden md:flex items-center justify-center gap-1 flex-nowrap">
                <button
                  onClick={() => scrollToSection(homeRef)}
                  className="text-white/80 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/5 whitespace-nowrap"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection(whyRef)}
                  className="text-white/80 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/5 whitespace-nowrap"
                >
                  Why LumaShy
                </button>
                <button
                  onClick={() => scrollToSection(featuresRef)}
                  className="text-white/80 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/5 whitespace-nowrap"
                >
                  Featured
                </button>
                <button
                  onClick={() => scrollToSection(integrationRef)}
                  className="text-white/80 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/5 whitespace-nowrap"
                >
                  How It Works
                </button>
              </nav>

              {/* Launch App Button - Right */}
              <div className="flex items-center justify-end">
                <Button
                  onClick={onLaunchApp}
                  className="bg-gradient-to-r from-fuchsia-500 via-pink-500 to-purple-500 hover:from-fuchsia-600 hover:via-pink-600 hover:to-purple-600 text-white shadow-lg shadow-fuchsia-500/30 rounded-full px-6"
                >
                  Launch App
                </Button>
              </div>
            </motion.div>
          </div>
        </header>

        {/* Hero Section */}
        <section ref={homeRef} className="min-h-screen flex items-center justify-center px-6 py-12 pt-24">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="inline-block mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.div 
                  className="w-24 h-24 flex items-center justify-center mx-auto"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <img 
                    src={lumaShyLogo} 
                    alt="LumaShy Logo" 
                    className="w-24 h-24 object-contain drop-shadow-2xl"
                    style={{ filter: 'drop-shadow(0 0 30px rgba(168, 85, 247, 0.5))' }}
                  />
                </motion.div>
              </motion.div>

              <h1 className="text-6xl md:text-7xl text-white mb-6 bg-gradient-to-r from-fuchsia-500 via-pink-500 to-purple-500 bg-clip-text text-transparent font-bold">
                LumaShy
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-4">
                Real-Time Web3 DeFi Dashboard
              </p>
              
              <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
                Powered by Somnia Data Streams. Experience real-time blockchain data with beautiful aurora aesthetics.
                Monitor live tokens, track on-chain events, and visualize market movements instantly.
              </p>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
              >
                <div className="p-6 rounded-xl border border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-pink-500/5 backdrop-blur-xl">
                  <Zap className="w-8 h-8 text-purple-400 mb-3 mx-auto" />
                  <h3 className="text-white mb-2">Real-Time Data</h3>
                  <p className="text-sm text-gray-400">
                    Live streaming from Somnia blockchain with zero delay
                  </p>
                </div>

                <div className="p-6 rounded-xl border border-fuchsia-500/20 bg-gradient-to-br from-fuchsia-500/5 to-blue-500/5 backdrop-blur-xl">
                  <TrendingUp className="w-8 h-8 text-fuchsia-400 mb-3 mx-auto" />
                  <h3 className="text-white mb-2">Market Insights</h3>
                  <p className="text-sm text-gray-400">
                    Track price movements and market pulse indicators
                  </p>
                </div>

                <div className="p-6 rounded-xl border border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-purple-500/5 backdrop-blur-xl">
                  <Shield className="w-8 h-8 text-blue-400 mb-3 mx-auto" />
                  <h3 className="text-white mb-2">Developer Tools</h3>
                  <p className="text-sm text-gray-400">
                    Monitor raw data streams and SDK integration
                  </p>
                </div>
              </motion.div>

              {/* Scroll Down Indicator - Explore More */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-16"
              >
                <button
                  onClick={() => scrollToSection(whyRef)}
                  className="group"
                >
                  <div className="relative flex flex-col items-center gap-3">
                    <motion.div
                      className="relative flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-fuchsia-500/10 via-pink-500/10 to-purple-500/10 border border-fuchsia-500/20 backdrop-blur-sm"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <span className="text-sm bg-gradient-to-r from-fuchsia-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                        Explore More
                      </span>
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-fuchsia-500/0 via-pink-500/20 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                    <motion.div
                      animate={{ y: [0, 8, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowRight className="w-5 h-5 text-fuchsia-400/60 rotate-90" />
                    </motion.div>
                  </div>
                </button>
              </motion.div>

            </motion.div>
          </div>
        </section>

        {/* Why LumaShy Section */}
        <section ref={whyRef} className="px-6 py-24 bg-gray-950/50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-6xl text-white mb-4 font-bold">
                Why <span className="bg-gradient-to-r from-fuchsia-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">LumaShy</span>?
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Secure, verifiable, and transparent platform for modern event management.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="group relative"
              >
                <div className="p-8 rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-transparent backdrop-blur-xl hover:border-purple-500/50 transition-all duration-300">
                  {/* 3D Icon Effect */}
                  <div className="relative mb-6 h-32 flex items-center justify-center">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-purple-500/30 via-fuchsia-500/20 to-blue-500/30 rounded-full blur-2xl"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                    <motion.div
                      className="relative w-24 h-24 bg-gradient-to-br from-purple-600 via-fuchsia-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Layers className="w-12 h-12 text-white" />
                    </motion.div>
                  </div>
                  
                  <h3 className="text-white text-xl mb-3 text-center">
                    Simplify Real-time Data Interpretation
                  </h3>
                  <p className="text-gray-400 text-sm text-center leading-relaxed">
                    Transform complex blockchain data into clear, actionable insights with our intuitive interface and real-time analytics.
                  </p>
                </div>
              </motion.div>

              {/* Card 2 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}
                className="group relative"
              >
                <div className="p-8 rounded-2xl border border-fuchsia-500/30 bg-gradient-to-br from-fuchsia-500/10 to-transparent backdrop-blur-xl hover:border-fuchsia-500/50 transition-all duration-300">
                  {/* 3D Icon Effect */}
                  <div className="relative mb-6 h-32 flex items-center justify-center">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/30 via-purple-500/20 to-pink-500/30 rounded-full blur-2xl"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 0.5,
                      }}
                    />
                    <motion.div
                      className="relative w-24 h-24 bg-gradient-to-br from-fuchsia-600 via-pink-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Radio className="w-12 h-12 text-white" />
                    </motion.div>
                  </div>
                  
                  <h3 className="text-white text-xl mb-3 text-center">
                    Track Everything in Quality, Trouble-free Manner
                  </h3>
                  <p className="text-gray-400 text-sm text-center leading-relaxed">
                    Monitor tokens, events, and market trends seamlessly with our comprehensive tracking system built for reliability.
                  </p>
                </div>
              </motion.div>

              {/* Card 3 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.6 }}
                className="group relative"
              >
                <div className="p-8 rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-transparent backdrop-blur-xl hover:border-blue-500/50 transition-all duration-300">
                  {/* 3D Icon Effect */}
                  <div className="relative mb-6 h-32 flex items-center justify-center">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-cyan-500/20 to-purple-500/30 rounded-full blur-2xl"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 1,
                      }}
                    />
                    <motion.div
                      className="relative w-24 h-24 bg-gradient-to-br from-blue-600 via-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Globe className="w-12 h-12 text-white" />
                    </motion.div>
                  </div>
                  
                  <h3 className="text-white text-xl mb-3 text-center">
                    Built on Advanced Somnia Tech for Future Growth
                  </h3>
                  <p className="text-gray-400 text-sm text-center leading-relaxed">
                    Powered by Somnia Data Streams for unmatched speed, scalability, and innovation in the Web3 ecosystem.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section ref={featuresRef} className="px-6 py-24">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-6xl text-white mb-4 font-bold">
                Key<span className="bg-gradient-to-r from-fuchsia-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">Features</span>
              </h2>
              <p className="text-xl text-gray-300 mb-2">Universal DeFi Data Platform</p>
              <p className="text-sm text-gray-400 max-w-3xl mx-auto italic">
                "Instant - Where Every Data Point Tells a Story. Secured by Universal Chain Technology"
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-fuchsia-500 via-pink-500 to-purple-500 hover:from-fuchsia-600 hover:via-pink-600 hover:to-purple-600 text-white shadow-lg shadow-fuchsia-500/30 rounded-full"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  For Traders
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-fuchsia-500/30 bg-gray-800/50 hover:bg-fuchsia-500/10 text-white rounded-full"
                >
                  <Code2 className="w-4 h-4 mr-2" />
                  For Developers
                </Button>
              </div>
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {/* Left Side - Feature List */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-4"
              >
                <motion.button
                  onClick={() => setSelectedFeature('realtime')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border transition-all text-left ${
                    selectedFeature === 'realtime'
                      ? 'border-purple-500 shadow-lg shadow-purple-500/30'
                      : 'border-purple-500/30 hover:border-purple-500/50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-fuchsia-500 flex items-center justify-center flex-shrink-0">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white mb-1">Real-Time Data Streaming</h3>
                      <p className="text-sm text-gray-400">
                        Launch instant data feeds with automated contract deployment. No coding required.
                      </p>
                    </div>
                  </div>
                </motion.button>

                <motion.button
                  onClick={() => setSelectedFeature('multichain')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border transition-all text-left ${
                    selectedFeature === 'multichain'
                      ? 'border-fuchsia-500 shadow-lg shadow-fuchsia-500/30'
                      : 'border-fuchsia-500/30 hover:border-fuchsia-500/50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-fuchsia-600 to-pink-500 flex items-center justify-center flex-shrink-0">
                      <Boxes className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white mb-1">Multi-Chain Support</h3>
                      <p className="text-sm text-gray-400">
                        Access data from multiple blockchains with unified interface.
                      </p>
                    </div>
                  </div>
                </motion.button>

                <motion.button
                  onClick={() => setSelectedFeature('analytics')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border transition-all text-left ${
                    selectedFeature === 'analytics'
                      ? 'border-blue-500 shadow-lg shadow-blue-500/30'
                      : 'border-blue-500/30 hover:border-blue-500/50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white mb-1">Advanced Analytics Dashboard</h3>
                      <p className="text-sm text-gray-400">
                        Comprehensive insights with customizable metrics and charts.
                      </p>
                    </div>
                  </div>
                </motion.button>

                <motion.button
                  onClick={() => setSelectedFeature('sdk')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border transition-all text-left ${
                    selectedFeature === 'sdk'
                      ? 'border-purple-500 shadow-lg shadow-purple-500/30'
                      : 'border-purple-500/30 hover:border-purple-500/50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center flex-shrink-0">
                      <Code2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white mb-1">Developer-Friendly SDK</h3>
                      <p className="text-sm text-gray-400">
                        Integrate easily with comprehensive API and SDK documentation.
                      </p>
                    </div>
                  </div>
                </motion.button>
              </motion.div>

              {/* Right Side - Main Description Card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative"
              >
                <div className="p-8 rounded-2xl bg-gradient-to-br from-fuchsia-600 via-purple-600 to-pink-600 text-white h-full flex flex-col justify-center shadow-2xl shadow-fuchsia-500/30">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedFeature}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-2xl mb-4">
                        {featureContent[selectedFeature].title}
                      </h3>
                      <p className="text-white/90 leading-relaxed mb-4">
                        {featureContent[selectedFeature].description1}
                      </p>
                      <p className="text-white/90 leading-relaxed">
                        {featureContent[selectedFeature].description2}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>

          </div>
        </section>

        {/* How It Works Section */}
        <section ref={integrationRef} className="px-6 py-24 bg-gray-950/50">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-6xl text-white mb-4 font-bold">
                How It Works
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Accessing and monitoring blockchain-based DeFi data is simple with LumaShy
              </p>
            </motion.div>

            {/* Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Step 1 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative p-8 rounded-2xl bg-gray-900/50 border-2 border-transparent hover:border-purple-500/50 transition-all group"
                style={{
                  backgroundImage: 'linear-gradient(#0f172a, #0f172a), linear-gradient(135deg, #a855f7, #ec4899)',
                  backgroundOrigin: 'border-box',
                  backgroundClip: 'padding-box, border-box',
                }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-fuchsia-500 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl text-purple-400">01</div>
                </div>
                <h3 className="text-white text-xl mb-3">Connect Your Wallet</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Link your Web3 wallet to access real-time data streams. Our secure platform supports all major wallets including MetaMask and WalletConnect.
                </p>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative p-8 rounded-2xl bg-gray-900/50 border-2 border-transparent hover:border-fuchsia-500/50 transition-all group"
                style={{
                  backgroundImage: 'linear-gradient(#0f172a, #0f172a), linear-gradient(135deg, #ec4899, #8b5cf6)',
                  backgroundOrigin: 'border-box',
                  backgroundClip: 'padding-box, border-box',
                }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-fuchsia-600 to-pink-500 flex items-center justify-center flex-shrink-0">
                    <Layers className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl text-fuchsia-400">02</div>
                </div>
                <h3 className="text-white text-xl mb-3">Select Data Stream</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Choose from various DeFi data sources on Somnia Chain. Access token prices, liquidity pools, and on-chain events instantly.
                </p>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative p-8 rounded-2xl bg-gray-900/50 border-2 border-transparent hover:border-purple-500/50 transition-all group"
                style={{
                  backgroundImage: 'linear-gradient(#0f172a, #0f172a), linear-gradient(135deg, #a855f7, #06b6d4)',
                  backgroundOrigin: 'border-box',
                  backgroundClip: 'padding-box, border-box',
                }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center flex-shrink-0">
                    <Radio className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl text-purple-400">03</div>
                </div>
                <h3 className="text-white text-xl mb-3">Real-Time Monitoring</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Watch live blockchain events and token movements as they happen. Get instant notifications for market changes and trading opportunities.
                </p>
              </motion.div>

              {/* Step 4 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative p-8 rounded-2xl bg-gray-900/50 border-2 border-transparent hover:border-fuchsia-500/50 transition-all group"
                style={{
                  backgroundImage: 'linear-gradient(#0f172a, #0f172a), linear-gradient(135deg, #ec4899, #8b5cf6)',
                  backgroundOrigin: 'border-box',
                  backgroundClip: 'padding-box, border-box',
                }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-fuchsia-600 to-purple-500 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl text-fuchsia-400">04</div>
                </div>
                <h3 className="text-white text-xl mb-3">Analyze & Act</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Use comprehensive analytics and insights to make informed trading decisions. Export data, set custom alerts, and track your portfolio performance.
                </p>
              </motion.div>
            </div>

            {/* Integration Badges */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-center mt-16"
            >
              <p className="text-gray-400 mb-6">Powered By</p>
              <div className="flex items-center justify-center gap-8 flex-wrap">
                <a 
                  href="https://datastreams.somnia.network/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 rounded-xl bg-gray-800/50 border border-purple-500/30 hover:border-purple-500 hover:bg-gray-800/70 transition-all cursor-pointer"
                >
                  <img 
                    src={somniaLogo} 
                    alt="Somnia" 
                    className="h-8 object-contain"
                  />
                </a>
                <a 
                  href="https://dorahacks.io/home" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 rounded-xl bg-gray-800/50 border border-green-500/30 hover:border-green-500 hover:bg-gray-800/70 transition-all cursor-pointer"
                >
                  <img 
                    src={doraHacksLogo} 
                    alt="DoraHacks" 
                    className="h-8 object-contain"
                  />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 backdrop-blur-xl bg-gray-900/30">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-center">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-sm text-gray-400 bg-gradient-to-r from-fuchsia-500 via-pink-500 to-purple-500 bg-clip-text text-transparent"
              >
                Soft Light. Sharp Data. — LumaShy
              </motion.p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
