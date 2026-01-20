import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

// You'll need to import your actual avatar image
// import Avatar from "../../../assets/Avatar.png";

const ConnectsSuggestion = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [connectedUsers, setConnectedUsers] = useState([]);

  // Sample user data - replace with your actual data
  const suggestedUsers = [
    {
      id: 1,
      name: "Jacob Jones",
      category: "Acquaintance Customer",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: 2,
      name: "Jacob Jones",
      category: "Acquaintance Customer",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: 3,
      name: "Jacob Jones",
      category: "Acquaintance Customer",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: 4,
      name: "Jacob Jones",
      category: "Acquaintance Customer",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  ];

  const handleConnect = (userId) => {
    setConnectedUsers([...connectedUsers, userId]);
    console.log(`Connected to user ${userId}`);
  };

  const isConnected = (userId) => {
    return connectedUsers.includes(userId);
  };

  const filteredUsers = suggestedUsers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg   w-full ">
      {/* Search Bar */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg text-sm"
        />
        <button className="absolute right-0 top-0 h-full px-3 bg-yellow-400 text-black rounded-r-lg hover:bg-black hover:text-yellow-400">
          <FiSearch className="text-sm" />
        </button>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Add to your feed
      </h3>

      {/* User Suggestions */}
      <div className="space-y-3">
        {filteredUsers.map((user) => (
          <div key={user.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h4 className="text-xs font-semibold text-gray-900">
                  {user.name}
                </h4>
                <p className="text-[10px] text-gray-500">{user.category}</p>
              </div>
            </div>

            <button
              onClick={() => handleConnect(user.id)}
              disabled={isConnected(user.id)}
              className={`text-xs font-semibold px-3 py-1 rounded transition-colors ${
                isConnected(user.id)
                  ? "text-green-600 bg-green-50 cursor-default"
                  : "text-yellow-500 hover:text-yellow-700 hover:bg-yellow-50"
              }`}
            >
              {isConnected(user.id) ? "✓ Connected" : "+ Connect"}
            </button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <p className="text-sm text-gray-600 text-center">
          More suggestions on the way
        </p>
      </div>
    </div>
  );
};

export default ConnectsSuggestion;
