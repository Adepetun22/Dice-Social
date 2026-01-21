import React from 'react';

const ContactComponent = ({ contact, onClick, showStatusImage, showCheckbox, isChecked }) => {
  return (
    <div 
      className="flex items-center p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer relative"
      onClick={onClick}
    >
      {/* Checkbox - Only show when explicitly enabled */}
      {showCheckbox && (
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isChecked ? 'bg-yellow-400 border-yellow-400' : 'border-gray-300'}`}>
            {isChecked && (
              <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
              </svg>
            )}
          </div>
        </div>
      )}
      
      <div className={`${showCheckbox ? 'ml-8' : ''} mr-3`}>
        <div className="bg-gray-200 rounded-xl w-12 h-12 flex items-center justify-center">
          <img className="w-12 h-12 rounded-xl object-cover" src={`https://picsum.photos/seed/${contact.name.replace(/\s+/g, '').toLowerCase()}/200/200.jpg`} alt={contact.name} />
        </div>
        {showStatusImage && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1">
          <div className="font-medium truncate">{contact.name}</div>
          <div className="text-xs text-gray-500">12:40 PM</div>
        </div>
        <div className="text-xs text-gray-500 mb-1">{contact.type}</div>
        <div className="text-sm text-gray-500 truncate">Okay wait a sec</div>
      </div>
    </div>
  );
};

export default ContactComponent;