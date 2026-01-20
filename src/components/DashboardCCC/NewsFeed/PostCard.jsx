import React, { useState, useRef, useEffect } from "react";
import { FaThumbsUp, FaRegComment, FaRetweet } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { FiLink, FiUserX, FiFlag, FiTrash2 } from "react-icons/fi";
import EmojiPicker from "../EmojiPicker"; // Importing the EmojiPicker component
import ReactionsPicker from "../ReactionsPicker"; // Importing the ReactionsPicker component

import Avatar from "../../../assets/Avatar.png";
import Freezer from "../../../assets/Freezer.png";

const PostCard = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [comments, setComments] = useState([]); // State to hold comments
  const [newComment, setNewComment] = useState(""); // State for new comment input
  const [showCommentInput, setShowCommentInput] = useState(false); // State to toggle comment input visibility
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // State to toggle emoji picker visibility
  const [showReactionsPicker, setShowReactionsPicker] = useState(false); // State to toggle reactions picker visibility
  const [selectedReaction, setSelectedReaction] = useState(null); // State to track selected reaction emoji
  const [reactions, setReactions] = useState({
    '👍': 0,
    '👎': 0,
    '❤️': 0,
    '😂': 0,
    '😮': 0,
    '😢': 0,
    '😡': 0,
    '🎉': 0,
    '🔥': 0,
    '💯': 0,
  }); // State to track reaction counts
  const dropdownRef = useRef(null);
  const likeButtonRef = useRef(null);

  // Close dropdown and reactions picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (likeButtonRef.current && !likeButtonRef.current.contains(event.target)) {
        setShowReactionsPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleMenuAction = (action) => {
    console.log(`${action} clicked`);
    setShowDropdown(false);
    // Add your action handlers here
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (newComment.trim() !== "") {
      setComments([...comments, newComment]);
      setNewComment("");
      setShowCommentInput(false); // Hide comment input after submission
    }
  };

  const handleEmojiClick = (emoji) => {
    setNewComment(newComment + emoji);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const toggleReactionsPicker = (e) => {
    e.stopPropagation();
    setShowReactionsPicker(!showReactionsPicker);
  };

  const handleReactionSelect = (emoji) => {
    setSelectedReaction(emoji);
    setReactions((prev) => ({
      ...prev,
      [emoji]: (prev[emoji] || 0) + 1,
    }));
    setShowReactionsPicker(false);
  };

  return (
    <div className="py-8">
      <div className="bg-white w-full rounded-lg shadow p-4 space-y-4">
        {/* Post Header */}
        <div className="flex justify-between items-start">
          <div className="flex gap-3 items-center">
            <img
              src={Avatar}
              alt="User"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h2 className="font-semibold text-gray-800">Courtney Henry</h2>
              <p className="text-sm text-gray-500">
                Acquaintance Customer · 5h
              </p>
            </div>
          </div>

          {/* Three Dots Menu */}
          <div className="relative" ref={dropdownRef}>
            <BsThreeDots
              className="text-xl text-gray-500 cursor-pointer hover:text-gray-700"
              onClick={handleDropdownToggle}
            />

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 top-8 text-[10px] w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                <button
                  onClick={() => handleMenuAction("Copy link to post")}
                  className="flex items-center gap-3 w-full px-4 py-2  text-gray-700 hover:bg-gray-50"
                >
                  <FiLink className="text-gray-500" />
                  Copy link to post
                </button>

                <button
                  onClick={() => handleMenuAction("Unfollow Courtney Henry")}
                  className="flex items-center gap-3 w-full px-4 py-2  text-gray-700 hover:bg-gray-50"
                >
                  <FiUserX className="text-gray-500" />
                  Unfollow
                </button>

                <button
                  onClick={() => handleMenuAction("Report Post")}
                  className="flex items-center gap-3 w-full px-4 py-2  text-gray-700 hover:bg-gray-50"
                >
                  <FiFlag className="text-gray-500" />
                  Report Post
                </button>

                <button
                  onClick={() => handleMenuAction("Delete")}
                  className="flex items-center gap-3 w-full px-4 py-2  text-red-600 hover:bg-red-50"
                >
                  <FiTrash2 className="text-red-600" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Post Content */}
        <p className="text-gray-700 text-sm">
          We have available brand new Deep Freezer for sale that comes with 2
          years warranty! Super cool breakdown! 🔥 <br />
          Replit really is underrated , excited for the full comparison! ...more
        </p>

        {/* Image */}
        <div>
          <img
            src={Freezer}
            alt="Deep Freezer"
            className="w-full rounded-lg object-cover"
          />
        </div>

        {/* Reactions */}
        <div className="flex justify-between text-sm text-gray-500">
          <p className="flex items-center gap-1">
            {Object.values(reactions).reduce((a, b) => a + b, 0) === 0 ? (
              <span>👍</span>
            ) : (
              Object.entries(reactions)
                .filter(([emoji, count]) => emoji !== '👍' && count > 0)
                .slice(0, 5)
                .map(([emoji]) => (
                  <span key={emoji}>{emoji}</span>
                ))
            )}
            {Object.entries(reactions).filter(([emoji, count]) => emoji !== '👍' && count > 0).length > 5 && (
              <span className="flex items-center justify-center w-5 h-5 bg-gray-100 rounded-full text-xs">+</span>
            )}
            {Object.values(reactions).reduce((a, b) => a + b, 0)}
          </p>
          <p>8 comments</p>
        </div>

        {/* Actions */}
        <div className="flex justify-around border-t border-b py-2 text-gray-700 text-sm font-medium relative">
          <div className="relative" ref={likeButtonRef}>
            <button 
              className="flex items-center gap-2 hover:text-blue-600"
              onClick={toggleReactionsPicker}
            >
              <FaThumbsUp />
              Like
            </button>
            {showReactionsPicker && (
              <ReactionsPicker 
                onReactionSelect={handleReactionSelect}
                positionClass="bottom-10 left-[calc(50%-8px)] sm:left-1/2 transform sm:-translate-x-1/2"
                marginLeft="0px"
              />
            )}
          </div>
          <button className="flex items-center gap-2 hover:text-blue-600" onClick={() => setShowCommentInput(true)}>
            <FaRegComment /> Comment
          </button>
          <button className="flex items-center gap-2 hover:text-blue-600">
            <FaRetweet /> Repost
          </button>
        </div>

        {/* Comment Input */}
        {showCommentInput && (
          <div className="flex gap-3 mt-3 relative">
            <input
              type="text"
              value={newComment}
              onChange={handleCommentChange}
              placeholder="Write a comment..."
              className="border rounded-md p-2 flex-grow"
            />
            <button onClick={toggleEmojiPicker} className="hover:text-blue-600">
              😊
            </button>
            {showEmojiPicker && (
              <EmojiPicker onEmojiSelect={(emoji) => handleEmojiClick(emoji)} positionClass="bottom-10 right-0" marginLeft="0px" />
            )}
          </div>
        )}

        {/* Comments Display */}
        {comments.map((comment, index) => (
          <div key={index} className="flex gap-3 mt-3">
            <img
              src={Avatar}
              alt="User"
              className="w-9 h-9 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-800">Annette Black</h3>
              <p className="text-sm text-gray-500">Personal Customer</p>
              <p className="text-gray-700 mt-1 text-sm">
                {comment}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostCard;
