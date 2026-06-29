import React from 'react';

const Stories = () => {
  const storyUsers = [
    { id: 1, username: 'your_story', avatar: 'https://i.pravatar.cc/150?img=68', isUser: true },
    { id: 2, username: 'cristiano', avatar: 'https://i.pravatar.cc/150?img=11' },
    { id: 3, username: 'leomessi', avatar: 'https://i.pravatar.cc/150?img=12' },
    { id: 4, username: 'selenagomez', avatar: 'https://i.pravatar.cc/150?img=13' },
    { id: 5, username: 'therock', avatar: 'https://i.pravatar.cc/150?img=14' },
    { id: 6, username: 'kyliejenner', avatar: 'https://i.pravatar.cc/150?img=15' },
    { id: 7, username: 'kimkardashian', avatar: 'https://i.pravatar.cc/150?img=16' },
    { id: 8, username: 'beyonce', avatar: 'https://i.pravatar.cc/150?img=17' },
  ];

  return (
    <div className="flex space-x-4 p-4 bg-white border-b border-gray-200 overflow-x-auto scrollbar-hide">
      {storyUsers.map((user) => (
        <div key={user.id} className="flex flex-col items-center space-y-1 cursor-pointer flex-shrink-0">
          <div className="relative">
            <div className={`w-16 h-16 rounded-full p-[2px] ${!user.isUser ? 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500' : ''}`}>
              <img
                src={user.avatar}
                alt={user.username}
                className="w-full h-full rounded-full border-2 border-white object-cover"
              />
            </div>
            {user.isUser && (
              <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full border-2 border-white w-5 h-5 flex items-center justify-center">
                <span className="text-white text-xs font-bold leading-none">+</span>
              </div>
            )}
          </div>
          <span className="text-xs text-gray-700 truncate w-16 text-center">
            {user.isUser ? 'Your story' : user.username}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Stories;
