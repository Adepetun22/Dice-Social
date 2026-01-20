import React, { useState } from 'react';
import UsersThree from '../../../assets/users-three0.svg';
import Smiley from '../../../assets/smiley0.svg';
import ArrowRight from '../../../assets/arrow-right0.svg';

const CreateGroupPage = ({ isOpen, onClose, groupType = 'Personal Customer' }) => {
  const [groupSubject, setGroupSubject] = useState('');
  const [groupImage, setGroupImage] = useState(UsersThree);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setGroupImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!groupSubject.trim()) {
      setError('Please enter a group name');
      return;
    }
    
    // Clear any existing error
    setError('');
    
    // Handle group creation submission
    console.log('Group created:', {
      groupName: groupSubject,
      groupType: groupType,
      groupImage: groupImage
    });
    
    // Close the modal after submission
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-[16px] overflow-hidden flex flex-col items-center justify-start relative shadow-[0px_0px_2px_1px_rgba(0,0,0,0.06)] w-full max-w-md mx-4">
        {/* Close button */}
        <button 
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 bg-white rounded-full p-1 z-10"
          onClick={onClose}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        
        {/* Group Profile Section */}
        <div className="bg-white p-5 flex flex-row gap-2 items-center justify-center self-stretch flex-shrink-0 h-[100px] relative">
          <div className="border rounded-full border-black p-0.5 flex items-center justify-center flex-shrink-0 w-15 h-15 relative group">
            <img 
              className="w-14 h-14 rounded-full object-cover" 
              src={groupImage} 
              alt="Group Profile" 
            />
            <label className="absolute inset-0 rounded-full bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <span className="text-white text-xs font-bold">Change</span>
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>

        {/* Group Subject Section */}
        <div className="bg-white p-5 flex flex-row gap-2 items-start justify-center self-stretch flex-shrink-0 h-[91px] relative">
          <div className="border-b border-yellow-400 py-1 flex flex-row gap-0 items-center justify-start flex-1 max-w-[478px] relative overflow-hidden">
            <input
              type="text"
              placeholder="Group Subject"
              className="text-black text-left font-['Roboto-Medium'] text-base leading-5 font-medium relative flex-1 flex items-center justify-start outline-none bg-transparent"
              value={groupSubject}
              onChange={(e) => {
                setGroupSubject(e.target.value);
                // Clear error when user starts typing
                if (error && e.target.value.trim()) {
                  setError('');
                }
              }}
            />
            {/* Smiley icon hidden */}
            <img 
              className="hidden flex-shrink-0 w-7 h-7 relative overflow-visible" 
              src={Smiley} 
              alt="Smiley" 
            />
          </div>
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-sm px-5 w-full">
            {error}
          </div>
        )}

        {/* Group Type Section */}
        <div className="bg-white p-5 flex flex-row items-center justify-between self-stretch flex-shrink-0 h-[91px] relative border-b border-neutral-300">
          <div className="text-black text-left text-base font-medium">
            Group Type: {groupType}
          </div>
        </div>

        {/* Arrow Right Section */}
        <div className="bg-white p-5 flex flex-row items-center justify-between self-stretch flex-shrink-0 h-[91px] relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 top-5">
            <img 
              className="rounded-full flex-shrink-0 w-12 h-12 relative overflow-visible object-cover cursor-pointer"
              src={ArrowRight}
              alt="Submit"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupPage;