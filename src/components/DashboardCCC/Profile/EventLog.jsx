import React from 'react';

const EventLog = ({ 
  date = "TODAY", 
  time = "12:45 PM", 
  title = "Event Title", 
  description = "Event description goes here...", 
  onViewEvent 
}) => {
  return (
    <div
      className="bg-[#ffffff] rounded-md border-solid border-[#e4e4e4] border pt-3.5 pr-4 pb-3.5 pl-4 flex flex-row gap-[22px] items-center justify-center self-stretch relative"
    >
      <div className="flex flex-row gap-4 items-center justify-start flex-1 relative">
        <div
          className="bg-primary-100 rounded-md p-5 flex flex-col gap-1.5 items-center justify-start shrink-0 w-[105px] relative"
        >
          <div
            className="text-neutral-default text-center font-body-texts-b-1-18-semi-font-family text-body-texts-b-1-18-semi-font-size leading-body-texts-b-1-18-semi-line-height font-body-texts-b-1-18-semi-font-weight relative"
          >
            {date}
          </div>
          <div
            className="text-neutral-default text-center font-headings-h-3-font-family text-headings-h-3-font-size leading-headings-h-3-line-height font-headings-h-3-font-weight relative"
          >
            {time}
          </div>
        </div>
        <div
          className="flex flex-col gap-1.5 items-start justify-start flex-1 relative"
        >
          <div
            className="text-secondary-default text-left font-body-texts-b-1-semibold-font-family text-body-texts-b-1-semibold-font-size leading-body-texts-b-1-semibold-line-height font-body-texts-b-1-semibold-font-weight relative self-stretch"
          >
            {title}
          </div>
          <div
            className="text-secondary-default text-left font-body-texts-b-3-font-family text-body-texts-b-3-font-size leading-body-texts-b-3-line-height font-body-texts-b-3-font-weight relative self-stretch"
          >
            {description}
          </div>
        </div>
      </div>
      <div
        className="bg-primary-default rounded-lg flex flex-row gap-2.5 items-center justify-center shrink-0 w-[131px] h-[46px] relative cursor-pointer hover:opacity-90 transition-opacity"
        onClick={onViewEvent}
      >
        <div
          className="flex flex-row gap-2 items-center justify-start shrink-0 relative"
        >
          <div
            className="text-neutral-default text-left font-headings-h-5-font-family text-headings-h-5-font-size leading-headings-h-5-line-height font-headings-h-5-font-weight relative"
          >
            View Event
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventLog;

