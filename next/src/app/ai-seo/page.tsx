import Link from "next/link";
import Image from "next/image";
import {
  Brain,
  TrendingUp,
  Share2,
  Network,
  Map as MapIcon,
  HelpCircle,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import Contact from "@/components/home/Contact";
import { buildMetadata, buildStructuredData } from "@/lib/metadata";

const features = [
  {
    icon: TrendingUp,
    title: "AI Platform Visibility",
    description:
      "Appear in ChatGPT, Gemini, Claude and AI Overviews when users ask about your space.",
  },
  {
    icon: Share2,
    title: "Reddit Growth Engine",
    description:
      "Grow brand presence on Reddit with ethical community-first strategies that build authority and signals.",
  },
  {
    icon: MapIcon,
    title: "Advanced AI Topical Map",
    description:
      "Entity-rich topical blueprint designed for Generative Intent and AI citations.",
  },
  {
    icon: Network,
    title: "Signal Architecture",
    description:
      "Cross-platform mentions and internal linking models that LLMs can follow.",
  },
];

const faqs = [
  {
    q: "What is AI SEO and how is it different from traditional SEO?",
    a: "AI SEO optimizes your brand to be recommended and cited by AI systems like ChatGPT, Gemini, and Google AI Overviews — not just ranked in classic search. While traditional SEO focuses on ranking in search results, AI SEO ensures your brand appears in AI-generated answers, recommendations, and summaries across multiple platforms.",
  },
  {
    q: "How does Reddit growth contribute to AI SEO success?",
    a: "Reddit provides high-authority, community-driven content that AI models heavily weight when forming answers. Our Reddit growth strategies build genuine community engagement, establish topical authority, and create the social signals that AI assistants use to determine source credibility and relevance.",
  },
  {
    q: "What makes your AI Topical Maps different from regular content planning?",
    a: "Our AI Topical Maps are built specifically for Generative Intent — the 'do-the-thinking-for-me' queries where users want synthesized answers. We structure entities, relationships, and evidence so AI assistants can easily synthesize, attribute, and cite your brand in their responses.",
  },
  {
    q: "Which AI platforms do you optimize for?",
    a: "We optimize for ChatGPT, Google AI Overviews, Gemini, Claude, Perplexity, Bing AI, and emerging AI search platforms. Each platform has different citation patterns, so we tailor our approach accordingly.",
  },
  {
    q: "How long does it take to see results from AI SEO?",
    a: "Most clients see initial AI citations within 6-8 weeks, with full optimization achieved in 10-12 weeks. This timeline depends on your current domain authority, content velocity, and the competitive landscape in your industry.",
  },
  {
    q: "Do you provide ongoing monitoring and optimization?",
    a: "Yes, we continuously monitor your AI citations across platforms, track Generative Intent performance, and optimize your topical maps based on AI algorithm updates and new opportunities in your space.",
  },
];

const structuredData = buildStructuredData({
  breadcrumbs: [
    { label: "Home", href: "https://effectivemarketer.com" },
    { label: "AI SEO" },
  ],
  additional: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "AI SEO Agency Services",
      description:
        "AI platform visibility, Reddit growth, and advanced AI Topical Maps for citation-ready presence in AI answers.",
      provider: {
        "@type": "Organization",
        name: "Effective Marketer",
        url: "https://effectivemarketer.com",
        logo: "https://effectivemarketer.com/EM%20LOGO.png",
      },
      areaServed: {
        "@type": "Country",
        name: "Worldwide",
      },
      serviceType: "AI SEO and Platform Visibility",
      category: "Digital Marketing Services",
      offers: {
        "@type": "Offer",
        price: "3997",
        priceCurrency: "USD",
        description: "AI SEO agency services for platform visibility",
        availability: "https://schema.org/InStock",
        validFrom: "2025-01-01",
        priceValidUntil: "2025-12-31",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "AI SEO Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AI Platform Visibility",
              description: "Get cited in ChatGPT, Gemini, and AI Overviews",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Reddit Growth",
              description: "Strategic Reddit presence for AI citation",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AI Topical Maps",
              description: "Entity-rich blueprints for Generative Intent",
            },
          },
        ],
      },
    },
  ],
});

export const metadata = buildMetadata({
  title: "AI SEO Agency Services | Effective Marketer",
  description:
    "Win AI Search with platform visibility, Reddit growth, and AI Topical Maps. Get cited in ChatGPT, Gemini, and AI Overviews.",
  canonical: "https://effectivemarketer.com/ai-seo",
  ogTitle: "AI SEO Agency — Platform Visibility, Reddit Growth, Topical Maps",
  ogDescription:
    "Be cited by AI assistants. We build Generative Intent-ready topical maps and growth systems.",
});

export default function AISeoPage() {
  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 py-16 lg:py-20">
        <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full px-4 py-2 mb-6 border border-primary-500/30">
              <Brain className="h-5 w-5 text-primary-500" />
              <span className="text-primary-300 font-medium text-sm lg:text-base">
                AI SEO Agency
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Own AI Search with AI SEO
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-6 sm:mb-8">
              Get your brand recommended by AI assistants with Generative Intent-ready topical maps, Reddit growth, and cross-platform signals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center">
              <Link
                href="https://calendly.com/effectivemarketer/demo"
                className="w-full sm:w-auto inline-block bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:from-primary-600 hover:to-secondary-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-center"
              >
                Start Your AI SEO Campaign
              </Link>
              <a
                href="#features"
                className="w-full sm:w-auto inline-block bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-white/20 transition-all duration-300 text-center"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Choose AI SEO?
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              SEO gets you ranked. AI SEO gets you cited. We align your content with how AI systems summarize, attribute, and cite answers — ensuring your brand appears when it matters most.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="p-3 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 text-white inline-flex mb-4">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                How AI SEO Works
              </h2>
              <div className="space-y-6">
                {["Ask the Right Questions", "Design the Topical Blueprint", "Reddit Growth & Signals", "Ship & Interlink"].map(
                  (title, index) => (
                    <div key={title} className="flex items-start space-x-4">
                      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm font-bold">{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
                        <p className="text-gray-600">
                          {[
                            "Analyze search intent, competitors and user questions. Extract Generative Intent prompts you should win.",
                            "Human-curated topic hierarchy with entities and relationships. Semantic SEO that LLMs can follow and cite.",
                            "Build community trust and high-signal discussions that AI models consider when citing sources.",
                            "Publish focused content with internal links that keep users (and models) inside your cluster.",
                          ][index]}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="relative">
              <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl shadow-2xl p-4 sm:p-6 max-w-lg mx-auto border border-primary-500/30">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div className="text-base sm:text-lg font-semibold text-white">ChatGPT</div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center">
                      <Brain className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="bg-slate-700/50 border border-primary-500/30 rounded-lg px-3 sm:px-4 py-2 sm:py-3">
                    <div className="text-primary-300 text-sm mb-1">You:</div>
                    <div className="text-white text-sm sm:text-base">
                      What are the best AI SEO strategies for 2025?
                    </div>
                  </div>
                </div>
                <div className="bg-slate-700/80 backdrop-blur-sm border border-purple-500/30 rounded-lg p-3 sm:p-4">
                  <div className="text-purple-300 text-sm mb-2 flex items-center">
                    <Brain className="w-4 h-4 mr-2" />
                    ChatGPT:
                  </div>
                  <div className="text-white text-xs sm:text-sm leading-relaxed mb-3">
                    Based on current trends and successful implementations, here are the top AI SEO strategies:
                  </div>
                  <div className="space-y-2">
                    {["Generative Intent Mapping", "Reddit Authority Building", "Entity-Rich Topical Maps"].map(
                      (item) => (
                        <div key={item} className="flex items-center text-xs sm:text-sm">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                          <span className="text-white">
                            <strong className="text-primary-500">{item}</strong> -
                            {" "}
                            {[
                              "Structure content for AI synthesis",
                              "Community-driven signals",
                              "Citation-ready content",
                            ][Math.random() * 3 | 0]}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Advanced AI Topical Maps
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                Entity-rich topical blueprints built for Generative Intent and AI citations across ChatGPT, Google AI Mode, Perplexity, and beyond.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  {
                    title: "Generative Intent Coverage",
                    description:
                      "We map plan, compare, explain and do prompts to your clusters so assistants can synthesize and cite you.",
                  },
                  {
                    title: "LLM-Friendly Clusters",
                    description:
                      "Four-level hierarchy that prevents context drift and keeps models within your topical boundaries.",
                  },
                  {
                    title: "Complete Coverage",
                    description:
                      "Zero keyword cannibalization. Each cluster has a clear intent and outcome.",
                  },
                  {
                    title: "Plug-and-Play Delivery",
                    description: "Spreadsheet + mind map you can ship in days, not months.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-cyan-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/ai-topical-map"
                className="inline-flex items-center bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary-600 hover:to-secondary-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Learn About AI Topical Maps
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
            <div className="relative">
              <Image
                src="/topicalmape.png"
                alt="AI Topical Map example showing entity-rich hierarchy"
                width={800}
                height={600}
                className="w-full h-auto rounded-xl shadow-2xl border border-gray-200"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about AI SEO and our services
            </p>
          </div>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-start">
                  <HelpCircle className="h-6 w-6 text-cyan-500 mr-3 flex-shrink-0 mt-0.5" />
                  {faq.q}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-primary-500 to-secondary-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Own AI Search?
          </h2>
          <p className="text-xl text-cyan-100 mb-8">
            Join forward-thinking brands that are already winning AI citations with our proven AI SEO methodology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link
              href="https://calendly.com/effectivemarketer/demo"
              className="w-full sm:w-auto inline-block bg-white text-cyan-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Start Your AI SEO Campaign
            </Link>
            <Link
              href="/ai-topical-map"
              className="w-full sm:w-auto inline-block bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all duration-300"
            >
              Learn About Topical Maps
            </Link>
          </div>
        </div>
      </section>

      <Contact structuredData={structuredData} />
    </div>
  );
}
