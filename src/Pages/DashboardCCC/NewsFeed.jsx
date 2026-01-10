import React from "react";
import CreatePost from "../../components/DashboardCCC/NewsFeed/CreatePost";
import PostCard from "../../components/DashboardCCC/NewsFeed/PostCard";
import SuggestionCard from "../../components/DashboardCCC/NewsFeed/SuggestionCard";
import ConnectsSuggestion from "../../components/DashboardCCC/NewsFeed/ConnectsSuggestion";

const NewsFeed = () => {
  return (
    <div className="lg:py-8 px-4">
      <div className="grid lg:grid-cols-4 grid-cols-1 gap-4">
        <div className="lg:col-span-3 col-span-4">
          <CreatePost />

          <SuggestionCard />
          <PostCard />
        </div>
        <div className="col-span-4 lg:col-span-1">
          <ConnectsSuggestion />
        </div>
      </div>
    </div>
  );
};

export default NewsFeed;
