import React from 'react';
import PageLayout from '../components/PageLayout';
import { Map, Layers, Sparkles, Network, CheckCircle } from 'lucide-react';

const AITopicalMap: React.FC = () => {
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
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">We design your topical blueprint — built around Generative Intent — so answer engines cite you on Google AI Mode, AI Overviews, ChatGPT, Perplexity, Bing, and beyond.</p>
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

    </PageLayout>
  );
};

export default AITopicalMap;
