import React, { useState } from 'react';
import { X, Mail, Lock, User, Building, GraduationCap, Phone } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: any) => void;
  initialMode?: 'login' | 'register';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin, initialMode = 'login' }) => {
  const [mode, setMode] = useState<'login' | 'register' | 'register-student' | 'register-company'>(initialMode);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    // Student specific
    university: '',
    year: '',
    skills: '',
    experience: '',
    // Company specific
    companyName: '',
    industry: '',
    address: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock authentication - in real app, this would call an API
    if (mode === 'login') {
      // Mock login - find user by email
      const mockUser = {
        id: '1',
        email: formData.email,
        name: formData.email === 'student@test.com' ? 'John Doe' : 'Company Admin',
        type: formData.email === 'student@test.com' ? 'student' : 'company',
        isVerified: formData.email !== 'student@test.com'
      };
      onLogin(mockUser);
    } else if (mode === 'register-student') {
      const newStudent = {
        id: Date.now().toString(),
        email: formData.email,
        name: formData.name,
        type: 'student',
        university: formData.university,
        year: parseInt(formData.year),
        skills: formData.skills.split(',').map(s => s.trim()),
        experience: formData.experience,
        phone: formData.phone,
        isVerified: false
      };
      onLogin(newStudent);
    } else if (mode === 'register-company') {
      const newCompany = {
        id: Date.now().toString(),
        email: formData.email,
        name: formData.name,
        type: 'company',
        companyName: formData.companyName,
        industry: formData.industry,
        address: formData.address,
        phone: formData.phone,
        isVerified: false,
        verificationStatus: 'pending'
      };
      onLogin(newCompany);
    }
    onClose();
  };

  const renderLoginForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="email"
            required
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="password"
            required
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>
      </div>

      <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
        <strong>Demo Accounts:</strong><br />
        Student: student@test.com<br />
        Company: company@test.com<br />
        Password: any password
      </div>
      
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
      >
        Sign In
      </button>
      
      <div className="text-center">
        <button
          type="button"
          onClick={() => setMode('register')}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          Don't have an account? Sign up
        </button>
      </div>
    </form>
  );

  const renderRegisterTypeSelection = () => (
    <div className="space-y-4">
      <p className="text-gray-600 text-center mb-6">Choose your account type to get started</p>
      
      <button
        onClick={() => setMode('register-student')}
        className="w-full p-6 border-2 border-gray-200 hover:border-blue-500 rounded-lg transition-colors group"
      >
        <div className="flex items-center space-x-4">
          <div className="bg-blue-100 group-hover:bg-blue-200 p-3 rounded-lg">
            <GraduationCap className="h-8 w-8 text-blue-600" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-gray-900">I'm a Student</h3>
            <p className="text-gray-600">Looking for stock count job opportunities</p>
          </div>
        </div>
      </button>
      
      <button
        onClick={() => setMode('register-company')}
        className="w-full p-6 border-2 border-gray-200 hover:border-blue-500 rounded-lg transition-colors group"
      >
        <div className="flex items-center space-x-4">
          <div className="bg-green-100 group-hover:bg-green-200 p-3 rounded-lg">
            <Building className="h-8 w-8 text-green-600" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-gray-900">I'm a Company</h3>
            <p className="text-gray-600">Need help with stock counting tasks</p>
          </div>
        </div>
      </button>
      
      <div className="text-center">
        <button
          type="button"
          onClick={() => setMode('login')}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          Already have an account? Sign in
        </button>
      </div>
    </div>
  );

  const renderStudentRegistration = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            type="tel"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          type="password"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">University</label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.university}
            onChange={(e) => setFormData({ ...formData, university: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
          <select
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
          >
            <option value="">Select</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma separated)</label>
        <input
          type="text"
          placeholder="Excel, Data Entry, Accounting"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={formData.skills}
          onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
        <textarea
          rows={2}
          placeholder="Describe any relevant experience"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={formData.experience}
          onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
        />
      </div>
      
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
      >
        Create Student Account
      </button>
      
      <div className="text-center">
        <button
          type="button"
          onClick={() => setMode('register')}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          ← Back to account type selection
        </button>
      </div>
    </form>
  );

  const renderCompanyRegistration = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            type="tel"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          type="password"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
        <input
          type="text"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={formData.companyName}
          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
          <select
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.industry}
            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
          >
            <option value="">Select Industry</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Retail">Retail</option>
            <option value="Audit">Audit & Finance</option>
            <option value="Logistics">Logistics</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            required
            placeholder="City, State"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
        </div>
      </div>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          <strong>Next Step:</strong> After registration, you'll need to complete verification (₹99) to post jobs and access all features.
        </p>
      </div>
      
      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors"
      >
        Create Company Account
      </button>
      
      <div className="text-center">
        <button
          type="button"
          onClick={() => setMode('register')}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          ← Back to account type selection
        </button>
      </div>
    </form>
  );

  const getTitle = () => {
    switch (mode) {
      case 'login': return 'Sign In to CountConnect';
      case 'register': return 'Join CountConnect';
      case 'register-student': return 'Create Student Account';
      case 'register-company': return 'Create Company Account';
      default: return 'Welcome';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{getTitle()}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {mode === 'login' && renderLoginForm()}
          {mode === 'register' && renderRegisterTypeSelection()}
          {mode === 'register-student' && renderStudentRegistration()}
          {mode === 'register-company' && renderCompanyRegistration()}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;