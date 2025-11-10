// Somnia Testnet Configuration
export const SOMNIA_TESTNET = {
  chainId: 50311, // Somnia Testnet Chain ID
  chainName: 'Somnia Testnet',
  rpcUrl: 'https://testnet-rpc.somnia.network',
  blockExplorer: 'https://testnet-explorer.somnia.network',
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

// Token addresses on Somnia Testnet (example addresses)
export const TOKEN_ADDRESSES = {
  STT: '0x0000000000000000000000000000000000000000',
  USDC: '0x1234567890123456789012345678901234567890',
  WETH: '0x2234567890123456789012345678901234567890',
  DAI: '0x3234567890123456789012345678901234567890',
  USDT: '0x4234567890123456789012345678901234567890',
};
