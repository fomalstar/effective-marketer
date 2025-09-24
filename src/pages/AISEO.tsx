import React from 'react';
import { Brain, Target, TrendingUp, Share2, Network, Map, HelpCircle, CheckCircle } from 'lucide-react';
import PageLayout from '../components/PageLayout';

const AISEO: React.FC = () => {
  const features = [
    { icon: <TrendingUp className="h-6 w-6" />, title: 'AI Platform Visibility', description: 'Appear in ChatGPT, Gemini, Claude and AI Overviews when users ask about your space.' },
    { icon: <Share2 className="h-6 w-6" />, title: 'Reddit Growth Engine', description: 'Grow brand presence on Reddit with ethical community-first strategies that build authority and signals.' },
    { icon: <Map className="h-6 w-6" />, title: 'Advanced AI Topical Map', description: 'Entity-rich topical blueprint designed for Generative Intent and AI citations.' },
    { icon: <Network className="h-6 w-6" />, title: 'Signal Architecture', description: 'Cross-platform mentions and internal linking models that LLMs can follow.' },
  ];

  const faqs = [
    { q: 'What is AI SEO?', a: 'AI SEO optimizes your brand to be recommended and cited by AI systems like ChatGPT, Gemini, and Google AI Overviews — not just ranked in classic search.' },
    { q: 'How does Reddit help AI SEO?', a: 'Reddit authority and community engagement provide high-trust signals and topical depth that AI assistants use when forming answers.' },
    { q: 'What is an AI Topical Map?', a: 'A structured, entity-driven topic blueprint that maps clusters, relationships and Generative Intent prompts — making your content citation-ready for AI.' },
    { q: 'How long to see results?', a: 'Most clients see lift in 6–10 weeks depending on baseline authority and execution speed.' },
  ];

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "AI SEO Agency Services",
      "description": "AI platform visibility, Reddit growth, and advanced AI Topical Maps for citation-ready presence in AI answers.",
      "provider": { "@type": "Organization", "name": "Effective Marketer", "url": "https://effectivemarketer.com" },
      "areaServed": "Worldwide",
    }
  ];

  return (
    <PageLayout
      title="AI SEO Agency Services | Effective Marketer"
      description="Win AI Search with platform visibility, Reddit growth, and AI Topical Maps. Get cited in ChatGPT, Gemini, and AI Overviews."
      canonical="https://effectivemarketer.com/ai-seo"
      ogTitle="AI SEO Agency — Platform Visibility, Reddit Growth, Topical Maps"
      ogDescription="Be cited by AI assistants. We build Generative Intent-ready topical maps and growth systems."
      structuredData={structuredData}
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'AI SEO' }]}
    >
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-16 lg:py-20">
        <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full px-4 py-2 mb-6 border border-cyan-500/30">
              <Brain className="h-5 w-5 text-cyan-400" />
              <span className="text-cyan-300 font-medium text-sm lg:text-base">AI SEO Agency</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">Own AI Search with AI SEO</h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-6 sm:mb-8">Get your brand recommended by AI assistants with Generative Intent-ready topical maps, Reddit growth, and cross-platform signals.</p>
          </div>
        </div>
      </section>

      {/* Why Choose AI SEO */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Why Choose AI SEO?</h2>
            <p className="text-xl text-gray-600">SEO gets you ranked. AI SEO gets you cited. We align your content with how AI systems summarize, attribute, and cite answers.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="p-3 rounded-lg bg-gradient-to-r from-cyan-400 to-purple-500 text-white inline-flex mb-4">{f.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-600">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How AI SEO Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">How AI SEO Works</h2>
              <ol className="space-y-6 list-decimal list-inside text-gray-700">
                <li><strong>Ask the Right Questions:</strong> Analyze search intent, competitors and user questions. Extract Generative Intent prompts you should win.</li>
                <li><strong>Design the Topical Blueprint:</strong> Human-curated topic hierarchy with entities and relationships. Semantic SEO that LLMs can follow.</li>
                <li><strong>Reddit Growth & Signals:</strong> Build community trust and high-signal discussions that AI models consider when citing sources.</li>
                <li><strong>Ship & Interlink:</strong> Publish focused content with internal links that keep users (and models) inside your cluster.</li>
              </ol>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">AI Topical Map</h3>
              <p className="text-gray-600 mb-4">Entity-rich hierarchy built for Generative Intent. Four-level clusters, zero cannibalization, and preplanned internal linking.</p>
              <a href="/ai-topical-map" className="inline-flex items-center text-cyan-600 hover:text-cyan-700 font-medium">Learn about AI Topical Maps</a>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced AI SEO Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Advanced AI SEO Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Generative Intent Coverage</h3>
              <p className="text-gray-600">We map plan, compare, explain and do prompts to your clusters so assistants can synthesize and cite you.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">LLM-Friendly Clusters</h3>
              <p className="text-gray-600">Four-level hierarchy that prevents context drift and keeps models within your topical boundaries.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Complete Coverage</h3>
              <p className="text-gray-600">Zero keyword cannibalization. Each cluster has a clear intent and outcome.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Plug-and-Play Delivery</h3>
              <p className="text-gray-600">Spreadsheet + mind map you can ship in days, not months.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">AI SEO — FAQ</h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="bg-white rounded-lg p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{f.q}</h3>
                <p className="text-gray-700">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default AISEO;
