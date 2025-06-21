import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from './hooks/useAuth';
import Navbar from './components/layout/Navbar';
import HomePage from './components/pages/HomePage';
import SocialFeed from './components/pages/SocialFeed';
import ProfilePage from './components/pages/ProfilePage';
import AuthModal from './components/auth/AuthModal';
import FloatingElements from './components/ui/FloatingElements';

function App() {
  const { user, isAuthenticated, loading } = useAuth();
  const [currentView, setCurrentView] = useState('home');
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'login' | 'register' }>({
    isOpen: false,
    mode: 'login'
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const renderCurrentView = () => {
    if (!isAuthenticated && currentView !== 'home') {
      setCurrentView('home');
      return <HomePage onRegisterClick={() => setAuthModal({ isOpen: true, mode: 'register' })} />;
    }

    switch (currentView) {
      case 'home':
        return <HomePage onRegisterClick={() => setAuthModal({ isOpen: true, mode: 'register' })} />;
      case 'feed':
        return <SocialFeed />;
      case 'jobs':
        return <SocialFeed />; // For now, using the same component
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage onRegisterClick={() => setAuthModal({ isOpen: true, mode: 'register' })} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative">
      <FloatingElements />
      
      <Navbar
        onLoginClick={() => setAuthModal({ isOpen: true, mode: 'login' })}
        onRegisterClick={() => setAuthModal({ isOpen: true, mode: 'register' })}
        currentView={currentView}
        onViewChange={setCurrentView}
      />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderCurrentView()}
        </motion.div>
      </AnimatePresence>

      <AuthModal
        isOpen={authModal.isOpen}
        onClose={() => setAuthModal({ ...authModal, isOpen: false })}
        initialMode={authModal.mode}
      />
    </div>
  );
}

export default App;