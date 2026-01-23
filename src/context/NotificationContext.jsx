import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const NotificationContext = createContext(null);

/**
 * Notification types
 */
export const NotificationType = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

/**
 * Notification Provider Component
 * Manages global notifications and toast messages
 */
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [toasts, setToasts] = useState([]);
  const timeoutsRef = useRef({});

  // Remove a notification helper
  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    // Clear associated timeout
    if (timeoutsRef.current[id]) {
      clearTimeout(timeoutsRef.current[id]);
      delete timeoutsRef.current[id];
    }
  }, []);

  // Add a notification to the list
  const addNotification = useCallback((message, type = NotificationType.INFO, duration = 5000) => {
    const id = Date.now() + Math.random();
    const notification = { id, message, type, timestamp: new Date() };
    
    setNotifications((prev) => [...prev, notification]);
    
    // Auto-remove notification after duration
    if (duration > 0) {
      timeoutsRef.current[id] = setTimeout(() => {
        removeNotification(id);
      }, duration);
    }

    return id;
  }, [removeNotification]);

  // Show success toast
  const success = useCallback((message, duration) => {
    return addNotification(message, NotificationType.SUCCESS, duration);
  }, [addNotification]);

  // Show error toast
  const error = useCallback((message, duration) => {
    return addNotification(message, NotificationType.ERROR, duration);
  }, [addNotification]);

  // Show warning toast
  const warning = useCallback((message, duration) => {
    return addNotification(message, NotificationType.WARNING, duration);
  }, [addNotification]);

  // Show info toast
  const info = useCallback((message, duration) => {
    return addNotification(message, NotificationType.INFO, duration);
  }, [addNotification]);

  // Clear all notifications
  const clearAll = useCallback(() => {
    // Clear all timeouts
    Object.values(timeoutsRef.current).forEach((timeoutId) => {
      clearTimeout(timeoutId);
    });
    timeoutsRef.current = {};
    setNotifications([]);
    setToasts([]);
  }, []);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      Object.values(timeoutsRef.current).forEach((timeoutId) => {
        clearTimeout(timeoutId);
      });
    };
  }, []);

  const value = {
    notifications,
    toasts,
    addNotification,
    removeNotification,
    success,
    error,
    warning,
    info,
    clearAll,
    NotificationType,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * Custom hook to use notification context
 * @returns {Object} Notification context value
 */
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

/**
 * Custom hook specifically for toast notifications
 * @returns {Object} Toast-specific methods
 */
export const useToast = () => {
  const { success, error, warning, info, clearAll } = useNotification();
  return { success, error, warning, info, clearAll };
};

export default NotificationContext;

