import React from 'react';
import arrowBendUpLeftIcon from '../../../../assets/arrow-bend-up-left0.svg';
import copyIcon from '../../../../assets/copy0.svg';
import smileyIcon from '../../../../assets/smiley0.svg';
import pencilSimpleIcon from '../../../../assets/pencil-simple0.svg';
import trashIcon from '../../../../assets/trash0.svg';

const InnerChatOption = () => {
  return (
    <div className="rounded-lg flex flex-col gap-0 items-end justify-start w-[165px] relative shadow-md z-50">
      <div className="rounded-lg flex flex-col gap-0 items-start justify-start flex-shrink-0 w-[165px] relative shadow-md">
        <div className="bg-white rounded-md p-[10px] flex flex-col gap-2 items-start justify-center self-stretch flex-shrink-0 relative">
          <div className="flex flex-row gap-2.5 items-center justify-start self-stretch flex-shrink-0 relative cursor-pointer hover:bg-gray-100 p-[6px] rounded">
            <img className="flex-shrink-0 w-5 h-5 relative overflow-visible" src={arrowBendUpLeftIcon} alt="Arrow Bend Up Left" />
            <div className="text-[#202020] text-left font-normal text-sm leading-[173%] relative">Reply</div>
          </div>
          
          <div className="flex flex-row gap-2.5 items-center justify-start self-stretch flex-shrink-0 relative cursor-pointer hover:bg-gray-100 p-[6px] rounded">
            <img className="flex-shrink-0 w-5 h-5 relative overflow-visible" src={copyIcon} alt="Copy" />
            <div className="text-[#202020] text-left font-normal text-sm leading-[173%] relative">Copy</div>
          </div>
          
          <div className="flex flex-row gap-2.5 items-center justify-start self-stretch flex-shrink-0 relative cursor-pointer hover:bg-gray-100 p-[6px] rounded">
            <img className="flex-shrink-0 w-5 h-5 relative overflow-visible" src={smileyIcon} alt="Smiley" />
            <div className="text-[#202020] text-left font-normal text-sm leading-[173%] relative">React</div>
          </div>
          
          <div className="flex flex-row gap-2.5 items-center justify-start self-stretch flex-shrink-0 relative cursor-pointer hover:bg-gray-100 p-[6px] rounded">
            <img className="flex-shrink-0 w-5 h-5 relative overflow-visible" src={pencilSimpleIcon} alt="Pencil Simple" />
            <div className="text-[#202020] text-left font-normal text-sm leading-[173%] relative">React</div>
          </div>
          
          <div className="flex flex-row gap-2.5 items-center justify-start self-stretch flex-shrink-0 relative cursor-pointer hover:bg-gray-100 p-[6px] rounded">
            <img className="flex-shrink-0 w-5 h-5 relative overflow-visible" src={trashIcon} alt="Trash" />
            <div className="text-[#202020] text-left font-normal text-sm leading-[173%] relative">Delete</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InnerChatOption;