import React, { useState } from 'react';
import { 
  Briefcase, 
  Users, 
  Calendar, 
  IndianRupee, 
  TrendingUp, 
  Clock,
  Shield,
  AlertCircle,
  CheckCircle,
  MapPin
} from 'lucide-react';
import { mockJobs, mockApplications } from '../utils/mockData';

interface DashboardProps {
  currentUser: any;
  onViewChange: (view: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ currentUser, onViewChange }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const userJobs = currentUser.type === 'company' 
    ? mockJobs.filter(job => job.companyId === currentUser.id)
    : mockJobs.filter(job => job.applicants.includes(currentUser.id));

  const userApplications = currentUser.type === 'student'
    ? mockApplications.filter(app => app.studentId === currentUser.id)
    : [];

  const stats = currentUser.type === 'student' 
    ? [
        { label: 'Jobs Applied', value: userApplications.length, icon: Briefcase, color: 'bg-blue-100 text-blue-600' },
        { label: 'Active Applications', value: userApplications.filter(app => app.status === 'pending').length, icon: Clock, color: 'bg-yellow-100 text-yellow-600' },
        { label: 'Jobs Completed', value: 0, icon: CheckCircle, color: 'bg-green-100 text-green-600' },
        { label: 'Total Earnings', value: '₹0', icon: IndianRupee, color: 'bg-purple-100 text-purple-600' }
      ]
    : [
        { label: 'Jobs Posted', value: userJobs.length, icon: Briefcase, color: 'bg-blue-100 text-blue-600' },
        { label: 'Total Applicants', value: userJobs.reduce((sum, job) => sum + job.applicants.length, 0), icon: Users, color: 'bg-green-100 text-green-600' },
        { label: 'Active Jobs', value: userJobs.filter(job => job.status === 'open').length, icon: TrendingUp, color: 'bg-orange-100 text-orange-600' },
        { label: 'Verification Status', value: currentUser.isVerified ? 'Verified' : 'Pending', icon: Shield, color: currentUser.isVerified ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600' }
      ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Verification Alert for Companies */}
      {currentUser.type === 'company' && !currentUser.isVerified && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-start">
            <AlertCircle className="h-6 w-6 text-yellow-600 mr-3 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">Complete Your Verification</h3>
              <p className="text-yellow-700 mb-4">
                To post jobs and access all features, you need to verify your company. This builds trust with students and ensures quality opportunities.
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-yellow-700">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  One-time verification fee: ₹99
                </div>
                <div className="flex items-center text-sm text-yellow-700">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Receive unique company ID
                </div>
                <div className="flex items-center text-sm text-yellow-700">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Verified badge on all job posts
                </div>
              </div>
              <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Start Verification Process
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        </div>
        <div className="p-6">
          {currentUser.type === 'student' ? (
            <div className="space-y-4">
              {userApplications.slice(0, 3).map((application) => {
                const job = mockJobs.find(j => j.id === application.jobId);
                return (
                  <div key={application.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{job?.title}</p>
                      <p className="text-sm text-gray-600">{job?.company.companyName}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      application.status === 'accepted' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </span>
                  </div>
                );
              })}
              {userApplications.length === 0 && (
                <p className="text-gray-600 text-center py-4">No applications yet. Start browsing jobs!</p>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {userJobs.slice(0, 3).map((job) => (
                <div key={job.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{job.title}</p>
                    <p className="text-sm text-gray-600">{job.applicants.length} applicants</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    job.status === 'open' ? 'bg-green-100 text-green-800' :
                    job.status === 'closed' ? 'bg-gray-100 text-gray-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                  </span>
                </div>
              ))}
              {userJobs.length === 0 && (
                <p className="text-gray-600 text-center py-4">No jobs posted yet. Create your first job posting!</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderJobs = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-900">
          {currentUser.type === 'student' ? 'My Applications' : 'My Job Posts'}
        </h3>
        {currentUser.type === 'company' && (
          <button
            onClick={() => onViewChange('post-job')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Post New Job
          </button>
        )}
      </div>

      {currentUser.type === 'student' ? (
        <div className="space-y-4">
          {userApplications.map((application) => {
            const job = mockJobs.find(j => j.id === application.jobId);
            if (!job) return null;
            
            return (
              <div key={application.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{job.title}</h4>
                    <p className="text-gray-600 mb-2">{job.company.companyName}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location}
                      </div>
                      <div className="flex items-center">
                        <IndianRupee className="h-4 w-4 mr-1" />
                        {job.payRate}/day
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">Applied: {new Date(application.appliedAt).toLocaleDateString()}</p>
                  </div>
                  <div className="mt-4 lg:mt-0">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      application.status === 'accepted' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-4">
          {userJobs.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{job.title}</h4>
                  <p className="text-gray-600 mb-2">{job.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {job.applicants.length} applicants
                    </div>
                    <div className="flex items-center">
                      <IndianRupee className="h-4 w-4 mr-1" />
                      {job.payRate}/day
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Posted: {new Date(job.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="mt-4 lg:mt-0 flex space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    job.status === 'open' ? 'bg-green-100 text-green-800' :
                    job.status === 'closed' ? 'bg-gray-100 text-gray-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                  </span>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View Applicants
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {currentUser.name}!
        </h1>
        <p className="text-gray-600">
          {currentUser.type === 'student' 
            ? 'Track your applications and discover new opportunities'
            : 'Manage your job posts and connect with talented students'
          }
        </p>
      </div>

      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('jobs')}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'jobs'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {currentUser.type === 'student' ? 'My Applications' : 'My Jobs'}
            </button>
          </nav>
        </div>
      </div>

      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'jobs' && renderJobs()}
    </div>
  );
};

export default Dashboard;