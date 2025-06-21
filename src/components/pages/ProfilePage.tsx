import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Briefcase, 
  GraduationCap, 
  Shield, 
  Star, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  XCircle, 
  IndianRupee, 
  Users, 
  Award,
  Edit3,
  Camera,
  Building,
  Target,
  Activity,
  BarChart3
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import GlassCard from '../ui/GlassCard';
import { mockJobs, mockApplications } from '../../utils/mockData';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);

  // Mock user data - in real app, this would come from your database
  const mockUserData = {
    id: user?.uid || '1',
    email: user?.email || 'demo@example.com',
    name: user?.email === 'student@demo.com' ? 'Rahul Sharma' : 'TechCorp Industries',
    type: user?.email === 'student@demo.com' ? 'student' : 'company',
    avatar: user?.email === 'student@demo.com' ? '👨‍🎓' : '🏢',
    isVerified: user?.email !== 'student@demo.com',
    phone: '+91 98765 43210',
    location: user?.email === 'student@demo.com' ? 'Delhi, India' : 'Mumbai, India',
    joinedDate: '2024-01-15',
    // Student specific
    university: 'Delhi University',
    year: 3,
    skills: ['Excel', 'Data Entry', 'Inventory Management', 'Team Leadership'],
    // Company specific
    companyName: 'TechCorp Industries',
    industry: 'Manufacturing',
    verificationId: 'TC2024001'
  };

  const isStudent = mockUserData.type === 'student';
  const isCompany = mockUserData.type === 'company';

  // Calculate stats based on user type
  const userJobs = isCompany 
    ? mockJobs.filter(job => job.companyId === mockUserData.id)
    : mockJobs.filter(job => job.applicants.includes(mockUserData.id));

  const userApplications = isStudent
    ? mockApplications.filter(app => app.studentId === mockUserData.id)
    : [];

  const studentStats = {
    totalApplications: userApplications.length,
    pendingApplications: userApplications.filter(app => app.status === 'pending').length,
    acceptedApplications: userApplications.filter(app => app.status === 'accepted').length,
    completedJobs: 3, // Mock data
    totalEarnings: 15000, // Mock data
    averageRating: 4.8,
    successRate: 85
  };

  const companyStats = {
    totalJobsPosted: userJobs.length,
    activeJobs: userJobs.filter(job => job.status === 'open').length,
    totalApplicants: userJobs.reduce((sum, job) => sum + job.applicants.length, 0),
    completedProjects: 8, // Mock data
    averageRating: 4.6,
    totalSpent: 125000, // Mock data
    responseRate: 92
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'activity', label: 'Activity', icon: Activity },
    { id: 'performance', label: 'Performance', icon: Target },
    { id: 'settings', label: 'Settings', icon: User }
  ];

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isStudent ? (
          <>
            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Applications</p>
                  <p className="text-3xl font-bold text-white mt-1">{studentStats.totalApplications}</p>
                </div>
                <div className="bg-blue-500/20 p-3 rounded-xl">
                  <Briefcase className="h-6 w-6 text-blue-400" />
                </div>
              </div>
            </GlassCard>
            
            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Completed Jobs</p>
                  <p className="text-3xl font-bold text-white mt-1">{studentStats.completedJobs}</p>
                </div>
                <div className="bg-green-500/20 p-3 rounded-xl">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                </div>
              </div>
            </GlassCard>
            
            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Earnings</p>
                  <p className="text-3xl font-bold text-white mt-1">₹{studentStats.totalEarnings.toLocaleString()}</p>
                </div>
                <div className="bg-purple-500/20 p-3 rounded-xl">
                  <IndianRupee className="h-6 w-6 text-purple-400" />
                </div>
              </div>
            </GlassCard>
            
            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Success Rate</p>
                  <p className="text-3xl font-bold text-white mt-1">{studentStats.successRate}%</p>
                </div>
                <div className="bg-orange-500/20 p-3 rounded-xl">
                  <TrendingUp className="h-6 w-6 text-orange-400" />
                </div>
              </div>
            </GlassCard>
          </>
        ) : (
          <>
            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Jobs Posted</p>
                  <p className="text-3xl font-bold text-white mt-1">{companyStats.totalJobsPosted}</p>
                </div>
                <div className="bg-blue-500/20 p-3 rounded-xl">
                  <Briefcase className="h-6 w-6 text-blue-400" />
                </div>
              </div>
            </GlassCard>
            
            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Applicants</p>
                  <p className="text-3xl font-bold text-white mt-1">{companyStats.totalApplicants}</p>
                </div>
                <div className="bg-green-500/20 p-3 rounded-xl">
                  <Users className="h-6 w-6 text-green-400" />
                </div>
              </div>
            </GlassCard>
            
            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Spent</p>
                  <p className="text-3xl font-bold text-white mt-1">₹{companyStats.totalSpent.toLocaleString()}</p>
                </div>
                <div className="bg-purple-500/20 p-3 rounded-xl">
                  <IndianRupee className="h-6 w-6 text-purple-400" />
                </div>
              </div>
            </GlassCard>
            
            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Response Rate</p>
                  <p className="text-3xl font-bold text-white mt-1">{companyStats.responseRate}%</p>
                </div>
                <div className="bg-orange-500/20 p-3 rounded-xl">
                  <TrendingUp className="h-6 w-6 text-orange-400" />
                </div>
              </div>
            </GlassCard>
          </>
        )}
      </div>

      {/* Recent Activity */}
      <GlassCard className="p-8">
        <h3 className="text-2xl font-bold text-white mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {isStudent ? (
            <>
              <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl">
                <div className="bg-green-500/20 p-2 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">Job Completed</p>
                  <p className="text-gray-400 text-sm">Warehouse Stock Count at TechCorp - Earned ₹9,000</p>
                </div>
                <span className="text-gray-400 text-sm">2 days ago</span>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl">
                <div className="bg-blue-500/20 p-2 rounded-lg">
                  <Briefcase className="h-5 w-5 text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">Application Submitted</p>
                  <p className="text-gray-400 text-sm">Applied for Retail Store Inventory Count</p>
                </div>
                <span className="text-gray-400 text-sm">1 week ago</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl">
                <div className="bg-green-500/20 p-2 rounded-lg">
                  <Users className="h-5 w-5 text-green-400" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">New Applications</p>
                  <p className="text-gray-400 text-sm">5 students applied for Warehouse Stock Count</p>
                </div>
                <span className="text-gray-400 text-sm">3 hours ago</span>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl">
                <div className="bg-blue-500/20 p-2 rounded-lg">
                  <Briefcase className="h-5 w-5 text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">Job Posted</p>
                  <p className="text-gray-400 text-sm">Retail Store Inventory Count - 4 positions</p>
                </div>
                <span className="text-gray-400 text-sm">2 days ago</span>
              </div>
            </>
          )}
        </div>
      </GlassCard>
    </div>
  );

  const renderActivity = () => (
    <div className="space-y-6">
      <GlassCard className="p-8">
        <h3 className="text-2xl font-bold text-white mb-6">
          {isStudent ? 'Application History' : 'Job Management'}
        </h3>
        
        {isStudent ? (
          <div className="space-y-4">
            {userApplications.map((application) => {
              const job = mockJobs.find(j => j.id === application.jobId);
              return (
                <div key={application.id} className="p-6 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-white">{job?.title}</h4>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      application.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                      application.status === 'accepted' ? 'bg-green-500/20 text-green-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-400">
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-2" />
                      {job?.company.companyName}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {job?.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Applied {new Date(application.appliedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4">
            {userJobs.map((job) => (
              <div key={job.id} className="p-6 bg-white/5 rounded-xl border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-white">{job.title}</h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    job.status === 'open' ? 'bg-green-500/20 text-green-400' :
                    job.status === 'closed' ? 'bg-gray-500/20 text-gray-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    {job.applicants.length} applicants
                  </div>
                  <div className="flex items-center">
                    <IndianRupee className="h-4 w-4 mr-2" />
                    ₹{job.payRate}/day
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(job.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex space-x-3">
                  <motion.button
                    className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Applicants
                  </motion.button>
                  <motion.button
                    className="px-4 py-2 bg-white/10 text-gray-300 rounded-lg hover:bg-white/20 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Edit Job
                  </motion.button>
                </div>
              </div>
            ))}
          </div>
        )}
      </GlassCard>
    </div>
  );

  const renderPerformance = () => (
    <div className="space-y-6">
      <GlassCard className="p-8">
        <h3 className="text-2xl font-bold text-white mb-6">Performance Metrics</h3>
        
        {isStudent ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Rating & Reviews</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Average Rating</span>
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < Math.floor(studentStats.averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} />
                      ))}
                    </div>
                    <span className="text-white font-semibold">{studentStats.averageRating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Success Rate</span>
                  <span className="text-white font-semibold">{studentStats.successRate}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">On-time Completion</span>
                  <span className="text-white font-semibold">95%</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Earnings Breakdown</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">This Month</span>
                  <span className="text-white font-semibold">₹6,000</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Last Month</span>
                  <span className="text-white font-semibold">₹9,000</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Average per Job</span>
                  <span className="text-white font-semibold">₹5,000</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Company Metrics</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Average Rating</span>
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < Math.floor(companyStats.averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} />
                      ))}
                    </div>
                    <span className="text-white font-semibold">{companyStats.averageRating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Response Rate</span>
                  <span className="text-white font-semibold">{companyStats.responseRate}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Project Completion</span>
                  <span className="text-white font-semibold">98%</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Hiring Statistics</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Avg. Applications per Job</span>
                  <span className="text-white font-semibold">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Avg. Time to Hire</span>
                  <span className="text-white font-semibold">2.5 days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Student Retention</span>
                  <span className="text-white font-semibold">87%</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </GlassCard>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <GlassCard className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white">Profile Settings</h3>
          <motion.button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Edit3 className="h-4 w-4" />
            <span>{isEditing ? 'Save Changes' : 'Edit Profile'}</span>
          </motion.button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-gray-400 text-sm mb-2">Full Name</label>
              <input
                type="text"
                value={mockUserData.name}
                disabled={!isEditing}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
              />
            </div>
            
            <div>
              <label className="block text-gray-400 text-sm mb-2">Email</label>
              <input
                type="email"
                value={mockUserData.email}
                disabled={!isEditing}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
              />
            </div>
            
            <div>
              <label className="block text-gray-400 text-sm mb-2">Phone</label>
              <input
                type="tel"
                value={mockUserData.phone}
                disabled={!isEditing}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
              />
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-gray-400 text-sm mb-2">Location</label>
              <input
                type="text"
                value={mockUserData.location}
                disabled={!isEditing}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
              />
            </div>
            
            {isStudent ? (
              <>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">University</label>
                  <input
                    type="text"
                    value={mockUserData.university}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Skills</label>
                  <div className="flex flex-wrap gap-2">
                    {mockUserData.skills?.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Company Name</label>
                  <input
                    type="text"
                    value={mockUserData.companyName}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Industry</label>
                  <input
                    type="text"
                    value={mockUserData.industry}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </GlassCard>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <GlassCard className="p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-6xl">
                  {mockUserData.avatar}
                </div>
                <motion.button
                  className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Camera className="h-4 w-4" />
                </motion.button>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start space-x-3 mb-2">
                  <h1 className="text-3xl font-bold text-white">{mockUserData.name}</h1>
                  {mockUserData.isVerified && (
                    <div className="bg-green-500/20 p-1 rounded-full">
                      <Shield className="h-5 w-5 text-green-400" />
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-6 text-gray-400 mb-4">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>{mockUserData.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>{mockUserData.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {new Date(mockUserData.joinedDate).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-center md:justify-start space-x-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} />
                    ))}
                    <span className="text-white ml-2">4.8</span>
                  </div>
                  
                  {isCompany && mockUserData.verificationId && (
                    <div className="bg-blue-500/20 px-3 py-1 rounded-full">
                      <span className="text-blue-400 text-sm">ID: {mockUserData.verificationId}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <GlassCard className="p-2">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <tab.icon className="h-5 w-5" />
                  <span className="font-medium">{tab.label}</span>
                </motion.button>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'activity' && renderActivity()}
          {activeTab === 'performance' && renderPerformance()}
          {activeTab === 'settings' && renderSettings()}
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;