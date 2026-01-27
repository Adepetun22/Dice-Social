import React, { useState } from "react";
import PostCard from "../NewsFeed/PostCard";
import ConnectionsList from "./ConnectionsList";
import EventLog from "./EventLog";

// Sample posts data for Posts tab
const samplePosts = [
  {
    id: 1,
    author: {
      name: "Courtney Henry",
      type: "Acquaintance Customer",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    content: "We have available brand new Deep Freezer for sale that comes with 2 years warranty! Super cool breakdown! 🔥 Replit really is underrated , excited for the full comparison!",
    timestamp: Date.now() - 3600000,
    mediaPreview: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600",
    media: { type: "image/jpeg" }
  },
  {
    id: 2,
    author: {
      name: "Jacob Jones",
      type: "Business Member",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    content: "Just launched my new product line! Check out our latest collection of handmade jewelry. Every piece tells a unique story.",
    timestamp: Date.now() - 7200000
  }
];

// Sample events data for Events tab
const sampleEvents = [
  {
    id: 1,
    date: "TODAY",
    time: "12:45 PM",
    title: "Sell Smart: Boost Your Online Sales in 30 Days",
    description: "Join us for a hands-on session designed to help small business owners and traders learn practical strategies to increase their sales on Ovaboss."
  },
  {
    id: 2,
    date: "TOMORROW",
    time: "10:00 AM",
    title: "Product Photography Masterclass",
    description: "Learn how to take stunning product photos that sell. Perfect for e-commerce sellers looking to improve their listings."
  },
  {
    id: 3,
    date: "JULY 25",
    time: "2:00 PM",
    title: "Customer Service Excellence Workshop",
    description: "Discover the secrets to providing exceptional customer service that keeps buyers coming back."
  }
];

const tabs = ["Posts", "Connections", "Events"];

const ProfileFeed = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleViewEvent = (eventId) => {
    console.log(`View event ${eventId}`);
    // Navigate to event details or open modal
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 px-6 bg-white rounded-t-lg">
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
      <div className="bg-white rounded-b-lg shadow">
        {activeTab === "Posts" && (
          <div className="space-y-4">
            {samplePosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {activeTab === "Connections" && (
          <ConnectionsList />
        )}

        {activeTab === "Events" && (
          <div className="p-4 space-y-4">
            {sampleEvents.map((event) => (
              <EventLog
                key={event.id}
                date={event.date}
                time={event.time}
                title={event.title}
                description={event.description}
                onViewEvent={() => handleViewEvent(event.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileFeed;
