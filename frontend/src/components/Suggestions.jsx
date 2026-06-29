import React from 'react';

const Suggestions = () => {
  const suggestions = [
    { id: 1, username: 'tech_guru', name: 'Tech Guru', avatar: 'https://i.pravatar.cc/150?img=33', followedBy: 'Followed by ronaldo + 2 more' },
    { id: 2, username: 'design_daily', name: 'Design Daily', avatar: 'https://i.pravatar.cc/150?img=44', followedBy: 'Suggested for you' },
    { id: 3, username: 'nature_photography', name: 'Nature Photography', avatar: 'https://i.pravatar.cc/150?img=55', followedBy: 'New to Instagram' },
    { id: 4, username: 'travel_diaries', name: 'Travel Diaries', avatar: 'https://i.pravatar.cc/150?img=66', followedBy: 'Followed by leomessi' },
    { id: 5, username: 'foodie_vibes', name: 'Foodie Vibes', avatar: 'https://i.pravatar.cc/150?img=77', followedBy: 'Suggested for you' },
  ];

  return (
    <div className="hidden xl:block w-[320px] pt-8 pr-4">
      {/* User Profile Summary */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4 cursor-pointer">
          <img src="https://i.pravatar.cc/150?img=68" alt="Your Profile" className="w-14 h-14 rounded-full object-cover" />
          <div>
            <div className="font-semibold text-sm">your_username</div>
            <div className="text-gray-500 text-sm">Your Full Name</div>
          </div>
        </div>
        <button className="text-blue-500 text-xs font-semibold hover:text-blue-900">Switch</button>
      </div>

      {/* Suggestions Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-500 font-semibold text-sm">Suggested for you</span>
        <button className="text-xs font-semibold hover:text-gray-400">See All</button>
      </div>

      {/* Suggestion List */}
      <div className="space-y-4">
        {suggestions.map((suggestion) => (
          <div key={suggestion.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-3 cursor-pointer">
              <img src={suggestion.avatar} alt={suggestion.username} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <div className="font-semibold text-sm">{suggestion.username}</div>
                <div className="text-gray-500 text-xs">{suggestion.followedBy}</div>
              </div>
            </div>
            <button className="text-blue-500 text-xs font-semibold hover:text-blue-900">Follow</button>
          </div>
        ))}
      </div>
      
      {/* Footer links */}
      <div className="mt-8 text-xs text-gray-400 space-y-4">
        <div className="flex flex-wrap gap-x-2 gap-y-1">
          <a href="#" className="hover:underline">About</a> •
          <a href="#" className="hover:underline">Help</a> •
          <a href="#" className="hover:underline">Press</a> •
          <a href="#" className="hover:underline">API</a> •
          <a href="#" className="hover:underline">Jobs</a> •
          <a href="#" className="hover:underline">Privacy</a> •
          <a href="#" className="hover:underline">Terms</a> •
          <a href="#" className="hover:underline">Locations</a> •
          <a href="#" className="hover:underline">Language</a> •
          <a href="#" className="hover:underline">Meta Verified</a>
        </div>
        <div>© 2026 INSTAGRAM FROM META</div>
      </div>
    </div>
  );
};

export default Suggestions;
