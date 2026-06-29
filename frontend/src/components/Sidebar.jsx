import { Home, Search, Compass, Film, MessageCircle, Heart, PlusSquare, Menu } from 'lucide-react';
import React from 'react';

const Sidebar = () => {
  const navItems = [
    { icon: Home, label: 'Home' },
    { icon: Search, label: 'Search' },
    { icon: Compass, label: 'Explore' },
    { icon: Film, label: 'Reels' },
    { icon: MessageCircle, label: 'Messages' },
    { icon: Heart, label: 'Notifications' },
    { icon: PlusSquare, label: 'Create' },
    { icon: () => <img src="https://i.pravatar.cc/150?img=68" alt="Profile" className="w-6 h-6 rounded-full" />, label: 'Profile' },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-20 lg:w-64 h-screen fixed border-r border-gray-200 bg-white p-4 z-50">
        <div className="mb-8 mt-4 px-2 hidden lg:block">
          <h1 className="text-2xl font-bold font-serif italic tracking-tighter cursor-pointer">Instagram</h1>
        </div>
        <div className="mb-8 mt-4 px-2 lg:hidden flex justify-center">
           <Home className="w-6 h-6" /> {/* Temporary logo replacement for small screens */}
        </div>
        <nav className="flex-1 space-y-1">
          {navItems.map((item, index) => (
            <a key={index} href="#" className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-100 transition-colors group">
              <item.icon className="w-6 h-6 group-hover:scale-105 transition-transform" />
              <span className="text-base hidden lg:block font-normal">{item.label}</span>
            </a>
          ))}
        </nav>
        <div className="mt-auto">
          <a href="#" className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-100 transition-colors group">
            <Menu className="w-6 h-6 group-hover:scale-105 transition-transform" />
            <span className="text-base hidden lg:block font-normal">More</span>
          </a>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 w-full bg-white border-t border-gray-200 flex justify-around items-center p-3 z-50">
        <Home className="w-7 h-7" />
        <Search className="w-7 h-7" />
        <PlusSquare className="w-7 h-7" />
        <Film className="w-7 h-7" />
        <img src="https://i.pravatar.cc/150?img=68" alt="Profile" className="w-7 h-7 rounded-full" />
      </div>
      
      {/* Mobile Top Navigation */}
      <div className="md:hidden fixed top-0 w-full bg-white border-b border-gray-200 flex justify-between items-center p-4 z-50">
        <h1 className="text-xl font-bold font-serif italic tracking-tighter">Instagram</h1>
        <div className="flex space-x-4">
           <Heart className="w-6 h-6" />
           <MessageCircle className="w-6 h-6" />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
