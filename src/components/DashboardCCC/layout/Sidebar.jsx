import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  FaUser,
  FaUserCheck,
} from "react-icons/fa";
import Logo from "../../../assets/Logo.png";
import { RiMenu3Fill } from "react-icons/ri";
import { BiChevronDown, BiChevronRight } from "react-icons/bi";

import { FaCartShopping } from "react-icons/fa6";
import Contain3 from "../../../assets/Container3.svg";
import { AiOutlineExclamationCircle } from "react-icons/ai";

import Power from "../../../assets/Power.svg";

import { PiNewspaperFill } from "react-icons/pi";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { IoMdMailUnread } from "react-icons/io";

const menuItems = [
  {
    icon: <PiNewspaperFill className="text-xl text-[#FFD700]" />,
    label: "NewsFeed",
    path: "/newsfeed",
  },
  {
    icon: <FaUserCheck className="text-xl text-[#FFD700]" />,
    label: "Profile",
    path: "/profile",
  },
  {
    icon: <IoChatbubbleEllipsesSharp className="text-xl text-[#FFD700]" />,
    label: "Chat Center",
    path: "/chatcenter",
  },
];

// Logout Confirmation Modal Component
const LogoutModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

LogoutModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
            <span className="text-yellow-600 text-xl">
              <AiOutlineExclamationCircle />{" "}
            </span>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 text-center mb-6">
          Are you sure you want to log out?
        </h3>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-[#FFD700] hover:bg-[#1D1D1D] text-black hover:text-[#FFD700] rounded transition-colors"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

const SidebarItem = ({ item, isCollapsed }) => {
  const [open, setOpen] = useState(false);

SidebarItem.propTypes = {
  item: PropTypes.shape({
    path: PropTypes.string,
    icon: PropTypes.node,
    label: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.shape({
      path: PropTypes.string,
      icon: PropTypes.node,
      label: PropTypes.string,
      children: PropTypes.array
    }))
  }).isRequired,
  isCollapsed: PropTypes.bool.isRequired
};

  const hasChildren = item.children && item.children.length > 0;

  const handleItemClick = (e) => {
    if (hasChildren) {
      e.preventDefault();
      setOpen(!open);
    }
  };

  return (
    <div className="w-full text-xs ">
      <Link to={item.path || "#"} className="block" onClick={handleItemClick}>
        <div className="flex items-center justify-between px-4 py-2 cursor-pointer  hover:bg-gray-700 text-white">
          <div className="flex items-center gap-2">
            <span className="text-[#FFD700]">{item.icon}</span>
            {!isCollapsed && (
              <span className="text-[#9EA8B5]">{item.label}</span>
            )}
          </div>
          {hasChildren &&
            !isCollapsed &&
            (open ? (
              <BiChevronDown className="text-[#FFD700]" />
            ) : (
              <BiChevronRight className="text-[#9EA8B5]" />
            ))}
        </div>
      </Link>
      {hasChildren && open && !isCollapsed && (
        <div className="pl-6">
          {item.children.map((child, idx) => (
            <SidebarItem key={idx} item={child} isCollapsed={isCollapsed} />
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    // Add your logout logic here
    // For example: dispatch logout action, clear tokens, redirect to login
    console.log("User logged out");
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      <div
        className={`${
          isCollapsed ? "w-16" : "w-1/5"
        } transition-all duration-300 lg:min-h-screen overflow-y-auto h-full hidden lg:flex bg-gradient-to-b from-[#000000] to-[#121212] text-white shadow-lg flex-col`}
      >
        <div className="flex items-center justify-between gap-2 px-4 py-3 font-bold text-xl bg-gradient-to-b from-[#E8C000] to-[#FFD700] text-black">
          {!isCollapsed && (
            <Link to="/">
              <img src={Logo} className="h-8 w-28" />
            </Link>
          )}

          <RiMenu3Fill
            className={`text-white text-2xl cursor-pointer ${
              isCollapsed ? "mx-auto" : ""
            }`}
            onClick={toggleSidebar}
          />
        </div>

        {/* Main menu items */}
        <div className="flex flex-col h-[90vh] justify-between">
          <div className="flex flex-col gap-4 py-2 flex-1">
            {menuItems.map((item, idx) => (
              <SidebarItem key={idx} item={item} isCollapsed={isCollapsed} />
            ))}
          </div>

          {/* Logout button at the bottom */}
          <div className=" border-t border-gray-700 ">
            <div
              className="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-700 text-white text-xs"
              onClick={handleLogoutClick}
            >
              <span className="text-[#FFD700]">
                <img src={Power} className="text-xl text-[#FFD700]" />
              </span>
              {!isCollapsed && <span className="text-[#9EA8B5]">Logout</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Logout Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onConfirm={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
      />
    </>
  );
};

export default Sidebar;