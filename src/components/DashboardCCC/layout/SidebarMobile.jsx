import { useState } from "react";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import {
  FaUser,
} from "react-icons/fa";
import Logo from "../../../assets/Logo.png";
import { RiMenu3Fill } from "react-icons/ri";
import { BiChevronDown, BiChevronRight } from "react-icons/bi";
import Contain from "../../../assets/Container.svg";
import Power from "../../../assets/Power.svg";

const menuItems = [
  {
    icon: <img src={Contain} className="text-[#FFD700]" />,
    label: "NewsFeed",
    path: "/newsfeed",
  },
  {
    icon: <img src={Contain} className="text-[#FFD700]" />,
    label: "Profile",
    path: "/profile",
  },
  {
    icon: <img src={Contain} className="text-[#FFD700]" />,
    label: "Chat Center",
    path: "/chatcenter",
  },
];

const SidebarItem = ({ item, isCollapsed }) => {
  const [open, setOpen] = useState(false);

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

const SidebarMobile = ({ isOpen, onClose }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    console.log("User logged out");
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  // Don't render anything when closed
  if (!isOpen) return null;

  const sidebarContent = (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 z-40 transition-opacity duration-300 ease-in-out"
        style={{ backgroundColor: '#00000000' }}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full z-50 w-64 bg-gradient-to-b from-[#000000] to-[#121212] text-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between gap-2 px-4 py-3 font-bold text-xl bg-gradient-to-b from-[#E8C000] to-[#FFD700] text-black">
          <Link to="/" onClick={onClose}>
            <img src={Logo} className="h-8 w-28" />
          </Link>

          <RiMenu3Fill
            className="text-white text-2xl cursor-pointer"
            onClick={onClose}
          />
        </div>

        {/* Main menu items */}
        <div className="flex flex-col h-[90vh] justify-between">
          <div className="flex flex-col gap-4 py-2 flex-1">
            {menuItems.map((item, idx) => (
              <SidebarItem key={idx} item={item} isCollapsed={false} />
            ))}
          </div>

          {/* Logout button at the bottom */}
          <div className="border-t border-gray-700">
            <div
              className="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-700 text-white text-xs"
              onClick={handleLogoutClick}
            >
              <span className="text-[#FFD700]">
                <img src={Power} className="text-xl text-[#FFD700]" />
              </span>
              <span className="text-[#9EA8B5]">Logout</span>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-yellow-600 text-xl">
                  ⚠️
                </span>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 text-center mb-6">
              Are you sure you want to log out?
            </h3>
            <div className="flex gap-3">
              <button
                onClick={handleLogoutCancel}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogoutConfirm}
                className="flex-1 px-4 py-2 bg-[#FFD700] hover:bg-[#1D1D1D] text-black hover:text-[#FFD700] rounded transition-colors"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );

  // Render the sidebar content into the document body using a portal
  return createPortal(sidebarContent, document.body);
};

export default SidebarMobile;

