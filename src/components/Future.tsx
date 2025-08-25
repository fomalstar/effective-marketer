import React from 'react';
import { Search, Target, Globe, Brain, Zap, TrendingUp } from 'lucide-react';

const Future = () => {
  const features = [
    {
      icon: Search,
      title: 'Google Autocomplete Mastery',
      description: 'Dominate Google autocomplete suggestions to appear before competitors even show up in search results'
    },
    {
      icon: Target,
      title: 'GEO (Generative Engine Optimization)',
      description: 'Get your brand recommended by ChatGPT, Claude, and Gemini when users ask for solutions in your industry'
    },
    {
      icon: Globe,
      title: 'Authority Building',
      description: 'Establish your brand as a trusted source that both search engines and AI platforms consistently reference'
    },
    {
      icon: Brain,
      title: 'Strategic Content Development',
      description: 'Create content that signals to both Google\'s algorithms and AI models that your brand should be recommended'
    },
    {
      icon: Zap,
      title: 'Global Reach',
      description: 'Our techniques work across Google, Bing, and other major search engines, supporting multiple languages and regions'
    },
    {
      icon: TrendingUp,
      title: 'Results Tracking',
      description: 'Monitor your autocomplete appearances and AI recommendations through our comprehensive analytics dashboard'
    }
  ];

  return (
    <section id="services" className="py-16 lg:py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* AI-themed background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-40 h-40 border border-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 border border-purple-400 rounded-full animate-pulse delay-1000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            The Future of <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Digital</span> Marketing
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-600 mb-6">
              We're pioneering the next generation of digital visibility through advanced GEO (Generative Engine Optimization) and autocomplete optimization techniques.
            </p>
            <p className="text-xl text-gray-600 mb-6">
              Our mission is to establish your brand as the definitive authority across AI platforms while dominating Google autocomplete suggestions for your most valuable keywords.
            </p>
            <p className="text-2xl font-semibold text-[#ff312b]">
              We specialize in GEO (Generative Engine Optimization) and Google autocomplete optimization.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Before/After Comparison */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Proven Results
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-orange-500 mb-3">150%</div>
              <div className="text-gray-600">Average Traffic Increase</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-orange-500 mb-3">60 Days</div>
              <div className="text-gray-600">Average Time to Results</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-orange-500 mb-3">98%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-orange-500 mb-3">24h</div>
              <div className="text-gray-600">Response Time</div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mt-12">
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <h4 className="text-2xl font-semibold text-gray-900">AI Platform Benefits</h4>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">Get recommended by ChatGPT, Claude, and Gemini</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">Establish authority across AI ecosystems</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">Become the go-to AI recommendation in your industry</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">Rapid implementation within 6-10 weeks</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">Performance guarantee with exit flexibility</span>
              </li>
            </ul>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <Search className="h-5 w-5 text-white" />
              </div>
              <h4 className="text-2xl font-semibold text-gray-900">Autocomplete SEO Benefits</h4>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">Appear in Google autocomplete before competitors</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">Influence user search behavior before they complete typing</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">Compatible with Google, Bing, and major search engines</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">Results typically visible within 45-75 days</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">90-day money-back guarantee if no improvement</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Future;