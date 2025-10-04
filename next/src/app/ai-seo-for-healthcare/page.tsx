import Link from "next/link";
import {
  Brain,
  Heart,
  TrendingUp,
  Users,
  Search,
} from "lucide-react";
import Contact from "@/components/home/Contact";
import CaseStudyLogos from "@/components/home/CaseStudyLogos";
import Team from "@/components/home/Team";
import { buildMetadata, buildStructuredData } from "@/lib/metadata";

const differentiators = [
  {
    icon: Heart,
    title: "Medical Service Visibility",
    description:
      "Appear first when patients search autocomplete phrases like 'best cardiologist in [city]' and 'urgent care near me'.",
  },
  {
    icon: Brain,
    title: "AI Care Recommendations",
    description:
      "Become the trusted answer when people ask ChatGPT, Gemini, or Claude to recommend healthcare providers.",
  },
  {
    icon: Search,
    title: "Specialty Dominance",
    description:
      "Secure high-intent keywords across specialties, symptoms, and treatment pathways.",
  },
];

const performance = [
  { icon: TrendingUp, value: "287%", label: "Average Traffic Increase" },
  { icon: Users, value: "156%", label: "New Patient Inquiries" },
  { icon: Search, value: "32+", label: "Keywords Ranked" },
];

const structuredData = buildStructuredData({
  breadcrumbs: [
    { label: "Home", href: "https://effectivemarketer.com" },
    { label: "AI SEO for Healthcare" },
  ],
});

export const metadata = buildMetadata({
  title: "AI SEO for Healthcare Companies | Effective Marketer",
  description:
    "Dominate AI healthcare search, Google Autocomplete, and specialty queries. Proven AI SEO programs delivering 287% average traffic lift and 156% inquiry growth.",
  canonical: "https://effectivemarketer.com/ai-seo-for-healthcare",
  ogTitle: "AI SEO for Healthcare — Autocomplete & AI Patient Referrals",
  ogDescription:
    "Get cited across AI assistants, win Google Autocomplete, and capture high-intent patients with healthcare AI SEO.",
});

export default function HealthcareCompaniesPage() {
  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 py-16 lg:py-20">
        <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full px-4 py-2 mb-6 border border-primary-500/30">
            <Heart className="h-5 w-5 text-primary-400" />
            <span className="text-primary-300 font-medium text-sm lg:text-base">
              AI SEO for Healthcare
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Be the First Healthcare Recommendation Everywhere
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto mb-6 sm:mb-8">
            We help healthcare organizations own the queries that matter, from AI assistants to local autocomplete, so patients find and trust you first.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            {differentiators.map((item) => (
              <div key={item.title} className="bg-white/10 border border-white/15 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <item.icon className="h-6 w-6 text-primary-200" />
                  <h3 className="text-white text-lg font-semibold">{item.title}</h3>
                </div>
                <p className="text-primary-100 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center mt-10">
            <Link
              href="https://calendly.com/effectivemarketer/demo"
              className="w-full sm:w-auto inline-block bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:from-primary-600 hover:to-secondary-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-center"
            >
              Book a Patient Growth Session
            </Link>
            <a
              href="#performance"
              className="w-full sm:w-auto inline-block bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-white/20 transition-all duration-300 text-center"
            >
              See Performance Metrics
            </a>
          </div>
        </div>
      </section>

      <section id="performance" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Healthcare Growth Metrics
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Typical outcomes achieved through our AI SEO programs for providers, specialty clinics, and healthcare systems.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {performance.map((metric) => (
              <div key={metric.label} className="bg-gray-50 rounded-xl p-6 border border-gray-100 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <metric.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{metric.value}</div>
                <p className="text-gray-600 text-sm">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CaseStudyLogos />
      <Team />
      <Contact structuredData={structuredData} />
    </div>
  );
}
