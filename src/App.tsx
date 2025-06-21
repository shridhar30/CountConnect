import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import AuthModal from './components/AuthModal';
import Dashboard from './components/Dashboard';
import JobBrowser from './components/JobBrowser';
import JobPostForm from './components/JobPostForm';

function App() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [currentView, setCurrentView] = useState('home');
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'login' | 'register' }>({
    isOpen: false,
    mode: 'login'
  });

  const handleLogin = (user: any) => {
    setCurrentUser(user);
    setCurrentView('dashboard');
    setAuthModal({ isOpen: false, mode: 'login' });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('home');
  };

  const handleApplyJob = (jobId: string) => {
    // Mock application logic
    alert('Application submitted successfully! You will be notified when the company reviews your application.');
  };

  const handleJobPosted = () => {
    alert('Job posted successfully! Students can now see and apply for your job.');
    setCurrentView('dashboard');
  };

  const renderCurrentView = () => {
    if (!currentUser) {
      return <HomePage onRegisterClick={() => setAuthModal({ isOpen: true, mode: 'register' })} />;
    }

    switch (currentView) {
      case 'dashboard':
        return <Dashboard currentUser={currentUser} onViewChange={setCurrentView} />;
      case 'jobs':
        return <JobBrowser currentUser={currentUser} onApplyJob={handleApplyJob} />;
      case 'post-job':
        return <JobPostForm currentUser={currentUser} onJobPosted={handleJobPosted} />;
      default:
        return <HomePage onRegisterClick={() => setAuthModal({ isOpen: true, mode: 'register' })} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        currentUser={currentUser}
        onLoginClick={() => setAuthModal({ isOpen: true, mode: 'login' })}
        onRegisterClick={() => setAuthModal({ isOpen: true, mode: 'register' })}
        currentView={currentView}
        onViewChange={setCurrentView}
      />
      
      {renderCurrentView()}

      <AuthModal
        isOpen={authModal.isOpen}
        onClose={() => setAuthModal({ ...authModal, isOpen: false })}
        onLogin={handleLogin}
        initialMode={authModal.mode}
      />
    </div>
  );
}

export default App;