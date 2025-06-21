import React from 'react';
import { Users, Shield, MessageCircle, Zap, CheckCircle, Star, ArrowRight, TrendingUp } from 'lucide-react';

interface HomePageProps {
  onRegisterClick: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onRegisterClick }) => {
  const features = [
    {
      icon: Users,
      title: 'Connect Instantly',
      description: 'Students and companies find each other quickly during stock count season',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Shield,
      title: 'Verified Partners',
      description: 'All companies verified with unique ID system for maximum trust and safety',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: MessageCircle,
      title: 'Seamless Chat',
      description: 'Built-in messaging and real-time updates for perfect coordination',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: Zap,
      title: 'Zero Commission',
      description: 'Direct payments between parties - we never take a cut from your earnings',
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  const stats = [
    { number: '2000+', label: 'Active Students' },
    { number: '500+', label: 'Verified Companies' },
    { number: '95%', label: 'Success Rate' },
    { number: '₹1500', label: 'Avg Daily Pay' }
  ];

  const testimonials = [
    {
      name: 'Rahul Sharma',
      role: 'Student, DU',
      content: 'Made ₹15,000 in just one week! The verification system made me feel completely safe.',
      rating: 5
    },
    {
      name: 'TechCorp Ltd.',
      role: 'Manufacturing Company',
      content: 'Found reliable students quickly. The platform made coordination so much easier.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <div className="bg-blue-600 text-white p-4 rounded-2xl shadow-lg">
              <Users className="h-12 w-12" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Connect. Count. <span className="text-blue-600">Earn.</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            India's first marketplace connecting students with companies for stock count jobs. 
            Verified partners, direct payments, zero commission.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={onRegisterClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <div className="flex items-center text-sm text-gray-500">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              No registration fees • Instant verification
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How CountConnect Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Simple steps to connect students with stock count opportunities</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* For Students */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-lg w-fit mb-6">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">For Students</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-4 mt-1">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Create Profile</h4>
                    <p className="text-gray-600">Sign up with university details and skills</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-4 mt-1">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Browse Jobs</h4>
                    <p className="text-gray-600">Find verified companies posting stock count jobs</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-4 mt-1">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Apply & Earn</h4>
                    <p className="text-gray-600">Get selected and earn directly from companies</p>
                  </div>
                </div>
              </div>
            </div>

            {/* For Companies */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="bg-green-100 text-green-600 p-3 rounded-lg w-fit mb-6">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">For Companies</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-4 mt-1">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Get Verified</h4>
                    <p className="text-gray-600">Pay ₹99 verification fee, receive unique ID</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-4 mt-1">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Post Jobs</h4>
                    <p className="text-gray-600">List your stock count requirements with details</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-4 mt-1">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Hire Direct</h4>
                    <p className="text-gray-600">Select students and coordinate through our platform</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose CountConnect?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Built specifically for the stock count ecosystem with safety and efficiency in mind</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className={`${feature.color} p-4 rounded-2xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-gray-600">See what our community has to say</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-600 text-sm">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-blue-100 mb-8 text-lg">Join thousands of students and companies already using CountConnect</p>
          <button
            onClick={onRegisterClick}
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center mx-auto"
          >
            Create Account Free
            <TrendingUp className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;