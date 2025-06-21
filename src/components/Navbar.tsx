import React, { useState } from 'react';
import { User, Menu, X, Shield, Users, Briefcase } from 'lucide-react';

interface NavbarProps {
  currentUser?: any;
  onLoginClick: () => void;
  onRegisterClick: () => void;
  currentView: string;
  onViewChange: (view: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  currentUser, 
  onLoginClick, 
  onRegisterClick, 
  currentView, 
  onViewChange 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => onViewChange('home')}
            >
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <Users className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold text-gray-900">CountConnect</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {currentUser ? (
                <>
                  <button
                    onClick={() => onViewChange('dashboard')}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentView === 'dashboard'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    Dashboard
                  </button>
                  {currentUser.type === 'student' && (
                    <button
                      onClick={() => onViewChange('jobs')}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        currentView === 'jobs'
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-700 hover:text-blue-600'
                      }`}
                    >
                      <Briefcase className="inline h-4 w-4 mr-1" />
                      Find Jobs
                    </button>
                  )}
                  {currentUser.type === 'company' && (
                    <button
                      onClick={() => onViewChange('post-job')}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        currentView === 'post-job'
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-700 hover:text-blue-600'
                      }`}
                    >
                      Post Job
                    </button>
                  )}
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-gray-600" />
                    <span className="text-sm text-gray-700">{currentUser.name}</span>
                    {currentUser.isVerified && (
                      <Shield className="h-4 w-4 text-green-600" />
                    )}
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={onLoginClick}
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={onRegisterClick}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Get Started
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {currentUser ? (
              <>
                <button
                  onClick={() => {
                    onViewChange('dashboard');
                    setIsMenuOpen(false);
                  }}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 w-full text-left"
                >
                  Dashboard
                </button>
                {currentUser.type === 'student' && (
                  <button
                    onClick={() => {
                      onViewChange('jobs');
                      setIsMenuOpen(false);
                    }}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 w-full text-left"
                  >
                    Find Jobs
                  </button>
                )}
                {currentUser.type === 'company' && (
                  <button
                    onClick={() => {
                      onViewChange('post-job');
                      setIsMenuOpen(false);
                    }}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 w-full text-left"
                  >
                    Post Job
                  </button>
                )}
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    onLoginClick();
                    setIsMenuOpen(false);
                  }}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 w-full text-left"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    onRegisterClick();
                    setIsMenuOpen(false);
                  }}
                  className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700 w-full text-left"
                >
                  Get Started
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;