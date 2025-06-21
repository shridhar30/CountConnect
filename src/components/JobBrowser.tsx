import React, { useState } from 'react';
import { MapPin, Calendar, Clock, IndianRupee, Users, Shield, Filter, Search } from 'lucide-react';
import { Job } from '../types';
import { mockJobs } from '../utils/mockData';

interface JobBrowserProps {
  currentUser: any;
  onApplyJob: (jobId: string) => void;
}

const JobBrowser: React.FC<JobBrowserProps> = ({ currentUser, onApplyJob }) => {
  const [jobs] = useState<Job[]>(mockJobs);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [payRangeFilter, setPayRangeFilter] = useState('');

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesPay = !payRangeFilter || 
                      (payRangeFilter === 'low' && job.payRate < 1000) ||
                      (payRangeFilter === 'medium' && job.payRate >= 1000 && job.payRate < 1500) ||
                      (payRangeFilter === 'high' && job.payRate >= 1500);
    
    return matchesSearch && matchesLocation && matchesPay;
  });

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  const hasApplied = (jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
    return job?.applicants.includes(currentUser.id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Stock Count Jobs</h1>
        <p className="text-gray-600">Discover opportunities from verified companies</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Location"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            />
          </div>
          
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={payRangeFilter}
            onChange={(e) => setPayRangeFilter(e.target.value)}
          >
            <option value="">All Pay Ranges</option>
            <option value="low">Under ₹1000/day</option>
            <option value="medium">₹1000-1500/day</option>
            <option value="high">₹1500+/day</option>
          </select>
          
          <button className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Filter className="h-5 w-5 mr-2" />
            Filter
          </button>
        </div>
      </div>

      {/* Job Listings */}
      <div className="space-y-6">
        {filteredJobs.map((job) => (
          <div key={job.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 mr-3">{job.title}</h3>
                      {job.company.isVerified && (
                        <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                          <Shield className="h-3 w-3 mr-1" />
                          Verified
                        </div>
                      )}
                    </div>
                    <p className="text-gray-600 font-medium">{job.company.companyName}</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4 leading-relaxed">{job.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                    {job.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    {formatDate(job.startDate)}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2 text-gray-400" />
                    {job.duration}
                  </div>
                  <div className="flex items-center text-sm font-semibold text-green-600">
                    <IndianRupee className="h-4 w-4 mr-1" />
                    {job.payRate}/day
                  </div>
                </div>
                
                {job.requirements.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Requirements:</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.requirements.map((req, index) => (
                        <span
                          key={index}
                          className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs"
                        >
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-1" />
                    {job.applicants.length} applicants
                  </div>
                  
                  {hasApplied(job.id) ? (
                    <span className="bg-green-100 text-green-800 px-4 py-2 rounded-lg text-sm font-medium">
                      Applied
                    </span>
                  ) : (
                    <button
                      onClick={() => onApplyJob(job.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                      Apply Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
          <p className="text-gray-600">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default JobBrowser;