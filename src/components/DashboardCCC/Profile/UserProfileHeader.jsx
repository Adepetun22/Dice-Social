import React, { useState } from "react";
import { FiEdit2 } from "react-icons/fi";

import Avatar from "../../../assets/Avatar.png";

const UserProfileHeader = () => {
  const [activeTab, setActiveTab] = useState("Posts");

  // Sample user data - replace with your actual data
  const userData = {
    name: "Fatimah Oladigbolu",
    connections: 15,
    description: "www.fatimahtechnology.com/Ovaboss",
    avatar: Avatar,
    coverPhoto:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
  };

  const tabs = ["Posts", "Connections"];

  const handleShareProfile = () => {
    console.log("Share profile clicked");
    // Add your share functionality here
  };

  const handleEditProfile = () => {
    console.log("Edit profile clicked");
    // Add your edit functionality here
  };

  return (
    <div className="bg-white  overflow-hidden w-full">
      {/* Cover Photo with Edit Icon */}
      <div className="relative h-52 bg-gradient-to-br from-pink-200 via-purple-200 to-orange-200 shadow-lg rounded-md">
        <img
          src={userData.coverPhoto}
          alt="Cover"
          className="w-full h-full object-cover opacity-60"
        />
        <button
          onClick={handleEditProfile}
          className="absolute top-3 right-3 p-2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full shadow-sm transition-all"
        >
          <FiEdit2 className="text-gray-600 text-sm" />
        </button>
      </div>

      {/* Profile Content */}
      <div className="px-6 pb-6">
        {/* Avatar and Profile Info */}
        <div className="flex items-end justify-between -mt-12 mb-4">
          <div className="relative">
            <img
              src={userData.avatar}
              alt={userData.name}
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
            <button
              onClick={handleEditProfile}
              className="absolute bottom-1 right-1 p-1.5 bg-yellow-400 hover:bg-yellow-500 rounded-full shadow-sm transition-colors"
            >
              <FiEdit2 className="text-black text-xs" />
            </button>
          </div>

          <button
            onClick={handleShareProfile}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-lg text-sm transition-colors"
          >
            Share Profile
          </button>
        </div>

        {/* User Info */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            {userData.name}
          </h1>
          <p className="text-sm text-gray-600 mb-2">
            {userData.connections} Connections
          </p>
          {/* <p className="text-sm text-yellow-600 font-medium hidden">
            {userData.description}
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default UserProfileHeader;
