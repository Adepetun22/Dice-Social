import React from 'react';

const EventInfoModal = ({
  date = "July 20, 2025",
  time = "12:45 PM",
  representativeName = "Fatimah Oladigbolu",
  eventName = "Sell Smart: Boost Your Online Sales in 30 Days",
  location = "https://zoom.us/j/1234567890?pwd=abcdEFGH1234",
  eventDetails = "Join us for a hands-on session designed to help small business owners and traders learn practical strategies to increase their sales on Ovaboss. From product listing tips to customer engagement tactics, this event will guide you toward results-driven selling.",
  onShareEvent,
  onJoinEvent
}) => {
  return (
    <div
      className="bg-[#ffffff] rounded-2xl p-[22px] flex flex-col gap-[22px] items-center justify-center relative"
      style={{ boxShadow: '0px 0px 2px 1px rgba(0, 0, 0, 0.06)' }}
    >
      <div
        className="flex flex-col gap-[22px] items-center justify-start self-stretch shrink-0 relative"
      >
        <div
          className="flex flex-col gap-1 items-center justify-start self-stretch shrink-0 relative"
        >
          <div
            className="rounded-lg flex flex-row gap-2 items-center justify-center self-stretch shrink-0 relative"
          >
            <div
              className="text-neutral-default text-center font-h-2-semi-font-family text-h-2-semi-font-size leading-h-2-semi-line-height font-h-2-semi-font-weight relative flex-1"
            >
              {date}
            </div>
          </div>
          <div
            className="rounded-lg flex flex-row gap-2 items-center justify-center self-stretch shrink-0 relative"
          >
            <div
              className="text-color-grey-400 text-center font-body-texts-b-1-font-family text-body-texts-b-1-font-size leading-body-texts-b-1-line-height font-body-texts-b-1-font-weight relative flex-1"
            >
              {time}
            </div>
          </div>
        </div>
        <div
          className="flex flex-col gap-4 items-start justify-start self-stretch shrink-0 relative"
        >
          <div
            className="flex flex-col gap-2 items-start justify-start self-stretch shrink-0 relative"
          >
            <div
              className="flex flex-col gap-0 items-start justify-start self-stretch shrink-0 relative"
            >
              <div
                className="text-[#374151] text-left font-headings-h-5-font-family text-headings-h-5-font-size leading-headings-h-5-line-height font-headings-h-5-font-weight relative self-stretch"
              >
                Business Representative Name
              </div>
            </div>
            <div
              className="bg-[#ffffff] rounded-sm border-solid border-[transparent] border pr-[33px] flex flex-row gap-0 items-center justify-center self-stretch shrink-0 relative"
            >
              <div
                className="text-secondary-default text-left font-body-texts-b-3-font-family text-body-texts-b-3-font-size leading-body-texts-b-3-line-height font-body-texts-b-3-font-weight relative flex-1"
              >
                {representativeName}
              </div>
            </div>
          </div>
          <div
            className="flex flex-col gap-2 items-start justify-start self-stretch shrink-0 relative"
          >
            <div
              className="flex flex-col gap-0 items-start justify-start self-stretch shrink-0 relative"
            >
              <div
                className="text-[#374151] text-left font-headings-h-5-font-family text-headings-h-5-font-size leading-headings-h-5-line-height font-headings-h-5-font-weight relative self-stretch"
              >
                Event Name
              </div>
            </div>
            <div
              className="bg-[#ffffff] rounded-sm border-solid border-[transparent] border pr-[33px] flex flex-row gap-0 items-center justify-center self-stretch shrink-0 relative"
            >
              <div
                className="text-secondary-default text-left font-body-texts-b-3-font-family text-body-texts-b-3-font-size leading-body-texts-b-3-line-height font-body-texts-b-3-font-weight relative flex-1"
              >
                {eventName}
              </div>
            </div>
          </div>
          <div
            className="flex flex-col gap-2 items-start justify-start self-stretch shrink-0 relative"
          >
            <div
              className="flex flex-col gap-0 items-start justify-start self-stretch shrink-0 relative"
            >
              <div
                className="text-[#374151] text-left font-headings-h-5-font-family text-headings-h-5-font-size leading-headings-h-5-line-height font-headings-h-5-font-weight relative self-stretch"
              >
                Location
              </div>
            </div>
            <div
              className="flex flex-row gap-2.5 items-center justify-center self-stretch shrink-0 relative"
            >
              <div
                className="text-color-yellow-500 text-left font-body-texts-b-2-font-family text-body-texts-b-2-font-size leading-body-texts-b-2-line-height font-body-texts-b-2-font-weight relative self-stretch flex-1"
                style={{ textDecoration: 'underline' }}
              >
                {location}
              </div>
            </div>
          </div>
          <div
            className="flex flex-col gap-2 items-start justify-start self-stretch shrink-0 relative"
          >
            <div
              className="flex flex-col gap-0 items-start justify-start self-stretch shrink-0 relative"
            >
              <div
                className="text-[#374151] text-left font-headings-h-5-font-family text-headings-h-5-font-size leading-headings-h-5-line-height font-headings-h-5-font-weight relative self-stretch"
              >
                Event Details
              </div>
            </div>
            <div
              className="bg-[#ffffff] rounded-lg border-solid border-[transparent] border flex flex-row gap-0 items-start justify-start self-stretch shrink-0 relative"
            >
              <div
                className="text-secondary-default text-left font-body-texts-b-3-font-family text-body-texts-b-3-font-size leading-body-texts-b-3-line-height font-body-texts-b-3-font-weight relative flex-1"
              >
                {eventDetails}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="flex flex-row gap-4 items-center justify-center flex-wrap content-center w-[100%] shrink-0 max-w-[295px] relative"
      >
        <div
          className="rounded-lg border-solid border-primary-default border pt-3 pr-2 pb-3 pl-2 flex flex-row gap-2.5 items-center justify-center flex-1 h-9 min-w-[99px] max-w-[128px] relative cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={onShareEvent}
        >
          <div
            className="text-primary-default text-center font-body-texts-b-2-semibold-font-family text-body-texts-b-2-semibold-font-size leading-body-texts-b-2-semibold-line-height font-body-texts-b-2-semibold-font-weight relative flex-1"
          >
            Share Event
          </div>
        </div>
        <div
          className="bg-primary-default rounded-lg pt-3 pr-2 pb-3 pl-2 flex flex-row gap-2.5 items-center justify-center shrink-0 w-32 h-9 min-w-[99px] max-w-[128px] relative cursor-pointer hover:opacity-90 transition-opacity"
          onClick={onJoinEvent}
        >
          <div
            className="text-neutral-default text-center font-body-texts-b-2-semibold-font-family text-body-texts-b-2-semibold-font-size leading-body-texts-b-2-semibold-line-height font-body-texts-b-2-semibold-font-weight relative flex-1"
          >
            Join Event
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventInfoModal;

