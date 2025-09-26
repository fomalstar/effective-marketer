// Case studies data with actual client logos
export interface CaseStudyData {
  id: number;
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
    conversionRate: string;
  };
  testimonial: {
    quote: string;
    author: string;
    position: string;
    company: string;
  };
  featured: boolean;
}

export const caseStudiesData: CaseStudyData[] = [
  {
    id: 1,
    clientName: "Boleron",
    clientLogo: "/case studies/boleron.jpg",
    industry: "E-commerce",
    location: "Malaysia",
    duration: "67 days",
    challenge: "Zero visibility in Google Autocomplete and AI platforms for their fitness equipment brand",
    solution: "Comprehensive AI SEO strategy with Google Autosuggest optimization and AI platform visibility",
    results: {
      autocompleteRankings: "12 keywords to #1 position",
      trafficIncrease: "247%",
      aiCitations: "Cited in ChatGPT, Gemini, and Claude",
      leadIncrease: "189%",
      conversionRate: "+156%"
    },
    testimonial: {
      quote: "Effective Marketer transformed our online presence. We went from invisible to dominating Google Autocomplete in just 67 days. The AI citations have been incredible for our brand authority.",
      author: "Sarah Chen",
      position: "Marketing Director",
      company: "Boleron"
    },
    featured: true
  },
  {
    id: 2,
    clientName: "Vision Express",
    clientLogo: "/case studies/VISION_EXPRESS.png",
    industry: "Healthcare",
    location: "UAE",
    duration: "45 days",
    challenge: "Low visibility in healthcare AI searches and Google Autocomplete for eye care services",
    solution: "Healthcare-specific AI SEO with HIPAA-compliant optimization and local market focus",
    results: {
      autocompleteRankings: "8 healthcare keywords to top 3",
      trafficIncrease: "198%",
      aiCitations: "Featured in ChatGPT for medical queries",
      leadIncrease: "234%",
      conversionRate: "+178%"
    },
    testimonial: {
      quote: "The AI SEO results exceeded our expectations. We're now the go-to recommendation when people ask ChatGPT about eye care services in the UAE.",
      author: "Dr. Ahmed Al-Rashid",
      position: "CEO",
      company: "Vision Express"
    },
    featured: true
  },
  {
    id: 3,
    clientName: "XXL Lashes",
    clientLogo: "/case studies/xxl lashes.png",
    industry: "Beauty & Fashion",
    location: "Vietnam",
    duration: "52 days",
    challenge: "Competing with major beauty brands in AI search results and Google Autocomplete",
    solution: "Beauty industry AI SEO with sustainable fashion focus and local market optimization",
    results: {
      autocompleteRankings: "15 beauty keywords to #1-2 positions",
      trafficIncrease: "312%",
      aiCitations: "Recommended by Gemini for beauty products",
      leadIncrease: "267%",
      conversionRate: "+203%"
    },
    testimonial: {
      quote: "Our beauty brand now dominates AI search results. The Google Autocomplete rankings have been game-changing for our visibility in the competitive beauty market.",
      author: "Minh Nguyen",
      position: "Founder",
      company: "XXL Lashes"
    },
    featured: true
  },
  {
    id: 4,
    clientName: "Podvertise FM",
    clientLogo: "/case studies/podvertise fm.png",
    industry: "Media & Entertainment",
    location: "France",
    duration: "58 days",
    challenge: "New podcast platform with no search visibility or AI platform presence",
    solution: "Media industry AI SEO with podcast-specific optimization and French market focus",
    results: {
      autocompleteRankings: "10 podcast keywords to top 3",
      trafficIncrease: "289%",
      aiCitations: "Featured in ChatGPT for podcast recommendations",
      leadIncrease: "198%",
      conversionRate: "+167%"
    },
    testimonial: {
      quote: "As a new podcast platform, we needed visibility fast. Effective Marketer delivered incredible results, making us the top recommendation for podcast services in France.",
      author: "Marie Dubois",
      position: "Marketing Manager",
      company: "Podvertise FM"
    },
    featured: false
  },
  {
    id: 5,
    clientName: "Remotek",
    clientLogo: "/case studies/remotek.png",
    industry: "Technology",
    location: "Bulgaria",
    duration: "49 days",
    challenge: "B2B tech company with low visibility in AI searches and Google Autocomplete",
    solution: "B2B technology AI SEO with enterprise focus and Eastern European market optimization",
    results: {
      autocompleteRankings: "14 tech keywords to #1-2 positions",
      trafficIncrease: "234%",
      aiCitations: "Cited in ChatGPT for tech solutions",
      leadIncrease: "189%",
      conversionRate: "+145%"
    },
    testimonial: {
      quote: "Our B2B tech solutions now get recommended by AI platforms. The Google Autocomplete optimization has been phenomenal for our lead generation.",
      author: "Ivan Petrov",
      position: "CEO",
      company: "Remotek"
    },
    featured: false
  },
  {
    id: 6,
    clientName: "Revita",
    clientLogo: "/case studies/revita.jpg",
    industry: "Health & Wellness",
    location: "USA",
    duration: "61 days",
    challenge: "Wellness brand competing with major health companies in AI search results",
    solution: "Health & wellness AI SEO with holistic approach and US market optimization",
    results: {
      autocompleteRankings: "11 wellness keywords to top 3",
      trafficIncrease: "276%",
      aiCitations: "Recommended by Gemini for wellness solutions",
      leadIncrease: "223%",
      conversionRate: "+189%"
    },
    testimonial: {
      quote: "Our wellness brand now dominates AI search results. The comprehensive approach to both Google Autocomplete and AI platforms has transformed our business.",
      author: "Jennifer Smith",
      position: "Founder",
      company: "Revita"
    },
    featured: false
  }
];

export const getFeaturedCaseStudies = (): CaseStudyData[] => {
  return caseStudiesData.filter(study => study.featured);
};

export const getAllCaseStudies = (): CaseStudyData[] => {
  return caseStudiesData;
};
