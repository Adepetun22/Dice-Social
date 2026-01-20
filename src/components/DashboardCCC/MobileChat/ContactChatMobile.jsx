import React, { useState } from 'react';
import ContactsModal from '../ChatContacts/ContactsModal';

const ContactChatMobile = ({ onContactSelect }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showContactsModal, setShowContactsModal] = useState(false);

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

  const filteredContacts = contacts.filter(contact => {
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
  });

  return (
    <div className="contacts-chat w-full bg-white border-r border-gray-200 flex flex-col" style={{ maxWidth: '100%' }}>
      <div className="background-shadow w-full">
        <div className="frame-2147224215 p-4 w-full">
          <div className="chats flex justify-between items-center mb-4">
            <div className="container">
              <div className="container2">
                <div className="chats2 text-lg font-semibold">Chats</div>
              </div>
            </div>
            <button 
              className="frame-2147224214" 
              style={{ background: 'rgb(255, 215, 0)', borderRadius: '6px', padding: '8px', display: 'flex', flexDirection: 'row', gap: '4px', alignItems: 'center', justifyContent: 'flex-start', flexShrink: '0', height: '42px', position: 'relative' }}
              onClick={() => setShowContactsModal(true)}
            >
              <img className="add-1" src="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M11.9995%207.22656V16.7725M16.6399%2011.8669L7.22656%2011.9995'%20stroke='%23202020'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e" alt="Add" style={{ flexShrink: '0', width: '24px', height: '24px', position: 'relative', overflow: 'visible', aspectRatio: '1 / 1' }} />
              <div className="create-new-chat" style={{ color: 'rgb(32, 32, 32)', textAlign: 'center', fontFamily: 'OpenSans-SemiBold, sans-serif', fontSize: '14px', lineHeight: '18px', fontWeight: '600', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>New Chat</div>
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
              <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2"></circle>
              <path d="M20 20L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
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
        <div className="frame-2147224218 overflow-y-auto w-full" style={{ height: 'calc(100vh - 220px)' }}>
          {filteredContacts.map((contact) => (
            <div 
              key={contact.id}
              className="frame-2147224219 flex items-center p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
              onClick={() => onContactSelect && onContactSelect(contact)}
            >
              <div className="link-view-christian-nwabueze-s-graphic-link-margin mr-3">
                <div className="link-view-christian-nwabueze-s-graphic-link">
                  <div className="container4">
                    <div className="bg-gray-200 rounded-xl w-12 h-12 flex items-center justify-center">
                      <img className="w-12 h-12 rounded-xl object-cover" src={`https://picsum.photos/seed/${contact.name.replace(/\s+/g, '').toLowerCase()}/200/200.jpg`} alt={contact.name} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="container3 flex-1">
                <div className="frame-2147224220 flex justify-between items-center mb-1">
                  <div className="name-and-category">
                    <div className="jenny-wilson font-medium">{contact.name}</div>
                    <div className="category-label text-xs text-gray-500">{contact.category}</div>
                  </div>
                  <div className="apr-2022 text-xs text-gray-500">{contact.time}</div>
                </div>
                <div className="frame-2147224221 flex justify-between items-center">
                  <div className="container">
                    <div className="container2">
                      <div className="okay-wait-a-sec text-sm text-gray-500 truncate max-w-xs">{contact.message}</div>
                    </div>
                  </div>
                  {contact.unreadCount > 0 ? (
                    <div className="container7">
                      <div 
                        className="number-2 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                        style={{ backgroundColor: '#FFD700' }}
                      >
                        {contact.unreadCount}
                      </div>
                    </div>
                  ) : (
                    <div 
                      className="ellipse-16813 w-2 h-2 rounded-full"
                      style={{ backgroundColor: 'rgb(34 197 94 / var(--tw-bg-opacity, 1))' }}
                    ></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Contacts Modal */}
      {showContactsModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'hsl(0deg 0% 0% / 40%)' }}>
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <button 
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
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
    </div>
  );
};

export default ContactChatMobile;