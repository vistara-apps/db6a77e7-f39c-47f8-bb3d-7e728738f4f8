'use client';

import { useState } from 'react';
import { Settings2, Zap, Target, AlertTriangle } from 'lucide-react';
import { TokenInput } from './TokenInput';
import { Token, TradeOrder } from '@/lib/types';
import { BASE_TOKENS, DEFAULT_SLIPPAGE } from '@/lib/constants';
import { formatCurrency, generateId } from '@/lib/utils';

interface TradeConfigFormProps {
  variant: 'limitOrder' | 'arbitrageSearch';
  onSubmit: (order: Partial<TradeOrder>) => void;
}

export function TradeConfigForm({ variant, onSubmit }: TradeConfigFormProps) {
  const [fromToken, setFromToken] = useState<Token | null>(null);
  const [toToken, setToToken] = useState<Token | null>(null);
  const [fromAmount, setFromAmount] = useState('');
  const [triggerPrice, setTriggerPrice] = useState('');
  const [slippage, setSlippage] = useState(DEFAULT_SLIPPAGE);
  const [orderType, setOrderType] = useState<'limit' | 'stop-loss'>('limit');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fromToken || !toToken || !fromAmount || !triggerPrice) {
      return;
    }

    const order: Partial<TradeOrder> = {
      orderId: generateId(),
      fromToken: fromToken.address,
      toToken: toToken.address,
      amount: fromAmount,
      orderType,
      triggerPrice,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    onSubmit(order);
  };

  const swapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
  };

  const isFormValid = fromToken && toToken && fromAmount && triggerPrice;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {variant === 'limitOrder' && (
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Create Limit Order</h3>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setOrderType('limit')}
              className={`px-3 py-1 rounded text-sm font-medium transition-all duration-200 ${
                orderType === 'limit'
                  ? 'bg-accent/20 text-accent border border-accent/30'
                  : 'bg-surface text-text-secondary border border-gray-600'
              }`}
            >
              Limit
            </button>
            <button
              type="button"
              onClick={() => setOrderType('stop-loss')}
              className={`px-3 py-1 rounded text-sm font-medium transition-all duration-200 ${
                orderType === 'stop-loss'
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                  : 'bg-surface text-text-secondary border border-gray-600'
              }`}
            >
              Stop Loss
            </button>
          </div>
        </div>
      )}

      {/* Token Inputs */}
      <div className="space-y-4">
        <TokenInput
          label="From"
          token={fromToken}
          amount={fromAmount}
          onTokenSelect={setFromToken}
          onAmountChange={setFromAmount}
          balance="1,234.56"
          showMaxButton
        />

        {/* Swap Button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={swapTokens}
            className="p-2 bg-surface border border-gray-600 rounded-lg hover:border-accent/50 hover:bg-accent/10 transition-all duration-200"
          >
            <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </button>
        </div>

        <TokenInput
          label="To"
          token={toToken}
          amount=""
          onTokenSelect={setToToken}
          onAmountChange={() => {}}
          disabled
        />
      </div>

      {/* Trigger Price */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-text-secondary">
          {orderType === 'limit' ? 'Trigger Price' : 'Stop Price'}
        </label>
        <div className="trading-card">
          <div className="flex items-center space-x-3">
            <Target className="w-5 h-5 text-accent" />
            <input
              type="number"
              placeholder="0.0"
              value={triggerPrice}
              onChange={(e) => setTriggerPrice(e.target.value)}
              className="flex-1 bg-transparent text-lg font-semibold placeholder-gray-500 focus:outline-none"
            />
            <span className="text-text-secondary">
              {toToken?.symbol || 'TOKEN'} per {fromToken?.symbol || 'TOKEN'}
            </span>
          </div>
        </div>
      </div>

      {/* Advanced Settings */}
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
          className="flex items-center space-x-2 text-text-secondary hover:text-fg transition-colors duration-200"
        >
          <Settings2 className="w-4 h-4" />
          <span className="text-sm">Advanced Settings</span>
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${
              isAdvancedOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isAdvancedOpen && (
          <div className="space-y-4 p-4 bg-surface/50 rounded-lg border border-gray-600">
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-secondary">
                Slippage Tolerance
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="0.1"
                  max="5"
                  step="0.1"
                  value={slippage}
                  onChange={(e) => setSlippage(e.target.value)}
                  className="input-field w-20"
                />
                <span className="text-text-secondary">%</span>
                <div className="flex space-x-1">
                  {['0.5', '1.0', '2.0'].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setSlippage(preset)}
                      className={`px-2 py-1 text-xs rounded transition-all duration-200 ${
                        slippage === preset
                          ? 'bg-accent/20 text-accent border border-accent/30'
                          : 'bg-surface text-text-secondary border border-gray-600 hover:border-accent/50'
                      }`}
                    >
                      {preset}%
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-2 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-yellow-400">
                <p className="font-medium">Order Execution Notice</p>
                <p className="text-xs mt-1 text-yellow-400/80">
                  Orders are executed automatically when trigger conditions are met. 
                  Ensure sufficient balance and gas fees.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!isFormValid}
        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        <Zap className="w-4 h-4" />
        <span>
          {variant === 'limitOrder' 
            ? `Create ${orderType === 'limit' ? 'Limit' : 'Stop Loss'} Order`
            : 'Start Arbitrage Search'
          }
        </span>
      </button>

      {/* Order Summary */}
      {isFormValid && (
        <div className="p-4 bg-surface/50 rounded-lg border border-gray-600 space-y-2">
          <h4 className="font-medium text-text-secondary">Order Summary</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">You're selling:</span>
              <span>{fromAmount} {fromToken?.symbol}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">You'll receive:</span>
              <span>~{(parseFloat(fromAmount || '0') * parseFloat(triggerPrice || '0')).toFixed(4)} {toToken?.symbol}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Trigger price:</span>
              <span>{triggerPrice} {toToken?.symbol}/{fromToken?.symbol}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Slippage:</span>
              <span>{slippage}%</span>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
