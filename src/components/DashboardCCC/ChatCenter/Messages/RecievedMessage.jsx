import { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import InnerChatOption from '../ChatOption/InnerChatOption';

const RecievedMessage = forwardRef(({ 
  message, 
  showDropdown, 
  onDropdownToggle,
  dropdownPosition = { right: '-100px', top: '20px' },
  isNew,
  file
}, ref) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const renderMediaContent = () => {
    if (!file) {
      return (
        <div className="message text-sm break-words whitespace-pre-wrap">
          {message}
        </div>
      );
    }

    switch (file.type) {
      case 'photo':
        return (
          <div className="flex flex-col">
            {message && (
              <div className="message text-sm break-words whitespace-pre-wrap mb-2">
                {message}
              </div>
            )}
            <div className="max-w-[320px] max-h-[320px] w-full overflow-hidden rounded-lg">
              <img 
                src={file.url} 
                alt="Received attachment" 
                className="w-full h-full object-contain cursor-pointer"
                onClick={() => window.open(file.url, '_blank')}
              />
            </div>
            <div className="mt-1 text-xs text-gray-600 flex justify-between items-center">
              <span className="truncate max-w-[70%]">{file.name}</span>
              <a href={file.url} download={file.name} className="text-blue-500 hover:underline whitespace-nowrap">
                Download
              </a>
            </div>
          </div>
        );
      
      case 'video':
        return (
          <div className="flex flex-col">
            {message && (
              <div className="message text-sm break-words whitespace-pre-wrap mb-2">
                {message}
              </div>
            )}
            <div className="max-w-[320px] max-h-[320px] w-full overflow-hidden rounded-lg relative">
              <video className="w-full h-full object-contain cursor-pointer" onClick={() => {
                const video = event.currentTarget;
                if (video.paused) {
                  video.play();
                } else {
                  video.pause();
                }
              }}>
                <source src={file.url} type={file.file?.type} />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 flex items-center justify-center">
                <button 
                  className="play-button bg-black bg-opacity-50 rounded-full p-2 flex items-center justify-center hover:bg-opacity-75 transition-all"
                  onClick={() => {
                    const video = event.currentTarget.closest('.relative').querySelector('video');
                    if (video.paused) {
                      video.play();
                    } else {
                      video.pause();
                    }
                  }}
                >
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M10 8L16 12L10 16V8Z" fill="currentColor"/>
                  </svg>
                </button>
              </div>
            </div>
            <div className="mt-1 text-xs text-gray-600 flex justify-between items-center">
              <span className="truncate max-w-[70%]">{file.name}</span>
              <a href={file.url} download={file.name} className="text-blue-500 hover:underline whitespace-nowrap">
                Download
              </a>
            </div>
          </div>
        );
      
      case 'document':
        return (
          <div className="flex flex-col">
            {message && (
              <div className="message text-sm break-words whitespace-pre-wrap mb-2">
                {message}
              </div>
            )}
            <div className="flex items-center p-2 bg-gray-100 rounded-lg max-w-[320px]">
              <svg className="w-8 h-8 text-gray-500 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 3H9C7.89543 3 7 3.89543 7 5V19C7 20.1046 7.89543 21 9 21H15M15 3C16.1046 3 17 3.89543 17 5V19C17 20.1046 16.1046 21 15 21M15 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21M15 21H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
              </div>
              <a href={file.url} download={file.name} className="ml-2 text-blue-500 hover:underline text-sm whitespace-nowrap">
                Download
              </a>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="message text-sm break-words whitespace-pre-wrap">
            {message}
          </div>
        );
    }
  };

  return (
    <div className={`recieve-message mb-4 flex ${isNew ? 'animate-push-up' : ''}`}>
      <div 
        className="component-283 flex relative"
        ref={ref}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          className="frame-2147224238 flex"
          onTouchStart={(e) => {
            e.preventDefault();
            setIsHovered(true);
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            setTimeout(() => setIsHovered(false), 1000);
          }}
        >
          <div className="bg-gray-200 rounded-xl mr-2 self-end flex items-center justify-center" style={{ 
            width: '32px', 
            height: '32px', 
            minWidth: '32px',
            maxWidth: '32px',
            minHeight: '32px',
            maxHeight: '32px',
            flexShrink: 0,
            flexGrow: 0,
            flexBasis: '32px'
          }}>
            <img className="w-full h-full rounded-xl object-cover" src="https://picsum.photos/seed/receiver/200/200.jpg" alt="Receiver" />
          </div>
          <div className="message-bubble bg-white rounded-2xl rounded-tl-none p-3 max-w-md overflow-hidden">
            {renderMediaContent()}
          </div>
        </div>
        <button 
          className={`dots-three-outline-vertical2 w-4 h-4 ml-2 self-start cursor-pointer transition-opacity duration-200 ${
            isHovered || showDropdown ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ background: 'none', border: 'none', padding: 0 }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDropdownToggle(e);
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDropdownToggle(e);
          }}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="6" r="1" fill="currentColor"/>
            <circle cx="12" cy="12" r="1" fill="currentColor"/>
            <circle cx="12" cy="18" r="1" fill="currentColor"/>
          </svg>
        </button>
        
        {/* Dropdown for received message */}
        {showDropdown && (
          <div className="absolute" style={{ ...dropdownPosition, zIndex: 10 }}>
            <InnerChatOption parentRef={ref} />
          </div>
        )}
      </div>
    </div>
  );
});

RecievedMessage.displayName = 'RecievedMessage';

RecievedMessage.propTypes = {
  message: PropTypes.string,
  showDropdown: PropTypes.bool,
  onDropdownToggle: PropTypes.func,
  dropdownPosition: PropTypes.shape({
    right: PropTypes.string,
    top: PropTypes.string
  }),
  isNew: PropTypes.bool,
  file: PropTypes.shape({
    type: PropTypes.string,
    url: PropTypes.string,
    name: PropTypes.string,
    size: PropTypes.number,
    file: PropTypes.shape({
      type: PropTypes.string
    })
  }),
  ref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ])
};

export default RecievedMessage;