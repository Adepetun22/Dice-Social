import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const CreateTicketModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category: '',
    subject: '',
    message: ''
  });

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    onClose();
    // Navigate to ChatRoom
    navigate('/PCCSupport/ChatRoom');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>
      
      {/* Modal Container */}
      <div 
        className="relative z-10 bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4 sm:p-6 md:p-8 flex flex-col gap-4 sm:gap-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
              Create Ticket
            </h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          {/* Form */}
          <form id="ticket-form" onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-6">
            {/* Category Field */}
            <div className="flex flex-col gap-2">
              <label className="text-sm sm:text-base font-medium text-gray-700">
                Category
              </label>
              <div className="rounded border border-gray-300">
                <select 
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full p-2 sm:p-3 text-gray-500 bg-transparent outline-none text-sm sm:text-base"
                >
                  <option value="" disabled>Select Category</option>
                  <option value="technical">Technical Support</option>
                  <option value="billing">Billing</option>
                  <option value="account">Account Issues</option>
                  <option value="general">General Inquiry</option>
                </select>
              </div>
            </div>

            {/* Subject Field */}
            <div className="flex flex-col gap-2">
              <label className="text-sm sm:text-base font-medium text-gray-700">
                Subject
              </label>
              <div className="rounded border border-gray-300">
                <input 
                  type="text" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full p-2 sm:p-3 text-gray-500 bg-transparent outline-none text-sm sm:text-base" 
                  placeholder="Enter Subject/Title" 
                />
              </div>
            </div>

            {/* Message Field */}
            <div className="flex flex-col gap-2">
              <label className="text-sm sm:text-base font-medium text-gray-700">
                Your Message
              </label>
              <div className="rounded border border-gray-300">
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full p-2 sm:p-3 text-gray-500 bg-transparent outline-none resize-none text-sm sm:text-base" 
                  placeholder="Your Message" 
                  rows="4"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button 
                type="submit" 
                className="w-full bg-[#FFD700] hover:bg-[#1D1D1D] text-black hover:text-[#FFD700] font-semibold text-sm sm:text-base transition-colors duration-200 rounded py-2 sm:py-3"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

CreateTicketModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CreateTicketModal;