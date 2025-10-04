import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle,
  Brain,
  Target,
  TrendingUp,
  Users,
  Zap,
  Clock,
  BarChart3,
  Workflow,
  Database,
  Cpu,
} from "lucide-react";
import Contact from "@/components/home/Contact";
import { buildMetadata } from "@/lib/metadata";

const features = [
  {
    icon: Workflow,
    title: "Cold Email Automation",
    description:
      "Build the system on your side with our 'Build for You' service. 95% inbox rate, under 1% bounce rate",
    color: "from-primary-500 to-primary-600",
  },
  {
    icon: Target,
    title: "LinkedIn Outreach Automation",
    description:
      "Automated LinkedIn outreach with AI-powered personalization and lead qualification",
    color: "from-secondary-500 to-secondary-600",
  },
  {
    icon: TrendingUp,
    title: "AI Lead Qualification",
    description: "Using AI to qualify leads before sending and write ultra-personalized emails",
    color: "from-green-400 to-emerald-500",
  },
  {
    icon: Cpu,
    title: "Auto-Pilot Calendar Booking",
    description:
      "Qualified leads show up on calendar on auto-pilot with AI agent replies in 2 minutes",
    color: "from-orange-400 to-red-500",
  },
];

const automationStats = [
  {
    icon: Zap,
    title: "93% of Leads from Cold Outreach",
    description: "Proven track record of successful cold email campaigns",
  },
  {
    icon: Clock,
    title: "AI Agent Replies in 2 Minutes",
    description: "Ultra-fast response times for maximum engagement",
  },
  {
    icon: BarChart3,
    title: "95% Inbox Rate",
    description: "Industry-leading deliverability with under 1% bounce rate",
  },
  {
    icon: Database,
    title: "Automated Lead Scraping",
    description: "AI-powered lead verification and qualification",
  },
];

const useCases = [
  {
    icon: Users,
    title: "B2B Sales Teams",
    description: "Scale your sales outreach with AI-powered cold email automation",
    examples: ["Sales agencies", "B2B companies", "Consulting firms"],
  },
  {
    icon: Target,
    title: "SaaS Companies",
    description: "Automate lead generation and qualification for product demos and trials",
    examples: ["B2B SaaS", "Enterprise software", "Cloud platforms"],
  },
  {
    icon: TrendingUp,
    title: "Service Businesses",
    description: "Generate qualified leads through automated cold email and LinkedIn outreach",
    examples: ["Agencies", "Consulting", "Professional services"],
  },
];

const faqs = [
  {
    question: "How does your cold email automation work?",
    answer:
      "Our cold email automation is a 'Build for You' service where we set up the entire system on your side. We handle automated lead scraping & verification, AI-powered lead qualification, ultra-personalized email writing, and automated email replies. 93% of our leads come from cold outreach.",
  },
  {
    question: "What makes your cold email service different?",
    answer:
      "We achieve 95% inbox rate with under 1% bounce rate, which is industry-leading. Our AI agent replies within 2 minutes after prospect replies, and we provide the best cold email setup with automated lead qualification before sending.",
  },
  {
    question: "How does the auto-pilot calendar booking work?",
    answer:
      "Qualified leads automatically show up on your calendar on auto-pilot. Our AI agent handles the initial conversation and qualification, then seamlessly books qualified prospects directly into your calendar without any manual intervention.",
  },
  {
    question: "What platforms do you integrate with?",
    answer:
      "We integrate with all major email platforms, CRM systems, and calendar tools including Gmail, Outlook, HubSpot, Salesforce, Calendly, and more. Our system works with your existing tools and workflows.",
  },
  {
    question: "How long does it take to see results?",
    answer:
      "Most clients see initial results within 2-3 weeks, with full automation achieved within 30-45 days. The AI learns from your specific industry and target audience to continuously improve performance.",
  },
  {
    question: "Is there a learning curve for my team?",
    answer:
      "Our platform is designed to be intuitive with minimal learning curve. We provide comprehensive onboarding, video tutorials, and ongoing support. Most teams are fully operational within 1-2 weeks of implementation.",
  },
];

export const metadata = buildMetadata({
  title: "AI Automation Lead Generation Service | Effective Marketer",
  description:
    "Transform your B2B lead generation with AI-powered cold email and LinkedIn outreach automation. 93% of leads from cold outreach. See results in 30 days.",
  canonical: "https://effectivemarketer.com/lead-gen-ai-automation",
  ogTitle: "AI Automation Lead Generation Service | 93% Success Rate",
  ogDescription:
    "🎯 Transform B2B lead generation with AI automation. 📧 Cold email + LinkedIn outreach. ⚡ 95% inbox rate. 🤖 AI replies in 2 minutes!",
  ogImage: "https://effectivemarketer.com/og-leadgen.jpg",
});

export default function AIAutomationPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 py-16 lg:py-20">
        <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true">
          <div className="absolute top-10 left-10 w-2 h-2 bg-primary-500 rounded-full animate-ping" />
          <div className="absolute top-20 right-20 w-1 h-1 bg-secondary-500 rounded-full animate-ping delay-1000" />
          <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-primary-400 rounded-full animate-ping delay-2000" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full px-4 py-2 mb-6 border border-primary-500/30">
              <Brain className="h-5 w-5 text-primary-500" />
              <span className="text-primary-300 font-medium text-sm lg:text-base">
                AI-Powered Lead Generation
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              AI Automation Lead Generation Service
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-6 sm:mb-8 px-4 sm:px-0">
              Transform your B2B lead generation with AI-powered cold email and LinkedIn outreach automation. 93% of our leads come from cold outreach.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center px-4 sm:px-0">
              <Link
                href="https://calendly.com/effectivemarketer/demo"
                className="w-full sm:w-auto inline-block bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:from-primary-600 hover:to-secondary-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-center"
              >
                Start Your Automation
              </Link>
              <a
                href="#features"
                className="w-full sm:w-auto inline-block bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-white/20 transition-all duration-300 text-center"
              >
                See Features
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Summary Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Choose Our AI Lead Generation?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Our AI automation stack delivers end-to-end lead generation automation—from lead scraping and validation, to AI-driven personalization and instant replies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-4`}
                >
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-16 bg-gradient-to-br from-slate-900 via-red-900 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Full-Funnel Automation Workflow
              </h2>
              <p className="text-gray-300 mb-8 text-lg">
                We deploy an end-to-end automation system that scrapes leads, verifies data, writes personalized cold emails, sends campaigns, and books meetings directly into your calendar.
              </p>

              <div className="space-y-4">
                {[
                  "Lead scraping & verification",
                  "AI email personalization",
                  "Automated replies & booking",
                  "Performance dashboards",
                ].map((item) => (
                  <div key={item} className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-primary-500 to-secondary-500 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-gray-200 text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm border border-white/20">
              <h3 className="text-2xl font-semibold text-white mb-6">
                Automation Stats at a Glance
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {automationStats.map((stat) => (
                  <div key={stat.title} className="text-white">
                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-3">
                      <stat.icon className="h-6 w-6" />
                    </div>
                    <h4 className="text-xl font-semibold mb-1">{stat.title}</h4>
                    <p className="text-gray-200 text-sm leading-relaxed">{stat.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Campaign Results Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Successful Email Campaign Results
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Our AI automation delivers consistent results with industry-leading deliverability rates and engagement metrics.
              </p>
              <div className="space-y-6">
                {["95% inbox rate with <1% bounce", "AI-powered personalization", "Automated lead qualification", "Real-time analytics"].map((item) => (
                  <div key={item} className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-green-400 to-emerald-500 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-gray-600">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-100 rounded-xl p-6">
              <Image
                src="/totalemailsent.png"
                alt="Total emails sent campaign results"
                width={800}
                height={600}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              How AI Lead Generation Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our proprietary AI automation process combines cold email and LinkedIn outreach for maximum lead generation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Lead Scraping & Verification",
                description:
                  "Our AI automatically scrapes and verifies leads from multiple sources, ensuring high-quality prospects.",
              },
              {
                title: "AI Email Personalization",
                description:
                  "We use AI to write ultra-personalized emails and qualify leads before sending, ensuring maximum engagement rates.",
              },
              {
                title: "Auto-Pilot Calendar Booking",
                description:
                  "Qualified leads automatically show up on your calendar with AI agent replies in 2 minutes for seamless conversion.",
              },
            ].map((step, index) => (
              <div key={step.title} className="text-center">
                <div className="bg-gradient-to-r from-primary-500 to-secondary-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl font-bold">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calendar Booking Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-gray-100 rounded-xl p-6">
              <Image
                src="/leadgen.png"
                alt="Calendar booking automation"
                width={800}
                height={600}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Auto-Pilot Calendar Bookings
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Watch as qualified leads automatically book themselves on your calendar. Our AI agent handles the entire process from initial contact to scheduling.
              </p>
              <div className="space-y-6">
                {[
                  {
                    title: "2-Minute AI Response",
                    description:
                      "Our AI agent replies within 2 minutes after prospect replies for maximum engagement.",
                  },
                  {
                    title: "Smart Lead Qualification",
                    description:
                      "AI automatically qualifies prospects and only books meetings with interested leads.",
                  },
                  {
                    title: "Seamless Integration",
                    description:
                      "Works with your existing calendar tools like Calendly, Google Calendar, and Outlook.",
                  },
                  {
                    title: "Conversion Tracking",
                    description:
                      "Track booking rates, meeting attendance, and conversion metrics in real-time.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-secondary-500 to-secondary-600 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Advanced Lead Generation Features
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${feature.color} shadow-lg`}>
                    <div className="text-white">
                      <feature.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Perfect for These Use Cases
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {useCases.map((useCase) => (
              <div key={useCase.title} className="text-center">
                <div className="bg-gradient-to-r from-primary-500 to-secondary-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="text-white">
                    <useCase.icon className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{useCase.title}</h3>
                <p className="text-gray-600 mb-4">{useCase.description}</p>
                <div className="space-y-2">
                  {useCase.examples.map((example) => (
                    <div key={example} className="text-sm text-gray-500">• {example}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about our AI automation service.
            </p>
          </div>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-gray-50 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-500 to-secondary-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Automate Your Lead Generation?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join 500+ businesses that have transformed their lead generation with AI-powered cold email and LinkedIn automation.
          </p>
          <Link
            href="https://calendly.com/effectivemarketer/demo"
            className="inline-block bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Start Your Automation Today
          </Link>
        </div>
      </section>

      <Contact
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "AI Automation Lead Generation Service",
            description:
              "AI-powered cold email and LinkedIn outreach automation with 93% lead generation success rate",
            provider: {
              "@type": "Organization",
              name: "Effective Marketer",
              url: "https://effectivemarketer.com",
              logo: "https://effectivemarketer.com/EM%20LOGO.png",
            },
            offers: {
              "@type": "Offer",
              price: "1997",
              priceCurrency: "USD",
              description: "AI automation lead generation service",
            },
            areaServed: "Worldwide",
            serviceType: "Lead Generation and Email Automation",
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
