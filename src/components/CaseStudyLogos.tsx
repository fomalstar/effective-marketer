import React from 'react';
import { Star, TrendingUp, Users, Award } from 'lucide-react';
import { getFeaturedCaseStudies } from '../data/caseStudiesData';

const CaseStudyLogos: React.FC = () => {
  const featuredCaseStudies = getFeaturedCaseStudies();

  const stats = [
    {
      icon: TrendingUp,
      value: "150%",
      label: "Average Traffic Increase",
      description: "Across all our AI SEO campaigns"
    },
    {
      icon: Star,
      value: "98%",
      label: "Client Satisfaction",
      description: "Based on post-campaign surveys"
    },
    {
      icon: Users,
      value: "6+",
      label: "Countries Served",
      description: "Global reach with local expertise"
    },
    {
      icon: Award,
      value: "45-60",
      label: "Days to Results",
      description: "Typical timeframe for rankings"
    }
  ];

  return (
    <section id="case-studies" className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full px-4 py-2 mb-6 border border-primary-500/30">
            <Star className="h-5 w-5 text-primary-500" />
            <span className="text-primary-600 font-medium text-sm lg:text-base">Success Stories</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Trusted by <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Leading Brands</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            We've helped businesses across multiple industries achieve unprecedented growth through our innovative AI SEO and Google Autosuggest optimization strategies.
          </p>
        </div>

        {/* Client Logos Grid */}
        <div className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
            {featuredCaseStudies.map((study, index) => (
              <div key={study.id} className="group">
                <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center border-2 border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:border-primary-200 group-hover:scale-105">
                  <img 
                    src={study.clientLogo} 
                    alt={`${study.clientName} logo`}
                    className="max-w-16 max-h-16 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center hidden">
                    <span className="text-white font-bold text-lg">{study.clientName.charAt(0)}</span>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <p className="text-sm font-medium text-gray-700 group-hover:text-primary-600 transition-colors duration-200">
                    {study.clientName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {study.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-br from-slate-50 to-red-50 rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Proven Results Across Industries
            </h3>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our data-driven approach delivers consistent, measurable results for businesses of all sizes and industries.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-lg font-semibold text-gray-700 mb-2">{stat.label}</div>
                  <div className="text-gray-600 text-sm">{stat.description}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-6">
            Ready to join our success stories?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://calendly.com/effectivemarketer/demo"
              className="inline-block bg-primary-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Start Your Success Story
            </a>
            <a
              href="/case-studies"
              className="inline-block border-2 border-primary-500 text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-500 hover:text-white transition-all duration-300"
            >
              View All Case Studies
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyLogos;
