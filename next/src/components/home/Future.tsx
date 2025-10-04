import Link from "next/link";
import { Search, Target, Globe, Brain, Zap, TrendingUp } from "lucide-react";

const services = [
  {
    icon: Search,
    title: "Google Autocomplete Mastery",
    description:
      "Dominate Google autocomplete suggestions to appear before competitors even show up in search results",
    href: "/google-autosuggest-ranking",
  },
  {
    icon: Target,
    title: "GEO (Generative Engine Optimization)",
    description:
      "Get your brand recommended by ChatGPT, Claude, and Gemini when users ask for solutions in your industry",
    href: "/ai-seo",
  },
  {
    icon: Globe,
    title: "Authority Building",
    description:
      "Establish your brand as a trusted source that both search engines and AI platforms consistently reference",
  },
  {
    icon: Brain,
    title: "Strategic Content Development",
    description:
      "Create content that signals to both Google's algorithms and AI models that your brand should be recommended",
  },
  {
    icon: Zap,
    title: "Global Reach",
    description:
      "Our techniques work across Google, Bing, and other major search engines, supporting multiple languages and regions",
  },
  {
    icon: TrendingUp,
    title: "Results Tracking",
    description:
      "Monitor your autocomplete appearances and AI recommendations through our comprehensive analytics dashboard",
  },
];

export default function Future() {
  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-slate-50 to-red-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 left-20 w-40 h-40 border border-primary-500 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 border border-secondary-500 rounded-full animate-pulse delay-1000"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            The Future of <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Digital</span> Marketing
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-600 mb-6">
              We&apos;re pioneering the next generation of digital visibility through advanced GEO (Generative Engine Optimization) and autocomplete optimization techniques.
            </p>
            <p className="text-xl text-gray-600 mb-6">
              Our mission is to establish your brand as the definitive authority across AI platforms while dominating Google autocomplete suggestions for your most valuable keywords.
            </p>
            <p className="text-2xl font-semibold text-[#ff312b]">
              We specialize in GEO (Generative Engine Optimization) and Google autocomplete optimization.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 group"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              {service.href ? (
                <Link
                  href={service.href}
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm"
                >
                  Learn more →
                </Link>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
