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
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full px-4 py-2 mb-4 border border-cyan-500/30">
                <Layers className="h-5 w-5 text-cyan-500" />
                <span className="text-cyan-700 font-medium text-sm lg:text-base">Entity-Rich Architecture</span>
              </div>
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-gray-100 shadow-sm p-8 md:p-10 bg-gradient-to-br from-white to-gray-50">
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 bg-cyan-50 text-cyan-700 rounded-full px-3 py-1 text-sm font-medium mb-4">
                <Sparkles className="h-4 w-4" />
                <span>Topical Authority</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Build Unrivaled Topical Authority</h2>
              <p className="text-lg text-gray-600">SEO gets you ranked. <span className="text-purple-600 font-semibold">GEO gets you cited.</span></p>
            </div>
            <p className="text-gray-700 text-center max-w-3xl mx-auto">We craft topic hierarchies that align with how AI systems summarize, attribute, and cite answers — so your brand shows up when it matters.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <Network className="h-6 w-6 text-cyan-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">Built for answer engines</h3>
                <p className="text-gray-600">Entity-driven maps structured for AI Overviews, ChatGPT, Perplexity and Bing.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <Layers className="h-6 w-6 text-cyan-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">Complete topic coverage</h3>
                <p className="text-gray-600">Close gaps, eliminate cannibalization, and secure topical authority.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <Sparkles className="h-6 w-6 text-cyan-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">Ready-to-brief plans</h3>
                <p className="text-gray-600">Buyer-journey mapping and content-type recommendations per cluster.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Generative Intent */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Generative Intent</h2>
              <p className="text-gray-700 mb-4">Most searches fit four classic intents. AI assistants added a fifth: <span className="font-semibold">Generative Intent</span> — “do-the-thinking-for-me” queries where people want synthesized plans, comparisons, or step-by-step guidance with sources.</p>
              <p className="text-gray-700">Our maps structure entities, relationships, decision criteria, and evidence so assistants can synthesize, attribute, and cite your brand in answer experiences.</p>
              <div className="flex flex-wrap gap-2 mt-6">
                {['Informational','Navigational','Transactional','Commercial','Generative Intent'].map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full text-sm bg-white border border-gray-200 text-gray-700">{tag}</span>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center space-x-2 text-cyan-700 mb-3">
                <Sparkles className="h-5 w-5" />
                <span className="font-medium">Why it matters</span>
              </div>
              <p className="text-gray-700">Generative Intent queries drive AI answers. Structuring content for these intents increases your likelihood of being cited by assistants when users ask complex, comparative, or planning questions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How GEO-Ready Maps Work */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">How GEO-Ready Maps Work</h2>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 to-purple-600 hidden md:block" />
            <div className="space-y-8">
              {[
                { n: '1', t: 'Ask the Right Questions', d: 'We analyze search intent, competitors, and user questions, then extract Generative Intent prompts you should win across AI and classic search.' },
                { n: '2', t: 'Design the Topical Blueprint', d: 'We arrange topics and subtopics into a clear, hierarchical map. We connect entities and relationships so LLMs can reason across clusters and surface you for Generative Intent requests.' },
                { n: '3', t: 'We Deliver the GEO Topical Map', d: 'Spreadsheet + mind map deliverable with keywords, clusters, volume/CPC, SERP analysis, buyer journey stages, content types, and Generative Intent prompts per cluster.' },
              ].map((step) => (
                <div key={step.n} className="relative md:pl-16">
                  <div className="hidden md:flex absolute left-0 top-0 w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white items-center justify-center font-bold shadow-lg">
                    {step.n}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.t}</h3>
                  <p className="text-gray-700">{step.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Our Maps Win */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Why Our Topical Maps Win AI Search</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { i: <CheckCircle className="h-6 w-6 text-cyan-600" />, t: 'AI Citation-Ready', d: 'Entity-rich hierarchy and evidence notes AI assistants trust and cite.' },
              { i: <Sparkles className="h-6 w-6 text-cyan-600" />, t: 'Generative Intent Coverage', d: 'Synthesized answers mapped to topic silos and clusters.' },
              { i: <Layers className="h-6 w-6 text-cyan-600" />, t: 'LLM-Friendly Clusters', d: 'Four-level hierarchy humans and models can navigate without context drift.' },
              { i: <Network className="h-6 w-6 text-cyan-600" />, t: 'Complete Coverage', d: 'Zero cannibalization. Separate intents so each cluster stays focused.' },
              { i: <Network className="h-6 w-6 text-cyan-600" />, t: 'Internal Linking', d: 'Preplanned routes that retain users and guide assistants.' },
              { i: <Sparkles className="h-6 w-6 text-cyan-600" />, t: 'Plug-and-Play, Save Time', d: 'Ship in days, not months, with ready-to-use artifacts.' },
            ].map((b, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="mb-3">{b.i}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{b.t}</h3>
                <p className="text-gray-700">{b.d}</p>
              </div>
            ))}
          </div>
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
