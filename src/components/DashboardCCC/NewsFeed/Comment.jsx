import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaPaperPlane, FaHeart, FaRegHeart } from "react-icons/fa";
import EmojiPicker from "../EmojiPicker";

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
  depth = 0
}) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [showReplyEmojiPicker, setShowReplyEmojiPicker] = useState(false);

  const handleReplySubmit = () => {
    if (replyText.trim() !== "" && onReply) {
      onReply(commentId, replyText);
      setReplyText("");
      setShowReplyInput(false);
    }
  };

  const handleReplyEmojiClick = (emoji) => {
    setReplyText(replyText + emoji);
    setShowReplyEmojiPicker(false);
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
            <div className="relative">
              <button 
                onClick={() => onLike && onLike(commentId)}
                className={`flex items-center gap-2 ${liked ? 'text-red-500' : 'hover:text-blue-600'}`}
              >
                {liked ? (
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M104 224H24c-13.255 0-24 10.745-24 24v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V248c0-13.255-10.745-24-24-24zM64 472c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zM384 81.452c0 42.416-25.97 66.208-33.277 94.548h101.723c33.397 0 59.397 27.746 59.553 58.098.084 17.938-7.546 37.249-19.439 49.197l-.11.11c9.836 23.337 8.237 56.037-9.308 79.469 8.681 25.895-.069 57.704-16.382 74.757 4.298 17.598 2.244 32.575-6.148 44.632C440.202 511.587 389.616 512 346.839 512l-2.845-.001c-48.287-.017-87.806-17.598-119.56-31.725-15.957-7.099-36.821-15.887-52.651-16.178-6.54-.12-11.783-5.457-11.783-11.998v-213.77c0-3.2 1.282-6.271 3.558-8.521 39.614-39.144 56.648-80.587 89.117-113.111 14.804-14.832 20.188-37.236 25.393-58.902C282.515 39.293 291.817 0 312 0c24 0 72 8 72 81.452z"></path>
                  </svg>
                ) : (
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M104 224H24c-13.255 0-24 10.745-24 24v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V248c0-13.255-10.745-24-24-24zM64 472c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zM384 81.452c0 42.416-25.97 66.208-33.277 94.548h101.723c33.397 0 59.397 27.746 59.553 58.098.084 17.938-7.546 37.249-19.439 49.197l-.11.11c9.836 23.337 8.237 56.037-9.308 79.469 8.681 25.895-.069 57.704-16.382 74.757 4.298 17.598 2.244 32.575-6.148 44.632C440.202 511.587 389.616 512 346.839 512l-2.845-.001c-48.287-.017-87.806-17.598-119.56-31.725-15.957-7.099-36.821-15.887-52.651-16.178-6.54-.12-11.783-5.457-11.783-11.998v-213.77c0-3.2 1.282-6.271 3.558-8.521 39.614-39.144 56.648-80.587 89.117-113.111 14.804-14.832 20.188-37.236 25.393-58.902C282.515 39.293 291.817 0 312 0c24 0 72 8 72 81.452z"></path>
                  </svg>
                )}
                Like
              </button>
            </div>
            <button 
              onClick={() => setShowReplyInput(!showReplyInput)}
              className="hover:underline"
            >
              Reply
            </button>
          </div>

          {/* Reply Input with Emoji Picker */}
          {showReplyInput && (
            <div className="flex gap-2 mt-2 pl-2 relative">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write a reply..."
                className="border rounded-md p-2 flex-grow text-sm"
                onKeyPress={(e) => e.key === 'Enter' && handleReplySubmit()}
              />
              <button onClick={() => setShowReplyEmojiPicker(!showReplyEmojiPicker)} className="hover:text-blue-600">
                😊
              </button>
              <button 
                onClick={handleReplySubmit}
                className="hover:text-blue-600"
                disabled={!replyText.trim()}
              >
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"></path>
                </svg>
              </button>
              {showReplyEmojiPicker && (
                <EmojiPicker 
                  onEmojiSelect={(emoji) => handleReplyEmojiClick(emoji)} 
                  positionClass="bottom-10 right-12"
                  marginLeft="0px"
                />
              )}
            </div>
          )}

          {/* Threaded Replies */}
          {replies.length > 0 && (
            <div className="mt-2">
              {replies.map((reply, index) => (
                <Comment
                  key={reply.id || `${commentId}-reply-${index}`}
                  commentId={reply.id || `${commentId}-reply-${index}`}
                  avatar={reply.avatar || avatar}
                  name={reply.name || name}
                  userType={reply.userType || "User"}
                  content={reply.content}
                  replies={reply.replies || []}
                  liked={reply.liked || false}
                  onLike={onLike}
                  onReply={onReply}
                  depth={depth + 1}
                />
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
  userType: PropTypes.string,
  content: PropTypes.string.isRequired,
  commentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  replies: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.string.isRequired,
    name: PropTypes.string,
    avatar: PropTypes.string,
    userType: PropTypes.string,
    liked: PropTypes.bool,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    replies: PropTypes.array,
  })),
  liked: PropTypes.bool,
  onLike: PropTypes.func,
  onReply: PropTypes.func,
  depth: PropTypes.number,
};

export default Comment;

