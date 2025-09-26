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
  malaysia: {
    country: "Malaysia",
    countryCode: "MY",
    currency: "MYR",
    language: "English, Bahasa Malaysia",
    timezone: "GMT+8",
    
    marketSize: "32.7 million people",
    gdp: "$407 billion",
    internetPenetration: "89.6%",
    ecommerceGrowth: "23% YoY",
    digitalAdoption: "Rapidly growing digital economy",
    
    localCompetitors: ["Local SEO Agency Malaysia", "Digital Marketing Solutions MY", "Malaysia SEO Experts"],
    topIndustries: ["E-commerce", "Fintech", "Healthcare", "Education", "Tourism"],
    
    successMetrics: {
      averageResults: "45-60 days",
      clientSatisfaction: "98%",
      trafficIncrease: "150%",
      timeToResults: "6-10 weeks"
    },
    
    heroTitle: "The #1 AI SEO Agency in Malaysia",
    heroSubtitle: "Dominate Google Autosuggest & AI Platform Visibility Across Malaysia",
    
    valuePropositions: [
      "Get cited by ChatGPT, Gemini, and Claude AI in Malaysia",
      "Dominate Google Autocomplete for Malaysian keywords",
      "Results in 45-60 days with 98% success rate",
      "3x more affordable than traditional Google Ads",
      "Works across Google, Bing, and all major search engines"
    ],
    
    localMarketInsights: [
      "Malaysia's digital economy is growing at 23% annually",
      "89.6% internet penetration creates massive SEO opportunities",
      "E-commerce sector expanding rapidly with local and international brands",
      "Multilingual market (English + Bahasa Malaysia) requires specialized approach",
      "Strong mobile-first search behavior across all demographics"
    ],
    
    uniqueAdvantages: [
      "Local market expertise with international AI SEO capabilities",
      "Multilingual content optimization for Malaysian audiences",
      "Understanding of local business culture and search behavior",
      "Proven results with Malaysian businesses across all industries",
      "24/7 support aligned with Malaysian timezone"
    ],
    
    targetKeywords: [
      "AI SEO agency Malaysia",
      "Google autosuggest optimization Malaysia",
      "ChatGPT citation Malaysia",
      "SEO agency Kuala Lumpur",
      "AI SEO services Malaysia",
      "Google autocomplete Malaysia",
      "Best SEO agency Malaysia",
      "Digital marketing Malaysia AI"
    ],
    
    metaDescription: "Leading AI SEO agency in Malaysia. Get cited by ChatGPT, Gemini & dominate Google Autocomplete. 98% success rate, results in 45-60 days. Book free consultation.",
    canonicalUrl: "https://effectivemarketer.com/ai-seo-agency-malaysia"
  },
  
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
  
  uae: {
    country: "United Arab Emirates",
    countryCode: "AE",
    currency: "AED",
    language: "English, Arabic",
    timezone: "GMT+4",
    
    marketSize: "10.1 million people",
    gdp: "$421 billion",
    internetPenetration: "99.0%",
    ecommerceGrowth: "31% YoY",
    digitalAdoption: "Most connected country in the Middle East",
    
    localCompetitors: ["UAE SEO Agency", "Dubai Digital Marketing", "Emirates SEO Solutions", "Gulf SEO Experts"],
    topIndustries: ["Real Estate", "Tourism", "Finance", "E-commerce", "Technology"],
    
    successMetrics: {
      averageResults: "45-60 days",
      clientSatisfaction: "98%",
      trafficIncrease: "150%",
      timeToResults: "6-10 weeks"
    },
    
    heroTitle: "The #1 AI SEO Agency in the United Arab Emirates",
    heroSubtitle: "Dominate Google Autosuggest & AI Platform Visibility Across the UAE",
    
    valuePropositions: [
      "Get cited by ChatGPT, Gemini, and Claude AI in the UAE",
      "Dominate Google Autocomplete for UAE keywords",
      "Results in 45-60 days with 98% success rate",
      "3x more affordable than traditional Google Ads",
      "Works across Google, Bing, and all major search engines"
    ],
    
    localMarketInsights: [
      "UAE has 99% internet penetration - highest in the Middle East",
      "E-commerce growing at 31% annually with strong mobile adoption",
      "Multilingual market (English + Arabic) requires specialized approach",
      "High digital literacy and sophisticated consumer behavior",
      "Strong government support for digital transformation initiatives"
    ],
    
    uniqueAdvantages: [
      "Deep understanding of UAE market and business culture",
      "Multilingual content optimization for Arabic and English audiences",
      "Proven results with UAE businesses across all major industries",
      "24/7 support aligned with UAE timezone",
      "Compliance with UAE digital marketing regulations"
    ],
    
    targetKeywords: [
      "AI SEO agency UAE",
      "Google autosuggest optimization UAE",
      "ChatGPT citation UAE",
      "SEO agency Dubai",
      "AI SEO services UAE",
      "Google autocomplete UAE",
      "Best SEO agency UAE",
      "Digital marketing UAE AI"
    ],
    
    metaDescription: "Leading AI SEO agency in the UAE. Get cited by ChatGPT, Gemini & dominate Google Autocomplete. 98% success rate, results in 45-60 days. Book free consultation.",
    canonicalUrl: "https://effectivemarketer.com/ai-seo-agency-uae"
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
  
  france: {
    country: "France",
    countryCode: "FR",
    currency: "EUR",
    language: "French, English",
    timezone: "GMT+1",
    
    marketSize: "67.8 million people",
    gdp: "$2.9 trillion",
    internetPenetration: "92.0%",
    ecommerceGrowth: "8.5% YoY",
    digitalAdoption: "Strong digital infrastructure with high adoption",
    
    localCompetitors: ["Agence SEO France", "Paris Digital Marketing", "France SEO Solutions", "French SEO Experts"],
    topIndustries: ["Luxury Goods", "Tourism", "Technology", "E-commerce", "Healthcare"],
    
    successMetrics: {
      averageResults: "45-60 days",
      clientSatisfaction: "98%",
      trafficIncrease: "150%",
      timeToResults: "6-10 weeks"
    },
    
    heroTitle: "The #1 AI SEO Agency in France",
    heroSubtitle: "Dominate Google Autosuggest & AI Platform Visibility Across France",
    
    valuePropositions: [
      "Get cited by ChatGPT, Gemini, and Claude AI in France",
      "Dominate Google Autocomplete for French keywords",
      "Results in 45-60 days with 98% success rate",
      "3x more affordable than traditional Google Ads",
      "Works across Google, Bing, and all major search engines"
    ],
    
    localMarketInsights: [
      "France's digital economy is well-established with 92% internet penetration",
      "Strong e-commerce sector with sophisticated consumer behavior",
      "Multilingual market (French + English) requires specialized approach",
      "High digital literacy and mobile-first search behavior",
      "Strong government support for digital transformation"
    ],
    
    uniqueAdvantages: [
      "Deep understanding of French market and business culture",
      "Multilingual content optimization for French and English audiences",
      "Proven results with French businesses across all major industries",
      "24/7 support aligned with French timezone",
      "Compliance with EU digital marketing regulations (GDPR)"
    ],
    
    targetKeywords: [
      "AI SEO agency France",
      "Google autosuggest optimization France",
      "ChatGPT citation France",
      "SEO agency Paris",
      "AI SEO services France",
      "Google autocomplete France",
      "Best SEO agency France",
      "Digital marketing France AI"
    ],
    
    metaDescription: "Leading AI SEO agency in France. Get cited by ChatGPT, Gemini & dominate Google Autocomplete. 98% success rate, results in 45-60 days. Book free consultation.",
    canonicalUrl: "https://effectivemarketer.com/ai-seo-agency-france"
  },
  
  bulgaria: {
    country: "Bulgaria",
    countryCode: "BG",
    currency: "BGN",
    language: "Bulgarian, English",
    timezone: "GMT+2",
    
    marketSize: "6.9 million people",
    gdp: "$84 billion",
    internetPenetration: "71.0%",
    ecommerceGrowth: "15% YoY",
    digitalAdoption: "Growing digital economy with increasing adoption",
    
    localCompetitors: ["Bulgaria SEO Agency", "Sofia Digital Marketing", "Bulgarian SEO Solutions", "Balkan SEO Experts"],
    topIndustries: ["Technology", "Manufacturing", "Agriculture", "Tourism", "E-commerce"],
    
    successMetrics: {
      averageResults: "45-60 days",
      clientSatisfaction: "98%",
      trafficIncrease: "150%",
      timeToResults: "6-10 weeks"
    },
    
    heroTitle: "The #1 AI SEO Agency in Bulgaria",
    heroSubtitle: "Dominate Google Autosuggest & AI Platform Visibility Across Bulgaria",
    
    valuePropositions: [
      "Get cited by ChatGPT, Gemini, and Claude AI in Bulgaria",
      "Dominate Google Autocomplete for Bulgarian keywords",
      "Results in 45-60 days with 98% success rate",
      "3x more affordable than traditional Google Ads",
      "Works across Google, Bing, and all major search engines"
    ],
    
    localMarketInsights: [
      "Bulgaria's digital economy growing at 15% annually",
      "71% internet penetration with strong mobile adoption",
      "Growing technology sector with increasing SEO demand",
      "Multilingual market (Bulgarian + English) requires specialized approach",
      "EU membership provides access to larger digital markets"
    ],
    
    uniqueAdvantages: [
      "Deep understanding of Bulgarian market and business culture",
      "Multilingual content optimization for Bulgarian and English audiences",
      "Proven results with Bulgarian businesses across all major industries",
      "24/7 support aligned with Bulgarian timezone",
      "EU compliance and understanding of regional regulations"
    ],
    
    targetKeywords: [
      "AI SEO agency Bulgaria",
      "Google autosuggest optimization Bulgaria",
      "ChatGPT citation Bulgaria",
      "SEO agency Sofia",
      "AI SEO services Bulgaria",
      "Google autocomplete Bulgaria",
      "Best SEO agency Bulgaria",
      "Digital marketing Bulgaria AI"
    ],
    
    metaDescription: "Leading AI SEO agency in Bulgaria. Get cited by ChatGPT, Gemini & dominate Google Autocomplete. 98% success rate, results in 45-60 days. Book free consultation.",
    canonicalUrl: "https://effectivemarketer.com/ai-seo-agency-bulgaria"
  }
};

export const getLocationData = (location: string): LocationData => {
  return locationData[location] || locationData.malaysia;
};
