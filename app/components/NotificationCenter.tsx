'use client';

import { useState } from 'react';
import {
  Bell,
  X,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Info,
  Check
} from 'lucide-react';
import { useNotifications } from '@/lib/hooks/useNotifications';

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification } = useNotifications();

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return CheckCircle;
      case 'error': return AlertCircle;
      case 'warning': return AlertTriangle;
      case 'info': return Info;
      default: return Info;
    }
  };

  const getColorClasses = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-green-500/30 bg-green-500/10 text-green-400';
      case 'error':
        return 'border-red-500/30 bg-red-500/10 text-red-400';
      case 'warning':
        return 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400';
      case 'info':
        return 'border-blue-500/30 bg-blue-500/10 text-blue-400';
      default:
        return 'border-gray-500/30 bg-gray-500/10 text-gray-400';
    }
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg bg-surface border border-gray-600 hover:border-accent/50 transition-all duration-200"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-black">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          </div>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-96 glass-card border border-gray-600 rounded-lg shadow-xl z-50 max-h-96 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-600">
            <h3 className="font-semibold">Notifications</h3>
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-accent hover:text-accent/80 transition-colors duration-200"
                >
                  Mark all read
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-surface rounded transition-colors duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="w-8 h-8 text-text-secondary mx-auto mb-2" />
                <p className="text-sm text-text-secondary">No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification) => {
                const Icon = getIcon(notification.type);

                return (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-gray-700/50 hover:bg-surface/50 transition-all duration-200 ${
                      !notification.read ? 'bg-accent/5 border-l-4 border-l-accent' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg border ${getColorClasses(notification.type)}`}>
                        <Icon className="w-4 h-4" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{notification.title}</h4>
                            <p className="text-sm text-text-secondary mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-text-secondary mt-2">
                              {notification.timestamp.toLocaleTimeString()}
                            </p>
                          </div>

                          <div className="flex items-center space-x-1 ml-2">
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="p-1 hover:bg-surface rounded transition-colors duration-200"
                                title="Mark as read"
                              >
                                <Check className="w-3 h-3" />
                              </button>
                            )}
                            <button
                              onClick={() => removeNotification(notification.id)}
                              className="p-1 hover:bg-surface rounded transition-colors duration-200"
                              title="Remove"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {notification.action && (
                          <button
                            onClick={notification.action.onClick}
                            className="mt-2 text-xs text-accent hover:text-accent/80 transition-colors duration-200"
                          >
                            {notification.action.label}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

