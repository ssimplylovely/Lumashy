// Somnia Testnet Configuration
export const SOMNIA_TESTNET = {
  chainId: 50312, // ✅ Correct Somnia Testnet Chain ID
  chainName: 'Somnia Testnet',
  rpcUrl: 'https://dream-rpc.somnia.network', // ✅ Correct RPC
  blockExplorer: 'https://shannon-explorer.somnia.network', // ✅ Correct Explorer
  nativeCurrency: {
    name: 'STT',
    symbol: 'STT',
    decimals: 18,
  },
};

// SDS Endpoint Configuration
export const SDS_CONFIG = {
  endpoint: 'wss://sds-testnet.somnia.network',
  apiKey: 'YOUR_SDS_API_KEY_HERE', // Replace with your actual SDS API key
  version: 'v1',
};

// Token addresses on Somnia Testnet (example)
export const TOKEN_ADDRESSES = {
  STT: '0x0000000000000000000000000000000000000000',
  USDC: '0x1234567890123456789012345678901234567890',
  WETH: '0x2234567890123456789012345678901234567890',
  DAI: '0x3234567890123456789012345678901234567890',
  USDT: '0x4234567890123456789012345678901234567890',
};