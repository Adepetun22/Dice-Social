import React, { useState, useRef } from "react";
import { FaThumbsUp, FaRegComment, FaPaperPlane } from "react-icons/fa";
import EmojiPicker from "../EmojiPicker";
import ReactionsPicker from "../ReactionsPicker";
import Comment from "../NewsFeed/Comment";

import Avatar from "../../../assets/Avatar.png";
import ovabossads from "../../../assets/ovabossads.jpeg";

const SponsoredAdsCard = () => {
  const [comments, setComments] = useState([]);
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
  const likeButtonRef = useRef(null);

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

  // Handle like on a comment or reply
  const handleCommentLike = (commentId, reaction = null) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        // Toggle the reaction - if same reaction, remove it; otherwise set new reaction
        return { 
          ...comment, 
          likedReaction: comment.likedReaction === reaction ? null : reaction 
        };
      }
      // Check replies recursively
      if (comment.replies && comment.replies.length > 0) {
        const updatedReplies = comment.replies.map(reply => {
          if (reply.id === commentId) {
            return { 
              ...reply, 
              likedReaction: reply.likedReaction === reaction ? null : reaction 
            };
          }
          // Check nested replies
          if (reply.replies && reply.replies.length > 0) {
            const nestedReplies = reply.replies.map(nestedReply => {
              if (nestedReply.id === commentId) {
                return { 
                  ...nestedReply, 
                  likedReaction: nestedReply.likedReaction === reaction ? null : reaction 
                };
              }
              return nestedReply;
            });
            return { ...reply, replies: nestedReplies };
          }
          return reply;
        });
        return { ...comment, replies: updatedReplies };
      }
      return comment;
    }));
  };

  // Handle reply to a comment or nested reply
  const handleCommentReply = (parentId, replyText) => {
    setComments(comments.map(comment => {
      if (comment.id === parentId) {
        // Reply directly to the comment
        const newReply = {
          id: Date.now(),
          content: replyText,
          name: "Annette Black",
          avatar: Avatar,
          liked: false,
          replies: []
        };
        return { 
          ...comment, 
          replies: comment.replies ? [...comment.replies, newReply] : [newReply]
        };
      }
      // Check if replying to a reply
      if (comment.replies && comment.replies.length > 0) {
        const updatedReplies = comment.replies.map(reply => {
          if (reply.id === parentId) {
            // Reply to this reply
            const newReply = {
              id: Date.now(),
              content: replyText,
              name: "Annette Black",
              avatar: Avatar,
              liked: false,
              replies: []
            };
            return { 
              ...reply, 
              replies: reply.replies ? [...reply.replies, newReply] : [newReply]
            };
          }
          // Check nested replies
          if (reply.replies && reply.replies.length > 0) {
            const nestedReplies = reply.replies.map(nestedReply => {
              if (nestedReply.id === parentId) {
                const newReply = {
                  id: Date.now(),
                  content: replyText,
                  name: "Annette Black",
                  avatar: Avatar,
                  liked: false,
                  replies: []
                };
                return { 
                  ...nestedReply, 
                  replies: nestedReply.replies ? [...nestedReply.replies, newReply] : [newReply]
                };
              }
              return nestedReply;
            });
            return { ...reply, replies: nestedReplies };
          }
          return reply;
        });
        return { ...comment, replies: updatedReplies };
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

  return (
    <div className="py-5">
      <div className="bg-white w-full rounded-lg shadow p-4 space-y-4">
        {/* Sponsored Label with line */}
        <div className="border-b pb-2">
          <p className="text-sm text-gray-400">Sponsored</p>
        </div>

        {/* Post Header */}
        <div className="flex justify-between items-start">
          <div className="flex gap-3 items-center">
            <img
              src={Avatar}
              alt="User"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-gray-800">Ovaboss Brand</h2>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-yellow-400 text-black text-xs font-semibold rounded-full">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Verified
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Post Content */}
        <p className="text-gray-700 text-sm">
          🚀 Welcome to Ovaboss — the ultimate e-commerce platform for businesses! 
          <br /><br />
          Sell your products to thousands of customers with <strong>zero subscription fees</strong> and <strong>no monthly charges</strong>!
          <br /><br />
          ✅ Easy setup
          <br />
          ✅ Wide customer reach
          <br />
          ✅ Secure payments
          <br />
          ✅ No hidden fees
          <br /><br />
          Start selling today and grow your business with Ovaboss! 💼
        </p>

        {/* Image */}
        <div className="flex justify-center items-center">
          <img
            src={ovabossads}
            alt="Sponsored Ad"
            className="w-full h-[calc(100%-140px)] sm:w-[calc(100%-140px)] rounded-lg object-cover"
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
          <p>{comments.length} comments</p>
        </div>

        {/* Actions - Only Like and Comment, no Repost */}
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
            likedReaction={comment.likedReaction}
            onLike={handleCommentLike}
            onReply={handleCommentReply}
          />
        ))}
      </div>
    </div>
  );
};

export default SponsoredAdsCard;

