import React from "react";
import ConnectsSuggestion from "../../components/DashboardCCC/NewsFeed/ConnectsSuggestion";
import UserProfileHeader from "../../components/DashboardCCC/Profile/UserProfileHeader";
import ProfileFeed from "../../components/DashboardCCC/Profile/ProfileFeed";

const ProfileCCC = () => {
  return (
    <div className="lg:py-8 px-4 bg-[#ffffff]">
      <div className="grid lg:grid-cols-4 grid-cols-1 gap-4">
        <div className="lg:col-span-3 col-span-4">
          <UserProfileHeader />
          <ProfileFeed />
        </div>
        <div className="col-span-4 lg:col-span-1">
          <ConnectsSuggestion />
        </div>
      </div>
    </div>
  );
};

export default ProfileCCC;
