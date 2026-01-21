import React, { useState } from "react";
import CreatePost from "../../components/DashboardCCC/NewsFeed/CreatePost";
import PostCard from "../../components/DashboardCCC/NewsFeed/PostCard";
import SuggestionCard from "../../components/DashboardCCC/NewsFeed/SuggestionCard";
import ConnectsSuggestion from "../../components/DashboardCCC/NewsFeed/ConnectsSuggestion";

const NewsFeed = () => {
  const [posts, setPosts] = useState([]);

  const handleNewPost = (postData) => {
    const newPost = {
      id: Date.now(),
      ...postData,
      timestamp: new Date().toISOString(),
    };
    setPosts(prev => [newPost, ...prev]);
  };

  return (
    <div className="lg:py-8 px-4 bg-white">
      <div className="grid lg:grid-cols-4 grid-cols-1 gap-4">
        <div className="col-span-4 lg:col-span-1 order-first lg:order-last">
          <ConnectsSuggestion />
        </div>
        <div className="lg:col-span-3 col-span-4 order-last lg:order-first">
          <CreatePost onPostSubmit={handleNewPost} />

          {/* Render new posts from CreatePost */}
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}

          {/* Existing static posts */}
          <SuggestionCard />
          <PostCard />
        </div>
      </div>
    </div>
  );
};

export default NewsFeed;

