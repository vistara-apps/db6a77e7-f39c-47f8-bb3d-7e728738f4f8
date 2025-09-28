'use client';

import { useState, useEffect } from 'react';
import { AppShell } from './components/AppShell';
import { TradeConfigForm } from './components/TradeConfigForm';
import { ArbitrageScanner } from './components/ArbitrageScanner';
import { OrdersManager } from './components/OrdersManager';
import { 
  TrendingUp, 
  ArrowLeftRight, 
  BarChart3, 
  Zap,
  DollarSign,
  Activity,
  Target
} from 'lucide-react';
import { TradeOrder, ArbitrageOpportunity } from '@/lib/types';
import { formatCurrency, formatPercentage } from '@/lib/utils';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('trading');
  const [orders, setOrders] = useState<TradeOrder[]>([]);
  const [totalProfit, setTotalProfit] = useState('1,234.56');
  const [activeOrders, setActiveOrders] = useState(3);
  const [successRate, setSuccessRate] = useState('94.2');

  const handleCreateOrder = (order: Partial<TradeOrder>) => {
    const newOrder: TradeOrder = {
      ...order,
      userId: 'current-user',
      orderId: order.orderId || Math.random().toString(36).substring(7),
      fromToken: order.fromToken || '',
      toToken: order.toToken || '',
      amount: order.amount || '0',
      orderType: order.orderType || 'limit',
      triggerPrice: order.triggerPrice || '0',
      status: order.status || 'active',
      createdAt: order.createdAt || new Date(),
      updatedAt: order.updatedAt || new Date(),
    };
    
    setOrders(prev => [newOrder, ...prev]);
    setActiveOrders(prev => prev + 1);
  };

  const handleExecuteArbitrage = (opportunity: ArbitrageOpportunity) => {
    // In a real app, this would execute the arbitrage trade
    console.log('Executing arbitrage:', opportunity);
    
    // Simulate successful execution
    setTimeout(() => {
      setTotalProfit(prev => {
        const current = parseFloat(prev.replace(',', ''));
        const profit = parseFloat(opportunity.profitPotential);
        return (current + profit).toLocaleString('en-US', { minimumFractionDigits: 2 });
      });
    }, 2000);
  };

  const handleCancelOrder = (orderId: string) => {
    setOrders(prev => prev.map(order => 
      order.orderId === orderId 
        ? { ...order, status: 'cancelled' as const, updatedAt: new Date() }
        : order
    ));
    setActiveOrders(prev => Math.max(0, prev - 1));
  };

  const handleEditOrder = (order: TradeOrder) => {
    // In a real app, this would open an edit modal
    console.log('Editing order:', order);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'trading':
        return (
          <div className="space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="metric-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-secondary text-sm">Total Profit</p>
                    <p className="text-2xl font-bold text-green-400">
                      {formatCurrency(totalProfit)}
                    </p>
                  </div>
                  <DollarSign className="w-8 h-8 text-accent" />
                </div>
              </div>
              
              <div className="metric-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-secondary text-sm">Active Orders</p>
                    <p className="text-2xl font-bold">{activeOrders}</p>
                  </div>
                  <Activity className="w-8 h-8 text-accent" />
                </div>
              </div>
              
              <div className="metric-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-secondary text-sm">Success Rate</p>
                    <p className="text-2xl font-bold text-green-400">
                      {formatPercentage(successRate)}
                    </p>
                  </div>
                  <Target className="w-8 h-8 text-accent" />
                </div>
              </div>
            </div>

            {/* Trading Form */}
            <div className="trading-card">
              <TradeConfigForm 
                variant="limitOrder" 
                onSubmit={handleCreateOrder}
              />
            </div>
          </div>
        );

      case 'arbitrage':
        return (
          <ArbitrageScanner onExecute={handleExecuteArbitrage} />
        );

      case 'orders':
        return (
          <OrdersManager 
            orders={orders}
            onCancelOrder={handleCancelOrder}
            onEditOrder={handleEditOrder}
          />
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gradient">Settings</h2>
              <p className="text-text-secondary mt-1">
                Configure your trading preferences and automation settings
              </p>
            </div>

            <div className="grid gap-6">
              {/* Gas Settings */}
              <div className="trading-card">
                <h3 className="text-lg font-semibold mb-4">Gas Optimization</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto Gas Optimization</p>
                      <p className="text-sm text-text-secondary">
                        Automatically adjust gas prices for optimal execution
                      </p>
                    </div>
                    <button className="w-12 h-6 bg-accent rounded-full relative">
                      <div className="w-5 h-5 bg-black rounded-full absolute right-0.5 top-0.5"></div>
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Max Gas Price</p>
                      <p className="text-sm text-text-secondary">
                        Maximum gas price for automatic execution
                      </p>
                    </div>
                    <input 
                      type="number" 
                      defaultValue="50"
                      className="w-20 input-field text-right"
                    />
                  </div>
                </div>
              </div>

              {/* Slippage Settings */}
              <div className="trading-card">
                <h3 className="text-lg font-semibold mb-4">Slippage Control</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Default Slippage</p>
                      <p className="text-sm text-text-secondary">
                        Default slippage tolerance for new orders
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="number" 
                        defaultValue="0.5"
                        step="0.1"
                        className="w-16 input-field text-right"
                      />
                      <span className="text-text-secondary">%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Dynamic Slippage</p>
                      <p className="text-sm text-text-secondary">
                        Adjust slippage based on market volatility
                      </p>
                    </div>
                    <button className="w-12 h-6 bg-surface border border-gray-600 rounded-full relative">
                      <div className="w-5 h-5 bg-gray-400 rounded-full absolute left-0.5 top-0.5"></div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Notification Settings */}
              <div className="trading-card">
                <h3 className="text-lg font-semibold mb-4">Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Order Execution</p>
                      <p className="text-sm text-text-secondary">
                        Notify when orders are executed
                      </p>
                    </div>
                    <button className="w-12 h-6 bg-accent rounded-full relative">
                      <div className="w-5 h-5 bg-black rounded-full absolute right-0.5 top-0.5"></div>
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Arbitrage Alerts</p>
                      <p className="text-sm text-text-secondary">
                        Alert for high-confidence arbitrage opportunities
                      </p>
                    </div>
                    <button className="w-12 h-6 bg-accent rounded-full relative">
                      <div className="w-5 h-5 bg-black rounded-full absolute right-0.5 top-0.5"></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AppShell>
      {/* Tab Navigation */}
      <div className="flex items-center space-x-1 mb-8 p-1 bg-surface rounded-lg border border-gray-600">
        {[
          { id: 'trading', label: 'Trading', icon: TrendingUp },
          { id: 'arbitrage', label: 'Arbitrage', icon: ArrowLeftRight },
          { id: 'orders', label: 'Orders', icon: BarChart3 },
          { id: 'settings', label: 'Settings', icon: Zap },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 flex-1 justify-center ${
                activeTab === tab.id
                  ? 'bg-accent text-black font-semibold'
                  : 'text-text-secondary hover:text-fg hover:bg-surface'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </AppShell>
  );
}
