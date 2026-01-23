import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook to debounce a value
 * @param {*} value - The value to debounce
 * @param {number} delay - The delay in milliseconds (default: 300ms)
 * @returns {*} The debounced value
 */
export const useDebounce = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timerId);
    };
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Custom hook to debounce a function call
 * @param {Function} callback - The function to debounce
 * @param {number} delay - The delay in milliseconds (default: 300ms)
 * @returns {Function} The debounced function
 */
export const useDebouncedCallback = (callback, delay = 300) => {
  const [timeoutId, setTimeoutId] = useState(null);

  const debouncedCallback = useCallback(
    (...args) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      const newTimeoutId = setTimeout(() => {
        callback(...args);
      }, delay);

      setTimeoutId(newTimeoutId);
    },
    [callback, delay, timeoutId]
  );

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return debouncedCallback;
};

/**
 * Custom hook to debounce a function with leading and trailing edge execution
 * @param {Function} callback - The function to debounce
 * @param {number} delay - The delay in milliseconds (default: 300ms)
 * @param {Object} options - Options for leading/trailing edge
 * @param {boolean} options.leading - Execute on leading edge (default: false)
 * @param {boolean} options.trailing - Execute on trailing edge (default: true)
 * @returns {Function} The debounced function
 */
export const useDebouncedCallbackAdvanced = (callback, delay = 300, options = {}) => {
  const { leading = false, trailing = true } = options;
  const [timeoutId, setTimeoutId] = useState(null);
  const [lastCallTime, setLastCallTime] = useState(null);

  const debouncedCallback = useCallback(
    (...args) => {
      const now = Date.now();

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      const executeCallback = () => {
        if (trailing || (leading && now - lastCallTime >= delay)) {
          callback(...args);
        }
        setTimeoutId(null);
        setLastCallTime(now);
      };

      if (leading && !timeoutId) {
        executeCallback();
      }

      const newTimeoutId = setTimeout(executeCallback, delay);
      setTimeoutId(newTimeoutId);
    },
    [callback, delay, leading, trailing, timeoutId, lastCallTime]
  );

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return debouncedCallback;
};

/**
 * Custom hook to throttle a value
 * @param {*} value - The value to throttle
 * @param {number} limit - The limit in milliseconds (default: 300ms)
 * @returns {*} The throttled value
 */
export const useThrottle = (value, limit = 300) => {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastUpdatedRef = useRef(0);

  useEffect(() => {
    const now = Date.now();

    if (now - lastUpdatedRef.current >= limit) {
      setThrottledValue(value);
      lastUpdatedRef.current = now;
    }
  }, [value, limit]);

  return throttledValue;
};

/**
 * Custom hook to throttle a callback function
 * @param {Function} callback - The function to throttle
 * @param {number} limit - The limit in milliseconds (default: 300ms)
 * @returns {Function} The throttled function
 */
export const useThrottledCallback = (callback, limit = 300) => {
  const [lastCallTime, setLastCallTime] = useState(null);

  const throttledCallback = useCallback(
    (...args) => {
      const now = Date.now();

      if (!lastCallTime || now - lastCallTime >= limit) {
        callback(...args);
        setLastCallTime(now);
      }
    },
    [callback, limit, lastCallTime]
  );

  return throttledCallback;
};

export default {
  useDebounce,
  useDebouncedCallback,
  useDebouncedCallbackAdvanced,
  useThrottle,
  useThrottledCallback
};

