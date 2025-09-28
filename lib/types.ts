// Core data model types
export interface User {
  userId: string;
  walletAddress: string;
  farcasterId?: string;
}

export interface TradeOrder {
  orderId: string;
  userId: string;
  fromToken: string;
  toToken: string;
  amount: string;
  orderType: 'limit' | 'stop-loss';
  triggerPrice: string;
  status: 'active' | 'filled' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface ArbitrageAlert {
  alertId: string;
  userId: string;
  token: string;
  exchange1: string;
  price1: string;
  exchange2: string;
  price2: string;
  profitPotential: string;
  timestamp: Date;
}

export interface Token {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  logoURI?: string;
  price?: string;
}

export interface SwapQuote {
  fromToken: Token;
  toToken: Token;
  fromAmount: string;
  toAmount: string;
  gasEstimate: string;
  slippage: string;
  route: string[];
  priceImpact: string;
}

export interface ArbitrageOpportunity {
  id: string;
  token: Token;
  buyExchange: string;
  sellExchange: string;
  buyPrice: string;
  sellPrice: string;
  profitPotential: string;
  profitPercentage: string;
  requiredCapital: string;
  gasEstimate: string;
  confidence: 'high' | 'medium' | 'low';
}

export interface GasOptimization {
  standard: string;
  fast: string;
  instant: string;
  recommended: 'standard' | 'fast' | 'instant';
}
