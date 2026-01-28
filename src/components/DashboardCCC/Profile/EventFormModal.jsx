import React, { useState } from 'react';

const EventFormModal = ({
  isOpen = false,
  onClose,
  onSubmit,
  eventName = "Event Registration"
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const [errors, setErrors] = useState({});

  // Return null if modal is not open (controlled component pattern)
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    // Close modal when clicking on the backdrop
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    // Close modal on Escape key press for accessibility
    if (e.key === 'Escape' && onClose) {
      onClose();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      if (onSubmit) {
        onSubmit(formData, eventName);
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-form-modal-title"
      tabIndex={-1}
    >
      <div
        className="bg-[#ffffff] rounded-[10px] p-[22px] flex flex-col gap-[22px] items-center justify-start relative max-w-[437px] w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {onClose && (
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors z-10"
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        <div
          className="flex flex-col gap-[22px] items-center justify-start self-stretch shrink-0 relative w-full"
        >
          <div
            className="text-neutral-default text-center font-h-2-semi-font-family text-h-2-semi-font-size leading-h-2-semi-line-height font-h-2-semi-font-weight relative self-stretch"
            style={{ fontWeight: '600' }}
          >
            Reserve Your Spot
          </div>
          
          <form onSubmit={handleSubmit} className="w-full">
            <div
              className="flex flex-col gap-8 items-start justify-start self-stretch shrink-0 relative"
            >
              <div
                className="flex flex-row gap-4 items-center justify-start flex-wrap content-center self-stretch shrink-0 relative"
              >
                <div
                  className="flex flex-col gap-1 items-start justify-start flex-1 h-[61px] min-w-[200px] relative w-full sm:w-auto"
                >
                  <div
                    className="flex flex-col gap-0 items-start justify-start self-stretch shrink-0 relative"
                  >
                    <div
                      className="text-[#374151] text-left font-['Inter-Medium',_sans-serif] text-sm leading-5 font-medium relative self-stretch"
                    >
                      First Name
                    </div>
                  </div>
                  <div
                    className="flex flex-col gap-0 items-start justify-start self-stretch shrink-0 h-[38px] relative"
                  >
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter first name"
                      className={`bg-[#ffffff] rounded-sm border ${errors.firstName ? 'border-red-500' : 'border-[#d1d5db]'} pt-[9px] pr-[33px] pb-[9px] pl-[17px] flex flex-row gap-0 items-center justify-center self-stretch shrink-0 h-[39px] relative w-full focus:outline-none focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-colors`}
                      style={{ 
                        fontFamily: 'Open Sans, sans-serif',
                        fontSize: '14px',
                        lineHeight: '20px',
                        fontWeight: '400'
                      }}
                    />
                  </div>
                  {errors.firstName && (
                    <div className="text-red-500 text-xs mt-1">{errors.firstName}</div>
                  )}
                </div>
                
                <div
                  className="flex flex-col gap-1 items-start justify-start flex-1 h-[61px] min-w-[200px] relative w-full sm:w-auto"
                >
                  <div
                    className="flex flex-col gap-0 items-start justify-start self-stretch shrink-0 relative"
                  >
                    <div
                      className="text-[#374151] text-left font-['Inter-Medium',_sans-serif] text-sm leading-5 font-medium relative self-stretch"
                    >
                      Last Name
                    </div>
                  </div>
                  <div
                    className="flex flex-col gap-0 items-start justify-start self-stretch shrink-0 h-[38px] relative"
                  >
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter last name"
                      className={`bg-[#ffffff] rounded-sm border ${errors.lastName ? 'border-red-500' : 'border-[#d1d5db]'} pt-[9px] pr-[33px] pb-[9px] pl-[17px] flex flex-row gap-0 items-center justify-center self-stretch shrink-0 h-[39px] relative w-full focus:outline-none focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-colors`}
                      style={{ 
                        fontFamily: 'Open Sans, sans-serif',
                        fontSize: '14px',
                        lineHeight: '20px',
                        fontWeight: '400'
                      }}
                    />
                  </div>
                  {errors.lastName && (
                    <div className="text-red-500 text-xs mt-1">{errors.lastName}</div>
                  )}
                </div>
              </div>
              
              <div
                className="flex flex-row gap-6 items-center justify-start self-stretch shrink-0 relative"
              >
                <div
                  className="flex flex-col gap-1 items-start justify-start flex-1 relative w-full"
                >
                  <div
                    className="flex flex-col gap-0 items-start justify-start self-stretch shrink-0 relative"
                  >
                    <div
                      className="text-[#374151] text-left font-['Inter-Medium',_sans-serif] text-sm leading-5 font-medium relative self-stretch"
                    >
                      Email Address
                    </div>
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter Email"
                    className={`bg-[#ffffff] rounded-sm border ${errors.email ? 'border-red-500' : 'border-[#d1d5db]'} pt-[9px] pr-[33px] pb-[9px] pl-[30px] flex flex-row gap-0 items-center justify-center self-stretch shrink-0 h-[37px] relative w-full focus:outline-none focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-colors`}
                    style={{ 
                      fontFamily: 'Open Sans, sans-serif',
                      fontSize: '14px',
                      lineHeight: '20px',
                      fontWeight: '400'
                    }}
                  />
                  {errors.email && (
                    <div className="text-red-500 text-xs mt-1">{errors.email}</div>
                  )}
                </div>
              </div>
            </div>

            <div
              className="mt-4 flex justify-center"
            >
              <button
                type="submit"
                className="bg-[#FFD700] rounded-lg flex flex-row gap-2.5 items-center justify-center shrink-0 w-32 h-9 max-w-[128px] relative cursor-pointer hover:opacity-90 transition-opacity"
              >
                <div
                  className="text-neutral-default text-left font-body-texts-b-2-semibold-font-family text-body-texts-b-2-semibold-font-size leading-body-texts-b-2-semibold-line-height font-body-texts-b-2-semibold-font-weight relative"
                  style={{ 
                    fontFamily: 'Open Sans, sans-serif',
                    fontSize: '14px',
                    fontWeight: '600',
                    lineHeight: '20px',
                    color: '#1D1D1D'
                  }}
                >
                  Join Event
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventFormModal;
