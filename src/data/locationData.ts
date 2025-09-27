// Location-specific data for dynamic page generation
export interface LocationData {
  // Basic Info
  country: string;
  countryCode: string;
  currency: string;
  language: string;
  timezone: string;
  
  // Market Data
  marketSize: string;
  gdp: string;
  internetPenetration: string;
  ecommerceGrowth: string;
  digitalAdoption: string;
  
  // Local Insights
  localCompetitors: string[];
  topIndustries: string[];
  successMetrics: {
    averageResults: string;
    clientSatisfaction: string;
    trafficIncrease: string;
    timeToResults: string;
  };
  
  // Content
  heroTitle: string;
  heroSubtitle: string;
  valuePropositions: string[];
  localMarketInsights: string[];
  uniqueAdvantages: string[];
  
  // SEO Data
  targetKeywords: string[];
  metaDescription: string;
  canonicalUrl: string;
}

export const locationData: Record<string, LocationData> = {
  
  usa: {
    country: "United States",
    countryCode: "US",
    currency: "USD",
    language: "English",
    timezone: "Multiple (EST, CST, MST, PST)",
    
    marketSize: "331 million people",
    gdp: "$25.5 trillion",
    internetPenetration: "92.0%",
    ecommerceGrowth: "14.2% YoY",
    digitalAdoption: "World's largest digital economy",
    
    localCompetitors: ["Local SEO Agency USA", "American Digital Marketing", "US SEO Experts", "National SEO Solutions"],
    topIndustries: ["Technology", "Healthcare", "Finance", "E-commerce", "Manufacturing"],
    
    successMetrics: {
      averageResults: "45-60 days",
      clientSatisfaction: "98%",
      trafficIncrease: "150%",
      timeToResults: "6-10 weeks"
    },
    
    heroTitle: "The #1 AI SEO Agency in the United States",
    heroSubtitle: "Dominate Google Autosuggest & AI Platform Visibility Across America",
    
    valuePropositions: [
      "Get cited by ChatGPT, Gemini, and Claude AI in the USA",
      "Dominate Google Autocomplete for American keywords",
      "Results in 45-60 days with 98% success rate",
      "3x more affordable than traditional Google Ads",
      "Works across Google, Bing, and all major search engines"
    ],
    
    localMarketInsights: [
      "USA's digital economy is the world's largest at $25.5 trillion",
      "92% internet penetration with high digital literacy",
      "Competitive market with sophisticated SEO strategies required",
      "Strong mobile and voice search adoption across all demographics",
      "Diverse industry landscape requiring specialized AI SEO approaches"
    ],
    
    uniqueAdvantages: [
      "Deep understanding of US market dynamics and consumer behavior",
      "Compliance with US digital marketing regulations and standards",
      "Proven results with American businesses across all 50 states",
      "24/7 support covering all US time zones",
      "Advanced AI SEO techniques tailored for competitive US market"
    ],
    
    targetKeywords: [
      "AI SEO agency USA",
      "Google autosuggest optimization USA",
      "ChatGPT citation USA",
      "SEO agency United States",
      "AI SEO services USA",
      "Google autocomplete USA",
      "Best SEO agency USA",
      "Digital marketing USA AI"
    ],
    
    metaDescription: "Leading AI SEO agency in the USA. Get cited by ChatGPT, Gemini & dominate Google Autocomplete. 98% success rate, results in 45-60 days. Book free consultation.",
    canonicalUrl: "https://effectivemarketer.com/ai-seo-agency-usa"
  },
  
  vietnam: {
    country: "Vietnam",
    countryCode: "VN",
    currency: "VND",
    language: "Vietnamese, English",
    timezone: "GMT+7",
    
    marketSize: "98.2 million people",
    gdp: "$366 billion",
    internetPenetration: "73.1%",
    ecommerceGrowth: "28% YoY",
    digitalAdoption: "Fastest growing digital economy in Southeast Asia",
    
    localCompetitors: ["Vietnam SEO Agency", "Hanoi Digital Marketing", "Saigon SEO Solutions", "Vietnam Digital Experts"],
    topIndustries: ["Manufacturing", "E-commerce", "Technology", "Agriculture", "Tourism"],
    
    successMetrics: {
      averageResults: "45-60 days",
      clientSatisfaction: "98%",
      trafficIncrease: "150%",
      timeToResults: "6-10 weeks"
    },
    
    heroTitle: "The #1 AI SEO Agency in Vietnam",
    heroSubtitle: "Dominate Google Autosuggest & AI Platform Visibility Across Vietnam",
    
    valuePropositions: [
      "Get cited by ChatGPT, Gemini, and Claude AI in Vietnam",
      "Dominate Google Autocomplete for Vietnamese keywords",
      "Results in 45-60 days with 98% success rate",
      "3x more affordable than traditional Google Ads",
      "Works across Google, Bing, and all major search engines"
    ],
    
    localMarketInsights: [
      "Vietnam's digital economy growing at 28% annually",
      "73.1% internet penetration with rapid mobile adoption",
      "Strong manufacturing and e-commerce sectors driving SEO demand",
      "Multilingual market (Vietnamese + English) requires specialized approach",
      "Young, tech-savvy population with high digital engagement"
    ],
    
    uniqueAdvantages: [
      "Deep understanding of Vietnamese market and business culture",
      "Multilingual content optimization for Vietnamese and English audiences",
      "Proven results with Vietnamese businesses across all major industries",
      "24/7 support aligned with Vietnam timezone",
      "Understanding of local search behavior and preferences"
    ],
    
    targetKeywords: [
      "AI SEO agency Vietnam",
      "Google autosuggest optimization Vietnam",
      "ChatGPT citation Vietnam",
      "SEO agency Ho Chi Minh",
      "AI SEO services Vietnam",
      "Google autocomplete Vietnam",
      "Best SEO agency Vietnam",
      "Digital marketing Vietnam AI"
    ],
    
    metaDescription: "Leading AI SEO agency in Vietnam. Get cited by ChatGPT, Gemini & dominate Google Autocomplete. 98% success rate, results in 45-60 days. Book free consultation.",
    canonicalUrl: "https://effectivemarketer.com/ai-seo-agency-vietnam"
  },
  
};

export const getLocationData = (location: string): LocationData => {
  return locationData[location] || locationData.usa;
};
