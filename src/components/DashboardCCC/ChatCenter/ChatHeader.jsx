import React, { useState, useRef, useEffect } from 'react';
import HeaderOption from './ChatOption/HeaderOption';

const ChatHeader = ({ onBack, userName = "Savannah Nguyen", online = true, memberType = "Personal Customer" }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="frame-2147224237 flex justify-between items-center p-4 border-b border-gray-200">
      <div className="frame-2147224877 flex items-center">
        <svg 
          className="arrow-down-2 w-5 h-5 mr-4 cursor-pointer" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          onClick={onBack}
        >
          <path 
            d="M19 12H5M12 19L5 12L12 5" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
        <div className="container10 flex items-center relative">
          <div className="link-view-christian-nwabueze-s-graphic-link-margin">
            <div className="link-view-christian-nwabueze-s-graphic-link">
              <div className="container relative">
                <div className="view-christian-nwabueze-s-graphic-link bg-gray-200 rounded-xl w-12 h-12 flex items-center justify-center">
                  <img className="w-12 h-12 rounded-xl object-cover" src="https://picsum.photos/seed/savannah/200/200.jpg" alt={userName} />
                </div>
                <div className="ellipse-16813 absolute w-3 h-3 bg-green-500 rounded-full" style={{ bottom: '0px', right: '0px' }}></div>
              </div>
            </div>
          </div>
          <div className="margin2 ml-3">
            <div className="container11">
              <div className="container">
                <div className="container2">
                  <div className="savannah-nguyen font-medium">{userName}</div>
                </div>
                <div className="text-xs text-gray-500">{memberType}</div>
              </div>
              <div className="frame-2147224224">
                <div className="container8">
                  <div className="online text-xs text-green-500">
                    {online ? 'Online' : 'Offline'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="frame-21472242372 relative" ref={dropdownRef}>
        <button 
          className="dots-three-outline-vertical w-5 h-5 cursor-pointer" 
          style={{ background: 'none', border: 'none', padding: '0px' }}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="6" r="1" fill="currentColor" />
            <circle cx="12" cy="12" r="1" fill="currentColor" />
            <circle cx="12" cy="18" r="1" fill="currentColor" />
          </svg>
        </button>
        
        {/* Dropdown Menu */}
        {showDropdown && (
          <div className="absolute right-0 top-8 z-10">
            <HeaderOption />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatHeader;