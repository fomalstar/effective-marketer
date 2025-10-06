import {
  CountryPageTemplate,
  buildCountryMetadata,
} from "@/lib/locationPage";
import { buildMetadata, buildStructuredData } from "@/lib/metadata";
import { getLocationData } from "@/data/locationData";
import { getCountryFaqs } from "@/data/countryFaqs";

const COUNTRY_CODE = "brazil";

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
      name: "AI SEO Services for Brazilian Companies",
      description:
        "Complete AI SEO programmes for Brazilian companies. Dominate Google Autocomplete, secure ChatGPT and Gemini citations, and unlock bilingual organic growth.",
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
        price: "1497",
        priceCurrency: "USD",
        description: "AI SEO agency services for Brazilian companies",
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
  "We analysed the Brazilian AI SEO landscape and selected proven agencies with published results across enterprise and high-growth brands.";

const callToAction = {
  title: "Ready to dominate autocomplete across Brazil?",
  description:
    "Get a complete roadmap that puts your Brazilian brand inside every critical AI recommendation and Google Autocomplete flow.",
  primaryLabel: "Book a Brazil AI SEO assessment",
  primaryHref: "https://calendly.com/effectivemarketer/demo",
  secondaryLabel: "Review case studies",
  secondaryHref: "/case-studies",
};

const heroParagraphs = [
  "Boost your Brazilian pipeline with AI SEO programmes engineered for Portuguese and English search demand. We combine Google Autocomplete domination, AI citation wins, and bilingual content to surface your brand first across Brazil.",
  "Our senior strategists align with your marketing and revenue teams to deliver measurable results in 45-60 days, supported by transparent dashboards and local market expertise.",
];

const contactOverrides = {
  structuredData,
  title: "Let's accelerate AI SEO growth in Brazil",
  description:
    "Request a complimentary analysis covering autocomplete opportunities, AI citation gaps, and the entity work your Brazilian brand needs to win.",
  infoEmailLabel: "Brazil Desk",
  infoEmail: "brazil@effectivemarketer.com",
  infoResponseLabel: "Response Time",
  infoResponseValue: "Replies within 12 business hours",
  infoLocationsLabel: "Operating Hubs",
  infoLocations: "São Paulo • Brasília • Porto Alegre",
  stepsTitle: "How we work",
  steps: [
    "Audit Portuguese and English search demand",
    "Deliver a 45-60 day autocomplete and AI citation roadmap",
    "Align with your Brazilian marketing and revenue teams",
  ],
};

export default function BrazilAgencyPage() {
  return (
    <CountryPageTemplate
      countryCode={COUNTRY_CODE}
      heroCtaLabel="Book your Brazil AI SEO session"
      heroParagraphs={heroParagraphs}
      competitorIntro={competitorIntro}
      competitorTitle={`Best AI SEO agencies in ${location.country}`}
      pricingNotes="Pricing reflects publicly available retainers from Brazilian agencies and may vary by scope."
      faqIntro={`Everything you need to know about AI SEO for companies in ${location.country}`}
      callToAction={callToAction}
      customFaqs={faqs}
      contactOverrides={contactOverrides}
    />
  );
}

