import { MoreHorizontal, Heart, MessageCircle, Send, Bookmark, Info } from 'lucide-react';
import React, { useState } from 'react';

const Post = ({ video }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Fallbacks since backend only gives id, title, url, status
  const username = "video_platform_user";
  const avatar = "https://i.pravatar.cc/150?img=11";
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg mb-8 max-w-lg mx-auto overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center space-x-3 cursor-pointer">
          <img src={avatar} alt={username} className="w-8 h-8 rounded-full object-cover" />
          <span className="font-semibold text-sm">{username}</span>
          {video.status === 'UPLOADED' && (
             <span className="text-xs text-yellow-500 font-semibold bg-yellow-50 px-2 py-0.5 rounded-full border border-yellow-200 flex items-center space-x-1">
               <Info className="w-3 h-3" />
               <span>Processing</span>
             </span>
          )}
        </div>
        <MoreHorizontal className="w-5 h-5 text-gray-600 cursor-pointer" />
      </div>

      {/* Video Content */}
      <div className="w-full bg-black flex items-center justify-center min-h-[300px]">
        {video.url ? (
          <video 
            src={video.url} 
            controls 
            className="w-full max-h-[600px] object-contain"
            controlsList="nodownload"
            poster="https://via.placeholder.com/800x600/000000/FFFFFF?text=Video+Loading..."
          >
             Your browser does not support the video tag.
          </video>
        ) : (
          <div className="text-white text-sm flex flex-col items-center space-y-2 p-10">
            <Info className="w-8 h-8 text-gray-400" />
            <p>Video is still processing. URL not yet available.</p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-3">
        <div className="flex justify-between items-center mb-3">
          <div className="flex space-x-4">
            <Heart
              className={`w-6 h-6 cursor-pointer hover:text-gray-600 transition-colors ${isLiked ? 'fill-red-500 text-red-500 hover:text-red-500' : ''}`}
              onClick={() => setIsLiked(!isLiked)}
            />
            <MessageCircle className="w-6 h-6 cursor-pointer hover:text-gray-600 transition-colors" />
            <Send className="w-6 h-6 cursor-pointer hover:text-gray-600 transition-colors" />
          </div>
          <Bookmark
            className={`w-6 h-6 cursor-pointer hover:text-gray-600 transition-colors ${isSaved ? 'fill-black' : ''}`}
            onClick={() => setIsSaved(!isSaved)}
          />
        </div>

        {/* Likes */}
        <div className="font-semibold text-sm mb-1">0 likes</div>

        {/* Caption */}
        <div className="text-sm mb-2">
          <span className="font-semibold mr-2">{username}</span>
          {video.title}
        </div>

        {/* Add Comment */}
        <div className="text-sm text-gray-400 mt-2 flex items-center border-t border-gray-100 pt-3">
          <input 
            type="text" 
            placeholder="Add a comment..." 
            className="w-full focus:outline-none placeholder-gray-400"
          />
          <button className="text-blue-500 font-semibold ml-2 opacity-50">Post</button>
        </div>
      </div>
    </div>
  );
};

export default Post;
