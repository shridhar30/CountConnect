import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Building, GraduationCap, Phone, Upload, QrCode, CheckCircle, AlertCircle } from 'lucide-react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import GlassCard from '../ui/GlassCard';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState<'login' | 'register' | 'register-student' | 'register-company' | 'payment'>(initialMode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    university: '',
    year: '',
    skills: '',
    experience: '',
    companyName: '',
    industry: '',
    address: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      onClose();
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Handle specific Firebase auth errors
      let errorMessage = 'Login failed. Please try again.';
      
      if (error.code === 'auth/invalid-credential') {
        errorMessage = 'Invalid email or password. Please check your credentials and try again.';
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email. Please register first.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password. Please try again.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      onClose();
    } catch (error: any) {
      console.error('Registration error:', error);
      
      // Handle specific Firebase auth errors
      let errorMessage = 'Registration failed. Please try again.';
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'An account with this email already exists. Please sign in instead.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak. Please use at least 6 characters.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPaymentScreenshot(file);
    }
  };

  const renderLoginForm = () => (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleLogin}
      className="space-y-6"
    >
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-center space-x-3"
        >
          <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
          <p className="text-red-400 text-sm">{error}</p>
        </motion.div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="email"
            required
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="password"
            required
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>
      </div>

      <div className="text-sm text-amber-400 bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl">
        <strong className="text-amber-300">Note:</strong><br />
        To test the application, please create a new account using the registration form, or contact the administrator to set up demo accounts in Firebase Authentication.
      </div>
      
      <motion.button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {loading ? 'Signing In...' : 'Sign In'}
      </motion.button>
      
      <div className="text-center">
        <button
          type="button"
          onClick={() => {
            setMode('register');
            setError('');
          }}
          className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
        >
          Don't have an account? Sign up
        </button>
      </div>
    </motion.form>
  );

  const renderRegisterTypeSelection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-center space-x-3"
        >
          <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
          <p className="text-red-400 text-sm">{error}</p>
        </motion.div>
      )}

      <p className="text-gray-300 text-center mb-8">Choose your account type to get started</p>
      
      <motion.button
        onClick={() => {
          setMode('register-student');
          setError('');
        }}
        className="w-full p-6 border border-white/10 hover:border-blue-500/50 rounded-2xl transition-all duration-300 group bg-white/5 hover:bg-white/10"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center space-x-4">
          <div className="bg-blue-500/20 group-hover:bg-blue-500/30 p-4 rounded-xl transition-colors">
            <GraduationCap className="h-8 w-8 text-blue-400" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-white text-lg">I'm a Student</h3>
            <p className="text-gray-400">Looking for stock count opportunities</p>
          </div>
        </div>
      </motion.button>
      
      <motion.button
        onClick={() => {
          setMode('register-company');
          setError('');
        }}
        className="w-full p-6 border border-white/10 hover:border-green-500/50 rounded-2xl transition-all duration-300 group bg-white/5 hover:bg-white/10"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center space-x-4">
          <div className="bg-green-500/20 group-hover:bg-green-500/30 p-4 rounded-xl transition-colors">
            <Building className="h-8 w-8 text-green-400" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-white text-lg">I'm a Company</h3>
            <p className="text-gray-400">Need help with stock counting</p>
          </div>
        </div>
      </motion.button>
      
      <div className="text-center">
        <button
          type="button"
          onClick={() => {
            setMode('login');
            setError('');
          }}
          className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
        >
          Already have an account? Sign in
        </button>
      </div>
    </motion.div>
  );

  const renderPaymentScreen = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-center space-x-3"
        >
          <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
          <p className="text-red-400 text-sm">{error}</p>
        </motion.div>
      )}

      <div className="text-center mb-8">
        <div className="bg-green-500/20 p-4 rounded-2xl w-fit mx-auto mb-4">
          <QrCode className="h-12 w-12 text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Complete Payment</h3>
        <p className="text-gray-400">Pay ₹99 verification fee to get started</p>
      </div>

      <GlassCard className="p-6">
        <div className="text-center">
          <div className="bg-white p-4 rounded-2xl mb-4 inline-block">
            <div className="w-48 h-48 bg-black flex items-center justify-center text-white text-xs">
              QR CODE<br />
              UPI: countconnect@paytm<br />
              Amount: ₹99
            </div>
          </div>
          <p className="text-gray-300 text-sm">Scan this QR code to pay ₹99</p>
        </div>
      </GlassCard>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Upload Payment Screenshot *
        </label>
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            id="payment-screenshot"
          />
          <label
            htmlFor="payment-screenshot"
            className="w-full p-4 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-white/40 transition-colors bg-white/5 flex items-center justify-center space-x-2"
          >
            <Upload className="h-5 w-5 text-gray-400" />
            <span className="text-gray-300">
              {paymentScreenshot ? paymentScreenshot.name : 'Click to upload screenshot'}
            </span>
          </label>
        </div>
      </div>

      <motion.button
        onClick={handleRegister}
        disabled={!paymentScreenshot || loading}
        className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {loading ? 'Processing...' : 'Complete Registration'}
      </motion.button>
    </motion.div>
  );

  const renderStudentRegistration = () => (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={(e) => {
        e.preventDefault();
        setMode('payment');
        setError('');
      }}
      className="space-y-4"
    >
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-center space-x-3"
        >
          <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
          <p className="text-red-400 text-sm">{error}</p>
        </motion.div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
          <input
            type="tel"
            required
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
        <input
          type="email"
          required
          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
        <input
          type="password"
          required
          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">University</label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.university}
            onChange={(e) => setFormData({ ...formData, university: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Year</label>
          <select
            required
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
          >
            <option value="" className="bg-gray-800">Select</option>
            <option value="1" className="bg-gray-800">1st Year</option>
            <option value="2" className="bg-gray-800">2nd Year</option>
            <option value="3" className="bg-gray-800">3rd Year</option>
            <option value="4" className="bg-gray-800">4th Year</option>
          </select>
        </div>
      </div>
      
      <motion.button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition-all duration-300"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Continue to Payment
      </motion.button>
    </motion.form>
  );

  const renderCompanyRegistration = () => (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={(e) => {
        e.preventDefault();
        setMode('payment');
        setError('');
      }}
      className="space-y-4"
    >
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-center space-x-3"
        >
          <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
          <p className="text-red-400 text-sm">{error}</p>
        </motion.div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Contact Person</label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
          <input
            type="tel"
            required
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Company Name</label>
        <input
          type="text"
          required
          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={formData.companyName}
          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
        <input
          type="email"
          required
          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
        <input
          type="password"
          required
          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
      </div>
      
      <motion.button
        type="submit"
        className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-300"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Continue to Payment
      </motion.button>
    </motion.form>
  );

  const getTitle = () => {
    switch (mode) {
      case 'login': return 'Welcome Back';
      case 'register': return 'Join CountConnect';
      case 'register-student': return 'Student Registration';
      case 'register-company': return 'Company Registration';
      case 'payment': return 'Verification Payment';
      default: return 'Welcome';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-md"
          >
            <GlassCard className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-white">{getTitle()}</h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              {mode === 'login' && renderLoginForm()}
              {mode === 'register' && renderRegisterTypeSelection()}
              {mode === 'register-student' && renderStudentRegistration()}
              {mode === 'register-company' && renderCompanyRegistration()}
              {mode === 'payment' && renderPaymentScreen()}
            </GlassCard>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;