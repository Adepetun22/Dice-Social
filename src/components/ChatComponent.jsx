import { useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

const icon0 = '/icon0.svg';
const icon1 = '/icon1.svg';
const icon2 = '/icon2.svg';
const icon3 = '/icon3.svg';
const icon4 = '/icon4.svg';
const icon5 = '/icon5.svg';
const vector0 = '/vector0.svg';
const vector1 = '/vector1.svg';
const viewChristianNwabuezeSGraphicLink0 = '/view-christian-nwabueze-s-graphic-link0.png';
const viewChristianNwabuezeSGraphicLink1 = '/view-christian-nwabueze-s-graphic-link1.png';
const viewChristianNwabuezeSGraphicLink2 = '/view-christian-nwabueze-s-graphic-link2.png';

const ChatComponent = ({ 
  ticketId: propTicketId, 
  messages = [], 
  onSendReply,
  title = "Support",
  showBreadcrumbs = true
}) => {
  // If we're using this component in a route with params, use the ticketId from params
  // Otherwise, use the ticketId passed as a prop
  const params = useParams();
  const ticketId = propTicketId || params.ticketId || '10234';
  
  const [replyText, setReplyText] = useState('');

  const handleSendReply = () => {
    if (replyText.trim()) {
      // If a custom handler was provided, use it
      if (onSendReply) {
        onSendReply(replyText);
      } else {
        // Default behavior - just log to console
        console.log('Sending reply:', replyText);
      }
      setReplyText('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
      handleSendReply();
    }
  };

  // Default messages if none provided
  const defaultMessages = [
    {
      id: 1,
      sender: "Fatimah Oladigbolu",
      senderType: "user",
      timestamp: "April 13, 2025 at 10:32 AM",
      avatar: viewChristianNwabuezeSGraphicLink0,
      message: "I have been trying to log into my LinkedIn account but keep receiving an error message, even though I have confirmed that both my email address and password are correct. In an attempt to resolve the issue, I also tried resetting my password. However, I did not receive any password reset email, even after checking my spam and junk folders.\n\nThis situation is quite urgent for me, as I rely on LinkedIn for professional networking and ongoing job-related communications. I would appreciate it if you could look into this issue and help me regain access to my account as soon as possible."
    },
    {
      id: 2,
      sender: "Ovaboss Support Team",
      senderType: "support",
      timestamp: "April 13, 2025 at 10:45 AM",
      avatar: viewChristianNwabuezeSGraphicLink1,
      message: "Hi Fatimah,\nSorry you're having trouble. Please:\n1. Check spam/junk for the reset email.\n2. Add security-noreply@linkedin.com to contacts.\n3. Try resetting again here.\n4. If it still fails, send us your account email and a screenshot of the error.\n\nWe'll help you regain access.\nBest,\nOvaboss Support Team"
    },
    {
      id: 3,
      sender: "Fatimah Oladigbolu",
      senderType: "user",
      timestamp: "April 13, 2025 at 11:02 AM",
      avatar: viewChristianNwabuezeSGraphicLink2,
      message: "I've tried everything you suggested, but I'm still unable to log in and haven't received any reset email. Can someone please look into this more closely? I really need to access my account."
    }
  ];

  const chatMessages = messages.length > 0 ? messages : defaultMessages;

  return (
    <div className="bg-[#faf9f9] overflow-y-auto">
      <div className="py-6 px-4 flex flex-col gap-10 items-start justify-start w-full min-h-full pb-20">
        <div className="flex flex-col gap-6 items-start justify-start self-stretch relative">
          <div className="flex flex-col gap-3 items-start justify-start self-stretch relative">
            <div className="flex flex-col gap-2 items-start justify-start self-stretch relative">
              <h1 className="text-[#1f2937] text-left font-bold text-xl leading-[26px] self-stretch">{title}</h1>
            </div>
            
            {showBreadcrumbs && (
              <div className="flex flex-row gap-2 items-center justify-start self-stretch">
                <div className="flex flex-col gap-0 items-start justify-start self-stretch">
                  <div className="text-[#6b7280] text-left font-normal text-base leading-[173%]">Dashboard</div>
                </div>
                <div className="flex flex-row gap-0 items-center justify-center w-4 h-4">
                  <div className="p-3 flex flex-col gap-0 items-start justify-start">
                    <img className="w-[14.6px] h-[14px]" src={icon0} alt="Icon" />
                  </div>
                </div>
                <div className="flex flex-col gap-0 items-start justify-start self-stretch">
                  <div className="text-[#6b7280] text-left font-normal text-base leading-[173%]">Support</div>
                </div>
                <div className="flex flex-row gap-0 items-center justify-center w-4 h-4">
                  <div className="p-3 flex flex-col gap-0 items-start justify-start">
                    <img className="w-[14.6px] h-[14px]" src={icon1} alt="Icon" />
                  </div>
                </div>
                <div className="flex flex-col gap-0 items-start justify-start self-stretch">
                  <div className="text-[#ffd700] text-left font-normal text-base leading-[173%]">View Ticket</div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="bg-white rounded-xl p-8 max-[550px]:p-4 flex flex-col gap-12 items-center justify-start w-full relative shadow-[var(--default-shadow-box-shadow,-2px_0px_10.6px_1px_rgba(0,0,0,0.06))]">
          <div className="flex flex-col items-start justify-start w-full relative">
            <div className="rounded-[8px] p-[8px_12px] flex flex-row gap-2 items-center justify-center w-full">
              <div className="text-[#111827] text-left font-semibold text-2xl leading-[150%]">ID- #{ticketId}</div>
            </div>
            <div className="mt-[-6px] rounded-[8px] p-[8px_12px] flex flex-row gap-2 items-center justify-center w-full">
              <div className="text-[#0000cc] text-left font-semibold text-lg leading-[20px]">Open</div>
            </div>
          </div>
          <div className="flex flex-col gap-4 items-start justify-start w-full relative">
            {chatMessages.map((msg, index) => (
              <div 
                key={msg.id || index} 
                className={`${index % 2 === 0 ? 'bg-[#ffffff]' : 'bg-[#faf9f9]'} rounded-[7.64px] border border-[#e5e7eb] border-solid p-[22.92px] max-[550px]:py-[22.92px] max-[550px]:px-0 flex flex-col gap-[6px] items-start justify-start self-stretch relative`}
              >
                <div className="p-0 px-[22.92px] flex flex-row gap-[22.92px] items-start justify-start self-stretch">
                  <div className="p-[2px_0px_0px_2px] flex flex-col gap-0 items-start justify-start self-stretch">
                    <div className="flex flex-col gap-0 items-start justify-start self-stretch">
                      <div className="flex flex-col gap-0 items-start justify-start self-stretch">
                        <img 
                          className="rounded-[24px] w-[48px] h-[48px] object-cover" 
                          src={msg.avatar || (index % 3 === 0 ? viewChristianNwabuezeSGraphicLink0 : 
                                              index % 3 === 1 ? viewChristianNwabuezeSGraphicLink1 : 
                                              viewChristianNwabuezeSGraphicLink2)} 
                          alt="Profile" 
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[3.82px] items-start justify-start flex-1 relative">
                    <div className="text-left relative self-stretch">
                      <span>
                        <span className="text-[#111827] text-left font-semibold text-base leading-[150%]">{msg.sender}</span>
                        <span className="text-[#111827] font-bold text-[15.28px] leading-[22.92px] tracking-[-0.02em]"></span>
                        <span className={`font-bold text-[15.28px] leading-[22.92px] tracking-[-0.02em] ${msg.senderType === 'user' ? 'text-[#b0b0b0]' : 'text-transparent'}`}>
                          {msg.senderType === 'user' ? '(You)' : ''}
                        </span>
                      </span>
                    </div>
                    <div className="text-[#b0b0b0] text-left font-semibold text-xs leading-[18px] relative self-stretch">
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
                <div className={`p-[${index % 2 === 0 ? '22.92px' : '12px_22.92px_22.92px'}] flex flex-col gap-[22.92px] items-start justify-start self-stretch relative`}>
                  <div className="text-[#202020] text-left font-normal text-base leading-[28px] relative self-stretch whitespace-pre-line">
                    {msg.message}
                  </div>
                </div>
                {index < chatMessages.length - 1 && (
                  <img className="self-stretch w-full h-0" src={index % 2 === 0 ? vector0 : vector1} alt="Separator" />
                )}
              </div>
            ))}
          </div>
          <div className="bg-[#ffffff] rounded-[7.64px] border border-[#e5e7eb] border-solid p-[22.92px] flex flex-col gap-[22.92px] items-start justify-start self-stretch relative">
            <div className="text-[#202020] text-left font-bold text-base leading-[150%]">Reply</div>
            <div className="rounded-[7.64px] border border-[#e5e7eb] border-solid flex flex-col gap-[11.46px] items-start justify-start self-stretch h-[174px] relative overflow-hidden">
              <div className="bg-[#faf9f9] p-[7.64px] flex flex-row items-center justify-between self-stretch relative">
                <div className="flex flex-row gap-[15.28px] items-center justify-start relative">
                  <img className="w-[22.92px] h-[22.92px]" src={icon2} alt="Icon" />
                  <img className="w-[22.92px] h-[22.92px]" src={icon3} alt="Icon" />
                  <img className="w-[22.92px] h-[22.92px]" src={icon4} alt="Icon" />
                  <img className="w-[22.92px] h-[22.92px]" src={icon5} alt="Icon" />
                </div>
                <div className="text-[#b0b0b0] text-left font-semibold text-xs leading-[18px]">Ctrl+Enter to send</div>
              </div>
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your reply here..."
                className="text-[#202020] text-left font-semibold text-xs leading-[18px] relative self-stretch flex-1 p-[11.46px] bg-transparent border-none outline-none resize-none"
              />
            </div>
            <div className="flex flex-row gap-[22.92px] items-start justify-end self-stretch relative">
              <button
                onClick={handleSendReply}
                className="bg-[#FFD700] hover:bg-[#1D1D1D] text-black hover:text-[#FFD700] rounded-[7.64px] p-[7.64px_11.46px] flex flex-row gap-[7.64px] items-center justify-center transition-colors duration-200 h-11 font-semibold text-[11.46px] leading-[15.28px]"
              >
                Send Reply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ChatComponent.propTypes = {
  ticketId: PropTypes.string,
  messages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    sender: PropTypes.string.isRequired,
    senderType: PropTypes.oneOf(['user', 'support']).isRequired,
    timestamp: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    message: PropTypes.string.isRequired
  })),
  onSendReply: PropTypes.func,
  title: PropTypes.string,
  showBreadcrumbs: PropTypes.bool
};

export default ChatComponent;