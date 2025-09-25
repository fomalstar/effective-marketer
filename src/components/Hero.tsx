import React from 'react';
import { CheckCircle, Brain } from 'lucide-react';

const Hero = () => {
  const benefits = [
    'Get cited by ChatGPT, Gemini, and Claude AI',
    'AI Topical Maps for Generative Intent',
    'Reddit growth & social authority',
    'Results in 6-10 weeks'
  ];

  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 py-16 lg:py-20">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Content */}
          <div className="space-y-6 lg:space-y-8">
            <div className="space-y-4 lg:space-y-6">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full px-4 py-2 mb-4 border border-primary-500/30">
                <Brain className="h-5 w-5 text-primary-500" />
                <span className="text-primary-300 font-medium text-sm lg:text-base">AI SEO & Platform Optimization</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white leading-tight">
                <span className="text-primary-500">AI SEO</span> <span className="text-secondary-500">Optimization</span>
              </h1>
              <p className="text-lg text-white mt-4">
                Get your brand featured in AI platforms when users ask about your industry
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-3 lg:space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-white text-base">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="pt-4">
              <a
                href="https://calendly.com/effectivemarketer/demo"
                className="inline-block bg-primary-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Get Started Today
              </a>
            </div>
          </div>

          {/* Right Side - Google Search Mockup */}
          <div className="relative mt-8 lg:mt-0">
            <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl shadow-2xl p-4 sm:p-6 max-w-lg mx-auto border border-primary-500/30">
              {/* ChatGPT Header */}
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="text-base sm:text-lg font-semibold text-white">ChatGPT</div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                    <Brain className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>
              
              {/* User Query */}
              <div className="mb-4">
                <div className="bg-slate-700/50 border border-primary-500/30 rounded-lg px-3 sm:px-4 py-2 sm:py-3">
                  <div className="text-primary-300 text-sm mb-1">You:</div>
                  <div className="text-white text-sm sm:text-base">What are the best fitness equipment brands?</div>
                </div>
              </div>
              
              {/* AI Response */}
              <div className="bg-slate-700/80 backdrop-blur-sm border border-secondary-500/30 rounded-lg p-3 sm:p-4">
                <div className="text-secondary-300 text-sm mb-2 flex items-center">
                  <Brain className="w-4 h-4 mr-2" />
                  ChatGPT:
                </div>
                <div className="text-white text-xs sm:text-sm leading-relaxed mb-3">
                  Based on quality, innovation, and user reviews, here are the top fitness equipment brands:
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-xs sm:text-sm">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                    <span className="text-white"><strong className="text-primary-500">NordicTrack</strong> - Premium treadmills and ellipticals</span>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                    <span className="text-white"><strong className="text-primary-500">Bowflex</strong> - Innovative home gym solutions</span>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                    <span className="text-white"><strong className="text-primary-500">Peloton</strong> - Connected fitness experiences</span>
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