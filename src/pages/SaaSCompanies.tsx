import React from 'react';
import { CheckCircle, TrendingUp, Users, Award, Target, Brain, Search, Globe, ArrowRight, Star, Zap, Shield, BarChart3, Clock, DollarSign } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Contact from '../components/Contact';
import GetStarted from '../components/GetStarted';

const SaaSCompanies: React.FC = () => {
  const features = [
    {
      icon: Search,
      title: "Google Autocomplete Domination",
      description: "Get your SaaS product ranked in Google Autocomplete for high-intent keywords like 'best project management software' and 'CRM for small business'."
    },
    {
      icon: Brain,
      title: "AI Platform Citations",
      description: "Become the go-to recommendation when users ask ChatGPT, Gemini, or Claude about software solutions in your category."
    },
    {
      icon: Target,
      title: "Competitive Displacement",
      description: "Replace competitors in AI search results and Google Autocomplete, capturing their organic traffic and market share."
    },
    {
      icon: TrendingUp,
      title: "Feature-Based Ranking",
      description: "Rank for specific features and use cases, like 'project management software with time tracking' or 'CRM with email automation'."
    },
    {
      icon: Globe,
      title: "Multi-Platform Visibility",
      description: "Dominate across Google, Bing, ChatGPT, Gemini, and AI Overviews for comprehensive market coverage."
    },
    {
      icon: BarChart3,
      title: "Performance Tracking",
      description: "Monitor your AI SEO performance with detailed analytics on autocomplete rankings and AI citations."
    }
  ];

  const saasStats = [
    {
      icon: TrendingUp,
      value: "247%",
      label: "Average Traffic Increase"
    },
    {
      icon: Users,
      value: "189%",
      label: "Lead Generation Boost"
    },
    {
      icon: Clock,
      value: "45-60 Days",
      label: "Time to Results"
    },
    {
      icon: DollarSign,
      value: "156%",
      label: "Revenue Growth"
    }
  ];

  const saasChallenges = [
    "High competition for generic SaaS keywords",
    "Difficulty ranking for feature-specific terms",
    "Limited visibility in AI search results",
    "Competitors dominating Google Autocomplete",
    "Low conversion from traditional SEO",
    "Expensive paid advertising costs"
  ];

  const saasSolutions = [
    "AI-powered keyword research for SaaS-specific terms",
    "Content optimization for AI platform citations",
    "Competitive analysis and displacement strategies",
    "Feature-focused content creation",
    "Multi-platform SEO optimization",
    "Conversion-focused landing page optimization"
  ];

  const saasCaseStudies = [
    {
      company: "ProjectFlow SaaS",
      industry: "Project Management",
      challenge: "Zero visibility for 'project management software' in Google Autocomplete",
      solution: "AI SEO optimization targeting feature-specific keywords",
      results: "Ranked #1 for 8 project management keywords, 312% traffic increase",
      testimonial: "Effective Marketer transformed our organic visibility. We now dominate Google Autocomplete for project management terms."
    },
    {
      company: "CRM Pro",
      industry: "Customer Relationship Management",
      challenge: "Competing with Salesforce and HubSpot for CRM visibility",
      solution: "AI platform citation optimization and competitive displacement",
      results: "Cited in ChatGPT for 'best CRM for small business', 189% lead increase",
      testimonial: "We're now the top recommendation when people ask AI about CRM solutions. Game-changing results!"
    }
  ];

  const faqs = [
    {
      question: "Why should I hire an AI SEO agency for my SaaS company?",
      answer: "Hiring an AI SEO agency for your SaaS company gives you access to specialized expertise in AI-driven search optimization. SaaS companies face unique challenges in competitive software markets, and an AI SEO agency understands how to optimize for both traditional search engines and AI platforms like ChatGPT and Gemini. You'll benefit from faster project timelines (1-3 months), senior-level AI SEO expertise, and innovative approaches that combine traditional SEO with emerging AI technologies."
    },
    {
      question: "What AI SEO services do you offer for SaaS companies?",
      answer: "We provide comprehensive AI SEO services for SaaS companies including Google Autocomplete optimization for software keywords, AI platform citations (ChatGPT, Gemini, AI Overviews), feature-specific keyword targeting, competitive displacement strategies, SaaS content optimization, and technical SEO for software platforms. Our services also cover topical mapping, keyword research, internal linking strategies, and conversion rate optimization specifically tailored for SaaS businesses."
    },
    {
      question: "How long does it take to complete an AI SEO project for SaaS companies?",
      answer: "Most SaaS AI SEO projects show initial results within 1-3 months, with full optimization taking 6-12 months depending on competition and project scope. Google Autocomplete rankings typically appear within 30-45 days, while AI platform citations may take 60-90 days to establish authority. Technical audits and on-page optimization for SaaS platforms typically complete within 4-6 weeks."
    },
    {
      question: "How much do AI SEO services cost for SaaS companies?",
      answer: "AI SEO pricing for SaaS companies varies based on project complexity and market focus. Basic AI SEO campaigns start around $1,500-3,000 monthly, while enterprise SaaS solutions range from $3,000-10,000+ monthly. Technical audits cost $2,000-5,000, topical mapping services run $3,000-8,000, and comprehensive AI SEO for competitive SaaS markets ranges $5,000-15,000 monthly. We offer competitive rates while maintaining senior-level AI SEO expertise."
    },
    {
      question: "What should I look for in an AI SEO agency for SaaS companies?",
      answer: "When evaluating AI SEO agencies for SaaS companies, prioritize those with proven experience in software markets and AI platform optimization. Look for agencies offering comprehensive services including technical audits, topical mapping, Google Autocomplete optimization, and platform-specific expertise. Essential qualities include in-house senior AI SEO experts, transparent reporting, fast project delivery (1-3 months for initial results), and innovative approaches combining traditional SEO with AI technologies."
    },
    {
      question: "What kind of SaaS companies do you work with?",
      answer: "We work with diverse SaaS companies ranging from early-stage startups to enterprise-level software providers. Our clients include project management SaaS, CRM platforms, marketing automation tools, fintech software, healthcare SaaS, ecommerce platforms, and productivity applications. We specialize in serving SaaS companies looking to establish or expand their digital presence, especially those targeting competitive niches and requiring specialized AI SEO expertise for software markets."
    }
  ];

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "AI SEO Services for SaaS Companies",
      "description": "Specialized AI SEO services for SaaS companies to dominate Google Autocomplete and AI platform citations for software-related keywords",
      "provider": {
        "@type": "Organization",
        "name": "Effective Marketer",
        "url": "https://effectivemarketer.com",
        "logo": "https://effectivemarketer.com/EM%20LOGO.png"
      },
      "areaServed": {
        "@type": "Country",
        "name": "Worldwide"
      },
      "serviceType": "AI SEO for SaaS Companies",
      "category": "Digital Marketing Services",
      "offers": {
        "@type": "Offer",
        "price": "3997",
        "priceCurrency": "USD",
        "description": "AI SEO services specifically designed for SaaS companies",
        "availability": "https://schema.org/InStock",
        "validFrom": "2025-01-01",
        "priceValidUntil": "2025-12-31"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "SaaS AI SEO Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Google Autocomplete Optimization for SaaS",
              "description": "Get your SaaS product ranked in Google Autocomplete for high-intent keywords"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "AI Platform Citation for SaaS",
              "description": "Become the go-to recommendation in ChatGPT, Gemini, and AI Overviews"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Competitive Displacement for SaaS",
              "description": "Replace competitors in AI search results and capture their market share"
            }
          }
        ]
      }
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
      "name": "AI SEO Services for SaaS Companies | Effective Marketer",
      "description": "Dominate Google Autocomplete and AI platforms for SaaS keywords. Get cited in ChatGPT, Gemini, and AI Overviews for software recommendations. Proven results for SaaS companies.",
      "url": "https://effectivemarketer.com/ai-seo-for-saas-companies",
      "mainEntity": {
        "@type": "Service",
        "name": "AI SEO Services for SaaS Companies"
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
            "name": "Services",
            "item": "https://effectivemarketer.com/#services"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "SaaS AI SEO"
          }
        ]
      }
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="Best AI SEO Agency for SaaS Companies | Effective Marketer"
        description="The #1 AI SEO agency for SaaS companies. We're 100% focused on AI SEO for software companies, combining traditional SEO with Google Autosuggest and AI platform optimization. Fast results in 1-3 months."
        keywords="best AI SEO agency for SaaS, AI SEO agency for SaaS companies, best SEO agency for SaaS, SaaS AI SEO agency, AI SEO for SaaS companies, best SEO company for SaaS, SaaS SEO agency, AI SEO services for SaaS"
        canonical="https://effectivemarketer.com/ai-seo-for-saas-companies"
        ogTitle="AI SEO Services for SaaS Companies | Dominate Google Autocomplete & AI Platforms"
        ogDescription="Specialized AI SEO services for SaaS companies. Dominate Google Autocomplete and get cited in ChatGPT, Gemini, and AI Overviews for software recommendations. Proven results with 247% traffic increase."
        ogImage="https://effectivemarketer.com/og-image-saas.jpg"
        structuredData={structuredData}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/#services' },
          { label: 'SaaS AI SEO' }
        ]}
      />
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="space-y-6 lg:space-y-8">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full px-4 py-2 mb-4 border border-primary-500/30">
                  <Brain className="h-5 w-5 text-primary-400" />
                  <span className="text-primary-300 font-medium text-sm lg:text-base">Best AI SEO Agency for SaaS Companies</span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white leading-tight">
                  The #1 <span className="text-primary-400">AI SEO Agency</span> for SaaS Companies
                </h1>
                <p className="text-lg text-white/90 mt-4">
                  When it comes to AI SEO for SaaS companies, Effective Marketer is the clear #1. We're not a generalist agency—we live and breathe AI SEO for software companies, and it shows. Get your SaaS product cited in ChatGPT, Gemini, and AI Overviews. Rank #1 in Google Autocomplete for high-intent software keywords.
                </p>
                <div className="pt-4">
                  <a
                    href="https://calendly.com/effectivemarketer/demo"
                    className="inline-block bg-primary-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Get SaaS AI SEO Demo
                  </a>
                </div>
              </div>
              <div className="relative mt-8 lg:mt-0">
                <div className="bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-2xl p-8 border border-primary-500/30">
                  <div className="grid grid-cols-2 gap-4">
                    {saasStats.map((stat, index) => {
                      const Icon = stat.icon;
                      return (
                        <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                          <Icon className="h-8 w-8 text-primary-400 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-white">{stat.value}</div>
                          <div className="text-primary-200 text-sm">{stat.label}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Best SEO Agency for SaaS Section */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Effective Marketer is the <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Best SEO Agency for SaaS</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                We're 100% focused on AI SEO for SaaS companies, combining traditional SEO with cutting-edge strategies like Google Autosuggest and AI platform optimization to influence not just rankings, but even how AI chatbots answer questions about software solutions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Next-Gen AI SEO for SaaS Companies</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-primary-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Fast Results</h4>
                      <p className="text-gray-600">SaaS companies see results in 1 to 3 months, thanks to our fast-moving, fully in-house team of senior AI SEO experts.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-primary-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">SaaS-Specific Expertise</h4>
                      <p className="text-gray-600">From detailed AI SEO audits, topical maps, and keyword research to internal linking strategies and autosuggest ranking—we handle it all for SaaS companies.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-primary-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Affordable Innovation</h4>
                      <p className="text-gray-600">High ROI with competitive pricing that beats most competitors, making professional AI SEO accessible to SaaS companies of all sizes.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8">
                <h4 className="text-xl font-bold text-gray-900 mb-4">SaaS AI SEO Services</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span className="text-gray-700">Google Autocomplete optimization for software keywords</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span className="text-gray-700">AI platform citations (ChatGPT, Gemini, AI Overviews)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span className="text-gray-700">Feature-specific keyword targeting</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span className="text-gray-700">Competitive displacement strategies</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span className="text-gray-700">SaaS content optimization</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span className="text-gray-700">Technical SEO for software platforms</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 lg:py-20 bg-gradient-to-br from-slate-50 to-red-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why SaaS Companies Choose Our <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">AI SEO</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Traditional SEO doesn't work for SaaS companies. Our AI-first approach targets the platforms where your customers actually discover software solutions.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="bg-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Challenges & Solutions */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Challenges */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">SaaS Marketing Challenges</h3>
                <div className="space-y-4">
                  {saasChallenges.map((challenge, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      </div>
                      <p className="text-gray-700">{challenge}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Solutions */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Our AI SEO Solutions</h3>
                <div className="space-y-4">
                  {saasSolutions.map((solution, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-700">{solution}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-16 lg:py-20 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                SaaS <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Success Stories</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                See how we've helped SaaS companies dominate AI search results and Google Autocomplete.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {saasCaseStudies.map((study, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{study.company}</h3>
                    <p className="text-blue-600 font-medium">{study.industry} SaaS</p>
                  </div>
                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Challenge:</h4>
                      <p className="text-gray-700">{study.challenge}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Solution:</h4>
                      <p className="text-gray-700">{study.solution}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Results:</h4>
                      <p className="text-gray-700 font-medium text-green-600">{study.results}</p>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="text-gray-700 italic">"{study.testimonial}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <Team />

        {/* Case Studies Section */}
        <section className="py-16 lg:py-20 bg-gradient-to-br from-slate-50 to-red-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                SaaS <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Success Stories</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                See how we've helped SaaS companies dominate AI search results and Google Autocomplete.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {saasCaseStudies.map((study, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{study.company}</h3>
                    <p className="text-primary-600 font-medium">{study.industry} SaaS</p>
                  </div>
                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Challenge:</h4>
                      <p className="text-gray-700">{study.challenge}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Solution:</h4>
                      <p className="text-gray-700">{study.solution}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Results:</h4>
                      <p className="text-gray-700 font-medium text-green-600">{study.results}</p>
                    </div>
                  </div>
                  <div className="bg-primary-50 p-4 rounded-lg border-l-4 border-primary-500">
                    <p className="text-gray-700 italic">"{study.testimonial}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Roadmap Section */}
        <Roadmap />

        {/* FAQ Section */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                SaaS AI SEO <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">FAQ</span>
              </h2>
              <p className="text-xl text-gray-600">
                Common questions about AI SEO for SaaS companies
              </p>
            </div>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Contact />
        <GetStarted />
      </main>
      <Footer />
    </div>
  );
};

export default SaaSCompanies;
