import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import EmojiPicker from '../EmojiPicker';
import RecievedMessage from '../ChatCenter/Messages/RecievedMessage';
import SentMessage from '../ChatCenter/Messages/SentMessage';
import HeaderOption from '../ChatCenter/ChatOption/HeaderOption';

const ChatRoomMobile = ({ onBack, contactDetails = null }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachmentOptions, setShowAttachmentOptions] = useState(false);
  const [showHeaderOptions, setShowHeaderOptions] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      type: 'received', 
      content: 'Thank you for your prompt response and willingness to help. I really appreciate it!',
      file: null
    },
    { 
      id: 2, 
      type: 'sent', 
      content: "You're welcome! I'm always here to help. Is there anything else you need assistance with?",
      file: null
    },
    { 
      id: 3, 
      type: 'received', 
      content: 'Hello! I finally found the time to write to you, I need two of your products. The Green and the Red colour type, kindly let me know when it will be avilable',
      file: null
    },
    { 
      id: 4, 
      type: 'sent', 
      content: 'Sure, thanks for reaching out Fatimah Technology, I will definitely send you a feedback when your requested items are available',
      file: null
    },
    { 
      id: 5, 
      type: 'sent', 
      content: '',
      file: { 
        type: 'photo', 
        url: 'blob:http://localhost:5173/150a867b-9286-4f2d-b7b1-4619e76ce380', 
        name: 'Untitled Project - illustrationImage5.png' 
      }
    },
    { 
      id: 6, 
      type: 'sent', 
      content: '',
      file: { 
        type: 'document', 
        url: 'blob:http://localhost:5173/a1b5cc3c-6f95-4bd8-8647-1faf8a9ba095', 
        name: 'Untitled Project - illustrationImage8.png', 
        size: 673.7 * 1024 
      }
    },
    { 
      id: 7, 
      type: 'sent', 
      content: 'Sample',
      file: null
    },
    { 
      id: 8, 
      type: 'sent', 
      content: '👎 no',
      file: null
    },
    { 
      id: 9, 
      type: 'sent', 
      content: 'sample',
      file: null
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const newMessages = useRef(new Set());
  const [receivedDropdowns, setReceivedDropdowns] = useState({});
  const [sentDropdowns, setSentDropdowns] = useState({});
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const documentInputRef = useRef(null);
  const messageInputRef = useRef(null);
  const receivedMessageRefs = useRef([]);
  const sentMessageRefs = useRef([]);
  const messagesContainerRef = useRef(null);
  const lastMessageCount = useRef(messages.length);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    if (messages.length > lastMessageCount.current) {
      lastMessageCount.current = messages.length;
      
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }
    }
  }, [messages]);

  // Function to handle emoji selection
  const handleEmojiSelect = (emoji) => {
    if (messageInputRef.current) {
      const input = messageInputRef.current;
      const start = input.selectionStart;
      const end = input.selectionEnd;
      const text = newMessage;
      const newText = text.substring(0, start) + emoji + text.substring(end);
      
      setNewMessage(newText);
      
      setTimeout(() => {
        input.focus();
        input.setSelectionRange(start + emoji.length, start + emoji.length);
      }, 0);
    }
    setShowEmojiPicker(false);
  };

  // Function to handle file attachments
  const handleFileAttachment = (event, fileType) => {
    const file = event.target.files[0];
    if (file) {
      const attachedFile = {
        id: Date.now(),
        file: file,
        name: file.name,
        type: fileType,
        size: file.size,
        url: URL.createObjectURL(file)
      };

      if (fileType === 'photo') {
        attachedFile.preview = URL.createObjectURL(file);
      }

      setAttachedFiles(prev => [...prev, attachedFile]);
      setShowAttachmentOptions(false);
      
      // Automatically send the message with the file
      const newMessageObj = {
        id: messages.length + 1,
        type: 'sent',
        content: newMessage,
        file: attachedFile
      };

      setMessages(prevMessages => [...prevMessages, newMessageObj]);
      newMessages.current.add(newMessageObj.id);
      setNewMessage('');

      // Remove the message from new messages set after animation duration
      setTimeout(() => {
        newMessages.current.delete(newMessageObj.id);
      }, 1000);

      setAttachedFiles([]);
      event.target.value = '';
    }
  };

  // Function to remove an attached file
  const removeAttachedFile = (fileId) => {
    setAttachedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  // Add new message to the chat
  const handleSendMessage = () => {
    if (newMessage.trim() !== '' || attachedFiles.length > 0) {
      const newMessageObj = {
        id: Date.now(),
        type: 'sent',
        content: newMessage.trim(),
        file: attachedFiles.length > 0 ? attachedFiles[0] : null
      };

      setMessages(prev => [...prev, newMessageObj]);
      newMessages.current.add(newMessageObj.id);
      setNewMessage('');
      setAttachedFiles([]);

      // Scroll to bottom to show the new message
      setTimeout(() => {
        if (messagesContainerRef.current) {
          messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
      }, 100);

      // Remove the message from new messages set after animation duration
      setTimeout(() => {
        newMessages.current.delete(newMessageObj.id);
      }, 1000);
    }
  };

  // Toggle received message dropdown
  const toggleReceivedDropdown = (index) => {
    console.log('Toggling received dropdown for index:', index);
    setReceivedDropdowns(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Toggle sent message dropdown
  const toggleSentDropdown = (index) => {
    console.log('Toggling sent dropdown for index:', index);
    setSentDropdowns(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Close all dropdowns
  const closeAllDropdowns = (e) => {
    // Check if the click is on a dropdown toggle button
    const isDropdownToggle = e && e.target && e.target.closest && 
      e.target.closest('.dots-three-outline-vertical2, .dots-three-outline-vertical3');
    
    if (!isDropdownToggle) {
      console.log('Closing all dropdowns');
      setReceivedDropdowns({});
      setSentDropdowns({});
      setShowHeaderOptions(false);
    }
  };

  return (
    <div className="chatroom flex-1 flex flex-col" style={{ height: '100vh', overflow: 'hidden' }} onClick={(e) => closeAllDropdowns(e)}>
      {/* Header Section */}
      <div className="frame-2147224237 flex justify-between items-center p-4 border-b border-gray-200 w-full">
        <div className="frame-2147224877 flex items-center w-full">
          <button 
            onClick={onBack}
            className="arrow-down-2 w-5 h-5 mr-4 cursor-pointer"
            style={{ background: 'none', border: 'none', padding: 0 }}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </button>
          <div className="container10 flex items-center relative flex-grow">
            <div className="link-view-christian-nwabueze-s-graphic-link-margin">
              <div className="link-view-christian-nwabueze-s-graphic-link">
                <div className="container relative">
                  <div className="view-christian-nwabueze-s-graphic-link bg-gray-200 rounded-xl w-12 h-12 flex items-center justify-center">
                    <img className="w-12 h-12 rounded-xl object-cover" src="https://picsum.photos/seed/savannah/200/200.jpg" alt="Savannah Nguyen" />
                  </div>
                  <div className="ellipse-16813 absolute w-3 h-3 bg-green-500 rounded-full" style={{ bottom: '0px', right: '0px' }}></div>
                </div>
              </div>
            </div>
            <div className="margin2 ml-3 flex-grow">
              <div className="container11">
                <div className="container">
                  <div className="container2">
                    <div className="savannah-nguyen font-medium">{contactDetails ? contactDetails.name : "Savannah Nguyen"}</div>
                    <div className="text-xs text-gray-500">{contactDetails ? contactDetails.category || "Personal Customer" : "Personal Customer"}</div>
                  </div>
                </div>
                <div className="frame-2147224224">
                  <div className="container8">
                    <div className="online text-xs text-green-500">Online</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="frame-21472242372 relative">
            <button 
              className="dots-three-outline-vertical w-5 h-5 cursor-pointer" 
              style={{ background: 'none', border: 'none', padding: '0px' }}
              onClick={(e) => {
                e.stopPropagation();
                setShowHeaderOptions(!showHeaderOptions);
              }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="6" r="1" fill="currentColor"></circle>
                <circle cx="12" cy="12" r="1" fill="currentColor"></circle>
                <circle cx="12" cy="18" r="1" fill="currentColor"></circle>
              </svg>
            </button>
            
            {/* Header Options Dropdown - using the same component as desktop */}
            {showHeaderOptions && (
              <div 
                className="absolute right-0 top-8 z-10"
                onClick={(e) => e.stopPropagation()}
              >
                <HeaderOption />
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Messages Container */}
        <div 
          ref={messagesContainerRef}
          className="frame-2147224875 flex-1 p-2 bg-gray-50 overflow-y-auto"
          style={{ height: 'calc(100vh - 140px)' }}
        >
          {messages.map((message, index) => {
            if (message.type === 'received') {
              const receivedIndex = messages.slice(0, index).filter(m => m.type === 'received').length;
              const isDropdownVisible = !!receivedDropdowns[receivedIndex];
              console.log(`Rendering received message ${message.id}, dropdown visible: ${isDropdownVisible}`);
              
              return (
                <RecievedMessage
                  key={message.id}
                  ref={(el) => receivedMessageRefs.current[receivedIndex] = el}
                  message={message.content}
                  file={message.file}
                  showDropdown={isDropdownVisible}
                  onDropdownToggle={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation();
                    console.log(`Toggling received dropdown for index: ${receivedIndex}`);
                    toggleReceivedDropdown(receivedIndex);
                  }}
                  index={receivedIndex}
                  isNew={newMessages.current.has(message.id)}
                  dropdownPosition={{ right: '0px', top: '20px', zIndex: 1000 }}
                />
              );
            } else {
              const sentIndex = messages.slice(0, index).filter(m => m.type === 'sent').length;
              const isDropdownVisible = !!sentDropdowns[sentIndex];
              console.log(`Rendering sent message ${message.id}, dropdown visible: ${isDropdownVisible}`);
              
              return (
                <SentMessage
                  key={message.id}
                  ref={(el) => sentMessageRefs.current[sentIndex] = el}
                  message={message.content}
                  file={message.file}
                  showDropdown={isDropdownVisible}
                  onDropdownToggle={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation();
                    console.log(`Toggling sent dropdown for index: ${sentIndex}`);
                    toggleSentDropdown(sentIndex);
                  }}
                  index={sentIndex}
                  isNew={newMessages.current.has(message.id)}
                  dropdownPosition={{ left: '0px', top: '20px', zIndex: 1000 }}
                />
              );
            }
          })}
        </div>
        
        {/* Input Area */}
        <div 
          className="frame-2147224246 bg-white p-[10px] border-t border-gray-200"
          style={{ backgroundColor: 'rgb(255, 249, 230)', marginBottom: '60px' }}
        >
          {/* Display attached files */}
          {attachedFiles.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-2">
              {attachedFiles.map((file) => (
                <div key={file.id} className="flex items-center bg-gray-100 rounded-lg p-2">
                  <div className="flex items-center">
                    {file.type === 'photo' && file.preview && (
                      <img 
                        src={file.preview} 
                        alt="Preview" 
                        className="w-5 h-5 mr-1 rounded-sm"
                      />
                    )}
                    {file.type === 'photo' && !file.preview && (
                      <svg className="w-5 h-5 mr-1 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 19H3V5H21V19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 9C10.1046 9 11 8.10457 11 7C11 5.89543 10.1046 5 9 5C7.89543 5 7 5.89543 7 7C7 8.10457 7.89543 9 9 9Z" stroke="currentColor" strokeWidth="2"/>
                        <path d="M21 15L15 9L9 14L3 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    {file.type === 'video' && (
                      <svg className="w-5 h-5 mr-1 text-red-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 7L16 12L21 17V7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3 19H15C16.1046 19 17 18.1046 17 17V7C17 5.89543 16.1046 5 15 5H3C1.89543 5 1 5.89543 1 7V17C1 18.1046 1.89543 19 3 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    {file.type === 'document' && (
                      <svg className="w-5 h-5 mr-1 text-gray-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 3H9C7.89543 3 7 3.89543 7 5V19C7 20.1046 7.89543 21 9 21H15M15 3C16.1046 3 17 3.89543 17 5V19C17 20.1046 16.1046 21 15 21M15 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21M15 21H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    <span className="text-xs truncate max-w-xs">{file.name}</span>
                  </div>
                  <div className="ml-2 flex items-center">
                    <button 
                      className="text-gray-500 hover:text-red-500"
                      onClick={() => removeAttachedFile(file.id)}
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="frame-2147224244 flex items-center">
            <div className="media-buttons flex space-x-2 relative">
              <button 
                className="paperclip w-5 h-5 cursor-pointer"
                style={{ background: 'none', border: 'none', padding: '0px' }}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAttachmentOptions(!showAttachmentOptions);
                }}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.44 11.05L12.6 20.05C11.4 21.25 9.6 21.25 8.4 20.05L2.5 14.15C1.3 12.95 1.3 11.15 2.5 9.95C3.7 8.75 5.5 8.75 6.7 9.95L11.4 14.65C11.8 15.05 12.4 15.05 12.8 14.65C13.2 14.25 13.2 13.65 12.8 13.25L8.1 8.55C6.5 6.95 4.1 6.95 2.5 8.55C0.9 10.15 0.9 12.55 2.5 14.15L8.4 20.05C10 21.65 12.4 21.65 14 20.05L22.5 11.45" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </button>
              
              {/* Hidden file inputs for different attachment types */}
              <input 
                type="file" 
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={(e) => handleFileAttachment(e, 'photo')}
              />
              <input 
                type="file" 
                ref={videoInputRef}
                className="hidden"
                accept="video/*"
                onChange={(e) => handleFileAttachment(e, 'video')}
              />
              <input 
                type="file" 
                ref={documentInputRef}
                className="hidden"
                onChange={(e) => handleFileAttachment(e, 'document')}
              />
              
              {/* Attachment Options */}
              {showAttachmentOptions && (
                <div className="absolute bottom-8 left-0 bg-white rounded-lg shadow-lg p-2 w-32 z-10">
                  <div 
                    className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer"
                    onClick={() => {
                      fileInputRef.current.click();
                    }}
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 19H3V5H21V19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 9C10.1046 9 11 8.10457 11 7C11 5.89543 10.1046 5 9 5C7.89543 5 7 5.89543 7 7C7 8.10457 7.89543 9 9 9Z" stroke="currentColor" strokeWidth="2"/>
                      <path d="M21 15L15 9L9 14L3 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Photo</span>
                  </div>
                  <div 
                    className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer"
                    onClick={() => {
                      videoInputRef.current.click();
                    }}
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 7L16 12L21 17V7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M3 19H15C16.1046 19 17 18.1046 17 17V7C17 5.89543 16.1046 5 15 5H3C1.89543 5 1 5.89543 1 7V17C1 18.1046 1.89543 19 3 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Video</span>
                  </div>
                  <div 
                    className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer"
                    onClick={() => {
                      documentInputRef.current.click();
                    }}
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 3H9C7.89543 3 7 3.89543 7 5V19C7 20.1046 7.89543 21 9 21H15M15 3C16.1046 3 17 3.89543 17 5V19C17 20.1046 16.1046 21 15 21M15 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21M15 21H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Document</span>
                  </div>
                </div>
              )}
            </div>
            <input 
              ref={messageInputRef}
              type="text" 
              className="type-a-message-here flex-1 mx-[10px] px-[10px] py-2 bg-gray-100 rounded-full text-sm focus:outline-none" 
              placeholder="Type a message here..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
            />
            <div className="frame-2147224243 flex space-x-3">
              <div className="relative">
                <button 
                  className="smiley3 w-5 h-5 cursor-pointer"
                  style={{ background: 'none', border: 'none', padding: '0px' }}
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"></circle>
                    <circle cx="9" cy="10" r="1" fill="currentColor"></circle>
                    <circle cx="15" cy="10" r="1" fill="currentColor"></circle>
                    <path d="M8 15C9 16 11 17 12 17C13 17 15 16 16 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
                  </svg>
                </button>
                
                {/* Emoji Picker */}
                {showEmojiPicker && (
                  <div className="absolute bottom-12 left-0">
                    <EmojiPicker onEmojiSelect={handleEmojiSelect} marginLeft="-250px" />
                  </div>
                )}
              </div>
              <button 
                className="paper-plane-tilt w-5 h-5 cursor-pointer"
                style={{ background: 'none', border: 'none', padding: '0px' }}
                onClick={handleSendMessage}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ChatRoomMobile.propTypes = {
  onBack: PropTypes.func.isRequired
};

export default ChatRoomMobile;