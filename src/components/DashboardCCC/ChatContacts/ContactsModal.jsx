import React, { useState, useMemo, useEffect } from 'react';
import MagnifyingGlass from '../../../assets/magnifying-glass0.svg';
import CaretDown from '../../../assets/caret-down0.svg';
import ArrowRight from '../../../assets/arrow-right0.svg'; // 新增导入
import Avatar1 from '../../../assets/view-christian-nwabueze-s-graphic-link0.png';
import Avatar2 from '../../../assets/view-christian-nwabueze-s-graphic-link1.png';
import Avatar3 from '../../../assets/view-christian-nwabueze-s-graphic-link2.png';
import Avatar4 from '../../../assets/view-christian-nwabueze-s-graphic-link3.png';
import Avatar5 from '../../../assets/view-christian-nwabueze-s-graphic-link4.png';
import Avatar6 from '../../../assets/view-christian-nwabueze-s-graphic-link5.png';
import Avatar7 from '../../../assets/view-christian-nwabueze-s-graphic-link6.png';
import Avatar8 from '../../../assets/view-christian-nwabueze-s-graphic-link7.png';
import Avatar9 from '../../../assets/view-christian-nwabueze-s-graphic-link8.png';
import ContactComponent from './ContactComponent';

const ContactsModal = ({ onClose }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedMemberType, setSelectedMemberType] = useState('All Member');
  const [searchTerm, setSearchTerm] = useState('');
  const [showStatusImage, setShowStatusImage] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  
  const memberTypes = ['All Member', 'Personal Customer', 'Acquaintance Customer', 'Business Rep', 'Customer Care'];
  
  const contacts = [
    { name: 'Esther Howard', type: 'Personal Customer', avatar: Avatar1 },
    { name: 'Devon Lane', type: 'Personal Customer', avatar: Avatar2 },
    { name: 'Brooklyn Simmons', type: 'Acquaintance Customer', avatar: Avatar3 },
    { name: 'Jenny Wilson', type: 'Acquaintance Customer', avatar: Avatar4 },
    { name: 'Jerome Bell', type: 'Personal Customer', avatar: Avatar5 },
    { name: 'Arlene McCoy', type: 'Acquaintance Customer', avatar: Avatar6 },
    { name: 'Savannah Nguyen', type: 'Business Rep', avatar: Avatar7 },
    { name: 'Theresa Webb', type: 'Customer Care', avatar: Avatar8 },
    { name: 'Bessie Cooper', type: 'Business Rep', avatar: Avatar9 }
  ];

  // Filter contacts based on selected member type and search term
  const filteredContacts = useMemo(() => {
    let result = contacts;
    
    // Apply member type filter
    if (selectedMemberType !== 'All Member') {
      result = result.filter(contact => contact.type === selectedMemberType);
    }
    
    // Apply search term filter
    if (searchTerm) {
      result = result.filter(contact => 
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return result;
  }, [selectedMemberType, searchTerm]);

  // Reset selected contacts when switching member types
  useEffect(() => {
    setSelectedContacts([]);
  }, [selectedMemberType]);

  return (
    <div className="bg-white rounded-lg w-full md:w-[651px] h-[645px] mx-auto flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex-shrink-0">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Contacts</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 hidden md:block"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <img 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" 
            src={MagnifyingGlass} 
            alt="Search" 
          />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Member Type Selector */}
      <div className="p-4 border-b border-gray-200 flex-shrink-0">
        <div className="relative">
          <button
            className="flex justify-between items-center w-full p-2 bg-gray-100 rounded-md text-sm"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span>{selectedMemberType}</span>
            <img 
              className={`w-5 h-5 transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
              src={CaretDown} 
              alt="Dropdown" 
            />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg">
              {memberTypes.map((type) => (
                <div
                  key={type}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() => {
                    setSelectedMemberType(type);
                    setIsDropdownOpen(false);
                  }}
                >
                  {type}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Select All/Unselect All Button */}
        <div className="mt-3">
          <button
            className="w-full py-2 bg-yellow-400 text-black rounded-md text-sm hover:bg-black hover:text-yellow-400 transition-colors"
            onClick={() => {
              if (selectedContacts.length === filteredContacts.length) {
                // Unselect all
                setSelectedContacts([]);
              } else {
                // Select all visible contacts
                setSelectedContacts(filteredContacts.map(contact => contact.name));
              }
            }}
          >
            {selectedContacts.length === filteredContacts.length ? 'Unselect All' : 'Select All'}
          </button>
        </div>
      </div>


      {/* Contacts List */}
      <div className="overflow-y-auto flex-grow">
        <div className="flex flex-col">
          {/* Contacts */}
          {filteredContacts.map((contact, index) => (
            <ContactComponent
              key={index}
              contact={contact}
              onClick={() => {
                // Toggle contact selection
                if (selectedContacts.includes(contact.name)) {
                  setSelectedContacts(selectedContacts.filter(name => name !== contact.name));
                } else {
                  setSelectedContacts([...selectedContacts, contact.name]);
                }
              }}
              showStatusImage={showStatusImage}
              showCheckbox={true} // Always show checkboxes
              isChecked={selectedContacts.includes(contact.name)}
            />
          ))}
        </div>
      </div>
      
      {/* Arrow Right Button - Show when any contacts are selected */}
      {selectedContacts.length > 0 && (
        <div className="fixed bottom-[98px] left-1/2 transform -translate-x-1/2 z-50">
          <img 
            className="w-12 h-12 rounded-full bg-yellow-400 object-cover cursor-pointer"
            src={ArrowRight}
            alt="Arrow Right"
            onClick={() => {
              // Handle the selected contacts (initiate chat)
              console.log('Selected contacts:', selectedContacts);
              // Here you would typically initiate the chat with the selected contacts
            }}
          />
        </div>
      )}
      
      {/* Notification Message */}
      {showNotification && (
        <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-md z-50">
          Please select 2 or more contacts to create a group
        </div>
      )}
      
    </div>
  );
};

export default ContactsModal;
