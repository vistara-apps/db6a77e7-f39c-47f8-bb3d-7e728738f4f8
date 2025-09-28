'use client';

import { useState } from 'react';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  MoreVertical, 
  Edit3, 
  Trash2,
  ArrowUpDown
} from 'lucide-react';
import { TradeOrder } from '@/lib/types';
import { formatCurrency, formatToken } from '@/lib/utils';

interface OrdersManagerProps {
  orders: TradeOrder[];
  onCancelOrder: (orderId: string) => void;
  onEditOrder: (order: TradeOrder) => void;
}

export function OrdersManager({ orders, onCancelOrder, onEditOrder }: OrdersManagerProps) {
  const [filter, setFilter] = useState<'all' | 'active' | 'filled' | 'cancelled'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'status'>('date');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Mock orders for demonstration
  const mockOrders: TradeOrder[] = [
    {
      orderId: '1',
      userId: 'user1',
      fromToken: 'WETH',
      toToken: 'USDC',
      amount: '1.5',
      orderType: 'limit',
      triggerPrice: '2500.00',
      status: 'active',
      createdAt: new Date('2024-01-15T10:30:00'),
      updatedAt: new Date('2024-01-15T10:30:00')
    },
    {
      orderId: '2',
      userId: 'user1',
      fromToken: 'USDC',
      toToken: 'DAI',
      amount: '1000',
      orderType: 'limit',
      triggerPrice: '1.001',
      status: 'filled',
      createdAt: new Date('2024-01-14T15:45:00'),
      updatedAt: new Date('2024-01-14T16:12:00')
    },
    {
      orderId: '3',
      userId: 'user1',
      fromToken: 'DAI',
      toToken: 'WETH',
      amount: '5000',
      orderType: 'stop-loss',
      triggerPrice: '0.0004',
      status: 'cancelled',
      createdAt: new Date('2024-01-13T09:15:00'),
      updatedAt: new Date('2024-01-13T14:22:00')
    }
  ];

  const allOrders = orders.length > 0 ? orders : mockOrders;

  const filteredOrders = allOrders.filter(order => {
    if (filter === 'all') return true;
    return order.status === filter;
  });

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'amount':
        return parseFloat(b.amount) - parseFloat(a.amount);
      case 'status':
        return a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return Clock;
      case 'filled': return CheckCircle;
      case 'cancelled': return XCircle;
      default: return Clock;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'status-active';
      case 'filled': return 'status-filled';
      case 'cancelled': return 'text-red-400 bg-red-500/20 border border-red-500/30';
      default: return 'status-pending';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gradient">Order Management</h2>
        <p className="text-text-secondary mt-1">
          Track and manage your automated trading orders
        </p>
      </div>

      {/* Filters and Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-text-secondary">Filter:</span>
          {(['all', 'active', 'filled', 'cancelled'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1 rounded text-sm font-medium transition-all duration-200 capitalize ${
                filter === status
                  ? 'bg-accent/20 text-accent border border-accent/30'
                  : 'bg-surface text-text-secondary border border-gray-600 hover:border-accent/50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-text-secondary">Sort by:</span>
          <button
            onClick={() => setSortBy(sortBy === 'date' ? 'amount' : sortBy === 'amount' ? 'status' : 'date')}
            className="flex items-center space-x-1 px-3 py-1 bg-surface border border-gray-600 rounded text-sm hover:border-accent/50 transition-all duration-200"
          >
            <ArrowUpDown className="w-3 h-3" />
            <span className="capitalize">{sortBy}</span>
          </button>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {sortedOrders.length === 0 ? (
          <div className="text-center py-12">
            <Clock className="w-12 h-12 text-text-secondary mx-auto mb-4" />
            <h3 className="text-lg font-medium text-text-secondary mb-2">No orders found</h3>
            <p className="text-text-secondary">
              {filter === 'all' 
                ? "You haven't created any orders yet."
                : `No ${filter} orders found.`
              }
            </p>
          </div>
        ) : (
          sortedOrders.map((order) => {
            const StatusIcon = getStatusIcon(order.status);
            
            return (
              <div key={order.orderId} className="trading-card">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-accent to-yellow-500 rounded-full flex items-center justify-center">
                      <ArrowUpDown className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <h3 className="font-semibold">
                        {order.fromToken} → {order.toToken}
                      </h3>
                      <p className="text-sm text-text-secondary capitalize">
                        {order.orderType} Order
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded text-xs font-medium ${getStatusColor(order.status)}`}>
                      <StatusIcon className="w-3 h-3" />
                      <span className="capitalize">{order.status}</span>
                    </div>
                    
                    {order.status === 'active' && (
                      <div className="relative">
                        <button
                          onClick={() => setActiveDropdown(activeDropdown === order.orderId ? null : order.orderId)}
                          className="p-1 hover:bg-surface rounded transition-colors duration-200"
                        >
                          <MoreVertical className="w-4 h-4 text-text-secondary" />
                        </button>
                        
                        {activeDropdown === order.orderId && (
                          <div className="absolute right-0 top-full mt-1 w-32 glass-card border border-gray-600 rounded-lg shadow-xl z-10">
                            <button
                              onClick={() => {
                                onEditOrder(order);
                                setActiveDropdown(null);
                              }}
                              className="w-full flex items-center space-x-2 px-3 py-2 text-sm hover:bg-surface transition-colors duration-200"
                            >
                              <Edit3 className="w-3 h-3" />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => {
                                onCancelOrder(order.orderId);
                                setActiveDropdown(null);
                              }}
                              className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors duration-200"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Cancel</span>
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Order Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-text-secondary">Amount</div>
                    <div className="font-semibold">
                      {formatToken(order.amount)} {order.fromToken}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-text-secondary">
                      {order.orderType === 'limit' ? 'Target Price' : 'Stop Price'}
                    </div>
                    <div className="font-semibold">
                      {formatToken(order.triggerPrice)} {order.toToken}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-text-secondary">Created</div>
                    <div className="font-semibold">
                      {order.createdAt.toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-text-secondary">Updated</div>
                    <div className="font-semibold">
                      {order.updatedAt.toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {/* Progress Bar for Active Orders */}
                {order.status === 'active' && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Progress to trigger</span>
                      <span className="text-accent">67%</span>
                    </div>
                    <div className="w-full bg-surface rounded-full h-2">
                      <div className="bg-gradient-to-r from-accent to-yellow-500 h-2 rounded-full" style={{ width: '67%' }}></div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
