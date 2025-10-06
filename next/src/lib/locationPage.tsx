import Link from "next/link";
import {
  MapPin,
  CheckCircle,
  Users,
  DollarSign,
  Wifi,
  ShoppingCart,
  Clock,
  Award,
  TrendingUp,
} from "lucide-react";
import Team from "@/components/home/Team";
import CaseStudyLogos from "@/components/home/CaseStudyLogos";
import Contact from "@/components/home/Contact";
import FAQ from "@/components/home/FAQ";
import { getLocationData } from "@/data/locationData";
import { countryCompetitors } from "@/data/competitors";
import type { CountryFaqEntry } from "@/data/countryFaqs";

export function buildCountryMetadata(countryCode: string) {
  const location = getLocationData(countryCode);
  return {
    title: location.metaTitle ?? location.heroTitle,
    description: location.metaDescription,
    canonical: location.canonicalUrl,
    ogTitle: `${location.metaTitle ?? location.heroTitle} | Effective Marketer`,
    ogDescription: location.metaDescription,
  };
}

export interface CountryPageOptions {
  countryCode: string;
  heroCtaLabel: string;
  heroParagraphs?: string[];
  competitorIntro?: string;
  competitorTitle?: string;
  pricingNotes?: string;
  faqIntro?: string;
  callToAction?: {
    title: string;
    description: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel?: string;
    secondaryHref?: string;
  };
  customFaqs?: CountryFaqEntry[];
  contactOverrides?: Parameters<typeof Contact>[0];
}

export function CountryPageTemplate({
  countryCode,
  heroCtaLabel,
  heroParagraphs,
  competitorIntro,
  competitorTitle,
  pricingNotes,
  faqIntro,
  callToAction,
  customFaqs,
  contactOverrides,
}: CountryPageOptions) {
  const location = getLocationData(countryCode);
  const competitors = countryCompetitors[countryCode] ?? [];
  const faqs = customFaqs ?? [];

  const heroStats = [
    {
      label: "Average Results",
      value: location.successMetrics.averageResults,
    },
    {
      label: "Client Satisfaction",
      value: location.successMetrics.clientSatisfaction,
    },
    {
      label: "Traffic Increase",
      value: location.successMetrics.trafficIncrease,
    },
    {
      label: "Time to Results",
      value: location.successMetrics.timeToResults,
    },
  ];

  const hiringLookFor = [
    `Proven ${location.country} market experience`,
    "AI platform optimisation expertise",
    `Results within ${location.successMetrics.averageResults}`,
    "Senior in-house strategists",
    "Transparent reporting and analytics",
  ];

  const hiringAvoid = [
    "Guaranteed ranking promises",
    "Black-hat or automation hacks",
    `Agencies with no ${location.country} track record`,
    "Poor communication and unclear ownership",
    "Unrealistic pricing packages",
  ];

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full px-4 py-2 border border-primary-500/30">
                <MapPin className="h-5 w-5 text-primary-500" />
                <span className="text-primary-300 font-medium text-sm lg:text-base">
                  Best AI SEO Agency in {location.country}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                {location.heroTitle}
              </h1>
              <div className="space-y-4 text-lg text-white/85">
                <p>{location.heroSubtitle}</p>
                {heroParagraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div>
                <Link
                  href="https://calendly.com/effectivemarketer/demo"
                  className="inline-block bg-primary-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  {heroCtaLabel}
                </Link>
              </div>
            </div>
            <div className="bg-white/10 rounded-2xl border border-white/20 p-8 backdrop-blur">
              <div className="grid grid-cols-2 gap-6">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="bg-white/10 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-white/70">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Effective Marketer is the Best AI SEO Agency in {location.country}
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              {heroParagraphs?.[0] ??
                "We engineer AI SEO programmes that combine Google Autocomplete domination, AI platform visibility, and local market expertise to keep your brand ahead."}
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Next-Gen AI SEO for {location.country} Companies
              </h3>
              <div className="space-y-5">
                {location.valuePropositions.map((item) => (
                  <div key={item} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-primary-500 mt-1" />
                    <p className="text-gray-700 text-lg">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border border-primary-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {location.country} AI SEO Services
              </h3>
              <ul className="space-y-3 text-gray-700">
                {location.uniqueAdvantages.map((advantage) => (
                  <li key={advantage} className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-primary-500 mt-2" />
                    <span>{advantage}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-slate-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {location.country} Market Insights
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Data-led view of the {location.country} digital ecosystem to guide AI SEO investment.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Market Overview</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-primary-500" />
                  <span className="text-gray-700">
                    <strong>Population:</strong> {location.marketSize}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <DollarSign className="h-5 w-5 text-primary-500" />
                  <span className="text-gray-700">
                    <strong>GDP:</strong> {location.gdp}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Wifi className="h-5 w-5 text-primary-500" />
                  <span className="text-gray-700">
                    <strong>Internet Penetration:</strong> {location.internetPenetration}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <ShoppingCart className="h-5 w-5 text-primary-500" />
                  <span className="text-gray-700">
                    <strong>E-commerce Growth:</strong> {location.ecommerceGrowth}
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Our Success Metrics</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-primary-500" />
                  <span className="text-gray-700">
                    <strong>Average Results:</strong> {location.successMetrics.averageResults}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="h-5 w-5 text-primary-500" />
                  <span className="text-gray-700">
                    <strong>Client Satisfaction:</strong> {location.successMetrics.clientSatisfaction}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <TrendingUp className="h-5 w-5 text-primary-500" />
                  <span className="text-gray-700">
                    <strong>Traffic Increase:</strong> {location.successMetrics.trafficIncrease}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="h-5 w-5 text-primary-500" />
                  <span className="text-gray-700">
                    <strong>Time to Results:</strong> {location.successMetrics.timeToResults}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 bg-white rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Local Market Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {location.localMarketInsights.map((insight) => (
                <div key={insight} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700">{insight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Team />
      <CaseStudyLogos />

      {competitors.length > 0 && (
        <section className="py-16 lg:py-20 bg-gradient-to-br from-slate-50 to-red-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {competitorTitle ?? `Best AI SEO Agencies in ${location.country}`}
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                {competitorIntro ??
                  "When it comes to AI SEO, here are the top agencies delivering measurable results in Google Autocomplete and AI platform visibility."}
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-bold">Rank</th>
                      <th className="px-6 py-4 text-left font-bold">Company Name</th>
                      <th className="px-6 py-4 text-left font-bold">Description</th>
                      <th className="px-6 py-4 text-left font-bold">Avg. Price/Hour</th>
                      <th className="px-6 py-4 text-left font-bold">Team Size</th>
                      <th className="px-6 py-4 text-left font-bold">Min. Monthly Price</th>
                      <th className="px-6 py-4 text-left font-bold">Location</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {competitors.map((row) => (
                      <tr key={row.rank} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-6 text-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                              row.rank === "1"
                                ? "bg-gradient-to-r from-yellow-400 to-yellow-500"
                                : "bg-gray-400"
                            }`}
                          >
                            {row.rank}
                          </div>
                        </td>
                        <td className="px-6 py-6">
                          <div className="font-bold text-lg text-gray-900">{row.company}</div>
                          <div className="text-sm text-primary-600 font-semibold">{row.position}</div>
                        </td>
                        <td className="px-6 py-6 text-sm text-gray-700 whitespace-pre-line">{row.description}</td>
                        <td className="px-6 py-6 text-center font-semibold text-primary-600">{row.price}</td>
                        <td className="px-6 py-6 text-center">{row.team}</td>
                        <td className="px-6 py-6 text-center font-semibold">{row.monthly}</td>
                        <td className="px-6 py-6 text-center">{row.location}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {pricingNotes && <p className="text-sm text-gray-500 text-center mt-4">{pricingNotes}</p>}
          </div>
        </section>
      )}

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {location.country} AI SEO Hiring Guide
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Use this checklist when selecting an AI SEO partner in {location.country}.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-gradient-to-br from-green-50 to-white border border-green-100 rounded-2xl p-8 shadow-sm">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">What to Look For</h3>
              <ul className="space-y-3 text-gray-700 text-lg">
                {hiringLookFor.map((item) => (
                  <li key={item} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-white border border-red-100 rounded-2xl p-8 shadow-sm">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">What to Avoid</h3>
              <ul className="space-y-3 text-gray-700 text-lg">
                {hiringAvoid.map((item) => (
                  <li key={item} className="flex items-start space-x-3">
                    <div className="w-5 h-5 rounded-full border border-red-400 flex items-center justify-center mt-1 text-red-500 font-semibold">
                      ×
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">
              {faqIntro ?? `Everything you need to know about AI SEO in ${location.country}`}
            </p>
          </div>
          <FAQ
            title={`${location.country} AI SEO`}
            subtitle={`Common questions about AI SEO for ${location.country} companies`}
            faqs={faqs}
          />
        </div>
      </section>

      {callToAction && (
        <section className="py-16 bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{callToAction.title}</h2>
            <p className="text-xl text-white/90 mb-8">{callToAction.description}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={callToAction.primaryHref}
                className="inline-block bg-primary-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                {callToAction.primaryLabel}
              </Link>
              {callToAction.secondaryHref && callToAction.secondaryLabel && (
                <Link
                  href={callToAction.secondaryHref}
                  className="inline-block bg-white/10 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  {callToAction.secondaryLabel}
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      <Contact {...contactOverrides} />
    </div>
  );
}
