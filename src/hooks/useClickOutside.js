import { useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook to detect clicks outside of a referenced element
 * @param {Function} callback - Callback function to execute when clicking outside
 * @returns {Object} ref to attach to the target element
 */
export const useClickOutside = (callback) => {
  const ref = useRef(null);
  const callbackRef = useRef(callback);

  // Keep callback ref updated to avoid stale closures
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callbackRef.current(event);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  return ref;
};

/**
 * Custom hook to detect clicks outside of multiple referenced elements
 * @param {Function} callback - Callback function to execute when clicking outside
 * @returns {Array} Array of refs to attach to target elements
 */
export const useClickOutsideMultiple = (callback) => {
  const refs = useRef([]);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const allRefs = refs.current;
      const clickedOutsideAll = allRefs.every(
        (ref) => ref && !ref.contains(event.target)
      );

      if (clickedOutsideAll && allRefs.some((ref) => ref !== null)) {
        callbackRef.current(event);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const setRef = useCallback((element, index) => {
    refs.current[index] = element;
  }, []);

  return [setRef];
};

/**
 * Hook factory for creating click-outside detection with specific configurations
 * @param {Object} options - Configuration options
 * @param {boolean} options.touch - Enable touch event detection (default: true)
 * @param {boolean} options.mouse - Enable mouse event detection (default: true)
 * @returns {Function} Hook creator function
 */
export const createClickOutsideHook = (options = {}) => {
  const { touch = true, mouse = true } = options;

  return (callback) => {
    const ref = useRef(null);
    const callbackRef = useRef(callback);

    useEffect(() => {
      callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          callbackRef.current(event);
        }
      };

      if (mouse) {
        document.addEventListener('mousedown', handleClickOutside);
      }
      if (touch) {
        document.addEventListener('touchstart', handleClickOutside);
      }

      return () => {
        if (mouse) {
          document.removeEventListener('mousedown', handleClickOutside);
        }
        if (touch) {
          document.removeEventListener('touchstart', handleClickOutside);
        }
      };
    }, [mouse, touch]);

    return ref;
  };
};

export default {
  useClickOutside,
  useClickOutsideMultiple,
  createClickOutsideHook
};

