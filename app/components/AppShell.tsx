'use client';

import { useState } from 'react';
import { 
  TrendingUp, 
  ArrowLeftRight, 
  Search, 
  Settings2, 
  Menu, 
  X,
  Wallet,
  BarChart3
} from 'lucide-react';
import { ConnectWallet } from '@coinbase/onchainkit/wallet';
import { Name, Avatar } from '@coinbase/onchainkit/identity';

interface AppShellProps {
  children: React.ReactNode;
  variant?: 'default' | 'compact';
}

export function AppShell({ children, variant = 'default' }: AppShellProps) {
  const [activeTab, setActiveTab] = useState('trading');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { id: 'trading', label: 'Trading', icon: TrendingUp },
    { id: 'arbitrage', label: 'Arbitrage', icon: ArrowLeftRight },
    { id: 'orders', label: 'Orders', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings2 },
  ];

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="glass-card border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-screen-lg mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-accent to-yellow-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-black" />
              </div>
              <h1 className="text-xl font-bold text-gradient">BaseSwap Scout</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      activeTab === item.id
                        ? 'bg-accent/20 text-accent border border-accent/30'
                        : 'text-text-secondary hover:text-fg hover:bg-surface'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Wallet Connection */}
            <div className="flex items-center space-x-3">
              <ConnectWallet>
                <div className="flex items-center space-x-2 bg-surface border border-gray-600 rounded-lg px-3 py-2 hover:border-accent/50 transition-all duration-200">
                  <Wallet className="w-4 h-4" />
                  <div className="hidden sm:flex items-center space-x-2">
                    <Avatar className="w-6 h-6" />
                    <Name className="text-sm font-medium" />
                  </div>
                </div>
              </ConnectWallet>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg bg-surface border border-gray-600 hover:border-accent/50 transition-all duration-200"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-700 py-4">
              <nav className="grid grid-cols-2 gap-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 ${
                        activeTab === item.id
                          ? 'bg-accent/20 text-accent border border-accent/30'
                          : 'text-text-secondary hover:text-fg hover:bg-surface'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className={`max-w-screen-lg mx-auto px-4 ${variant === 'compact' ? 'py-4' : 'py-8'}`}>
        {children}
      </main>

      {/* Status Bar */}
      <div className="fixed bottom-0 left-0 right-0 glass-card border-t border-gray-700 p-4 md:hidden">
        <div className="flex items-center justify-between text-sm text-text-secondary">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Base Network</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>Gas: 12 gwei</span>
            <span>Block: 8,234,567</span>
          </div>
        </div>
      </div>
    </div>
  );
}
