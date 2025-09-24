import React from 'react';
import PageLayout from '../components/PageLayout';
import { Map, Layers, Sparkles, Network, CheckCircle, HelpCircle, ArrowRight } from 'lucide-react';

const AITopicalMap: React.FC = () => {
  const faqs = [
    {
      q: 'What is an AI Topical Map?',
      a: 'An AI Topical Map is an entity-rich blueprint of your topic space. It organizes clusters, subtopics, entities, and relationships so AI systems can understand, synthesize, and cite your brand in answer experiences.'
    },
    {
      q: 'How is this different from a normal content plan?',
      a: 'Traditional content plans target keywords; our maps target Generative Intent. We structure decision criteria, relationships, and evidence notes that AI assistants rely on when attributing and citing sources.'
    },
    {
      q: 'Where will this help me appear?',
      a: 'Across Google AI Overviews, ChatGPT, Perplexity, Bing AI, Gemini, and other AI surfaces where users receive synthesized answers.'
    },
    {
      q: 'What deliverables do I receive?',
      a: 'A plug-and-play spreadsheet and mind map including clusters, search volumes, CPC, SERP analysis, buyer-journey stages, content-type recommendations, and Generative Intent prompts per cluster.'
    },
    {
      q: 'How long does it take to build?',
      a: 'Most maps are delivered in 10–15 business days depending on topic scope and complexity.'
    }
  ];

  return (
    <PageLayout
      title="AI Topical Map Services | Effective Marketer"
      description="Own AI Search with GEO-ready topical maps. Entity-rich, Generative Intent blueprints built for AI citations across ChatGPT, Google AI Mode, Perplexity, and more."
      canonical="https://effectivemarketer.com/ai-topical-map"
      ogTitle="Own AI Search with GEO-Ready Topical Maps"
      ogDescription="We design entity-rich topical blueprints built around Generative Intent so answer engines cite you across AI experiences."
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'AI Topical Map' }]}
    >
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-16 lg:py-20">
        <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full px-4 py-2 mb-6 border border-cyan-500/30">
            <Map className="h-5 w-5 text-cyan-400" />
            <span className="text-cyan-300 font-medium text-sm lg:text-base">AI Topical Map</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">Own AI Search with GEO-Ready Topical Maps</h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-8">We design your topical blueprint — built around Generative Intent — so answer engines cite you on Google AI Mode, AI Overviews, ChatGPT, Perplexity, Bing, and beyond.</p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center">
            <a
              href="https://calendly.com/effectivemarketer/demo"
              className="w-full sm:w-auto inline-block bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:from-cyan-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Start Your Topical Map
            </a>
            <a
              href="/ai-seo"
              className="w-full sm:w-auto inline-block bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-white/20 transition-all duration-300"
            >
              Explore AI SEO
            </a>
          </div>
        </div>
      </section>

      {/* Image + Highlights */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <img
                src="/topicalmape.png"
                alt="AI Topical Map example showing entity-rich hierarchy and Generative Intent structure"
                className="w-full h-auto rounded-xl shadow-2xl border border-gray-200"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-xl"></div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Entity-Rich, Citation-Ready Architecture</h2>
              <div className="space-y-5">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-cyan-500 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">Four-level clusters humans and LLMs can navigate without context drift.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-cyan-500 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">Zero cannibalization — each cluster has a clear intent and role.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-cyan-500 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">Pre-planned internal linking that guides users and models across your map.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-cyan-500 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">Ready-to-brief content plans aligned to buyer journey and Generative Intent.</p>
                </div>
              </div>
              <div className="mt-8">
                <a
                  href="/ai-seo"
                  className="inline-flex items-center text-cyan-600 hover:text-cyan-700 font-medium"
                >
                  See how we use maps in AI SEO
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Build Unrivaled Topical Authority — Watch Your Organic Traffic Soar</h2>
          <p className="text-xl text-gray-600">SEO gets you ranked. GEO gets you cited.</p>
          <p className="mt-4 text-gray-700">We craft topic hierarchies that align with how AI systems summarize, attribute, and cite answers — so your brand shows up when it matters.</p>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[{
            title: 'Built for answer engines',
            desc: 'Entity-driven maps structured for AI Overviews, ChatGPT, Perplexity and Bing.'
          },{
            title: 'Complete topic coverage',
            desc: 'Close gaps, eliminate cannibalization, and secure topical authority.'
          },{
            title: 'Ready-to-brief content plans',
            desc: 'Buyer-journey mapping and content-type recommendations per cluster.'
          }].map((b, i) => (
            <div key={i} className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{b.title}</h3>
              <p className="text-gray-600">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Generative Intent */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Generative Intent</h2>
          <p className="text-gray-700 mb-6">Most searches fit four classic intents. AI assistants added a fifth: Generative Intent — “do-the-thinking-for-me” queries where people want synthesized plans, comparisons, or step-by-step guidance with sources.</p>
          <p className="text-gray-700">Our maps structure entities, relationships, decision criteria, and evidence so assistants can synthesize, attribute, and cite your brand in answer experiences.</p>
          <div className="mt-6 text-gray-600">Informational · Navigational · Transactional · Commercial · <strong>Generative Intent</strong></div>
        </div>
      </section>

      {/* How GEO-Ready Maps Work */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">How GEO-Ready Maps Work</h2>
          <div className="space-y-6 text-gray-700">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">1. Ask the Right Questions</h3>
              <p>We analyze search intent, competitors, and user questions, then extract Generative Intent prompts you should win across AI and classic search.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">2. Design the Topical Blueprint</h3>
              <p>We arrange topics and subtopics into a clear, hierarchical map. We connect entities and relationships so LLMs can reason across clusters and surface you for Generative Intent requests.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">3. We Deliver the GEO Topical Map</h3>
              <p>Spreadsheet + mind map deliverable with keywords, clusters, volume/CPC, SERP analysis, buyer journey stages, content types, and Generative Intent prompts per cluster.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Our Maps Win */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[{
            title: 'AI Citation-Ready', desc: 'Entity-rich hierarchy and evidence notes AI assistants trust and cite.'
          },{
            title: 'Generative Intent Coverage', desc: 'Synthesized answers mapped to topic silos and clusters.'
          },{
            title: 'LLM-Friendly Clusters', desc: 'Four-level hierarchy humans and models can navigate without context drift.'
          },{
            title: 'Complete Coverage', desc: 'Zero cannibalization. Separate intents so each cluster stays focused.'
          },{
            title: 'Internal Linking', desc: 'Preplanned routes that retain users and guide assistants.'
          },{
            title: 'Plug-and-Play, Save Time', desc: 'Ship in days, not months, with ready-to-use artifacts.'
          }].map((b, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{b.title}</h3>
              <p className="text-gray-700">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-cyan-500 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Build Your AI Topical Map?</h2>
          <p className="text-xl text-cyan-100 mb-8">Get a citation-ready blueprint designed for Generative Intent and AI answers.</p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <a
              href="https://calendly.com/effectivemarketer/demo"
              className="w-full sm:w-auto inline-block bg-white text-cyan-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Start Your Topical Map
            </a>
            <a
              href="/ai-seo"
              className="w-full sm:w-auto inline-block bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all duration-300"
            >
              Explore AI SEO
            </a>
          </div>
        </div>
      </section>

    </PageLayout>
  );
};

export default AITopicalMap;
