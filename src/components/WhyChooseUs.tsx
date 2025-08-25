import React from 'react';
import { CheckCircle, Shield, Globe, BarChart, Clock, Users } from 'lucide-react';

const WhyChooseUs = () => {
  const differentiators = [
    {
      icon: CheckCircle,
      title: 'Exclusive Autocomplete Technology',
      description: 'Proprietary methods not available elsewhere'
    },
    {
      icon: Shield,
      title: '90-Day Money-Back Guarantee',
      description: 'Full refund if no traffic improvement'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: '6 languages, 4 countries, all search engines'
    },
    {
      icon: BarChart,
      title: 'Scientific Approach',
      description: '500+ ranking factors analyzed'
    },
    {
      icon: Clock,
      title: 'Dedicated Support',
      description: '24-hour email response guarantee'
    },
    {
      icon: Users,
      title: 'Transparent Reporting',
      description: 'Real-time dashboard access'
    }
  ];

  const results = [
    {
      metric: '45-75 Days',
      description: 'Average time to see autocomplete results'
    },
    {
      metric: '500+',
      description: 'SEO ranking factors analyzed'
    },
    {
      metric: '90 Days',
      description: 'Money-back guarantee period'
    },
    {
      metric: '24 Hours',
      description: 'Maximum email response time'
    }
  ];

  return (
    <section id="results" className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Leading Brands Trust Effective Marketer
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our unique approach and proven results make us the go-to choice for businesses serious about dominating search
          </p>
        </div>

        {/* Results Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {results.map((result, index) => (
            <div key={index} className="bg-white rounded-xl p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-orange-500 mb-2">{result.metric}</div>
              <div className="text-gray-600">{result.description}</div>
            </div>
          ))}
        </div>

        {/* Key Differentiators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {differentiators.map((item, index) => (
            <div key={index} className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Success Stories */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Real Results from Real Clients
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">150%</div>
              <div className="text-gray-600">Average Traffic Increase</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">60 Days</div>
              <div className="text-gray-600">Average Time to Results</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">98%</div>
              <div className="text-gray-600">Client Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;