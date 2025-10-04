import Link from "next/link";
import {
  Brain,
  TrendingUp,
  ShoppingCart,
  Search,
  Globe,
} from "lucide-react";
import Contact from "@/components/home/Contact";
import CaseStudyLogos from "@/components/home/CaseStudyLogos";
import { buildMetadata, buildStructuredData } from "@/lib/metadata";

const highlights = [
  {
    icon: ShoppingCart,
    title: "Google Autocomplete Domination",
    description:
      "Own transactional queries like 'best online store for [product]' and 'where to buy [product] online'.",
  },
  {
    icon: Brain,
    title: "AI Shopping Citations",
    description:
      "Become the default recommendation when users ask ChatGPT, Gemini, or Claude where to buy specific items.",
  },
  {
    icon: Search,
    title: "Product & Category Ranking",
    description:
      "Capture high-intent long-tail searches across product detail, collection, and comparison queries.",
  },
];

const metrics = [
  { icon: TrendingUp, value: "312%", label: "Average Traffic Lift" },
  { icon: ShoppingCart, value: "189%", label: "Sales Growth" },
  { icon: Search, value: "25+", label: "Keywords Ranked" },
  { icon: Globe, value: "98%", label: "AI Citation Rate" },
];

const structuredData = buildStructuredData({
  breadcrumbs: [
    { label: "Home", href: "https://effectivemarketer.com" },
    { label: "AI SEO for Ecommerce" },
  ],
});

export const metadata = buildMetadata({
  title: "AI SEO for Ecommerce Companies | Effective Marketer",
  description:
    "Dominate Google Autocomplete and AI shopping recommendations. Specialized AI SEO for ecommerce brands delivering 312% average traffic lift.",
  canonical: "https://effectivemarketer.com/ai-seo-for-ecommerce",
  ogTitle: "AI SEO for Ecommerce — Autocomplete & AI Shopping Citations",
  ogDescription:
    "Capture high-intent ecommerce buyers with AI SEO, Autocomplete optimization, and AI shopping citations.",
});

export default function EcommerceCompaniesPage() {
  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 py-16 lg:py-20">
        <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full px-4 py-2 mb-6 border border-primary-500/30">
            <ShoppingCart className="h-5 w-5 text-primary-400" />
            <span className="text-primary-300 font-medium text-sm lg:text-base">
              AI SEO for Ecommerce
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Dominate Ecommerce AI Search & Autocomplete
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto mb-6 sm:mb-8">
            We help ecommerce brands secure top autocomplete slots, win AI shopping recommendations, and convert high-intent buyers faster than traditional SEO.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            {highlights.map((item) => (
              <div key={item.title} className="bg-white/10 border border-white/20 rounded-xl p-6">
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
              Book a Strategy Call
            </Link>
            <a
              href="#metrics"
              className="w-full sm:w-auto inline-block bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-white/20 transition-all duration-300 text-center"
            >
              View Performance Data
            </a>
          </div>
        </div>
      </section>

      <section id="metrics" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ecommerce Performance Benchmarks
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Representative results delivered by our AI SEO programs for online retailers.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {metrics.map((metric) => (
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
      <Contact structuredData={structuredData} />
    </div>
  );
}
