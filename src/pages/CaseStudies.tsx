import React from 'react';
import { CheckCircle, TrendingUp, Clock, Users, Target, Brain, Search, Globe, ArrowRight, Star, Award, Zap } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getAllCaseStudies } from '../data/caseStudiesData';

const CaseStudies: React.FC = () => {
  const caseStudies = getAllCaseStudies();

  const stats = [
    {
      icon: TrendingUp,
      value: "150%",
      label: "Average Traffic Increase",
      description: "Across all our AI SEO campaigns"
    },
    {
      icon: Clock,
      value: "45-60",
      label: "Days to Results",
      description: "Typical timeframe for Google Autosuggest rankings"
    },
    {
      icon: Users,
      value: "98%",
      label: "Client Satisfaction",
      description: "Based on post-campaign surveys"
    },
    {
      icon: Target,
      value: "12+",
      label: "Keywords Ranked",
      description: "Average per client campaign"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <SEOHead 
          title="Case Studies | Effective Marketer - Proven AI SEO Results"
          description="Discover our customer success stories. See how Effective Marketer helps businesses achieve top Google Autosuggest rankings, AI platform visibility, and significant organic growth with our AI SEO services."
          keywords="AI SEO case studies, Google Autosuggest success stories, AI marketing results, generative engine optimization case studies, client testimonials, SEO success"
          canonical="https://effectivemarketer.com/case-studies"
          ogTitle="Case Studies | Effective Marketer - Proven AI SEO Results"
          ogDescription="Discover our customer success stories. See how Effective Marketer helps businesses achieve top Google Autosuggest rankings, AI platform visibility, and significant organic growth with our AI SEO services."
          ogImage="https://effectivemarketer.com/og-image-case-studies.jpg"
        />

        {/* Hero Section */}
        <section className="py-16 lg:py-20 bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full px-4 py-2 mb-6 border border-primary-500/30">
                <Star className="h-5 w-5 text-primary-500" />
                <span className="text-primary-300 font-medium text-sm lg:text-base">Success Stories</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Discover Our <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">Customer Success Stories</span>
              </h1>
              
              <p className="text-xl text-white/90 max-w-4xl mx-auto mb-8">
                Since 2020, we've helped numerous companies achieve unparalleled digital visibility through our cutting-edge AI SEO, Google Autosuggest, and Generative Engine Optimization strategies. Whatever the issues you face, we have the solutions you need.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://calendly.com/effectivemarketer/demo"
                  className="inline-block bg-primary-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Schedule a Call
                </a>
                <a
                  href="#case-studies"
                  className="inline-block border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300"
                >
                  View Case Studies
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                    <div className="text-lg font-semibold text-gray-700 mb-2">{stat.label}</div>
                    <div className="text-gray-600 text-sm">{stat.description}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section id="case-studies" className="py-16 lg:py-20 bg-gradient-to-br from-slate-50 to-red-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Real Results from <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Real Clients</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Our unique approach and proven results make us the go-to choice for businesses serious about dominating search and AI platforms.
              </p>
            </div>

            <div className="space-y-16">
              {caseStudies.map((study, index) => (
                <div key={study.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                  {/* Content */}
                  <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <div className="bg-white rounded-2xl p-8 shadow-lg">
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center border-2 border-gray-100 shadow-sm">
                          <img 
                            src={study.clientLogo} 
                            alt={`${study.clientName} logo`}
                            className="max-w-12 max-h-12 object-contain"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              target.nextElementSibling?.classList.remove('hidden');
                            }}
                          />
                          <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center hidden">
                            <span className="text-white font-bold text-lg">{study.clientName.charAt(0)}</span>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">{study.clientName}</h3>
                          <p className="text-gray-600">{study.industry} • {study.location} • {study.duration}</p>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">Challenge</h4>
                          <p className="text-gray-700">{study.challenge}</p>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">Solution</h4>
                          <p className="text-gray-700">{study.solution}</p>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-4">Results</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <div className="text-2xl font-bold text-primary-600">{study.results.autocompleteRankings}</div>
                              <div className="text-sm text-gray-600">Autocomplete Rankings</div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <div className="text-2xl font-bold text-primary-600">{study.results.trafficIncrease}</div>
                              <div className="text-sm text-gray-600">Traffic Increase</div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <div className="text-2xl font-bold text-primary-600">{study.results.aiCitations}</div>
                              <div className="text-sm text-gray-600">AI Citations</div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <div className="text-2xl font-bold text-primary-600">{study.results.leadIncrease}</div>
                              <div className="text-sm text-gray-600">Lead Increase</div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-6 rounded-xl border border-primary-200">
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-sm">"</span>
                              </div>
                            </div>
                            <div>
                              <p className="text-gray-700 italic mb-3">"{study.testimonial.quote}"</p>
                              <div className="text-sm">
                                <div className="font-semibold text-gray-900">{study.testimonial.author}</div>
                                <div className="text-gray-600">{study.testimonial.position}, {study.testimonial.company}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Image */}
                  <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                    <div className="relative">
                      <img 
                        src={study.image} 
                        alt={`${study.clientName} case study`}
                        className="w-full h-96 object-cover rounded-2xl shadow-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
                      <div className="absolute bottom-6 left-6 text-white">
                        <div className="text-2xl font-bold mb-2">{study.clientName}</div>
                        <div className="text-white/90">{study.industry} Success Story</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CaseStudies;