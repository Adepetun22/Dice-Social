import React, { useState } from "react";
import { FiMessageSquare, FiUserMinus } from "react-icons/fi";

// Import avatar
import Avatar from "../../../assets/Avatar.png";

const ConnectionsList = ({ 
  connections = [
    {
      id: 1,
      name: "Courtney Henry",
      type: "Acquaintance Customer",
      avatar: Avatar,
      mutualConnections: 12
    },
    {
      id: 2,
      name: "Jacob Jones",
      type: "Business Customer",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      mutualConnections: 8
    },
    {
      id: 3,
      name: "Annette Black",
      type: "Personal Customer",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      mutualConnections: 5
    },
    {
      id: 4,
      name: "Wade Warren",
      type: "Business Representative",
      avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      mutualConnections: 15
    },
    {
      id: 5,
      name: "Esther Howard",
      type: "Personal Customer",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      mutualConnections: 3
    }
  ] 
}) => {
  const [connectedUsers, setConnectedUsers] = useState(connections);
  const [messageUsers, setMessageUsers] = useState([]);

  const handleRemoveConnection = (userId) => {
    setConnectedUsers(connectedUsers.filter(user => user.id !== userId));
    console.log(`Removed connection ${userId}`);
  };

  const handleMessage = (userId) => {
    if (!messageUsers.includes(userId)) {
      setMessageUsers([...messageUsers, userId]);
    }
    console.log(`Message user ${userId}`);
  };

  const isMessaged = (userId) => {
    return messageUsers.includes(userId);
  };

  return (
    <div className="py-4">
      <div className="space-y-4">
        {connectedUsers.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No connections yet</p>
            <p className="text-sm text-gray-400 mt-1">Start connecting with people!</p>
          </div>
        ) : (
          connectedUsers.map((user) => (
            <div 
              key={user.id} 
              className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {user.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {user.type}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {user.mutualConnections} mutual connections
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleMessage(user.id)}
                  disabled={isMessaged(user.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                    isMessaged(user.id)
                      ? "bg-green-100 text-green-700 cursor-default"
                      : "bg-primary-default text-white hover:opacity-90"
                  }`}
                >
                  <FiMessageSquare className="text-sm" />
                  {isMessaged(user.id) ? "Message Sent" : "Message"}
                </button>
                <button
                  onClick={() => handleRemoveConnection(user.id)}
                  className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <FiUserMinus className="text-sm" />
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ConnectionsList;

