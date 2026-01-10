import { useState, useRef, useEffect } from 'react';
import EmojiPicker from '../../components/DashboardCCC/EmojiPicker';
import RecievedMessage from '../../components/DashboardCCC/ChatCenter/Messages/RecievedMessage';
import SentMessage from '../../components/DashboardCCC/ChatCenter/Messages/SentMessage';
import ChatHeader from '../../components/DashboardCCC/ChatCenter/ChatHeader';
import ContactMessage from '../../components/DashboardCCC/ChatCenter/Messages/ContactMessage';
import addIcon from '../../assets/add-10.svg';
import ContactChatMobile from '../../components/DashboardCCC/MobileChat/ContactChatMobile';
import ChatRoomMobile from '../../components/DashboardCCC/MobileChat/ChatRoomMobile';
import ContactsModal from '../../components/DashboardCCC/ChatContacts/ContactsModal'; // Added import

const ChatCenter = () => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showReceivedMessageDropdown, setShowReceivedMessageDropdown] = useState(null);
  const [showSentMessageDropdown, setShowSentMessageDropdown] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAttachmentOptions, setShowAttachmentOptions] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [messages, setMessages] = useState([
    { id: 1, type: 'received', content: 'Thank you for your prompt response and willingness to help. I really appreciate it!' },
    { id: 2, type: 'sent', content: "You're welcome! I'm always here to help. Is there anything else you need assistance with?" },
    { id: 3, type: 'received', content: 'Hello! I finally found the time to write to you, I need two of your products. The Green and the Red colour type, kindly let me know when it will be avilable' },
    { id: 4, type: 'sent', content: 'Sure, thanks for reaching out Fatimah Technology, I will definitely send you a feedback when your requested items are available' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isMobileView, setIsMobileView] = useState(false);
  const [showChatRoom, setShowChatRoom] = useState(false);
  const [showContactsModal, setShowContactsModal] = useState(false); // Added state for contacts modal
  const receivedMessageRefs = useRef([]);
  const sentMessageRefs = useRef([]);
  const messageInputRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const documentInputRef = useRef(null);
  const lastMessageCount = useRef(messages.length);
  const newMessages = useRef(new Set());

  // Check for mobile view on mount and resize
  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 768); // Consider mobile if width < 768px
      // Reset mobile view state when switching from mobile to desktop
      if (window.innerWidth >= 768) {
        setShowChatRoom(false);
      }
    };

    // Initial check
    checkMobileView();

    // Add event listener
    window.addEventListener('resize', checkMobileView);

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobileView);
    };
  }, []);

  // Sample contact data
  const contacts = [
    { id: 0, name: "Jenny Wilson", time: "12:40 PM", message: "Okay wait a sec", unreadCount: 2, category: "Personal Customer" },
    { id: 1, name: "Savannah Nguyen", time: "10:20 AM", message: "Thank you for the response", unreadCount: 0, category: "Acquaintance Customer" },
    { id: 2, name: "John Smith", time: "09:15 AM", message: "Meeting tomorrow at 3pm", unreadCount: 1, category: "Personal Customer" },
    { id: 3, name: "Emily Johnson", time: "Yesterday", message: "Thanks for your help!", unreadCount: 0, category: "Acquaintance Customer" },
    { id: 4, name: "Michael Brown", time: "Yesterday", message: "Project update attached", unreadCount: 3, category: "Personal Customer" },
    { id: 5, name: "Sarah Davis", time: "Monday", message: "Call me when you're free", unreadCount: 0, category: "Acquaintance Customer" },
    { id: 6, name: "Robert Miller", time: "Monday", message: "Can we reschedule?", unreadCount: 1, category: "Personal Customer" },
    { id: 7, name: "Jennifer Wilson", time: "Sunday", message: "Happy birthday!", unreadCount: 0, category: "Acquaintance Customer" },
    { id: 8, name: "David Taylor", time: "Sunday", message: "Documents reviewed", unreadCount: 2, category: "Personal Customer" },
    { id: 9, name: "Lisa Anderson", time: "Saturday", message: "Great job on the presentation", unreadCount: 0, category: "Acquaintance Customer" }
  ];

  // Function to handle emoji selection
  const handleEmojiSelect = (emoji) => {
    // Add the selected emoji to the input field
    if (messageInputRef.current) {
      const input = messageInputRef.current;
      const start = input.selectionStart;
      const end = input.selectionEnd;
      const text = newMessage;
      const newText = text.substring(0, start) + emoji + text.substring(end);
      
      // Update the React state instead of directly manipulating the DOM
      setNewMessage(newText);
      
      // Set cursor position after the inserted emoji
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
      // Create a new file object with metadata
      const attachedFile = {
        id: Date.now(),
        file: file,
        name: file.name,
        type: fileType,
        size: file.size,
        url: URL.createObjectURL(file)
      };
      
      // Add preview for images
      if (fileType === 'photo') {
        attachedFile.preview = URL.createObjectURL(file);
      }
      
      // Add to attached files
      setAttachedFiles(prev => [...prev, attachedFile]);
      
      // Show a preview or send the file directly
      console.log(`Attached ${fileType}:`, attachedFile);
      
      // Reset the input
      event.target.value = '';
      
      // Hide attachment options
      setShowAttachmentOptions(false);
      
      // Automatically send the message with the file
      const newMessageObj = {
        id: messages.length + 1,
        type: 'sent',
        content: newMessage,
        file: attachedFile,
        isNew: true
      };
      
      // Add the new message with file attachment
      setMessages(prevMessages => [...prevMessages, newMessageObj]);
      setNewMessage('');
      
      // Clear new message flag after animation duration
      setTimeout(() => {
        newMessages.current.delete(newMessageObj.id);
      }, 1000);
      
      // Reset attached files
      setAttachedFiles([]);
    }
  };

  // Function to remove an attached file
  const removeAttachedFile = (fileId) => {
    setAttachedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close received message dropdowns
      if (showReceivedMessageDropdown !== null) {
        let clickedOutside = true;
        receivedMessageRefs.current.forEach(ref => {
          if (ref && ref.contains(event.target)) {
            clickedOutside = false;
          }
        });
        if (clickedOutside) {
          setShowReceivedMessageDropdown(null);
        }
      }
      
      // Close sent message dropdowns
      if (showSentMessageDropdown !== null) {
        let clickedOutside = true;
        sentMessageRefs.current.forEach(ref => {
          if (ref && ref.contains(event.target)) {
            clickedOutside = false;
          }
        });
        if (clickedOutside) {
          setShowSentMessageDropdown(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showReceivedMessageDropdown, showSentMessageDropdown]);

  useEffect(() => {
    // Only scroll to bottom when a new message is added
    if (messages.length > lastMessageCount.current) {
      lastMessageCount.current = messages.length;
      
      // Scroll to bottom of messages container
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }
    }
  }, [messages]);

  // Add new message to the chat
  const handleSendMessage = () => {
    if (newMessage.trim() !== '' || attachedFiles.length > 0) {
      const newMessageObj = {
        id: Date.now(),
        type: 'sent',
        content: newMessage.trim(),
        file: attachedFiles.length > 0 ? attachedFiles[0] : null // Add file if exists
      };

      // Add the new message to the messages array
      setMessages(prev => [...prev, newMessageObj]);
      
      // Add to new messages set for animation
      newMessages.current.add(newMessageObj.id);
      
      // Clear the input field
      setNewMessage('');
      
      // Clear attached files
      setAttachedFiles([]);
      
      // Remove the message from new messages set after animation duration
      setTimeout(() => {
        newMessages.current.delete(newMessageObj.id);
      }, 1000);
    }
  };

  // Handle contact selection
  const handleContactSelect = (contactId) => {
    setSelectedContact(contactId);
    // In mobile view, hide contacts list and show chat room
    if (isMobileView) {
      setShowChatRoom(true);
    }
  };

  // Handle back button in mobile view
  const handleBackToContacts = () => {
    setShowChatRoom(false);
  };

  // Render mobile view
  if (isMobileView) {
    return (
      <div className="ccc-chatroom flex h-screen bg-gray-50 relative overflow-hidden">
        {/* Contacts List - slides out to the left when chat room is shown */}
        <div 
          className={`absolute top-0 left-0 w-full h-full transition-transform duration-300 ease-in-out transform ${
            showChatRoom && selectedContact !== null ? '-translate-x-full' : 'translate-x-0'
          }`}
        >
          <ContactChatMobile onContactSelect={handleContactSelect} />
        </div>
        
        {/* Chat Room - slides in from the right when a contact is selected */}
        <div 
          className={`absolute top-0 left-0 w-full h-full transition-transform duration-300 ease-in-out transform ${
            showChatRoom && selectedContact !== null ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <ChatRoomMobile onBack={handleBackToContacts} />
        </div>
      </div>
    );
  }

  // Desktop view (existing implementation)
  return (
    <div className="ccc-chatroom flex h-screen bg-gray-50">
      {/* Contacts Modal */}
      {showContactsModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowContactsModal(false)}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button 
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 bg-white rounded-full p-1 z-10"
              onClick={() => setShowContactsModal(false)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <ContactsModal onClose={() => setShowContactsModal(false)} />
          </div>
        </div>
      )}

      {/* Contacts List */}
      <div className="contacts-chat w-1/3 bg-white border-r border-gray-200 flex flex-col" style={{ maxWidth: '390px' }}>
        <div className="background-shadow">
          <div className="frame-2147224215 p-4">
            <div className="chats flex justify-between items-center mb-4">
              <div className="container">
                <div className="container2">
                  <div className="chats2 text-lg font-semibold">Chats</div>
                </div>
              </div>
              <button 
                className="frame-2147224214" 
                style={{ background: '#ffd700', borderRadius: '6px', padding: '8px', display: 'flex', flexDirection: 'row', gap: '4px', alignItems: 'center', justifyContent: 'flex-start', flexShrink: '0', height: '42px', position: 'relative' }}
                onClick={() => setShowContactsModal(true)} // Added onClick handler
              >
                <img className="add-1" style={{ flexShrink: '0', width: '24px', height: '24px', position: 'relative', overflow: 'visible', aspectRatio: '1' }} src={addIcon} alt="Add" />
                <div className="create-new-chat" style={{ color: '#202020', textAlign: 'center', fontFamily: '"OpenSans-SemiBold", sans-serif', fontSize: '14px', lineHeight: '18px', fontWeight: '600', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>New Chat</div>
              </button>
            </div>
            <div className="search-normal-1 relative w-full">
              <input 
                type="text" 
                className="search-input pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none w-full" 
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg className="search-icon w-5 h-5 absolute left-3 top-2.5 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2"/>
                <path d="M20 20L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
          
          <div className="frame-2147224217 flex space-x-4 mb-4" style={{ paddingLeft: '16px' }}>
            <button 
              className={`all-button px-4 py-1 rounded-full text-sm ${
                activeFilter === 'all' 
                  ? 'bg-[rgb(255,215,0)] text-black' 
                  : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setActiveFilter('all')}
            >
              All
            </button>
            <button 
              className={`unread-button px-4 py-1 rounded-full text-sm ${
                activeFilter === 'unread' 
                  ? 'bg-[rgb(255,215,0)] text-black' 
                  : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setActiveFilter('unread')}
            >
              Unread
            </button>
            <button 
              className={`groups-button px-4 py-1 rounded-full text-sm ${
                activeFilter === 'groups' 
                  ? 'bg-[rgb(255,215,0)] text-black' 
                  : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setActiveFilter('groups')}
            >
              Groups
            </button>
          </div>
          
          <div className="frame-2147224218 overflow-y-auto" style={{ height: 'calc(100vh - 220px)' }}>
            {contacts
              .filter(contact => {
                // Apply filter based on activeFilter
                if (activeFilter === 'all') {
                  // No filter for 'all'
                } else if (activeFilter === 'unread') {
                  if (contact.unreadCount <= 0) return false;
                } else if (activeFilter === 'groups') {
                  if (contact.category !== 'Acquaintance Customer') return false;
                }
                
                // Apply search filter
                if (searchTerm) {
                  const searchTermLower = searchTerm.toLowerCase();
                  const nameMatch = contact.name.toLowerCase().includes(searchTermLower);
                  const categoryMatch = contact.category.toLowerCase().includes(searchTermLower);
                  return nameMatch || categoryMatch;
                }
                
                return true;
              })
              .map((contact) => (
                <ContactMessage 
                  key={contact.id}
                  name={contact.name}
                  time={contact.time}
                  message={contact.message}
                  unreadCount={contact.unreadCount}
                  isActive={selectedContact === contact.id}
                  category={contact.category}
                  onClick={() => handleContactSelect(contact.id)}
                />
              ))
            }
          </div>
        </div>
      </div>
      
      {/* Main Chat Area */}
      <div className="chatroom flex-1 flex flex-col" style={{ height: '100vh', overflow: 'hidden' }}>
        <div className="frame-2147224876 flex flex-col flex-1 min-h-0">
          {/* Chat Header */}
          <ChatHeader 
            onBack={() => console.log("Back button clicked")}
            userName="Savannah Nguyen"
            online={true}
          />
          
          {/* Chat Messages Area */}
          <div 
            ref={messagesContainerRef}
            className="frame-2147224875 flex-1 overflow-y-auto p-2 bg-gray-50 pb-15"
          >
            {messages.map((message, index) => {
              if (message.type === 'received') {
                const receivedIndex = messages.slice(0, index).filter(m => m.type === 'received').length;
                return (
                  <RecievedMessage 
                    key={message.id}
                    ref={(el) => receivedMessageRefs.current[receivedIndex] = el}
                    message={message.content}
                    showDropdown={showReceivedMessageDropdown === receivedIndex}
                    onDropdownToggle={() => setShowReceivedMessageDropdown(prev => prev === receivedIndex ? null : receivedIndex)}
                    index={receivedIndex}
                    isNew={newMessages.current.has(message.id)}
                    file={message.file}
                  />
                );
              } else {
                const sentIndex = messages.slice(0, index).filter(m => m.type === 'sent').length;
                return (
                  <SentMessage
                    key={message.id}
                    ref={(el) => sentMessageRefs.current[sentIndex] = el}
                    message={message.content}
                    showDropdown={showSentMessageDropdown === sentIndex}
                    onDropdownToggle={() => setShowSentMessageDropdown(prev => prev === sentIndex ? null : sentIndex)}
                    index={sentIndex}
                    isNew={newMessages.current.has(message.id)}
                    file={message.file}
                  />
                );
              }
            })}
          </div>
        </div>
        {/* Message Input Area */}
        <div className="frame-2147224246 bg-white p-4 border-t border-gray-200 mb-15" style={{backgroundColor: '#FFF9E6', marginBottom: '60px'}}>
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
                    {/* Upload progress indicator */}
                    {file.status === 'uploading' && (
                      <div className="w-12 h-2 bg-gray-300 rounded-full mr-2">
                        <div 
                          className="h-full bg-blue-500 rounded-full" 
                          style={{ width: `${file.progress}%` }}
                        ></div>
                      </div>
                    )}
                    {file.status === 'sent' && (
                      <svg className="w-4 h-4 text-green-500 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
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
                style={{ background: 'none', border: 'none', padding: 0 }}
                onClick={() => setShowAttachmentOptions(!showAttachmentOptions)}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.44 11.05L12.6 20.05C11.4 21.25 9.6 21.25 8.4 20.05L2.5 14.15C1.3 12.95 1.3 11.15 2.5 9.95C3.7 8.75 5.5 8.75 6.7 9.95L11.4 14.65C11.8 15.05 12.4 15.05 12.8 14.65C13.2 14.25 13.2 13.65 12.8 13.25L8.1 8.55C6.5 6.95 4.1 6.95 2.5 8.55C0.9 10.15 0.9 12.55 2.5 14.15L8.4 20.05C10 21.65 12.4 21.65 14 20.05L22.5 11.45" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
                      // Trigger photo attachment
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
                      // Trigger video attachment
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
                      // Trigger document attachment
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
              className="type-a-message-here flex-1 mx-4 px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none" 
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
                  style={{ background: 'none', border: 'none', padding: 0 }}
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="9" cy="10" r="1" fill="currentColor"/>
                    <circle cx="15" cy="10" r="1" fill="currentColor"/>
                    <path d="M8 15C9 16 11 17 12 17C13 17 15 16 16 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
                
                {/* Emoji Picker */}
                {showEmojiPicker && (
                  <EmojiPicker onEmojiSelect={handleEmojiSelect} />
                )}
              </div>
              <button 
                className="paper-plane-tilt w-5 h-5 cursor-pointer"
                style={{ background: 'none', border: 'none', padding: 0 }}
                onClick={handleSendMessage}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatCenter;