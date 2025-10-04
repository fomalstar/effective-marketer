import Link from "next/link";
import {
  CheckCircle,
  Brain,
  Target,
  TrendingUp,
  Users,
  Zap,
  Clock,
  Shield,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import Contact from "@/components/home/Contact";
import { buildMetadata } from "@/lib/metadata";

const features = [
  {
    icon: Brain,
    title: "Google Autocomplete Optimization",
    description:
      "Optimize your brand to appear in Google Autocomplete for your most difficult keywords",
    color: "from-primary-500 to-primary-600",
  },
  {
    icon: Target,
    title: "AI Chat Visibility",
    description:
      "Appear in AI chats like ChatGPT, Gemini, and other AI platforms for maximum exposure",
    color: "from-secondary-500 to-secondary-600",
  },
  {
    icon: TrendingUp,
    title: "Social Signals & Mentions",
    description:
      "Use social signals and strategic mentions to achieve optimal autosuggest results",
    color: "from-green-400 to-emerald-500",
  },
  {
    icon: Shield,
    title: "Advanced Reporting Dashboard",
    description:
      "Custom reporting dashboard with Autosuggests Tracking for complete visibility",
    color: "from-orange-400 to-red-500",
  },
];

const faqs = [
  {
    question: "How does Google Autosuggest ranking work?",
    answer:
      "Google Autosuggest ranking works when your brand appears in Google Autocomplete for your most difficult keywords. We also optimize to appear in AI chats like ChatGPT and other AI platforms. We use social signals and strategic mentions to achieve these results.",
  },
  {
    question: "What&apos;s the difference between traditional SEO and Autosuggest optimization?",
    answer:
      "Traditional SEO focuses on search engine rankings, while Autosuggest optimization targets Google Autocomplete and AI-powered recommendations. We ensure you&apos;re visible even before the search begins - appearing before ads and organic results.",
  },
  {
    question: "How long does it take to see results?",
    answer:
      "Most clients see initial results within 2-3 weeks, with full optimization achieved within 45-75 days. We never use keywords twice - if you claim it, your competitors cannot.",
  },
  {
    question: "What makes your approach different from competitors?",
    answer:
      "Unlike traditional SEO, we focus specifically on autosuggest optimization. Our approach ensures maximum visibility across Google Autocomplete and AI platforms using advanced social signals and mentions strategy.",
  },
  {
    question: "Do you provide ongoing maintenance and optimization?",
    answer:
      "Yes, we provide continuous monitoring and optimization of your autosuggest campaigns. Our team regularly analyzes performance, adjusts strategies, and ensures your brand maintains its prominent position in Google Autocomplete suggestions.",
  },
  {
    question: "Can you help with multiple languages or international markets?",
    answer:
      "Absolutely. We can optimize your brand for autosuggest visibility in multiple languages and international markets. Our strategies are adapted to local search behaviors and language-specific autocomplete patterns for maximum global reach.",
  },
];

const stats = [
  { icon: TrendingUp, value: "94%", label: "Success Rate" },
  { icon: Users, value: "45-60 days", label: "Average Time to Rank" },
  { icon: Zap, value: "68+", label: "Keywords Ranked" },
  { icon: Clock, value: "24/7", label: "Monitoring" },
];

export const metadata = buildMetadata({
  title: "Google Autocomplete SEO Ranking Services | Effective Marketer",
  description:
    "Get Google Autosuggest rankings in 45-60 days. SEO optimization for autosuggests, brand visibility in Google Autocomplete and AI chats. Start your campaign today.",
  canonical: "https://effectivemarketer.com/google-autosuggest-ranking",
  ogTitle: "Google Autocomplete SEO Ranking Services | #1 AI SEO Agency",
  ogDescription:
    "🚀 Get Google Autosuggest rankings in 45-60 days. ✅ 94% success rate. ⚡ AI SEO optimization for brand visibility. Start your campaign today!",
  ogImage: "https://effectivemarketer.com/googleautosuggests.jpg",
});

export default function GoogleAutosuggestRankingPage() {
  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 py-16 lg:py-20">
        <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true">
          <div className="absolute top-10 left-10 w-2 h-2 bg-primary-500 rounded-full animate-ping" />
          <div className="absolute top-20 right-20 w-1 h-1 bg-secondary-500 rounded-full animate-ping delay-1000" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full px-4 py-2 mb-6 border border-primary-500/30">
              <Brain className="h-5 w-5 text-primary-500" />
              <span className="text-primary-300 font-medium text-sm lg:text-base">
                SEO Ranking Services
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Google Autocomplete SEO Ranking Services
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-6 sm:mb-8 px-4 sm:px-0">
              Get Google Autosuggest rankings in 45-60 days. SEO optimization for autosuggests, brand visibility in Google Autocomplete and AI chats. Start your campaign today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center px-4 sm:px-0">
              <Link
                href="https://calendly.com/effectivemarketer/demo"
                className="w-full sm:w-auto inline-block bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:from-primary-600 hover:to-secondary-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-center"
              >
                Start Your Campaign
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

      <section id="features" className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full px-4 py-2 mb-4 border border-primary-500/30">
                <span className="text-primary-600 font-medium text-sm lg:text-base">
                  Why this matters
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Dominate Google Autocomplete before users even hit enter
              </h2>
              <p className="text-lg text-gray-600">
                We get your brand placed in Google Autosuggest so prospects see you before ads, before organic results, and before your competitors. We also optimize for AI chats like
                ChatGPT, Gemini, and Perplexity so your brand is recommended across every surface.
              </p>
              <div className="space-y-4">
                {[
                  "Rank for your most competitive keywords and brand queries without waiting for traditional SEO",
                  "Appear in AI chats like ChatGPT, Gemini, and AI Overviews — even when users never visit Google",
                  "Use social signals and strategic mentions that influence autosuggest faster than content alone",
                ].map((item) => (
                  <div key={item} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary-500 flex-shrink-0 mt-1" />
                    <p className="text-gray-600">{item}</p>
                  </div>
                ))}
              </div>
              <div className="pt-4">
                <a
                  href="https://calendly.com/effectivemarketer/demo"
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold"
                >
                  Book a strategy session
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 p-6"
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-4`}
                  >
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What makes our Google Autosuggest service different?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We pioneered autosuggest SEO in 2020 and developed a repeatable system trusted by Fortune 500 brands, Y Combinator startups, and SaaS companies worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                title: "Real social signals",
                description: "We deploy coordinated social signals that influence autosuggest faster than content alone.",
              },
              {
                title: "AI assistant coverage",
                description: "We get you cited in AI chats, not just Google suggestions, so you're visible wherever intent begins.",
              },
              {
                title: "100% unique keywords",
                description: "Every keyword is exclusive. Once you claim it, your competitors can't use it.",
              },
              {
                title: "Full transparency",
                description: "Weekly reporting, dedicated Slack updates, and a live autosuggest dashboard you can check anytime.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full px-4 py-2 mb-4 border border-primary-500/30">
                <span className="text-primary-600 font-medium text-sm lg:text-base">
                  Campaign deliverables
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                What you get when you hire Effective Marketer
              </h2>
              <ul className="space-y-4 text-gray-600">
                {[
                  "45-60 day Google Autosuggest sprint with guaranteed keyword claim",
                  "Dedicated autosuggest team: strategist, social signal lead, technical SEO, AI researcher",
                  "Weekly reporting with screenshot proof, mention trackers, and autosuggest rank graphs",
                  "Live autosuggest dashboard to monitor results anytime",
                  "AI assistant monitoring so you're cited in ChatGPT, Gemini, and other recommendation surfaces",
                ].map((item) => (
                  <li key={item} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary-500 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="https://calendly.com/effectivemarketer/demo"
                  className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold hover:from-primary-600 hover:to-secondary-600 transition-all"
                >
                  View case studies
                </Link>
                <a
                  href="#contact"
                  className="inline-flex items-center px-6 py-3 rounded-lg border border-primary-200 text-primary-600 font-semibold hover:bg-primary-50 transition-all"
                >
                  Talk to an expert
                </a>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  title: "Real-time reporting",
                  description: "Live dashboard with autosuggest rankings, social signals, and AI citations.",
                  icon: BarChart3,
                },
                {
                  title: "AI search dominance",
                  description: "Appear in Gemini, ChatGPT, Perplexity, and AI Overviews when buyers ask for recommendations.",
                  icon: Brain,
                },
                {
                  title: "Competitor displacement",
                  description: "Push competitors out of autosuggests and own the conversation before it starts.",
                  icon: Target,
                },
                {
                  title: "Social signal engineering",
                  description: "Coordinated campaigns that drive the volume and sentiment AI systems track.",
                  icon: Zap,
                },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white mb-4">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2 mb-4 border border-white/20">
                <span className="text-white font-medium text-sm lg:text-base">
                  Results you can trust
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Proven autosuggest results across industries
              </h2>
              <p className="text-lg text-white/80 mb-6">
                From SaaS to finance to ecommerce, we&apos;ve helped brands take over the most competitive autosuggest slots in their markets.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-white/10 rounded-2xl p-6 border border-white/10 text-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                    <p className="text-sm text-white/70">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-primary-200 text-gray-900">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Campaign Snapshot</h3>
                  <p className="text-sm text-gray-500">SaaS brand • 45 day sprint</p>
                </div>
                <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Exclusive
                </div>
              </div>
              <div className="space-y-5">
                {[
                  {
                    label: "Keywords claimed",
                    value: "12 high-intent queries",
                  },
                  {
                    label: "AI citations",
                    value: "Gemini, Perplexity, ChatGPT",
                  },
                  {
                    label: "Social signals",
                    value: "14 platforms, 350+ mentions",
                  },
                  {
                    label: "Competitors displaced",
                    value: "4 direct competitors",
                  },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.label}</span>
                    <span className="font-semibold text-gray-900">{item.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 rounded-2xl bg-gradient-to-r from-primary-50 to-secondary-50 p-6">
                <p className="text-sm text-primary-700">
                  “We dominated our category in under two months. Autosuggest is now one of our highest converting channels.”
                </p>
                <div className="mt-4 flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-semibold">
                    EM
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Director of Growth</p>
                    <p className="text-xs text-gray-500">Series B SaaS Company</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full px-4 py-2 mb-4 border border-primary-500/30">
                <span className="text-primary-600 font-medium text-sm lg:text-base">
                  Predictable outcomes
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                45-60 day sprint with clear deliverables
              </h2>
              <p className="text-lg text-gray-600">
                Most campaigns complete in six weeks, including autosuggest rankings, AI citations, and your custom dashboard setup.
              </p>
              <div className="space-y-4">
                {[
                  "Week 1-2: Strategy, social signal prep, AI assistant mapping",
                  "Week 3-4: Keyword claims go live, autosuggest monitoring, AI placement tracking",
                  "Week 5-6: Dashboard handoff, maintenance options, ongoing displacement",
                ].map((item) => (
                  <div key={item} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary-500 mt-1" />
                    <p className="text-gray-600 text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
              <div className="pt-4">
                <Link
                  href="https://calendly.com/effectivemarketer/demo"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-semibold hover:from-primary-600 hover:to-secondary-600 transition-all"
                >
                  Schedule a call
                </Link>
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Campaign timeline overview
              </h3>
              <div className="space-y-6">
                {[
                  {
                    title: "Week 1",
                    description: "Kickoff, keyword locking, social signal prep",
                  },
                  {
                    title: "Week 2",
                    description: "AI assistant mapping, mention sequencing, dashboard setup",
                  },
                  {
                    title: "Week 3-4",
                    description: "Autosuggest slots claimed, AI citations confirmed, weekly reporting",
                  },
                  {
                    title: "Week 5-6",
                    description: "Dashboard handoff, ongoing optimization, maintenance plan",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                    <div className="text-primary-500 font-semibold">✔</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Client testimonials</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              See why brands trust Effective Marketer to secure their most important autosuggest slots.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "Within six weeks we owned the most competitive autosuggests in our market. The reporting was transparent and the results were fast.",
                author: "CMO, Enterprise SaaS platform",
              },
              {
                quote:
                  "We went from zero presence to being cited in ChatGPT, Gemini, and Google Autosuggest in 45 days. It fundamentally changed our pipeline.",
                author: "Founder, B2B Services Company",
              },
              {
                quote:
                  "The autosuggest dashboard is always on and we see exactly where we rank every morning. No other agency gave us this level of control.",
                author: "Head of Growth, Fintech Startup",
              },
            ].map((item) => (
              <div key={item.author} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <p className="text-gray-600 text-lg leading-relaxed mb-4">{item.quote}</p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">
                    {item.author.split(" ")[0][0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{item.author}</p>
                    <p className="text-xs text-gray-500">{item.author.split(" ")[1]}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-gradient-to-r from-orange-500 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Lock Your Autocomplete Territory?
            </h2>
            <p className="text-xl mb-8 max-w-4xl mx-auto opacity-90">
              Our team has executed 100+ campaigns securing autocomplete dominance for enterprise brands and high-growth challengers.
            </p>
            <Link
              href="#contact"
              className="inline-block bg-white text-[#ff312b] px-8 py-4 rounded-xl font-bold text-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Schedule a Strategy Call
            </Link>
          </div>
        </div>
      </section>

      <Contact
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Google Autocomplete SEO Ranking Services",
            description:
              "Google Autosuggest rankings in 45-60 days with SEO optimization for autosuggests",
            provider: {
              "@type": "Organization",
              name: "Effective Marketer",
              url: "https://effectivemarketer.com",
              logo: "https://effectivemarketer.com/EM%20LOGO.png",
            },
            offers: {
              "@type": "Offer",
              price: "2997",
              priceCurrency: "USD",
              description: "Google Autosuggest ranking service",
            },
            areaServed: {
              "@type": "Country",
              name: "Worldwide",
            },
            serviceType: "SEO and Autosuggest Optimization",
            category: "Digital Marketing Services",
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          },
        ]}
      />
    </div>
  );
}
