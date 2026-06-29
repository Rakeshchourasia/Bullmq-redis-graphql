import React from 'react';
import Feed from './components/Feed';
import Auth from './components/Auth';
import { useAuth } from './context/AuthContext';
import { LogOut, Upload } from 'lucide-react';

function App() {
  const { user, logout } = useAuth();

  return (
    <div className="bg-gray-50 min-h-screen text-gray-900">
      {/* Navbar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold font-serif italic tracking-tighter cursor-pointer">
            VideoPlatform
          </h1>
          
          {user && (
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium hidden sm:block text-gray-600">
                Hi, {user.name}
              </span>
              <button className="flex items-center space-x-1 bg-blue-50 text-blue-600 border border-blue-100 px-3 py-1.5 rounded-lg font-semibold text-sm hover:bg-blue-100 transition-colors">
                <Upload className="w-4 h-4" />
                <span className="hidden sm:inline">Upload</span>
              </button>
              <button 
                onClick={logout}
                className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-50"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </header>
      
      {/* Main Content Area */}
      <main className="flex justify-center pb-16 md:pb-8">
        <div className="w-full max-w-2xl px-0 sm:px-4">
          {user ? <Feed /> : <Auth />}
        </div>
      </main>
    </div>
  );
}

export default App;
