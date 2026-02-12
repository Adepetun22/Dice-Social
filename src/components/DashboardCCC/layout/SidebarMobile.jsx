import { useState } from "react";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import {
  FaUser,
  FaWallet,
  FaFileInvoice,
  FaMoneyBillWave,
} from "react-icons/fa";
import Logo from "../../../assets/Logo.png";
import { RiMenu3Fill } from "react-icons/ri";
import { BiChevronDown, BiChevronRight } from "react-icons/bi";
import Contain from "../../../assets/Container.svg";
import Contain2 from "../../../assets/Container2.svg";
import { FaCartShopping } from "react-icons/fa6";
import Contain3 from "../../../assets/Container3.svg";

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
  if (!isOpen) return null;

  const sidebarContent = (
    <>
      {/* Overlay - now fully transparent */}
      <div 
        className="fixed inset-0 bg-transparent z-40 transition-opacity duration-300 ease-in-out"
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
        </div>
        <div className="flex flex-col gap-1 py-2">
          {menuItems.map((item, idx) => (
            <SidebarItem key={idx} item={item} isCollapsed={false} />
          ))}
        </div>
      </div>
    </>
  );

  // Render the sidebar content into the document body using a portal
  return createPortal(sidebarContent, document.body);
};

export default SidebarMobile;