import React from 'react';

const ContactMessage = ({ 
  name = "Jenny Wilson", 
  time = "12:40 PM", 
  message = "Okay wait a sec", 
  unreadCount = 2,
  isActive = false,
  category = "", // New prop for category
  onClick 
}) => {
  return (
    <div 
      className={`frame-2147224219 flex items-center p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
        isActive ? 'bg-[hsl(45.6deg_100%_95.1%)]' : ''
      }`}
      onClick={onClick}
    >
      <div className="link-view-christian-nwabueze-s-graphic-link-margin mr-3">
        <div className="link-view-christian-nwabueze-s-graphic-link">
          <div className="container4">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12"></div>
          </div>
        </div>
      </div>
      <div className="container3 flex-1">
        <div className="frame-2147224220 flex justify-between items-center mb-1">
          <div className="name-and-category">
            <div className="jenny-wilson font-medium">{name}</div>
            <div className="category-label text-xs text-gray-500">{category || 'Personal Customer'}</div>
          </div>
          <div className="apr-2022 text-xs text-gray-500">{time}</div>
        </div>
        <div className="frame-2147224221 flex justify-between items-center">
          <div className="container">
            <div className="container2">
              <div className="okay-wait-a-sec text-sm text-gray-500 truncate max-w-xs">
                {message}
              </div>
            </div>
          </div>
          <div className="container7">
            {unreadCount > 0 && (
              <div 
                className="number-2 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                style={{ backgroundColor: 'rgb(255, 215, 0)' }}
              >
                {unreadCount}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactMessage;