import React from 'react';
import infoIcon from '../../../../assets/info0.svg';
import bellSlashIcon from '../../../../assets/bell-slash0.svg';
import prohibitIcon from '../../../../assets/prohibit-inset0.svg';
import flagIcon from '../../../../assets/flag0.svg';
import trashIcon from '../../../../assets/trash0.svg';

const HeaderOption = () => {
  return (
    <div className="rounded-lg flex flex-col gap-0 items-end justify-start relative shadow-md z-50">
      <div className="rounded-lg flex flex-col gap-0 items-start justify-start flex-shrink-0 w-[206px] relative shadow-md">
        <div className="bg-white rounded-md p-3 flex flex-col gap-3.5 items-start justify-center self-stretch flex-shrink-0 relative">
          <div className="flex flex-row gap-2.5 items-center justify-start self-stretch flex-shrink-0 relative cursor-pointer hover:bg-gray-100 p-2 rounded">
            <div className="flex-shrink-0 w-5 h-5 relative overflow-hidden">
              <img className="w-full h-full absolute -right-[1.61%] -left-[1.61%] -bottom-[1.35%] -top-[1.35%] overflow-visible" src={infoIcon} alt="Info" />
            </div>
            <div className="text-[#202020] text-left font-normal text-sm leading-[173%] relative">Contact Info</div>
          </div>
          
          <div className="flex flex-row gap-2.5 items-center justify-start self-stretch flex-shrink-0 relative cursor-pointer hover:bg-gray-100 p-2 rounded">
            <img className="flex-shrink-0 w-5 h-5 relative overflow-visible" src={bellSlashIcon} alt="Bell Slash" />
            <div className="text-[#202020] text-left font-normal text-sm leading-[173%] relative">Mute Notification</div>
          </div>
          
          <div className="border-b border-[#b0b0b0] border-b-[0.8px] flex flex-row gap-2.5 items-center justify-start self-stretch flex-shrink-0 relative cursor-pointer hover:bg-gray-100 p-2 rounded">
            <img className="flex-shrink-0 w-5 h-5 relative overflow-visible" src={prohibitIcon} alt="Prohibit" />
            <div className="text-[#202020] text-left font-normal text-sm leading-[173%] relative">Clear Chat</div>
          </div>
          
          <div className="flex flex-row gap-2.5 items-center justify-start self-stretch flex-shrink-0 relative cursor-pointer hover:bg-gray-100 p-2 rounded">
            <img className="flex-shrink-0 w-6 h-6 relative overflow-visible" src={flagIcon} alt="Flag" />
            <div className="text-[#202020] text-left font-normal text-sm leading-[173%] relative">Report</div>
          </div>
          
          <div className="flex flex-row gap-2.5 items-center justify-start self-stretch flex-shrink-0 relative cursor-pointer hover:bg-gray-100 p-2 rounded">
            <img className="flex-shrink-0 w-5 h-5 relative overflow-visible" src={trashIcon} alt="Trash" />
            <div className="text-[#202020] text-left font-normal text-sm leading-[173%] relative">Delete Chat</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderOption;