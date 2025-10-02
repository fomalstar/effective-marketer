import React from 'react';
import PageLayout from '../components/PageLayout';
import { teamMembers } from '../data/teamData';
import { getAllCaseStudies } from '../data/caseStudiesData';

const ClientPresentation: React.FC = () => {
  const teamHighlights = teamMembers.slice(0, 6);
  const caseStudyLogos = getAllCaseStudies().slice(0, 6);

  const metrics = [
    { label: 'Average Traffic Increase', value: '150%' },
    { label: 'AI Citation Rate', value: '96%' },
    { label: 'Campaign Win Rate', value: '94%' },
    { label: 'Days to Autosuggest Traction', value: '45-60' }
  ];

  const geoPillars = [
    {
      title: 'AI Platform Visibility',
      description: 'Appear in ChatGPT, Gemini, Claude, Perplexity, and Google AI Overviews when prospects research your space.'
    },
    {
      title: 'Signal Architecture',
      description: 'Cross-channel mentions, topical depth, and Reddit authority that models trust and reuse in citations.'
    },
    {
      title: 'Dashboard & Intelligence',
      description: 'Real-time view of autosuggest rankings, AI citations, and competitive signals in one interface.'
    }
  ];

  const methodology = [
    'Keyword Intelligence → Social Signal Ignition → AI Chat Visibility → Real-time Monitoring',
    'AI-powered dashboard, proprietary mention network, and cross-platform signal orchestration',
    'Sample wins: Boleron (+124% traffic; 10 autosuggest keywords), Vision Express (+198%; medical AI mentions), Podvertise FM (+289%; podcast recommendations)'
  ];

  const systemSteps = [
    {
      title: 'Ask the Right Questions',
      description: 'Map Generative Intent prompts and competitive gaps that matter most to your buyers.'
    },
    {
      title: 'Design the Topical Blueprint',
      description: 'Entity-rich clusters that keep LLMs inside your knowledge graph.'
    },
    {
      title: 'Engineer Signals',
      description: 'Ethical Reddit authority, precision mentions, and interlinking that compound trust.'
    },
    {
      title: 'Ship & Monitor',
      description: 'Publish execution roadmaps and track progress through our AI SEO dashboard.'
    }
  ];

  const pricing = [
    {
      title: 'Core GEO & Autosuggest Program',
      price: 'Starting at $1,500/mo',
      items: [
        'Exclusive keyword territory for your brand',
        'Google Autocomplete domination in 45–75 days',
        'AI platform citations monitoring & reporting'
      ]
    },
    {
      title: 'Expansion Tracks',
      price: 'Custom scope',
      items: [
        'Multi-market rollouts and localization',
        'Advanced Reddit growth & signal architecture',
        'AI Topical Map builds and industry playbooks'
      ]
    }
  ];

  return (
    <PageLayout
      title="Effective Marketer | Client Presentation"
      description="Client-ready presentation showcasing Effective Marketer's AI SEO methodology, team, results, and engagement framework."
      canonical="https://effectivemarketer.com/client-presentation"
      ogTitle="Effective Marketer Client Presentation"
      ogDescription="A presentation-style overview of Effective Marketer's AI SEO programs, methodology, and results."
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Client Presentation' }]}
    >
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 py-20">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 border border-primary-400 rounded-full animate-ping" />
          <div className="absolute bottom-16 right-20 w-24 h-24 border border-secondary-400 rounded-full animate-pulse" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-primary-100">
                <span>Client Presentation</span>
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Effective Marketer<span className="text-primary-400"> Client Overview</span>
              </h1>
              <p className="text-lg text-white/90">
                Dominate search suggestions before results appear. We engineer Google Autosuggest wins, AI platform citations, and GEO programs that make your brand the authoritative answer across every channel.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">298%</div>
                  <p className="text-sm text-primary-100">Average Traffic Increase</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">187%</div>
                  <p className="text-sm text-primary-100">Client Growth</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">45+</div>
                  <p className="text-sm text-primary-100">Keywords Ranked</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">96%</div>
                  <p className="text-sm text-primary-100">AI Citation Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <h2 className="text-3xl font-bold text-gray-900">Slide 2 — About Effective Marketer</h2>
              <ul className="space-y-3 text-lg text-gray-600">
                <li>• 10+ years leading AI-driven search innovation and autocomplete optimization.</li>
                <li>• Specialists in GEO, AI platform visibility, Reddit authority, and signal architecture.</li>
                <li>• Full-service delivery: strategy, execution, reporting, and continuous optimization.</li>
                <li>• 24-hour response commitment with operations across USA, France, Vietnam, and Bulgaria.</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 border border-primary-200 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Mission & Tagline</h3>
              <p className="text-gray-700 leading-relaxed">
                We make your brand the authoritative answer across Google Autocomplete and AI platforms. Our tagline encapsulates the promise: <span className="font-semibold text-primary-600">“Dominate search suggestions before results appear.”</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-10">Slide 3 — Leadership Team</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamHighlights.map((member) => (
              <div key={member.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-4 mb-4">
                  <img src={member.image} alt={member.name} className="w-14 h-14 rounded-full object-cover" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-sm text-primary-600 font-medium">{member.role}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{member.description}</p>
                {member.linkedin && (
                  <a href={member.linkedin} className="inline-block mt-4 text-sm font-semibold text-primary-600 hover:text-primary-700" target="_blank" rel="noopener noreferrer">
                    LinkedIn →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <h2 className="text-3xl font-bold text-gray-900">Slide 4 — Google Autosuggest Program</h2>
              <p className="text-gray-700 leading-relaxed">
                Place your brand in Google Autocomplete for high-intent keywords before users finish typing. We cover Google, Bing, and major search engines across multiple languages, reserving exclusive keyword territories for our clients.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li>• 94% win rate across campaigns.</li>
                <li>• 45–75 days to first autosuggest placements.</li>
                <li>• Competitor lockout: once you claim a keyword, rivals cannot.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-primary-200 bg-gradient-to-br from-primary-50 to-secondary-50 p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Slide 5 — Methodology & Proof</h3>
              <ul className="space-y-3 text-gray-700">
                {methodology.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Slide 6 — GEO: AI SEO Overview</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {geoPillars.map((pillar) => (
              <div key={pillar.title} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{pillar.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Slide 7 — AI SEO System</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {systemSteps.map((step) => (
              <div key={step.title} className="rounded-2xl border border-gray-100 p-6 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Slide 8 — Deliverables & Metrics</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {metrics.map((metric) => (
              <div key={metric.label} className="bg-white rounded-2xl border border-gray-100 p-6 text-center shadow-sm">
                <div className="text-3xl font-bold text-primary-600 mb-2">{metric.value}</div>
                <p className="text-sm text-gray-600 uppercase tracking-wide">{metric.label}</p>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-2xl border border-primary-200 p-8">
            <div className="grid md:grid-cols-2 gap-6">
              {pricing.map((plan) => (
                <div key={plan.title} className="bg-primary-50 rounded-xl p-6 border border-primary-200">
                  <h3 className="text-lg font-semibold text-gray-900">{plan.title}</h3>
                  <p className="text-primary-600 font-semibold mb-4">{plan.price}</p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {plan.items.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Slide 9 — Brands We’ve Elevated</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 items-center">
            {caseStudyLogos.map((study) => (
              <div key={study.id} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all p-6 flex flex-col items-center">
                <img src={study.clientLogo} alt={`${study.clientName} logo`} className="w-20 h-20 object-contain mb-4" />
                <p className="text-sm font-semibold text-gray-800">{study.clientName}</p>
                <p className="text-xs text-gray-500">{study.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Slide 10 — Performance Highlights</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-primary-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Engagement & Pricing</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Starting at $1,500/month for core GEO + Autosuggest program.</li>
                <li>• Expansion tracks for multi-market rollouts and advanced Reddit growth.</li>
                <li>• Optional AI Topical Maps, lead-gen automations, and case study production.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Performance Snapshot</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• 150% average traffic lift across campaigns.</li>
                <li>• 6–10 weeks to reach AI citation velocity.</li>
                <li>• Global execution across 6+ countries with localized expertise.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Slide 12 — Next Steps & Contact</h2>
          <p className="text-lg text-gray-600 mb-6">
            Ready to turn AI search into your biggest channel? Book a strategy session and we will deliver a kickoff roadmap with onboarding, dashboard access, and weekly performance syncs.
          </p>
          <div className="space-y-4">
            <a
              href="https://calendly.com/effectivemarketer/demo"
              className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform"
            >
              Schedule a Strategy Session
            </a>
            <p className="text-sm text-gray-600">
              Email: <a href="mailto:contact@effectivemarketer.com" className="text-primary-600 font-semibold">contact@effectivemarketer.com</a> • Locations: USA • France • Vietnam • Bulgaria
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ClientPresentation;
