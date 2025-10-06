import { CountryPageTemplate, buildCountryMetadata } from "@/lib/locationPage";
import { buildMetadata, buildStructuredData } from "@/lib/metadata";
import { getLocationData } from "@/data/locationData";
import { getCountryFaqs } from "@/data/countryFaqs";

const COUNTRY_CODE = "uk";

const location = getLocationData(COUNTRY_CODE);
const faqs = getCountryFaqs(COUNTRY_CODE);

const structuredData = buildStructuredData({
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Locations", href: "/locations" },
    { label: location.country },
  ],
  additional: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "AI SEO Services for UK Companies",
      description:
        "Specialised AI SEO programmes for UK companies. Dominate Google Autocomplete, secure ChatGPT citations, and reach regulated buyers with compliant AI visibility.",
      provider: {
        "@type": "Organization",
        name: "Effective Marketer",
        url: "https://effectivemarketer.com",
        logo: "https://effectivemarketer.com/EM%20LOGO.png",
      },
      areaServed: {
        "@type": "Country",
        name: location.country,
      },
      serviceType: "AI SEO and Platform Visibility",
      category: "Digital Marketing Services",
      offers: {
        "@type": "Offer",
        price: "2997",
        priceCurrency: "GBP",
        description: "AI SEO agency services for UK companies",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
});

export const metadata = buildMetadata({
  ...buildCountryMetadata(COUNTRY_CODE),
});

const competitorIntro =
  "We benchmarked the UK AI SEO market and selected proven agencies delivering performance for enterprise and scale-up brands.";

const heroParagraphs = [
  "Accelerate UK demand generation with AI SEO programmes engineered for regulated and high-growth sectors. We combine Autocomplete domination, AI citation wins, and compliant storytelling to put your brand first in every British query.",
  "Our in-house strategists align with your UK marketing, compliance, and revenue teams so you see measurable results in 6-10 weeks backed by transparent reporting and enterprise-grade governance.",
];

const callToAction = {
  title: "Lead the UK AI Search Revolution",
  description:
    "Book a strategy session with British AI SEO specialists and receive a roadmap engineered for regulated, high-growth UK organisations.",
  primaryLabel: "Schedule UK AI SEO consultation",
  primaryHref: "https://calendly.com/effectivemarketer/demo",
  secondaryLabel: "Browse our case studies",
  secondaryHref: "/case-studies",
};

const contactOverrides = {
  structuredData,
  title: "Talk to the UK AI SEO Desk",
  description:
    "Request a complimentary audit covering autocomplete opportunities, AI citation coverage, and the entity work your UK brand needs to win.",
  infoEmailLabel: "UK Strategy Desk",
  infoEmail: "uk@effectivemarketer.com",
  infoResponseLabel: "Response Time",
  infoResponseValue: "Replies within 12 business hours",
  infoLocationsLabel: "Coverage",
  infoLocations: "London • Manchester • Edinburgh",
  stepsTitle: "Engagement Blueprint",
  steps: [
    "Assess UK search and AI channel coverage",
    "Launch a 45-60 day autocomplete and AI citation sprint",
    "Align reporting with UK stakeholders and compliance teams",
  ],
};

export default function UKAgencyPage() {
  return (
    <CountryPageTemplate
      countryCode={COUNTRY_CODE}
      heroCtaLabel="Book a UK AI SEO session"
      heroParagraphs={heroParagraphs}
      competitorIntro={competitorIntro}
      competitorTitle={`Best AI SEO agencies in ${location.country}`}
      pricingNotes="Pricing based on publicly available UK retainers; actual fees vary by scope and compliance requirements."
      faqIntro={`Everything you need to know about AI SEO for companies in ${location.country}`}
      callToAction={callToAction}
      customFaqs={faqs}
      contactOverrides={contactOverrides}
    />
  );
}
