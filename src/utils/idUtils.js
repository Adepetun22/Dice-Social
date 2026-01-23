/**
 * Utility functions for generating unique IDs
 */

/**
 * Generate a unique ID based on timestamp and random number
 * This is a pure function that can be called outside of render
 * @returns {string} A unique ID string
 */
export const generateUniqueId = () => {
  const timestamp = Date.now();
  const randomPart = Math.random().toString(36).substring(2, 11);
  return `${timestamp}-${randomPart}`;
};

/**
 * Generate a numeric unique ID (for backward compatibility)
 * @returns {number} A unique numeric ID
 */
export const generateNumericId = () => {
  return Date.now();
};

/**
 * Generate a short unique ID for smaller contexts
 * @returns {string} A short unique ID string
 */
export const generateShortId = () => {
  return Math.random().toString(36).substring(2, 9);
};

/**
 * Generate a UUID v4 compliant ID
 * @returns {string} A UUID v4 string
 */
export const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export default {
  generateUniqueId,
  generateNumericId,
  generateShortId,
  generateUUID
};

