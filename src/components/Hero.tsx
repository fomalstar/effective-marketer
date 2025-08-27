import React from 'react';
import { CheckCircle, Brain } from 'lucide-react';

const Hero = () => {
  const benefits = [
    'Dominate Google autocomplete suggestions before competitors appear',
    'Get your brand featured in search suggestions instantly',
    'Establish authority across AI platforms like ChatGPT and Gemini',
    'Achieve measurable results in 6-10 weeks'
  ];

  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-16 lg:py-20">
      {/* AI-themed background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-purple-400 rounded-full animate-ping delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping delay-2000"></div>
        <div className="absolute bottom-40 right-1/3 w-2 h-2 bg-pink-400 rounded-full animate-ping delay-3000"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 border border-cyan-400/30 rounded-full animate-pulse"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Content */}
          <div className="space-y-6 lg:space-y-8">
            <div className="space-y-4 lg:space-y-6">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full px-4 py-2 mb-4 border border-cyan-500/30">
                <Brain className="h-5 w-5 text-cyan-400" />
                <span className="text-cyan-300 font-medium text-sm lg:text-base">GEO & Autocomplete Mastery</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white leading-tight">
                
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Autocomplete SEO Optimization</span>
              </h1>
            </div>

            {/* Benefits */}
            <div className="space-y-3 lg:space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-lg">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="pt-4">
              <a
                href="https://calendly.com/effectivemarketer/demo"
                className="inline-block bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-cyan-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Get Started Today
              </a>
            </div>
          </div>

          {/* Right Side - Google Search Mockup */}
          <div className="relative mt-8 lg:mt-0">
            <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl shadow-2xl p-4 sm:p-6 max-w-lg mx-auto border border-cyan-500/30">
              {/* ChatGPT Header */}
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="text-base sm:text-lg font-semibold text-white">ChatGPT</div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center">
                    <Brain className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>
              
              {/* User Query */}
              <div className="mb-4">
                <div className="bg-slate-700/50 border border-cyan-500/30 rounded-lg px-3 sm:px-4 py-2 sm:py-3">
                  <div className="text-cyan-300 text-sm mb-1">You:</div>
                  <div className="text-white text-sm sm:text-base">What are the best fitness equipment brands?</div>
                </div>
              </div>
              
              {/* AI Response */}
              <div className="bg-slate-700/80 backdrop-blur-sm border border-purple-500/30 rounded-lg p-3 sm:p-4">
                <div className="text-purple-300 text-sm mb-2 flex items-center">
                  <Brain className="w-4 h-4 mr-2" />
                  ChatGPT:
                </div>
                <div className="text-white text-xs sm:text-sm leading-relaxed mb-3">
                  Based on quality, innovation, and user reviews, here are the top fitness equipment brands:
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-xs sm:text-sm">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                    <span className="text-white"><strong className="text-cyan-400">NordicTrack</strong> - Premium treadmills and ellipticals</span>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                    <span className="text-white"><strong className="text-cyan-400">Bowflex</strong> - Innovative home gym solutions</span>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                    <span className="text-white"><strong className="text-cyan-400">Peloton</strong> - Connected fitness experiences</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;