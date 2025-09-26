import React from 'react';
import { useParams } from 'react-router-dom';
import { 
  Search, 
  Target, 
  Globe, 
  Brain, 
  Zap, 
  TrendingUp, 
  CheckCircle, 
  Users, 
  Clock, 
  Award,
  Star,
  ArrowRight,
  MapPin,
  DollarSign,
  Wifi,
  ShoppingCart
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getLocationData, LocationData } from '../data/locationData';

const LocationPage: React.FC = () => {
  const { location } = useParams<{ location: string }>();
  const data: LocationData = getLocationData(location || 'malaysia');

  const services = [
    {
      icon: Search,
      title: 'Google Autosuggest Ranking',
      description: `Dominate Google autocomplete suggestions across ${data.country} to appear before competitors even show up in search results`
    },
    {
      icon: Brain,
      title: 'AI Platform Visibility',
      description: `Get cited by ChatGPT, Gemini, and Claude AI when users in ${data.country} ask about solutions in your industry`
    },
    {
      icon: Target,
      title: 'GEO (Generative Engine Optimization)',
      description: `Optimize your brand for AI-generated answers and recommendations across all major AI platforms`
    },
    {
      icon: Globe,
      title: 'Local SEO Optimization',
      description: `Enhance your local search presence in ${data.country} with AI-powered local SEO strategies`
    },
    {
      icon: Zap,
      title: 'AI Topical Maps',
      description: `Create entity-rich content blueprints designed for AI citations and Generative Intent`
    },
    {
      icon: TrendingUp,
      title: 'Performance Analytics',
      description: `Track your AI platform mentions and autocomplete rankings with comprehensive analytics`
    }
  ];

  const faqs = [
    {
      question: `How does AI SEO work in ${data.country}?`,
      answer: `AI SEO in ${data.country} optimizes your brand to be recommended and cited by AI systems like ChatGPT, Gemini, and Google AI Overviews. We ensure your brand appears in AI-generated answers, recommendations, and summaries across multiple platforms, specifically targeting ${data.country} market queries.`
    },
    {
      question: `What makes your approach different from traditional SEO?`,
      answer: `Traditional SEO focuses on search engine rankings, while our AI SEO targets Google Autocomplete and AI-powered recommendations. We ensure you're visible even before the search begins - appearing before ads and organic results in both traditional search and AI platforms.`
    },
    {
      question: `How long does it take to see results in ${data.country}?`,
      answer: `Most clients in ${data.country} see initial results within 2-3 weeks, with full optimization achieved within ${data.successMetrics.averageResults}. We never use keywords twice - if you claim it, your competitors cannot.`
    },
    {
      question: `Do you work with businesses in all industries in ${data.country}?`,
      answer: `Yes, we work with businesses across all major industries in ${data.country}, including ${data.topIndustries.slice(0, 3).join(', ')}. Our AI SEO strategies are tailored to each industry's unique characteristics and search behavior.`
    },
    {
      question: `What languages do you support for ${data.country}?`,
      answer: `We support ${data.language} content optimization for ${data.country}. Our multilingual approach ensures your brand appears in AI platforms and search results in the languages your target audience uses.`
    },
    {
      question: `How do you measure success in ${data.country}?`,
      answer: `We track multiple metrics including Google Autocomplete appearances, AI platform citations, organic traffic growth, and conversion rates. Our clients typically see ${data.successMetrics.trafficIncrease} traffic increase with ${data.successMetrics.clientSatisfaction} satisfaction rate.`
    }
  ];

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": `AI SEO Agency Services in ${data.country}`,
      "description": `Leading AI SEO agency in ${data.country} specializing in Google autosuggests optimization and AI platform visibility`,
      "provider": {
        "@type": "Organization",
        "name": "Effective Marketer",
        "url": "https://effectivemarketer.com",
        "logo": "https://effectivemarketer.com/EM%20LOGO.png"
      },
      "offers": {
        "@type": "Offer",
        "price": "2997",
        "priceCurrency": data.currency,
        "description": `AI SEO agency services for ${data.country}`,
        "availability": "https://schema.org/InStock",
        "validFrom": "2025-01-01",
        "priceValidUntil": "2025-12-31"
      },
      "areaServed": {
        "@type": "Country",
        "name": data.country
      },
      "serviceType": "AI SEO and Platform Visibility",
      "category": "Digital Marketing Services"
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map((faq, index) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": data.heroTitle,
      "description": data.heroSubtitle,
      "url": data.canonicalUrl,
      "mainEntity": {
        "@type": "Service",
        "name": `AI SEO Agency Services in ${data.country}`
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://effectivemarketer.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Locations",
            "item": "https://effectivemarketer.com/locations"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": data.country
          }
        ]
      }
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <SEOHead
          title={data.heroTitle}
          description={data.metaDescription}
          keywords={data.targetKeywords.join(', ')}
          canonical={data.canonicalUrl}
          ogTitle={`${data.heroTitle} | Effective Marketer`}
          ogDescription={data.metaDescription}
          ogType="website"
          ogImage="https://effectivemarketer.com/og-image.jpg"
          structuredData={structuredData}
        />

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full px-4 py-2 mb-6 border border-primary-500/30">
                <MapPin className="h-5 w-5 text-primary-500" />
                <span className="text-primary-300 font-medium text-sm lg:text-base">{data.country}</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                {data.heroTitle}
              </h1>
              
              <p className="text-xl text-white mb-8 max-w-4xl mx-auto">
                {data.heroSubtitle}
              </p>

              {/* Market Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold text-white mb-1">{data.marketSize}</div>
                  <div className="text-sm text-gray-300">Market Size</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold text-white mb-1">{data.internetPenetration}</div>
                  <div className="text-sm text-gray-300">Internet Penetration</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold text-white mb-1">{data.ecommerceGrowth}</div>
                  <div className="text-sm text-gray-300">E-commerce Growth</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold text-white mb-1">{data.successMetrics.clientSatisfaction}</div>
                  <div className="text-sm text-gray-300">Client Satisfaction</div>
                </div>
              </div>

              <a
                href="https://calendly.com/effectivemarketer/demo"
                className="inline-block bg-primary-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Get Started in {data.country} Today
              </a>
            </div>
          </div>
        </section>

        {/* Value Propositions */}
        <section className="py-16 lg:py-20 bg-gradient-to-br from-slate-50 to-red-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose Effective Marketer in <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">{data.country}</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.valuePropositions.map((proposition, index) => (
                <div key={index} className="bg-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-primary-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{proposition}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our AI SEO Services in {data.country}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive AI SEO solutions tailored for the {data.country} market
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div key={index} className="bg-gradient-to-br from-slate-50 to-red-50 rounded-xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Local Market Insights */}
        <section className="py-16 lg:py-20 bg-gradient-to-br from-slate-50 to-red-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {data.country} Market Insights
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Understanding the {data.country} digital landscape for maximum AI SEO impact
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Market Overview</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-primary-500" />
                    <span className="text-gray-700"><strong>Population:</strong> {data.marketSize}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <DollarSign className="h-5 w-5 text-primary-500" />
                    <span className="text-gray-700"><strong>GDP:</strong> {data.gdp}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Wifi className="h-5 w-5 text-primary-500" />
                    <span className="text-gray-700"><strong>Internet Penetration:</strong> {data.internetPenetration}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <ShoppingCart className="h-5 w-5 text-primary-500" />
                    <span className="text-gray-700"><strong>E-commerce Growth:</strong> {data.ecommerceGrowth}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Our Success Metrics</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-primary-500" />
                    <span className="text-gray-700"><strong>Average Results:</strong> {data.successMetrics.averageResults}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Award className="h-5 w-5 text-primary-500" />
                    <span className="text-gray-700"><strong>Client Satisfaction:</strong> {data.successMetrics.clientSatisfaction}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="h-5 w-5 text-primary-500" />
                    <span className="text-gray-700"><strong>Traffic Increase:</strong> {data.successMetrics.trafficIncrease}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Star className="h-5 w-5 text-primary-500" />
                    <span className="text-gray-700"><strong>Time to Results:</strong> {data.successMetrics.timeToResults}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Local Market Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.localMarketInsights.map((insight, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{insight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Everything you need to know about AI SEO in {data.country}
              </p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-gradient-to-br from-slate-50 to-red-50 rounded-xl p-6 border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-20 bg-gradient-to-br from-slate-900 via-red-900 to-slate-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Dominate AI Search in {data.country}?
            </h2>
            <p className="text-xl text-white mb-8">
              Join hundreds of successful businesses already using our AI SEO strategies
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://calendly.com/effectivemarketer/demo"
                className="inline-block bg-primary-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Book Free Consultation
              </a>
              <a
                href="/case-studies"
                className="inline-block bg-white/10 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                View Case Studies
                <ArrowRight className="inline-block ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LocationPage;
