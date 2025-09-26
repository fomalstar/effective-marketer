import React from 'react';
import { CheckCircle, TrendingUp, Clock, Users, Target, Brain, Search, Globe, ArrowRight, Star, Award, Zap } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Team from '../components/Team';
import WhyChooseUs from '../components/WhyChooseUs';
import Roadmap from '../components/Roadmap';
import Contact from '../components/Contact';
import GetStarted from '../components/GetStarted';
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

            {/* Improved Case Studies Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
              {caseStudies.map((study, index) => (
                <div key={study.id} className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
                  {/* Header with Logo and Info */}
                  <div className="p-8 bg-gradient-to-br from-gray-50 to-white">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl flex items-center justify-center border-4 border-white shadow-lg">
                        <img 
                          src={study.clientLogo} 
                          alt={`${study.clientName} logo`}
                          className="max-w-14 max-h-14 object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                        <div className="w-14 h-14 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center hidden">
                          <span className="text-white font-bold text-xl">{study.clientName.charAt(0)}</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{study.clientName}</h3>
                        <p className="text-primary-600 font-semibold text-sm mb-1">{study.industry}</p>
                        <p className="text-gray-500 text-sm mb-3">{study.location}</p>
                        <p className="text-gray-700 text-sm leading-relaxed">{study.description}</p>
                      </div>
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                        ✓ {study.duration}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="space-y-6 mb-8">
                      <div className="bg-gradient-to-r from-red-50 to-yellow-50 p-4 rounded-xl border-l-4 border-primary-500">
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                          <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                          Challenge
                        </h4>
                        <p className="text-gray-700 text-sm leading-relaxed">{study.challenge}</p>
                      </div>
                      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border-l-4 border-blue-500">
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          Solution
                        </h4>
                        <p className="text-gray-700 text-sm leading-relaxed">{study.solution}</p>
                      </div>
                    </div>

                    {/* Results Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-4 rounded-xl text-center border border-primary-200">
                        <div className="text-2xl font-bold text-primary-600 mb-1">{study.results.autocompleteRankings}</div>
                        <div className="text-xs text-gray-600 font-medium">Autocomplete Rankings</div>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl text-center border border-green-200">
                        <div className="text-2xl font-bold text-green-600 mb-1">{study.results.trafficIncrease}</div>
                        <div className="text-xs text-gray-600 font-medium">Traffic Increase</div>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl text-center border border-purple-200">
                        <div className="text-2xl font-bold text-purple-600 mb-1">{study.results.aiCitations}</div>
                        <div className="text-xs text-gray-600 font-medium">AI Citations</div>
                      </div>
                      <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl text-center border border-orange-200">
                        <div className="text-2xl font-bold text-orange-600 mb-1">{study.results.leadIncrease}</div>
                        <div className="text-xs text-gray-600 font-medium">Lead Increase</div>
                      </div>
                    </div>

                    {/* Testimonial */}
                    <div className="bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-50 p-6 rounded-2xl border-2 border-primary-200 relative">
                      <div className="absolute top-4 left-4 text-4xl text-primary-300">"</div>
                      <p className="text-gray-700 italic text-sm mb-4 mt-2 leading-relaxed">"{study.testimonial.quote}"</p>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{study.testimonial.author.charAt(0)}</span>
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 text-sm">{study.testimonial.author}</div>
                          <div className="text-gray-600 text-xs">{study.testimonial.position}, {study.testimonial.company}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Case Studies CTA */}
            <div className="text-center">
              <a
                href="#contact"
                className="inline-block bg-primary-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Get Your Success Story
              </a>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <WhyChooseUs />

        {/* Team Section */}
        <Team />

        {/* Roadmap Section */}
        <Roadmap />

        {/* Contact Section */}
        <Contact />

        {/* Get Started Section */}
        <GetStarted />
      </main>
      <Footer />
    </div>
  );
};

export default CaseStudies;