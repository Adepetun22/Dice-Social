import React, { useState, useRef, useEffect } from "react";
import { MdPhoto } from "react-icons/md";
import Avatar from "../../../assets/Avatar.png";
import EmojiPicker from "../EmojiPicker";

import { BsEmojiSmile } from "react-icons/bs";

const CreatePost = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const fileInputRef = useRef(null);
  const emojiPickerRef = useRef(null);

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to handle emoji selection
  const handleEmojiSelect = (emoji) => {
    setPostContent(prev => prev + emoji);
    // Keep emoji picker open for multiple selections
  };

  // Function to handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedMedia(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to remove selected media
  const removeMedia = () => {
    setSelectedMedia(null);
    setMediaPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Function to handle post submission
  const handlePost = () => {
    if (postContent.trim() || selectedMedia) {
      console.log('Posting:', {
        content: postContent,
        media: selectedMedia
      });
      // Reset form after post
      setPostContent("");
      setSelectedMedia(null);
      setMediaPreview(null);
      setIsModalOpen(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Open file picker
  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow p-4 w-full mx-auto">
        <h2 className="text-gray-800 font-semibold mb-4">Create a post</h2>

        <div className="flex items-start gap-3 mb-4">
          {/* Avatar */}
          <img
            src={Avatar}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />

          {/* Input box */}
          <input
            type="text"
            placeholder="Write something here..."
            readOnly
            onClick={() => setIsModalOpen(true)}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 cursor-pointer text-gray-600"
          />
        </div>
        <hr />
        {/* Photo/Video button */}
        <button 
          className="flex items-center gap-2 text-yellow-500 font-medium hover:bg-yellow-50 px-3 py-2 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          <MdPhoto className="text-xl" />
          Photo/Video
        </button>
      </div>

      {/* Full Post Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center" 
          style={{ backgroundColor: 'hsl(0deg 0% 0% / 40%)' }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsModalOpen(false);
              setPostContent("");
              setSelectedMedia(null);
              setMediaPreview(null);
              setShowEmojiPicker(false);
            }
          }}
        >
          <div className="bg-white rounded-lg shadow-xl w-full max-w-xl p-5 relative">
            {/* Close button */}
            <button 
              onClick={() => {
                setIsModalOpen(false);
                setPostContent("");
                setSelectedMedia(null);
                setMediaPreview(null);
                setShowEmojiPicker(false);
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* User Info */}
            <div className="flex items-center gap-3 mb-4">
              <img
                src={Avatar}
                alt="User"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-900">
                  Fatimah Oladigbolu
                </h3>
                <p className="text-sm text-gray-500">Personal Customer</p>
              </div>
            </div>

            {/* Text area */}
            <textarea
              rows="4"
              placeholder="What product do you want to talk about?"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-yellow-400 text-gray-800"
            />

            {/* Media Preview */}
            {mediaPreview && (
              <div className="relative mt-4 w-24 h-24">
                {selectedMedia?.type.startsWith('video/') ? (
                  <video 
                    src={mediaPreview} 
                    className="w-full h-full rounded-lg object-cover"
                    controls
                  />
                ) : (
                  <img 
                    src={mediaPreview} 
                    alt="Preview" 
                    className="w-full h-full rounded-lg object-cover"
                  />
                )}
                <button
                  onClick={removeMedia}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}

            {/* Action row */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex gap-4">
                <div className="relative" ref={emojiPickerRef}>
                  <button 
                    className="text-xl text-gray-600 cursor-pointer"
                    style={{ background: 'none', border: 'none', padding: 0 }}
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  >
                    <BsEmojiSmile />
                  </button>
                
                  {/* Emoji Picker */}
                  {showEmojiPicker && (
                    <EmojiPicker onEmojiSelect={handleEmojiSelect} marginLeft="0px" />
                  )}
                </div>

                {/* Hidden file input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept="image/*,video/*"
                  className="hidden"
                />

                {/* Photo/Video button */}
                <button 
                  className="flex items-center gap-2 text-yellow-500 font-medium hover:bg-yellow-50 px-2 py-1 rounded"
                  style={{ background: 'none', border: 'none' }}
                  onClick={openFilePicker}
                >
                  <svg 
                    stroke="currentColor" 
                    fill="currentColor" 
                    strokeWidth="0" 
                    viewBox="0 0 24 24" 
                    className="text-xl" 
                    height="1em" 
                    width="1em" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"></path>
                  </svg>
                </button>
              </div>
              <button
                className={`px-4 py-2 rounded ${
                  postContent.trim() || selectedMedia
                    ? 'bg-yellow-400 text-black hover:bg-black hover:text-yellow-400'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                onClick={handlePost}
                disabled={!postContent.trim() && !selectedMedia}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePost;

