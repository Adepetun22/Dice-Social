import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaPaperPlane, FaHeart, FaRegHeart } from "react-icons/fa";

const Comment = ({ 
  avatar, 
  name, 
  userType, 
  content, 
  commentId,
  replies = [],
  liked = false,
  onLike,
  onReply,
  showEmojiPicker,
  onEmojiSelect
}) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReplySubmit = () => {
    if (replyText.trim() !== "" && onReply) {
      onReply(commentId, replyText);
      setReplyText("");
      setShowReplyInput(false);
    }
  };

  const handleReplyEmojiClick = (emoji) => {
    setReplyText(replyText + emoji);
  };

  return (
    <div className="mt-3">
      <div className="flex gap-3">
        <img
          alt="User"
          className="w-9 h-9 rounded-full object-cover"
          src={avatar}
        />
        <div className="flex-1">
          <div className="bg-gray-50 rounded-lg p-3">
            <h3 className="font-semibold text-gray-800 text-sm">{name}</h3>
            <p className="text-xs text-gray-500">{userType}</p>
            <p className="text-gray-700 mt-1 text-sm">{content}</p>
          </div>
          
          {/* Like and Reply buttons */}
          <div className="flex gap-4 mt-1 text-sm text-gray-500 pl-2">
            <button 
              onClick={() => onLike && onLike(commentId)}
              className={`hover:underline flex items-center gap-1 ${liked ? 'text-red-500' : ''}`}
            >
              {liked ? <FaHeart className="text-xs" /> : <FaRegHeart className="text-xs" />}
              Like
            </button>
            <button 
              onClick={() => setShowReplyInput(!showReplyInput)}
              className="hover:underline"
            >
              Reply
            </button>
          </div>

          {/* Reply Input */}
          {showReplyInput && (
            <div className="flex gap-2 mt-2 pl-2">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write a reply..."
                className="border rounded-md p-2 flex-grow text-sm"
                onKeyPress={(e) => e.key === 'Enter' && handleReplySubmit()}
              />
              <button 
                onClick={handleReplySubmit}
                className="hover:text-blue-600"
                disabled={!replyText.trim()}
              >
                <FaPaperPlane />
              </button>
              {showEmojiPicker && (
                <button onClick={() => handleReplyEmojiClick("😊")} className="hover:text-blue-600">
                  😊
                </button>
              )}
            </div>
          )}

          {/* Threaded Replies */}
          {replies.length > 0 && (
            <div className="ml-8 mt-2 border-l-2 border-gray-200 pl-4">
              {replies.map((reply, index) => (
                <div key={index} className="flex gap-2 mt-2">
                  <img
                    alt="User"
                    className="w-7 h-7 rounded-full object-cover"
                    src={reply.avatar || avatar}
                  />
                  <div className="flex-1">
                    <div className="bg-gray-100 rounded-lg p-2">
                      <h3 className="font-semibold text-gray-800 text-xs">{reply.name || name}</h3>
                      <p className="text-gray-700 mt-0.5 text-sm">{reply.content}</p>
                    </div>
                    <div className="flex gap-4 mt-0.5 text-xs text-gray-500 pl-1">
                      <button 
                        onClick={() => onLike && onLike(reply.id || `${commentId}-reply-${index}`)}
                        className={`hover:underline flex items-center gap-1 ${reply.liked ? 'text-red-500' : ''}`}
                      >
                        {reply.liked ? <FaHeart className="text-xs" /> : <FaRegHeart className="text-xs" />}
                        Like
                      </button>
                      <button 
                        onClick={() => setShowReplyInput(!showReplyInput)}
                        className="hover:underline"
                      >
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Comment.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  userType: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  commentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  replies: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.string.isRequired,
    name: PropTypes.string,
    avatar: PropTypes.string,
    liked: PropTypes.bool,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  })),
  liked: PropTypes.bool,
  onLike: PropTypes.func,
  onReply: PropTypes.func,
  showEmojiPicker: PropTypes.bool,
  onEmojiSelect: PropTypes.func,
};

export default Comment;

