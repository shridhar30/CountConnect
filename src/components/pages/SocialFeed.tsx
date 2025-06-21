import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal, MapPin, Calendar, IndianRupee, Users, Filter, Search, TrendingUp } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

interface Post {
  id: string;
  type: 'job' | 'success' | 'update';
  author: {
    name: string;
    avatar: string;
    verified: boolean;
    type: 'student' | 'company';
  };
  content: string;
  image?: string;
  job?: {
    title: string;
    location: string;
    payRate: number;
    startDate: string;
    applicants: number;
  };
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    bookmarks: number;
  };
  timestamp: string;
  tags: string[];
}

const SocialFeed: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<string>>(new Set());

  const mockPosts: Post[] = [
    {
      id: '1',
      type: 'job',
      author: {
        name: 'TechCorp Industries',
        avatar: '🏢',
        verified: true,
        type: 'company'
      },
      content: 'Looking for 15 dedicated students for our annual inventory count! Great opportunity to earn while learning about warehouse operations. Training provided! 🚀',
      job: {
        title: 'Warehouse Stock Count Assistant',
        location: 'Gurgaon, Haryana',
        payRate: 1500,
        startDate: '2024-03-15',
        applicants: 23
      },
      engagement: {
        likes: 45,
        comments: 12,
        shares: 8,
        bookmarks: 15
      },
      timestamp: '2 hours ago',
      tags: ['warehouse', 'training-provided', 'high-pay']
    },
    {
      id: '2',
      type: 'success',
      author: {
        name: 'Rahul Sharma',
        avatar: '👨‍🎓',
        verified: false,
        type: 'student'
      },
      content: 'Just completed my first stock count job with @TechCorp! Earned ₹9,000 in 6 days and learned so much about inventory management. Thanks CountConnect! 🎉',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      engagement: {
        likes: 89,
        comments: 24,
        shares: 15,
        bookmarks: 32
      },
      timestamp: '4 hours ago',
      tags: ['success-story', 'first-job', 'grateful']
    },
    {
      id: '3',
      type: 'job',
      author: {
        name: 'FinancePlus Auditors',
        avatar: '🏦',
        verified: true,
        type: 'company'
      },
      content: 'Urgent requirement for commerce students! Multiple retail locations across Delhi NCR. Flexible timings available. Apply now! ⚡',
      job: {
        title: 'Retail Store Inventory Count',
        location: 'Delhi NCR',
        payRate: 1200,
        startDate: '2024-03-20',
        applicants: 18
      },
      engagement: {
        likes: 32,
        comments: 8,
        shares: 5,
        bookmarks: 12
      },
      timestamp: '6 hours ago',
      tags: ['urgent', 'flexible', 'commerce-students']
    }
  ];

  const filters = [
    { id: 'all', label: 'All Posts', icon: TrendingUp },
    { id: 'jobs', label: 'Job Posts', icon: Users },
    { id: 'success', label: 'Success Stories', icon: Heart },
    { id: 'updates', label: 'Updates', icon: MessageCircle }
  ];

  const filteredPosts = mockPosts.filter(post => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'jobs') return post.type === 'job';
    if (activeFilter === 'success') return post.type === 'success';
    if (activeFilter === 'updates') return post.type === 'update';
    return true;
  });

  const handleLike = (postId: string) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleBookmark = (postId: string) => {
    setBookmarkedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 pt-24 pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Social Feed</h1>
          <p className="text-gray-400">Discover opportunities and success stories from the community</p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <GlassCard className="p-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search posts, companies, or skills..."
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <motion.button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`flex items-center px-4 py-2 rounded-xl transition-all duration-300 ${
                    activeFilter === filter.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <filter.icon className="h-4 w-4 mr-2" />
                  {filter.label}
                </motion.button>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Posts */}
        <div className="space-y-6">
          <AnimatePresence>
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="p-6">
                  {/* Post Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-2xl">
                        {post.author.avatar}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-white">{post.author.name}</h3>
                          {post.author.verified && (
                            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            post.author.type === 'company' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-blue-500/20 text-blue-400'
                          }`}>
                            {post.author.type}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm">{post.timestamp}</p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-white transition-colors">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Post Content */}
                  <div className="mb-4">
                    <p className="text-gray-300 leading-relaxed mb-4">{post.content}</p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-white/10 text-gray-300 rounded-lg text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Job Details */}
                    {post.job && (
                      <GlassCard className="p-4 mb-4">
                        <h4 className="font-semibold text-white mb-2">{post.job.title}</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center text-gray-300">
                            <MapPin className="h-4 w-4 mr-1" />
                            {post.job.location}
                          </div>
                          <div className="flex items-center text-gray-300">
                            <IndianRupee className="h-4 w-4 mr-1" />
                            {post.job.payRate}/day
                          </div>
                          <div className="flex items-center text-gray-300">
                            <Calendar className="h-4 w-4 mr-1" />
                            {post.job.startDate}
                          </div>
                          <div className="flex items-center text-gray-300">
                            <Users className="h-4 w-4 mr-1" />
                            {post.job.applicants} applied
                          </div>
                        </div>
                        <motion.button
                          className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 rounded-lg font-medium transition-all duration-300"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Apply Now
                        </motion.button>
                      </GlassCard>
                    )}

                    {/* Post Image */}
                    {post.image && (
                      <div className="rounded-xl overflow-hidden mb-4">
                        <img
                          src={post.image}
                          alt="Post content"
                          className="w-full h-64 object-cover"
                        />
                      </div>
                    )}
                  </div>

                  {/* Engagement */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center space-x-6">
                      <motion.button
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center space-x-2 transition-colors ${
                          likedPosts.has(post.id) ? 'text-red-400' : 'text-gray-400 hover:text-red-400'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Heart className={`h-5 w-5 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                        <span className="text-sm">{post.engagement.likes + (likedPosts.has(post.id) ? 1 : 0)}</span>
                      </motion.button>
                      
                      <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors">
                        <MessageCircle className="h-5 w-5" />
                        <span className="text-sm">{post.engagement.comments}</span>
                      </button>
                      
                      <button className="flex items-center space-x-2 text-gray-400 hover:text-green-400 transition-colors">
                        <Share className="h-5 w-5" />
                        <span className="text-sm">{post.engagement.shares}</span>
                      </button>
                    </div>
                    
                    <motion.button
                      onClick={() => handleBookmark(post.id)}
                      className={`transition-colors ${
                        bookmarkedPosts.has(post.id) ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-400'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Bookmark className={`h-5 w-5 ${bookmarkedPosts.has(post.id) ? 'fill-current' : ''}`} />
                    </motion.button>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SocialFeed;