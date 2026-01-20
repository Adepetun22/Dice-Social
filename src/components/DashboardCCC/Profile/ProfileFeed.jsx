import React, { useState } from "react";

const Tab2 = () => <div className="p-6">This is content for Tab 2</div>;
const Tab3 = () => <div className="p-6">This is content for Tab 3</div>;

const tabs = ["Posts", "Connections", "Events"];

const tabComponents = {
  Posts: <div className="p-6 text-black">This is content for Tab 1</div>,
  Connections: <Tab2 />,
  Events: <Tab3 />,
};

const ProfileFeed = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="max-w-4xl mx-auto ">
      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 px-6">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? "text-yellow-600 border-yellow-400"
                  : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="text-black">{tabComponents[activeTab]}</div>
    </div>
  );
};

export default ProfileFeed;
