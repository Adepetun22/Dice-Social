/**
 * Utility functions for date and time formatting
 */

/**
 * Format a timestamp into a human-readable relative time string
 * @param {string | number | Date} timestamp - The timestamp to format
 * @returns {string} Formatted relative time string
 */
export const formatTimestamp = (timestamp) => {
  if (!timestamp) return "Just now";
  const date = new Date(timestamp);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
};

/**
 * Format a date to a specific format
 * @param {string | number | Date} date - The date to format
 * @param {string} format - The output format (default: 'YYYY-MM-DD')
 * @returns {string} Formatted date string
 */
export const formatDate = (date, format = 'YYYY-MM-DD') => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');

  switch (format) {
    case 'YYYY-MM-DD':
      return `${year}-${month}-${day}`;
    case 'DD/MM/YYYY':
      return `${day}/${month}/${year}`;
    case 'MM/DD/YYYY':
      return `${month}/${day}/${year}`;
    case 'HH:mm':
      return `${hours}:${minutes}`;
    case 'YYYY-MM-DD HH:mm:ss':
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    default:
      return `${year}-${month}-${day}`;
  }
};

/**
 * Get a formatted time ago string (alternative implementation)
 * @param {string | number | Date} date - The date to compare
 * @returns {string} Formatted relative time string
 */
export const timeAgo = (date) => {
  const now = new Date();
  const targetDate = new Date(date);
  const diffInMs = now - targetDate;
  const diffInSec = Math.floor(diffInMs / 1000);
  const diffInMin = Math.floor(diffInSec / 60);
  const diffInHour = Math.floor(diffInMin / 60);
  const diffInDay = Math.floor(diffInHour / 24);
  const diffInWeek = Math.floor(diffInDay / 7);
  const diffInMonth = Math.floor(diffInDay / 30);
  const diffInYear = Math.floor(diffInDay / 365);

  if (diffInSec < 60) return 'Just now';
  if (diffInMin < 60) return `${diffInMin} minute${diffInMin > 1 ? 's' : ''} ago`;
  if (diffInHour < 24) return `${diffInHour} hour${diffInHour > 1 ? 's' : ''} ago`;
  if (diffInDay < 7) return `${diffInDay} day${diffInDay > 1 ? 's' : ''} ago`;
  if (diffInWeek < 4) return `${diffInWeek} week${diffInWeek > 1 ? 's' : ''} ago`;
  if (diffInMonth < 12) return `${diffInMonth} month${diffInMonth > 1 ? 's' : ''} ago`;
  return `${diffInYear} year${diffInYear > 1 ? 's' : ''} ago`;
};

export default {
  formatTimestamp,
  formatDate,
  timeAgo
};

