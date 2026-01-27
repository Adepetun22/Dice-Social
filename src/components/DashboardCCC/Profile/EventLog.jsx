import React, { useState } from 'react';
import EventInfoModal from './EventInfoModal';

const EventLog = ({ 
  date = "TODAY", 
  time = "12:45 PM", 
  title = "Event Title", 
  description = "Event description goes here...",
  representativeName = "Fatimah Oladigbolu",
  eventName = "Sell Smart: Boost Your Online Sales in 30 Days",
  location = "https://zoom.us/j/1234567890?pwd=abcdEFGH1234",
  eventDetails = "Join us for a hands-on session designed to help small business owners and traders learn practical strategies to increase their sales on Ovaboss. From product listing tips to customer engagement tactics, this event will guide you toward results-driven selling.",
  onViewEvent 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewEvent = (e) => {
    // Open the modal
    setIsModalOpen(true);
    // Also call the original onViewEvent if provided
    if (onViewEvent) {
      onViewEvent(e);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleShareEvent = () => {
    // Handle share event logic
    console.log('Share Event');
  };

  const handleJoinEvent = () => {
    // Handle join event logic
    console.log('Join Event');
  };

  return (
    <>
      <div
        className="bg-[#ffffff] rounded-md border border-[#e4e4e4] pt-3.5 pr-4 pb-3.5 pl-4 flex flex-col md:flex-row gap-[22px] items-center justify-center self-stretch relative"
      >
        <div className="flex flex-row gap-4 items-center justify-start flex-1 relative w-full">
          <div
            className="bg-[#FEF3C7] rounded-md p-5 flex flex-col gap-1.5 items-center justify-start shrink-0 w-[105px] relative"
            style={{ backgroundColor: '#FEF3C7' }}
          >
            <div
              className="text-[#1D1D1D] text-center font-semibold relative"
              style={{ 
                fontFamily: 'Open Sans, sans-serif',
                fontSize: '14px',
                lineHeight: '24px'
              }}
            >
              {date}
            </div>
            <div
              className="text-[#1D1D1D] text-center relative"
              style={{ 
                fontFamily: 'Open Sans, sans-serif',
                fontSize: '18px',
                fontWeight: '700',
                lineHeight: '28px'
              }}
            >
              {time}
            </div>
          </div>
          <div
            className="flex flex-col gap-1.5 items-start justify-start flex-1 relative w-full"
          >
            <div
              className="text-[#1D1D1D] text-left font-semibold relative self-stretch"
              style={{ 
                fontFamily: 'Open Sans, sans-serif',
                fontSize: '16px',
                lineHeight: '24px'
              }}
            >
              {title}
            </div>
            <div
              className="text-[#1D1D1D] text-left relative self-stretch"
              style={{ 
                fontFamily: 'Open Sans, sans-serif',
                fontSize: '14px',
                lineHeight: '20px'
              }}
            >
              {description}
            </div>
          </div>
        </div>
        <button
          className="bg-[#FFD700] rounded-lg flex flex-row gap-2.5 items-center justify-center shrink-0 w-full md:w-[131px] h-[36px] relative cursor-pointer hover:bg-[#1D1D1D] transition-colors border-0"
          onClick={handleViewEvent}
        >
          <div
            className="flex flex-row gap-2 items-center justify-start shrink-0 relative"
          >
            <span
              className="text-left relative"
              style={{ 
                fontFamily: 'Open Sans, sans-serif',
                fontSize: '14px',
                fontWeight: '600',
                lineHeight: '20px',
                color: '#1D1D1D'
              }}
              onMouseEnter={(e) => e.target.style.color = '#FFD700'}
              onMouseLeave={(e) => e.target.style.color = '#1D1D1D'}
            >
              View Event
            </span>
          </div>
        </button>
      </div>

      {/* Event Info Modal */}
      <EventInfoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        date={date}
        time={time}
        representativeName={representativeName}
        eventName={eventName}
        location={location}
        eventDetails={eventDetails}
        onShareEvent={handleShareEvent}
        onJoinEvent={handleJoinEvent}
      />
    </>
  );
};

export default EventLog;

