import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

const UserContext = createContext(null);

/**
 * User Provider Component
 * Manages user authentication state and user data
 */
export const UserProvider = ({ children, initialUser = null }) => {
  const [user, setUser] = useState(initialUser);
  const [isAuthenticated, setIsAuthenticated] = useState(!!initialUser);
  const [loading, setLoading] = useState(false);

  // Login function
  const login = useCallback((userData) => {
    setLoading(true);
    try {
      setUser(userData);
      setIsAuthenticated(true);
      // Store user in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(userData));
    } finally {
      setLoading(false);
    }
  }, []);

  // Logout function
  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  }, []);

  // Update user data
  const updateUser = useCallback((updates) => {
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, ...updates };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  }, []);

  // Check for existing session on mount
  useEffect(() => {
    if (!initialUser) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Error parsing stored user:', error);
          localStorage.removeItem('user');
        }
      }
    }
  }, [initialUser]);

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    updateUser,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
  initialUser: PropTypes.object,
};

/**
 * Custom hook to use user context
 * @returns {Object} User context value
 */
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

/**
 * Custom hook to get current user
 * @returns {Object|null} Current user or null
 */
export const useCurrentUser = () => {
  const { user, isAuthenticated } = useUser();
  return isAuthenticated ? user : null;
};

export default UserContext;

