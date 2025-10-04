import Image from "next/image";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import Team from "@/components/home/Team";
import Roadmap from "@/components/home/Roadmap";
import Contact from "@/components/home/Contact";
import GetStarted from "@/components/home/GetStarted";
import WhyChooseUs from "@/components/home/WhyChooseUs";
// TODO removed: component now ported
import { getAllCaseStudies } from "@/data/caseStudiesData";
import { Star, TrendingUp, Clock, Users, Target } from "lucide-react";

const caseStudies = getAllCaseStudies();

const stats = [
  {
    icon: TrendingUp,
    value: "150%",
    label: "Average Traffic Increase",
    description: "Across all our AI SEO campaigns",
  },
  {
    icon: Clock,
    value: "45-60",
    label: "Days to Results",
    description: "Typical timeframe for Google Autosuggest rankings",
  },
  {
    icon: Users,
    value: "98%",
    label: "Client Satisfaction",
    description: "Based on post-campaign surveys",
  },
  {
    icon: Target,
    value: "12+",
    label: "Keywords Ranked",
    description: "Average per client campaign",
  },
];

export const metadata = buildMetadata({
  title: "Case Studies | Effective Marketer - Proven AI SEO Results",
  description:
    "Discover our customer success stories. See how Effective Marketer helps businesses achieve top Google Autosuggest rankings, AI platform visibility, and significant organic growth with our AI SEO services.",
  canonical: "https://effectivemarketer.com/case-studies",
  ogTitle: "Case Studies | Effective Marketer - Proven AI SEO Results",
  ogDescription:
    "Discover our customer success stories. See how Effective Marketer helps businesses achieve top Google Autosuggest rankings, AI platform visibility, and significant organic growth with our AI SEO services.",
  ogImage: "https://effectivemarketer.com/og-image-case-studies.jpg",
});

export default function CaseStudiesPage() {
  return (
    <div className="flex flex-col">
      <section className="py-16 lg:py-20 bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full px-4 py-2 mb-6 border border-primary-500/30">
            <Star className="h-5 w-5 text-primary-500" />
            <span className="text-primary-300 font-medium text-sm lg:text-base">Success Stories</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Discover Our <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">Customer Success Stories</span>
          </h1>
          <p className="text-xl text-white/90 max-w-4xl mx-auto mb-8">
            Since 2020, we&apos;ve helped numerous companies achieve unparalleled digital visibility through our cutting-edge AI SEO, Google Autosuggest, and Generative Engine Optimization strategies. Whatever the issues you face, we have the solutions you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://calendly.com/effectivemarketer/demo"
              className="inline-block bg-primary-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Schedule a Call
            </Link>
            <a
              href="#case-studies"
              className="inline-block border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300"
            >
              View Case Studies
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-gray-700 mb-2">{stat.label}</div>
                <div className="text-gray-600 text-sm">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {caseStudies.map((study) => (
              <div key={study.id} className="bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center">
                      <Image
                        src={study.clientLogo}
                        alt={`${study.clientName} logo`}
                        width={64}
                        height={64}
                        className="max-w-12 max-h-12 object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900">{study.clientName}</h3>
                      <p className="text-gray-600 text-sm">
                        {study.industry} • {study.location}
                      </p>
                      <p className="text-primary-600 text-sm font-medium">{study.duration}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Challenge</h4>
                      <p className="text-gray-700 text-sm">{study.challenge}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Solution</h4>
                      <p className="text-gray-700 text-sm">{study.solution}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-gray-50 p-3 rounded text-center">
                      <div className="text-lg font-bold text-primary-600">{study.results.autocompleteRankings}</div>
                      <div className="text-xs text-gray-600">Autocomplete</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded text-center">
                      <div className="text-lg font-bold text-green-600">{study.results.trafficIncrease}</div>
                      <div className="text-xs text-gray-600">Traffic</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded text-center">
                      <div className="text-lg font-bold text-blue-600">{study.results.aiCitations}</div>
                      <div className="text-xs text-gray-600">AI Citations</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded text-center">
                      <div className="text-lg font-bold text-orange-600">{study.results.leadIncrease}</div>
                      <div className="text-xs text-gray-600">Leads</div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700 italic text-sm mb-3">{study.testimonial.quote}</p>
                    <div className="text-sm">
                      <div className="font-semibold text-gray-900">{study.testimonial.author}</div>
                      <div className="text-gray-600">
                        {study.testimonial.position}, {study.testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
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

      {/* Temporarily omit WhyChooseUs until component is migrated */}
      <WhyChooseUs />
      <Team />
      <Roadmap />
      <Contact />
      <GetStarted />
    </div>
  );
}
