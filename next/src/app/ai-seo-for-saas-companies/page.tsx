import Link from "next/link";
import {
  Brain,
  TrendingUp,
  Users,
  Clock,
  DollarSign,
} from "lucide-react";
import Contact from "@/components/home/Contact";
import Team from "@/components/home/Team";
import Roadmap from "@/components/home/Roadmap";
import CaseStudyLogos from "@/components/home/CaseStudyLogos";
import { buildMetadata, buildStructuredData } from "@/lib/metadata";

type Highlight = { title: string; subtitle: string; }

const keyHighlights: Highlight[] = [
  { title: "Google Autocomplete Domination", subtitle: "Capture high-intent SaaS queries before results appear." },
  { title: "AI Platform Citations", subtitle: "Become the go-to recommendation in ChatGPT, Gemini, Claude." },
  { title: "Feature-Based Ranking", subtitle: "Rank for specific SaaS use cases & differentiators." },
];

const performanceStats = [
  { icon: TrendingUp, value: "247%", label: "Average Traffic Increase" },
  { icon: Users, value: "189%", label: "Lead Generation Boost" },
  { icon: Clock, value: "45-60 Days", label: "Time to Results" },
  { icon: DollarSign, value: "156%", label: "Revenue Growth" },
];

const structuredData = buildStructuredData({
  breadcrumbs: [
    { label: "Home", href: "https://effectivemarketer.com" },
    { label: "AI SEO for SaaS" },
  ],
});

export const metadata = buildMetadata({
  title: "AI SEO for SaaS Companies | Effective Marketer",
  description:
    "Dominate AI search and Google Autocomplete for SaaS keywords. Specialized AI SEO, AI citations, and conversion strategies for software companies.",
  canonical: "https://effectivemarketer.com/ai-seo-for-saas-companies",
  ogTitle: "AI SEO for SaaS Companies — Autocomplete & AI Citations",
  ogDescription:
    "Capture high-intent SaaS searches with AI SEO, Autocomplete optimization, and AI platform citations.",
});

export default function SaaSCompaniesPage() {
  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 py-16 lg:py-20">
        <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full px-4 py-2 mb-6 border border-primary-500/30">
              <Brain className="h-5 w-5 text-primary-500" />
              <span className="text-primary-300 font-medium text-sm lg:text-base">
                AI SEO for SaaS
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Dominate SaaS AI Search & Autocomplete
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto mb-6 sm:mb-8">
              We help SaaS companies secure top autocomplete slots, become AI search recommendations, and convert high-intent buyers faster than traditional SEO.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
              {keyHighlights.map((item) => (
                <div key={item.title} className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-white text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-primary-200 text-sm">{item.subtitle}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center mt-8">
              <Link
                href="https://calendly.com/effectivemarketer/demo"
                className="w-full sm:w-auto inline-block bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:from-primary-600 hover:to-secondary-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-center"
              >
                Book Your Strategy Session
              </Link>
              <a
                href="#stats"
                className="w-full sm:w-auto inline-block bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-white/20 transition-all duration-300 text-center"
              >
                View Performance Data
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="stats" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              SaaS Growth Metrics
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Benchmark performance our AI SEO programs consistently deliver for software companies.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {performanceStats.map((stat) => (
              <div key={stat.label} className="bg-gray-50 rounded-xl p-6 border border-gray-100 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CaseStudyLogos />
      <Team />
      <Roadmap />
      <Contact structuredData={structuredData} />
    </div>
  );
}
