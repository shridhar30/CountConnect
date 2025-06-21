import React from 'react';
import { motion } from 'framer-motion';
import { Users, Shield, MessageCircle, Zap, CheckCircle, Star, ArrowRight, TrendingUp, Sparkles } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import FloatingElements from '../ui/FloatingElements';

interface HomePageProps {
  onRegisterClick: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onRegisterClick }) => {
  const features = [
    {
      icon: Users,
      title: 'Connect Instantly',
      description: 'Students and companies find each other quickly during stock count season',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Shield,
      title: 'Verified Partners',
      description: 'All companies verified with unique ID system for maximum trust and safety',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: MessageCircle,
      title: 'Social Feed',
      description: 'Instagram-like interface with real-time updates and engagement tracking',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Zap,
      title: 'Zero Commission',
      description: 'Direct payments between parties - we never take a cut from your earnings',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const stats = [
    { number: '2000+', label: 'Active Students' },
    { number: '500+', label: 'Verified Companies' },
    { number: '95%', label: 'Success Rate' },
    { number: '₹1500', label: 'Avg Daily Pay' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      <FloatingElements />
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="flex justify-center mb-8">
              <motion.div
                className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-3xl shadow-2xl"
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Users className="h-16 w-16 text-white" />
              </motion.div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                Connect. Count.
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Earn.
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              India's first social marketplace connecting students with companies for stock count jobs. 
              Verified partners, direct payments, zero commission.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <motion.button
                onClick={onRegisterClick}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center shadow-2xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </motion.button>
              <div className="flex items-center text-sm text-gray-400">
                <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                No registration fees • Instant verification
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose CountConnect?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Built specifically for the stock count ecosystem with safety and efficiency in mind
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="p-8 text-center h-full">
                  <div className={`bg-gradient-to-r ${feature.color} p-4 rounded-2xl w-fit mx-auto mb-6`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <GlassCard className="p-12">
              <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
              <p className="text-gray-300 mb-8 text-lg">
                Join thousands of students and companies already using CountConnect
              </p>
              <motion.button
                onClick={onRegisterClick}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center mx-auto shadow-2xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <TrendingUp className="mr-2 h-5 w-5" />
                Create Account Free
              </motion.button>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;