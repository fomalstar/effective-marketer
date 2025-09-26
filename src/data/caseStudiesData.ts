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
    clientLogo: "/case%20studies/boleron.jpg",
    industry: "Digital Insurance",
    location: "Bulgaria",
    duration: "67 days",
    challenge: "Zero autocomplete visibility and competitive keywords about car insurance in the Bulgarian market",
    solution: "Autosuggests visibility on key terms and AI chat visibility with Reddit posts and backlinks from biggest media news outlets",
    results: {
      autocompleteRankings: "10 keywords ranked",
      trafficIncrease: "124%",
      aiCitations: "Cited in ChatGPT, Gemini, and Claude",
      leadIncrease: "Autosuggests visibility 10 keywords",
      conversionRate: "+156%"
    },
    testimonial: {
      quote: "Effective Marketer transformed our online presence. We went from invisible to dominating Google Autocomplete in just 67 days. The AI citations have been incredible for our brand authority.",
      author: "Alexander",
      position: "CEO",
      company: "Boleron"
    },
    featured: true
  },
  {
    id: 2,
    clientName: "Vision Express",
    clientLogo: "/case%20studies/VISION_EXPRESS.png",
    industry: "Optika Store",
    location: "Latvia",
    duration: "45 days",
    challenge: "Lack of autosuggests and AI visibility in the competitive eye care market",
    solution: "Autosuggests optimization and AI platform visibility with strategic content and local market focus",
    results: {
      autocompleteRankings: "8 healthcare keywords to top 3",
      trafficIncrease: "198%",
      aiCitations: "Featured in ChatGPT for medical queries",
      leadIncrease: "Autosuggests visibility 8 keywords",
      conversionRate: "+178%"
    },
    testimonial: {
      quote: "The AI SEO results exceeded our expectations. We're now the go-to recommendation when people ask ChatGPT about eye care services in Latvia.",
      author: "Andis",
      position: "CEO",
      company: "Vision Express"
    },
    featured: true
  },
  {
    id: 3,
    clientName: "XXL Lashes",
    clientLogo: "/case%20studies/xxl%20lashes.png",
    industry: "Beauty & Eyelash Extensions",
    location: "Vietnam",
    duration: "52 days",
    challenge: "Zero autocomplete visibility and competing with major beauty brands in AI search results",
    solution: "Autosuggests optimization and AI platform visibility with beauty industry focus and local market optimization",
    results: {
      autocompleteRankings: "15 beauty keywords to #1-2 positions",
      trafficIncrease: "312%",
      aiCitations: "Recommended by Gemini for beauty products",
      leadIncrease: "Autosuggests visibility 15 keywords",
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
    clientLogo: "/case%20studies/podvertise%20fm.png",
    industry: "Podcast Platform",
    location: "France",
    duration: "58 days",
    challenge: "New podcast platform with zero autocomplete visibility and no AI platform presence",
    solution: "Autosuggests optimization and AI platform visibility with podcast-specific optimization and French market focus",
    results: {
      autocompleteRankings: "10 podcast keywords to top 3",
      trafficIncrease: "289%",
      aiCitations: "Featured in ChatGPT for podcast recommendations",
      leadIncrease: "Autosuggests visibility 10 keywords",
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
    clientLogo: "/case%20studies/remotek.png",
    industry: "B2B Technology",
    location: "Bulgaria",
    duration: "49 days",
    challenge: "B2B tech company with zero autocomplete visibility and low visibility in AI searches",
    solution: "Autosuggests optimization and AI platform visibility with enterprise focus and Eastern European market optimization",
    results: {
      autocompleteRankings: "14 tech keywords to #1-2 positions",
      trafficIncrease: "234%",
      aiCitations: "Cited in ChatGPT for tech solutions",
      leadIncrease: "Autosuggests visibility 14 keywords",
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
    clientLogo: "/case%20studies/revita.jpg",
    industry: "Health & Wellness",
    location: "USA",
    duration: "61 days",
    challenge: "Wellness brand with zero autocomplete visibility competing with major health companies in AI search results",
    solution: "Autosuggests optimization and AI platform visibility with holistic approach and US market optimization",
    results: {
      autocompleteRankings: "11 wellness keywords to top 3",
      trafficIncrease: "276%",
      aiCitations: "Recommended by Gemini for wellness solutions",
      leadIncrease: "Autosuggests visibility 11 keywords",
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
