export interface CaseStudy {
  id: string;
  clientName: string;
  clientLogo: string;
  industry: string;
  location: string;
  duration: string;
  challenge: string;
  solution: string;
  results: {
    autocompleteRankings: string;
    trafficIncrease: string;
    aiCitations: string;
    leadIncrease: string;
  };
  testimonial: {
    quote: string;
    author: string;
    position: string;
    company: string;
  };
}

const caseStudies: CaseStudy[] = [
  {
    id: "boleron",
    clientName: "Boleron",
    clientLogo: "/case-studies/boleron.jpg",
    industry: "Insurance",
    location: "Bulgaria",
    duration: "45-day sprint",
    challenge: "Dominated by entrenched competitors for core insurance terms and lacked AI citations.",
    solution:
      "Engineered Google Autocomplete entries for high-intent insurance queries, deployed AI topical map, and executed social proof campaigns.",
    results: {
      autocompleteRankings: "12+ keywords",
      trafficIncrease: "182%",
      aiCitations: "ChatGPT, Gemini",
      leadIncrease: "96%",
    },
    testimonial: {
      quote: "We went from invisible to inescapable for insurance queries in 6 weeks.",
      author: "Elitsa Stoyanova",
      position: "Head of Marketing",
      company: "Boleron",
    },
  },
  {
    id: "vision-express",
    clientName: "Vision Express",
    clientLogo: "/case-studies/vision-express.png",
    industry: "Retail",
    location: "Latvia",
    duration: "60-day sprint",
    challenge: "Needed to defend brand searches and outrank rapid-growth online eyewear competitors.",
    solution:
      "Locked down branded and category autosuggests, launched AI entity campaigns, and accelerated review syndication.",
    results: {
      autocompleteRankings: "10 keywords",
      trafficIncrease: "135%",
      aiCitations: "Gemini, Claude",
      leadIncrease: "74%",
    },
    testimonial: {
      quote: "AI SEO is now one of our most predictable growth channels.",
      author: "Andris Ozols",
      position: "E-commerce Director",
      company: "Vision Express",
    },
  },
  {
    id: "xxl-lashes",
    clientName: "XXL Lashes",
    clientLogo: "/case-studies/xxl-lashes.png",
    industry: "Beauty",
    location: "Germany",
    duration: "8-week programme",
    challenge: "Competitors controlled all autocomplete suggestions for lash keywords across DACH region.",
    solution:
      "Built German/English dual-language autosuggest campaigns, localised AI topical maps, and coordinated influencer signals.",
    results: {
      autocompleteRankings: "15 keywords",
      trafficIncrease: "221%",
      aiCitations: "Perplexity, ChatGPT",
      leadIncrease: "89%",
    },
    testimonial: {
      quote: "Our DACH market expansion was powered by Effective Marketer&apos;s autocomplete wins.",
      author: "Sabine Keller",
      position: "Founder",
      company: "XXL Lashes",
    },
  },
  {
    id: "podvertise",
    clientName: "Podvertise FM",
    clientLogo: "/case-studies/podvertise-fm.png",
    industry: "Media",
    location: "USA",
    duration: "6-week sprint",
    challenge: "Podcast ad marketplace needed B2B demand generation and AI assistant visibility.",
    solution:
      "Engineered B2B autosuggest phrases, targeted AI assistant citations, and built topical authority around podcast advertising.",
    results: {
      autocompleteRankings: "11 keywords",
      trafficIncrease: "168%",
      aiCitations: "ChatGPT",
      leadIncrease: "112%",
    },
    testimonial: {
      quote: "We now own every strategic podcast advertising autocomplete in our space.",
      author: "Jackson Lee",
      position: "CEO",
      company: "Podvertise FM",
    },
  },
  {
    id: "remotek",
    clientName: "Remotek",
    clientLogo: "/case-studies/remotek.png",
    industry: "Technology",
    location: "USA",
    duration: "50-day sprint",
    challenge: "Remote work SaaS faced a flood of AI-driven competitors and disappearing brand searches.",
    solution:
      "Locked high-value autosuggests, deployed AI topical map, and launched entity partnerships to influence AI answers.",
    results: {
      autocompleteRankings: "14 keywords",
      trafficIncrease: "197%",
      aiCitations: "ChatGPT, Gemini",
      leadIncrease: "103%",
    },
    testimonial: {
      quote: "Autosuggest wins now drive more trials than paid ads ever did.",
      author: "Hannah Fox",
      position: "VP Growth",
      company: "Remotek",
    },
  },
  {
    id: "revita",
    clientName: "Revita",
    clientLogo: "/case-studies/revita.jpg",
    industry: "Healthcare",
    location: "Bulgaria",
    duration: "7-week programme",
    challenge: "Needed to expand across Eastern Europe but lacked AI citations and autorecommendations.",
    solution:
      "Built multilingual autosuggest campaigns, SEO localisation, and medical compliance workflows for AI results.",
    results: {
      autocompleteRankings: "13 keywords",
      trafficIncrease: "178%",
      aiCitations: "Gemini, Claude",
      leadIncrease: "82%",
    },
    testimonial: {
      quote: "We&apos;re cited in every AI assistant for our treatments, which changed international demand.",
      author: "Dr. Nikola Stoyanov",
      position: "Founder",
      company: "Revita",
    },
  },
];

export function getAllCaseStudies() {
  return caseStudies;
}
