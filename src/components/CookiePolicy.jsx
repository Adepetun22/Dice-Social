import React, { useState, useEffect } from 'react';

const CookiePolicy = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cookieAccepted = localStorage.getItem('cookieAccepted');
    if (!cookieAccepted) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieAccepted', 'true');
    setIsVisible(false);
  };

  const handleCancel = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm z-50 animate-slide-up">
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-gray-800 mb-2">Cookie Policy</h3>
        <p className="text-xs text-gray-600">
          We use cookies to enhance your experience and analyze site usage. By continuing, you agree to our cookie policy.
        </p>
      </div>
      <div className="flex gap-2 justify-end">
        <button
          onClick={handleCancel}
          className="px-3 py-1.5 text-xs border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
        >
          Reject
        </button>
        <button
          onClick={handleAccept}
          className="px-3 py-1.5 text-xs rounded transition-colors"
          style={{
            backgroundColor: 'rgb(255, 215, 0)',
            color: 'rgb(55, 65, 81)'
          }}
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default CookiePolicy;