'use client';

import { useTheme } from '../components/ThemeProvider';
import { AppShell } from '../components/AppShell';
import { TokenInput } from '../components/TokenInput';
import { BASE_TOKENS } from '@/lib/constants';
import { useState } from 'react';

export default function ThemePreviewPage() {
  const { theme, setTheme } = useTheme();
  const [selectedToken, setSelectedToken] = useState(BASE_TOKENS[0]);
  const [amount, setAmount] = useState('100');

  const themes = [
    { id: 'default', name: 'Professional Finance', description: 'Wall Street meets crypto' },
    { id: 'celo', name: 'CELO', description: 'Black & gold theme' },
    { id: 'solana', name: 'SOLANA', description: 'Purple gradient theme' },
    { id: 'base', name: 'BASE', description: 'Base blue theme' },
    { id: 'coinbase', name: 'COINBASE', description: 'Coinbase navy theme' },
  ] as const;

  return (
    <AppShell variant="compact">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Theme Preview</h1>
          <p className="text-text-secondary mt-2">
            Preview different blockchain themes for BaseSwap Scout
          </p>
        </div>

        {/* Theme Selector */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                theme === t.id
                  ? 'border-accent bg-accent/10'
                  : 'border-gray-600 hover:border-accent/50'
              }`}
            >
              <h3 className="font-semibold">{t.name}</h3>
              <p className="text-sm text-text-secondary mt-1">{t.description}</p>
            </button>
          ))}
        </div>

        {/* Component Previews */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Component Preview</h2>
          
          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="metric-card">
              <h3 className="font-semibold mb-2">Metric Card</h3>
              <p className="text-2xl font-bold text-green-400">$1,234.56</p>
              <p className="text-sm text-text-secondary">Total Profit</p>
            </div>
            
            <div className="trading-card">
              <h3 className="font-semibold mb-2">Trading Card</h3>
              <p className="text-text-secondary">Interactive trading interface</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-4">
            <h3 className="font-semibold">Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <button className="btn-primary">Primary Button</button>
              <button className="btn-secondary">Secondary Button</button>
              <button className="px-4 py-2 bg-green-500/20 text-green-400 border border-green-500/30 rounded-lg">
                Success Button
              </button>
              <button className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg">
                Danger Button
              </button>
            </div>
          </div>

          {/* Token Input */}
          <div className="space-y-4">
            <h3 className="font-semibold">Token Input</h3>
            <TokenInput
              label="From Token"
              token={selectedToken}
              amount={amount}
              onTokenSelect={setSelectedToken}
              onAmountChange={setAmount}
              balance="1,234.56"
              showMaxButton
            />
          </div>

          {/* Status Indicators */}
          <div className="space-y-4">
            <h3 className="font-semibold">Status Indicators</h3>
            <div className="flex flex-wrap gap-4">
              <div className="status-active px-3 py-1 rounded text-sm">Active</div>
              <div className="status-pending px-3 py-1 rounded text-sm">Pending</div>
              <div className="status-filled px-3 py-1 rounded text-sm">Filled</div>
            </div>
          </div>

          {/* Typography */}
          <div className="space-y-4">
            <h3 className="font-semibold">Typography</h3>
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-gradient">Display Text</h1>
              <h2 className="text-2xl font-semibold">Heading Text</h2>
              <p className="text-base">Body text with normal weight</p>
              <p className="text-sm text-text-secondary">Secondary text</p>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
