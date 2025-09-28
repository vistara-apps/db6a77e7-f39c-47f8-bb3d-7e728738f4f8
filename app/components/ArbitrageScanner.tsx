'use client';

import { useState, useEffect } from 'react';
import {
  TrendingUp,
  ArrowRight,
  Zap,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { ArbitrageOpportunity } from '@/lib/types';
import { formatCurrency, formatPercentage } from '@/lib/utils';
import { useArbitrageScanner, useArbitrageExecution } from '@/lib/hooks/useArbitrageScanner';
import { useOrderNotifications } from '@/lib/hooks/useNotifications';

interface ArbitrageScannerProps {
  onExecute: (opportunity: ArbitrageOpportunity) => void;
}

export function ArbitrageScanner({ onExecute }: ArbitrageScannerProps) {
  const { opportunities, loading, error, isScanning, lastScan, scan } = useArbitrageScanner();
  const { executing, execute } = useArbitrageExecution();
  const { notifyArbitrageExecuted, notifyTransactionFailed } = useOrderNotifications();
  const [executingOpportunity, setExecutingOpportunity] = useState<string | null>(null);

  const handleExecuteArbitrage = async (opportunity: ArbitrageOpportunity) => {
    setExecutingOpportunity(opportunity.id);

    try {
      // In a real app, get user address from wallet
      const mockUserAddress = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';
      const result = await execute(opportunity, mockUserAddress);

      if (result.success && result.txHash) {
        notifyArbitrageExecuted(opportunity.profitPotential, opportunity.token.symbol);
        onExecute(opportunity);
      } else {
        notifyTransactionFailed('Arbitrage execution failed');
      }
    } catch (err) {
      notifyTransactionFailed(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setExecutingOpportunity(null);
    }
  };

  useEffect(() => {
    // Initial scan
    scan();
  }, [scan]);

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'high': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'low': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getConfidenceIcon = (confidence: string) => {
    switch (confidence) {
      case 'high': return CheckCircle;
      case 'medium': return AlertCircle;
      case 'low': return Clock;
      default: return AlertCircle;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gradient">Arbitrage Scanner</h2>
          <p className="text-text-secondary mt-1">
            Real-time arbitrage opportunities across Base DEXs
          </p>
        </div>
        
        <button
          onClick={scanForOpportunities}
          disabled={isScanning}
          className="btn-secondary flex items-center space-x-2 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
          <span>{isScanning ? 'Scanning...' : 'Refresh'}</span>
        </button>
      </div>

      {/* Scan Status */}
      <div className="glass-card p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${
              isScanning ? 'bg-yellow-400 animate-pulse' :
              error ? 'bg-red-400' :
              'bg-green-400'
            }`}></div>
            <span className="text-sm font-medium">
              {isScanning ? 'Scanning for opportunities...' :
               error ? 'Scan failed' :
               `${opportunities.length} opportunities found`}
            </span>
          </div>
          {lastScan && !error && (
            <span className="text-sm text-text-secondary">
              Last scan: {lastScan.toLocaleTimeString()}
            </span>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="mt-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span className="text-sm text-red-400">{error}</span>
            </div>
          </div>
        )}
      </div>

      {/* Opportunities List */}
      <div className="space-y-4">
        {opportunities.length === 0 && !isScanning ? (
          <div className="text-center py-12">
            <TrendingUp className="w-12 h-12 text-text-secondary mx-auto mb-4" />
            <h3 className="text-lg font-medium text-text-secondary mb-2">No opportunities found</h3>
            <p className="text-text-secondary">
              We'll keep scanning for profitable arbitrage opportunities.
            </p>
          </div>
        ) : (
          opportunities.map((opportunity) => {
            const ConfidenceIcon = getConfidenceIcon(opportunity.confidence);
            
            return (
              <div key={opportunity.id} className="trading-card hover:border-accent/50 transition-all duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-accent to-yellow-500 rounded-full flex items-center justify-center">
                      <span className="font-bold text-black">
                        {opportunity.token.symbol.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{opportunity.token.symbol}</h3>
                      <p className="text-sm text-text-secondary">{opportunity.token.name}</p>
                    </div>
                  </div>
                  
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded border text-xs font-medium ${getConfidenceColor(opportunity.confidence)}`}>
                    <ConfidenceIcon className="w-3 h-3" />
                    <span className="capitalize">{opportunity.confidence}</span>
                  </div>
                </div>

                {/* Trade Route */}
                <div className="flex items-center justify-between mb-4 p-3 bg-surface/50 rounded-lg">
                  <div className="text-center">
                    <div className="text-sm text-text-secondary">Buy on</div>
                    <div className="font-medium">{opportunity.buyExchange}</div>
                    <div className="text-sm text-green-400">${opportunity.buyPrice}</div>
                  </div>
                  
                  <ArrowRight className="w-5 h-5 text-accent" />
                  
                  <div className="text-center">
                    <div className="text-sm text-text-secondary">Sell on</div>
                    <div className="font-medium">{opportunity.sellExchange}</div>
                    <div className="text-sm text-red-400">${opportunity.sellPrice}</div>
                  </div>
                </div>

                {/* Profit Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-sm text-text-secondary">Profit</div>
                    <div className="font-semibold text-green-400">
                      {formatCurrency(opportunity.profitPotential)}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-text-secondary">ROI</div>
                    <div className="font-semibold text-green-400">
                      {formatPercentage(opportunity.profitPercentage)}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-text-secondary">Capital</div>
                    <div className="font-semibold">
                      {formatCurrency(opportunity.requiredCapital)}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-text-secondary">Gas</div>
                    <div className="font-semibold">
                      {opportunity.gasEstimate} ETH
                    </div>
                  </div>
                </div>

                {/* Execute Button */}
                <button
                  onClick={() => handleExecuteArbitrage(opportunity)}
                  disabled={executing && executingOpportunity === opportunity.id}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <Zap className="w-4 h-4" />
                  <span>
                    {executing && executingOpportunity === opportunity.id
                      ? 'Executing...'
                      : 'Execute Arbitrage'
                    }
                  </span>
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
