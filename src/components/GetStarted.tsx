import React from 'react';
import { Phone, MessageCircle, Rocket, CheckCircle, Brain, Zap, Cpu } from 'lucide-react';

const GetStarted = () => {
  const steps = [
    {
      icon: Brain,
      title: 'Choose Your Strategy',
      description: 'Select from our tailored optimization packages',
      highlight: 'Custom solutions available'
    },
    {
      icon: Phone,
      title: 'Strategic Onboarding',
      description: 'Complete secure setup and strategic planning session',
      highlight: 'Streamlined process'
    },
    {
      icon: Zap,
      title: 'Watch Results Unfold',
      description: 'Monitor progress through our advanced analytics dashboard',
      highlight: 'Results in 6-10 weeks'
    }
  ];

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 relative overflow-hidden">
      {/* AI-themed background elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true">
        <div className="absolute top-10 left-10 w-2 h-2 bg-primary-500 rounded-full animate-ping"></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-secondary-500 rounded-full animate-ping delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-primary-400 rounded-full animate-ping delay-2000"></div>
        <div className="absolute bottom-40 right-1/3 w-2 h-2 bg-pink-400 rounded-full animate-ping delay-3000"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 border border-primary-500/30 rounded-full animate-pulse"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full px-6 py-2 mb-6 border border-primary-500/30">
            <Cpu className="h-5 w-5 text-primary-500" />
            <span className="text-primary-300 font-medium text-sm lg:text-base">AI Revolution</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Lead the AI Revolution?
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            Begin your journey to AI platform dominance and search suggestion mastery
          </p>
        </div>

        {/* 3-Step Process */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary-500/25 group-hover:shadow-xl group-hover:shadow-primary-500/40 group-hover:scale-110 transition-all duration-300 relative">
                <step.icon className="h-8 w-8 text-white" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary-500 rounded-full animate-pulse"></div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
              <p className="text-gray-300 mb-3">{step.description}</p>
              <span className="text-primary-500 font-medium">{step.highlight}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="https://calendly.com/effectivemarketer/demo"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-primary-600 hover:to-secondary-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl shadow-primary-500/25"
          >
            <Rocket className="h-5 w-5" />
            <span>
            Book Your Strategy Session
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default GetStarted;