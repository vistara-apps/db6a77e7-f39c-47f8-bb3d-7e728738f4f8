// Base chain tokens
export const BASE_TOKENS = [
  {
    address: '0x4200000000000000000000000000000000000006',
    symbol: 'WETH',
    name: 'Wrapped Ether',
    decimals: 18,
    logoURI: '/tokens/weth.png'
  },
  {
    address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    symbol: 'USDC',
    name: 'USD Coin',
    decimals: 6,
    logoURI: '/tokens/usdc.png'
  },
  {
    address: '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb',
    symbol: 'DAI',
    name: 'Dai Stablecoin',
    decimals: 18,
    logoURI: '/tokens/dai.png'
  },
  {
    address: '0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA',
    symbol: 'USDbC',
    name: 'USD Base Coin',
    decimals: 6,
    logoURI: '/tokens/usdbc.png'
  }
];

// DEX information
export const BASE_DEXS = [
  {
    name: 'Uniswap V3',
    id: 'uniswap-v3',
    logoURI: '/dexs/uniswap.png'
  },
  {
    name: 'Aerodrome',
    id: 'aerodrome',
    logoURI: '/dexs/aerodrome.png'
  },
  {
    name: 'BaseSwap',
    id: 'baseswap',
    logoURI: '/dexs/baseswap.png'
  },
  {
    name: 'SushiSwap',
    id: 'sushiswap',
    logoURI: '/dexs/sushiswap.png'
  }
];

// Trading constants
export const DEFAULT_SLIPPAGE = '0.5';
export const MAX_SLIPPAGE = '5.0';
export const MIN_SLIPPAGE = '0.1';

export const GAS_MULTIPLIERS = {
  standard: 1.0,
  fast: 1.2,
  instant: 1.5
};

export const ARBITRAGE_MIN_PROFIT = '0.5'; // 0.5% minimum profit
export const ARBITRAGE_MAX_CAPITAL = '10000'; // $10k max capital per opportunity
