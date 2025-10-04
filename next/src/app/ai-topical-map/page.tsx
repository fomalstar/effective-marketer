import Link from "next/link";
import {
  Map as MapIcon,
  Layers,
  Sparkles,
  Network,
  CheckCircle,
  HelpCircle,
  ArrowRight,
} from "lucide-react";
import Contact from "@/components/home/Contact";
import { buildMetadata, buildStructuredData } from "@/lib/metadata";
import Image from "next/image";

const faqs = [
  {
    question: "What is an AI Topical Map?",
    answer:
      "An AI Topical Map is an entity-rich blueprint of your topic space. It structures clusters, subtopics, relationships, and evidence so assistants can synthesize and cite your brand.",
  },
  {
    question: "How is this different from a normal content plan?",
    answer:
      "Traditional plans chase keywords; our maps target Generative Intent. Each cluster aligns with the decision criteria AI uses when attributing sources.",
  },
  {
    question: "Where will this help me appear?",
    answer:
      "Google AI Overviews, ChatGPT, Perplexity, Bing Copilot, Gemini, and other AI answer surfaces.",
  },
  {
    question: "What deliverables do I receive?",
    answer:
      "A spreadsheet and mind map with clusters, volumes, SERP insights, buyer journey stages, content types, and Generative Intent prompts.",
  },
  {
    question: "How long does it take to build?",
    answer: "Most maps are delivered in 10-15 business days depending on scope.",
  },
];

const structuredData = buildStructuredData({
  breadcrumbs: [
    { label: "Home", href: "https://effectivemarketer.com" },
    { label: "AI Topical Map" },
  ],
});

export const metadata = buildMetadata({
  title: "AI Topical Map Services | Effective Marketer",
  description:
    "Own AI search with Generative Intent ready topical maps. Entity-rich blueprints designed so answer engines cite your brand.",
  canonical: "https://effectivemarketer.com/ai-topical-map",
  ogTitle: "Own AI Search with GEO-Ready Topical Maps",
  ogDescription:
    "We build entity-driven maps that align with Generative Intent so AI systems cite you across answer experiences.",
});

export default function AITopicalMapPage() {
  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 py-16 lg:py-20">
        <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full px-4 py-2 mb-6 border border-primary-500/30">
            <MapIcon className="h-5 w-5 text-primary-500" />
            <span className="text-primary-300 font-medium text-sm lg:text-base">
              AI Topical Map
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Own AI Search with GEO-Ready Topical Maps
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Design entity-rich topical blueprints aligned to Generative Intent so ChatGPT, Gemini, and Google AI cite your brand.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center">
            <Link
              href="https://calendly.com/effectivemarketer/demo"
              className="w-full sm:w-auto inline-block bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:from-primary-600 hover:to-secondary-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-center"
            >
              Start Your Topical Map
            </Link>
            <Link
              href="/ai-seo"
              className="w-full sm:w-auto inline-block bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-white/20 transition-all duration-300 text-center"
            >
              Explore AI SEO
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-xl" />
              <Image
                src="/topicalmape.png"
                alt="AI Topical Map example showing entity hierarchy"
                width={1200}
                height={800}
                className="w-full h-auto rounded-xl shadow-2xl border border-gray-200"
                priority
              />
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full px-4 py-2 mb-4 border border-primary-500/30">
                <Layers className="h-5 w-5 text-cyan-500" />
                <span className="text-cyan-700 font-medium text-sm lg:text-base">Entity-Rich Architecture</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Entity-Rich, Citation-Ready Architecture</h2>
              <div className="space-y-5">
                {[
                  "Four-level clusters humans and LLMs can navigate without context drift.",
                  "Zero cannibalization — each cluster has a clear intent and role.",
                  "Planned internal linking that guides users and models across your map.",
                  "Ready-to-brief content plans aligned to buyer journeys and Generative Intent.",
                ].map((point) => (
                  <div key={point} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-cyan-500 flex-shrink-0 mt-1" />
                    <p className="text-gray-700">{point}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link
                  href="/ai-seo"
                  className="inline-flex items-center text-cyan-600 hover:text-cyan-700 font-medium"
                >
                  See how we use maps in AI SEO
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-gray-100 shadow-sm p-8 md:p-10 bg-gradient-to-br from-white to-gray-50">
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 bg-cyan-50 text-cyan-700 rounded-full px-3 py-1 text-sm font-medium mb-4">
                <Sparkles className="h-4 w-4" />
                <span>Topical Authority</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Build Unrivaled Topical Authority</h2>
              <p className="text-lg text-gray-600">
                SEO gets you ranked. <span className="text-purple-600 font-semibold">GEO gets you cited.</span>
              </p>
            </div>
            <p className="text-gray-700 text-center max-w-3xl mx-auto">
              We craft topic hierarchies that match how AI systems summarize, attribute, and cite answers — so your brand appears in the conversations buyers trust.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              {[
                {
                  icon: Network,
                  title: "Built for answer engines",
                  description: "Entity-driven maps structured for AI Overviews, ChatGPT, Perplexity, and Bing.",
                },
                {
                  icon: Layers,
                  title: "Complete topic coverage",
                  description: "Close gaps, eliminate cannibalization, and secure topical authority.",
                },
                {
                  icon: Sparkles,
                  title: "Ready-to-brief plans",
                  description: "Buyer journey mapping and content-type recommendations per cluster.",
                },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-xl p-6 border border-gray-100">
                  <item.icon className="h-6 w-6 text-cyan-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Generative Intent</h2>
              <p className="text-gray-700 mb-4">
                Most searches fit four classic intents. AI assistants added a fifth: <span className="font-semibold">Generative Intent</span> — do-the-thinking-for-me queries where people want synthesized guidance with citations.
              </p>
              <p className="text-gray-700">
                Our maps structure entities, relationships, decision criteria, and evidence so assistants can synthesize, attribute, and cite your brand in answer experiences.
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                {["Informational", "Navigational", "Transactional", "Commercial", "Generative Intent"].map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full text-sm bg-white border border-gray-200 text-gray-700">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center space-x-2 text-cyan-700 mb-3">
                <Sparkles className="h-5 w-5" />
                <span className="font-medium">Why it matters</span>
              </div>
              <p className="text-gray-700">
                Generative Intent queries drive AI answers. Structuring content for these intents increases your likelihood of being cited when users ask complex, comparative, or planning questions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">How GEO-Ready Maps Work</h2>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-secondary-500 hidden md:block" />
            <div className="space-y-8">
              {[
                {
                  step: "1",
                  title: "Ask the right questions",
                  description:
                    "We analyze search intent, competitors, and user questions to identify the Generative Intent prompts you must win across AI and classic search.",
                },
                {
                  step: "2",
                  title: "Design the topical blueprint",
                  description:
                    "We arrange topics and subtopics into a hierarchy. Entities and relationships help LLMs surface you for Generative Intent requests.",
                },
                {
                  step: "3",
                  title: "Deliver your GEO map",
                  description:
                    "Spreadsheet + mind map deliverables with keywords, clusters, SERP analysis, buyer journey stages, content types, and Generative Intent prompts.",
                },
              ].map((item) => (
                <div key={item.step} className="relative md:pl-16">
                  <div className="hidden md:flex absolute left-0 top-0 w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white items-center justify-center font-semibold shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 capitalize">{item.title}</h3>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
            FAQs about AI Topical Maps
          </h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-white rounded-xl p-6 border border-gray-100">
                <div className="flex items-start">
                  <HelpCircle className="h-6 w-6 text-cyan-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Contact structuredData={structuredData} />
    </div>
  );
}
