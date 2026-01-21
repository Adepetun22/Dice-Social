import React, { useState } from "react";

import Avatar from "../../../assets/Avatar.png";

const OtherUserProfileHeader = () => {
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

  const handleContact = () => {
    console.log("Contact clicked");
    // Add your contact functionality here
  };

  const handleSendMessage = () => {
    console.log("Send message clicked");
    // Add your send message functionality here
  };

  return (
    <div className="bg-white  overflow-hidden w-full">
      {/* Cover Photo */}
      <div className="relative h-52 bg-gradient-to-br from-pink-200 via-purple-200 to-orange-200 shadow-lg rounded-md">
        <img
          src={userData.coverPhoto}
          alt="Cover"
          className="w-full h-full object-cover opacity-60"
        />
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
          </div>

          <div className="flex space-x-3">
            <button
              onClick={handleContact}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-lg text-sm transition-colors"
            >
              Contact
            </button>
            <button
              onClick={handleSendMessage}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-lg text-sm transition-colors"
            >
              Send message
            </button>
          </div>
        </div>

        {/* User Info */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            {userData.name}
          </h1>
          <p className="text-sm text-gray-600 mb-2">
            {userData.connections} Connections
          </p>
          <p className="text-sm text-yellow-600 font-medium">
            {userData.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OtherUserProfileHeader;
