import React, { useState, useRef, useEffect } from "react";
import { FaThumbsUp, FaRegComment, FaRetweet, FaTimes } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { FiLink, FiUserX, FiFlag, FiTrash2 } from "react-icons/fi";

import Avatar from "../../../assets/Avatar.png";
import Freezer from "../../../assets/Freezer.png";
import { MdAddBox } from "react-icons/md";

const SuggestionCard = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleMenuAction = (action) => {
    console.log(`${action} clicked`);
    setShowDropdown(false);
    // Add your action handlers here
  };

  return (
    <div className="py-8">
      <div className="bg-white w-full rounded-lg shadow p-4 space-y-4">
        <div className="inline-flex items-center justify-between border-b w-full pb-2">
          <p className="text-sm text-gray-400">Suggested</p>
          <FaTimes className="cursor-pointer text-gray-500" />
        </div>
        {/* Post Header */}
        <div className="flex justify-between items-start">
          <div className="flex gap-3 items-center">
            <img
              src={Avatar}
              alt="User"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h2 className="font-semibold text-gray-800">Courtney Henry</h2>
              <p className="text-sm text-gray-500">
                Acquaintance Customer · 5h
              </p>
            </div>
          </div>

          {/* Three Dots Menu */}
          <p className="text-xs font-bold inline-flex items-center cursor-pointer">
            <MdAddBox className="mr-1 text-base" /> Connect
          </p>
        </div>

        {/* Post Content */}
        <p className="text-gray-700 text-sm">
          We have available brand new Deep Freezer for sale that comes with 2
          years warranty! Super cool breakdown! 🔥 <br />
          Replit really is underrated , excited for the full comparison! ...more
        </p>

        {/* Image */}
        <div>
          <img
            src={Freezer}
            alt="Deep Freezer"
            className="w-full rounded-lg object-cover"
          />
        </div>

        {/* Reactions */}
        <div className="flex justify-between text-sm text-gray-500">
          <p>👍❤️ 36</p>
          <p>8 comments</p>
        </div>

        {/* Actions */}
        <div className="flex justify-around border-t border-b py-2 text-gray-700 text-sm font-medium">
          <button className="flex items-center gap-2 hover:text-blue-600">
            <FaThumbsUp /> Like
          </button>
          <button className="flex items-center gap-2 hover:text-blue-600">
            <FaRegComment /> Comment
          </button>
          <button className="flex items-center gap-2 hover:text-blue-600">
            <FaRetweet /> Repost
          </button>
        </div>

        {/* Comment */}
        <div className="flex gap-3 mt-3">
          <img
            src={Avatar}
            alt="User"
            className="w-9 h-9 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-800">Annette Black</h3>
            <p className="text-sm text-gray-500">Personal Customer</p>
            <p className="text-gray-700 mt-1 text-sm">
              Seeing the deep freezer, makes me want to have it already. Super
              cool breakdown! 🔥 Replit really is underrated, excited for the
              full comparison!
            </p>
            <div className="flex gap-4 mt-1 text-sm text-gray-500">
              <button className="hover:underline">Like</button>
              <button className="hover:underline">Reply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestionCard;
