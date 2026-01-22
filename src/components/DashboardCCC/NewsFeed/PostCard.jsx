import React, { useState, useRef, useEffect } from "react";
import { FaThumbsUp, FaRegComment, FaRetweet, FaPaperPlane } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { FiLink, FiUserX, FiFlag, FiTrash2 } from "react-icons/fi";
import EmojiPicker from "../EmojiPicker";
import ReactionsPicker from "../ReactionsPicker";
import Comment from "./Comment";

import Avatar from "../../../assets/Avatar.png";

const PostCard = ({ post }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [comments, setComments] = useState([
    {
      id: 1,
      content: "This is a great product! I bought one last month and it's been amazing.",
      name: "Annette Black",
      userType: "Personal Customer",
      avatar: Avatar,
      liked: false,
      replies: [
        {
          id: 101,
          content: "Thanks for the feedback! Glad you like it.",
          name: "Courtney Henry",
          avatar: Avatar,
          liked: false,
        }
      ]
    }
  ]);
  const [newComment, setNewComment] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showReactionsPicker, setShowReactionsPicker] = useState(false);
  const [_selectedReaction, setSelectedReaction] = useState(null);
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
  });
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
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (newComment.trim() !== "") {
      const newCommentObj = {
        id: Date.now(),
        content: newComment,
        name: "Annette Black",
        userType: "Personal Customer",
        avatar: Avatar,
        liked: false,
        replies: []
      };
      setComments([...comments, newCommentObj]);
      setNewComment("");
      setShowCommentInput(false);
    }
  };

  // Handle like on a comment
  const handleCommentLike = (commentId) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return { ...comment, liked: !comment.liked };
      }
      // Also check replies
      if (comment.replies) {
        const updatedReplies = comment.replies.map(reply => {
          if (reply.id === commentId) {
            return { ...reply, liked: !reply.liked };
          }
          return reply;
        });
        return { ...comment, replies: updatedReplies };
      }
      return comment;
    }));
  };

  // Handle reply to a comment
  const handleCommentReply = (commentId, replyText) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        const newReply = {
          id: Date.now(),
          content: replyText,
          name: "Annette Black",
          avatar: Avatar,
          liked: false
        };
        return { 
          ...comment, 
          replies: comment.replies ? [...comment.replies, newReply] : [newReply]
        };
      }
      return comment;
    }));
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

  // Helper function to format timestamp
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "Just now";
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  // Use post data if available, otherwise use static data
  const author = post?.author || { name: "Courtney Henry", type: "Acquaintance Customer", avatar: Avatar };
  const content = post?.content || "We have available brand new Deep Freezer for sale that comes with 2 years warranty! Super cool breakdown! 🔥 Replit really is underrated , excited for the full comparison! ...more";
  const hasMedia = post?.mediaPreview && post?.media;
  const timestamp = post?.timestamp;

  return (
    <div className="py-5">
      <div className="bg-white w-full rounded-lg shadow p-4 space-y-4">
        {/* Post Header */}
        <div className="flex justify-between items-start">
          <div className="flex gap-3 items-center">
            <img
              src={author.avatar}
              alt="User"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h2 className="font-semibold text-gray-800">{author.name}</h2>
              <p className="text-sm text-gray-500">
                {author.type} · {formatTimestamp(timestamp)}
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
                  className="flex items-center gap-3 w-full px-4 py-2 text-gray-700 hover:bg-gray-50"
                >
                  <FiLink className="text-gray-500" />
                  Copy link to post
                </button>

                <button
                  onClick={() => handleMenuAction(`Unfollow ${author.name}`)}
                  className="flex items-center gap-3 w-full px-4 py-2 text-gray-700 hover:bg-gray-50"
                >
                  <FiUserX className="text-gray-500" />
                  Unfollow
                </button>

                <button
                  onClick={() => handleMenuAction("Report Post")}
                  className="flex items-center gap-3 w-full px-4 py-2 text-gray-700 hover:bg-gray-50"
                >
                  <FiFlag className="text-gray-500" />
                  Report Post
                </button>

                <button
                  onClick={() => handleMenuAction("Delete")}
                  className="flex items-center gap-3 w-full px-4 py-2 text-red-600 hover:bg-red-50"
                >
                  <FiTrash2 className="text-red-600" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Post Content */}
        {content && (
          <p className="text-gray-700 text-sm whitespace-pre-wrap">
            {content}
          </p>
        )}

        {/* Media (Image or Video) */}
        {hasMedia && (
          <div className="flex justify-center items-center">
            {post?.media?.type?.startsWith('video/') ? (
              <video
                src={post.mediaPreview}
                alt="Post media"
                className="w-full h-[calc(100%-140px)] sm:w-[calc(100%-140px)] rounded-lg object-cover"
                controls
              />
            ) : (
              <img
                src={post.mediaPreview}
                alt="Post media"
                className="w-full h-[calc(100%-140px)] sm:w-[calc(100%-140px)] rounded-lg object-cover"
              />
            )}
          </div>
        )}

        {/* Reactions */}
        <div className="flex justify-between text-sm text-gray-500">
          <p className="flex items-center gap-1">
            {Object.values(reactions).reduce((a, b) => a + b, 0) === 0 ? (
              <span>👍</span>
            ) : (
              Object.entries(reactions)
                .filter(([, count]) => count > 0)
                .slice(0, 5)
                .map(([emoji]) => (
                  <span key={emoji}>{emoji}</span>
                ))
            )}
            {Object.entries(reactions).filter(([, count]) => count > 0).length > 5 && (
              <span className="flex items-center justify-center w-5 h-5 bg-gray-100 rounded-full text-xs">+</span>
            )}
            {Object.values(reactions).reduce((a, b) => a + b, 0)}
          </p>
          <p>{comments.length} comments</p>
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
              onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit()}
            />
            <button onClick={toggleEmojiPicker} className="hover:text-blue-600">
              😊
            </button>
            <button 
              onClick={handleCommentSubmit} 
              className="hover:text-blue-600"
              disabled={!newComment.trim()}
            >
              <FaPaperPlane />
            </button>
            {showEmojiPicker && (
              <EmojiPicker onEmojiSelect={(emoji) => handleEmojiClick(emoji)} positionClass="bottom-10 right-0" marginLeft="0px" />
            )}
          </div>
        )}

        {/* Comments Display */}
        {comments.map((comment, index) => (
          <Comment
            key={comment.id || index}
            commentId={comment.id}
            avatar={comment.avatar}
            name={comment.name}
            userType={comment.userType}
            content={comment.content}
            replies={comment.replies || []}
            liked={comment.liked}
            onLike={handleCommentLike}
            onReply={handleCommentReply}
          />
        ))}
      </div>
    </div>
  );
};

export default PostCard;

