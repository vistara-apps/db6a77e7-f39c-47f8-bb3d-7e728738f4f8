'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { BASE_TOKENS } from '@/lib/constants';
import { Token } from '@/lib/types';
import { formatToken } from '@/lib/utils';

interface TokenInputProps {
  label: string;
  token: Token | null;
  amount: string;
  onTokenSelect: (token: Token) => void;
  onAmountChange: (amount: string) => void;
  balance?: string;
  disabled?: boolean;
  showMaxButton?: boolean;
}

export function TokenInput({
  label,
  token,
  amount,
  onTokenSelect,
  onAmountChange,
  balance,
  disabled = false,
  showMaxButton = false
}: TokenInputProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredTokens = BASE_TOKENS.filter(t =>
    t.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMaxClick = () => {
    if (balance) {
      onAmountChange(balance);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-text-secondary">{label}</label>
        {balance && (
          <span className="text-sm text-text-secondary">
            Balance: {formatToken(balance)}
          </span>
        )}
      </div>

      <div className="trading-card">
        <div className="flex items-center space-x-3">
          {/* Token Selector */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              disabled={disabled}
              className="flex items-center space-x-2 bg-surface border border-gray-600 rounded-lg px-3 py-2 hover:border-accent/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {token ? (
                <>
                  <div className="w-6 h-6 bg-gradient-to-r from-accent to-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-black">
                      {token.symbol.charAt(0)}
                    </span>
                  </div>
                  <span className="font-medium">{token.symbol}</span>
                </>
              ) : (
                <span className="text-text-secondary">Select Token</span>
              )}
              <ChevronDown className="w-4 h-4 text-text-secondary" />
            </button>

            {/* Dropdown */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-80 glass-card border border-gray-600 rounded-lg shadow-xl z-50">
                <div className="p-3 border-b border-gray-600">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
                    <input
                      type="text"
                      placeholder="Search tokens..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-surface border border-gray-600 rounded-lg text-sm focus:border-accent focus:ring-2 focus:ring-accent/20"
                    />
                  </div>
                </div>

                <div className="max-h-60 overflow-y-auto">
                  {filteredTokens.map((t) => (
                    <button
                      key={t.address}
                      onClick={() => {
                        onTokenSelect(t);
                        setIsDropdownOpen(false);
                        setSearchQuery('');
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-surface transition-all duration-200"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-accent to-yellow-500 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-black">
                          {t.symbol.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-medium">{t.symbol}</div>
                        <div className="text-sm text-text-secondary">{t.name}</div>
                      </div>
                      {t.price && (
                        <div className="text-sm text-text-secondary">
                          ${formatToken(t.price)}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Amount Input */}
          <div className="flex-1">
            <input
              type="number"
              placeholder="0.0"
              value={amount}
              onChange={(e) => onAmountChange(e.target.value)}
              disabled={disabled}
              className="w-full bg-transparent text-right text-2xl font-semibold placeholder-gray-500 focus:outline-none disabled:opacity-50"
            />
          </div>

          {/* Max Button */}
          {showMaxButton && balance && (
            <button
              onClick={handleMaxClick}
              disabled={disabled}
              className="px-3 py-1 bg-accent/20 text-accent text-sm font-medium rounded border border-accent/30 hover:bg-accent/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              MAX
            </button>
          )}
        </div>

        {/* USD Value */}
        {token && amount && token.price && (
          <div className="mt-2 text-right text-sm text-text-secondary">
            ≈ ${formatToken(parseFloat(amount) * parseFloat(token.price))}
          </div>
        )}
      </div>
    </div>
  );
}
