import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Menu, X, Shield, Users, Briefcase, LogOut, Home } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useAuth } from '../../hooks/useAuth';
import GlassCard from '../ui/GlassCard';

interface NavbarProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
  currentView: string;
  onViewChange: (view: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  onLoginClick, 
  onRegisterClick, 
  currentView, 
  onViewChange 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onViewChange('home');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navItems = isAuthenticated ? [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'feed', label: 'Feed', icon: Users },
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
    { id: 'profile', label: 'Profile', icon: User },
  ] : [];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 p-4"
    >
      <GlassCard className="px-6 py-4">
        <div className="flex justify-between items-center">
          <motion.div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => onViewChange('home')}
            whileHover={{ scale: 1.05 }}
          >
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-xl">
              <Users className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              CountConnect
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => onViewChange(item.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                      currentView === item.id
                        ? 'bg-white/20 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </motion.button>
                ))}
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 text-gray-300">
                    <User className="h-5 w-5" />
                    <span className="text-sm">{user?.email}</span>
                    <Shield className="h-4 w-4 text-green-400" />
                  </div>
                  <motion.button
                    onClick={handleLogout}
                    className="text-gray-300 hover:text-red-400 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <LogOut className="h-5 w-5" />
                  </motion.button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <motion.button
                  onClick={onLoginClick}
                  className="text-gray-300 hover:text-white px-4 py-2 rounded-xl transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Login
                </motion.button>
                <motion.button
                  onClick={onRegisterClick}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl font-medium transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pt-4 border-t border-white/10"
          >
            <div className="space-y-2">
              {isAuthenticated ? (
                <>
                  {navItems.map((item) => (
                    <motion.button
                      key={item.id}
                      onClick={() => {
                        onViewChange(item.id);
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                      whileHover={{ x: 5 }}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </motion.button>
                  ))}
                  <motion.button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-300"
                    whileHover={{ x: 5 }}
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.button
                    onClick={() => {
                      onLoginClick();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 text-left"
                    whileHover={{ x: 5 }}
                  >
                    Login
                  </motion.button>
                  <motion.button
                    onClick={() => {
                      onRegisterClick();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium transition-all duration-300 text-left"
                    whileHover={{ x: 5 }}
                  >
                    Get Started
                  </motion.button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </GlassCard>
    </motion.nav>
  );
};

export default Navbar;