export interface CompetitorRow {
  rank: string;
  company: string;
  position: string;
  description: string;
  price: string;
  team: string;
  monthly: string;
  location: string;
}

export const countryCompetitors: Record<string, CompetitorRow[]> = {
  usa: [
    {
      rank: "1",
      company: "Effective Marketer 🥇",
      position: "Next-Gen AI SEO Leader",
      description:
        "Specialist AI SEO agency mastering Google Autocomplete, AI platform citations, and GEO strategies for US scale-ups and enterprise brands. In-house senior strategists deliver measurable growth in 6-10 weeks.",
      price: "$100",
      team: "50+",
      monthly: "$1,500",
      location: "Global",
    },
    {
      rank: "2",
      company: "US SEO Pro",
      position: "US Market Specialists",
      description:
        "US-focused SEO agency specializing in American market optimization with local SEO and national campaign strategies for US businesses.",
      price: "$275",
      team: "40+",
      monthly: "$2,200",
      location: "New York, USA",
    },
    {
      rank: "3",
      company: "American Digital",
      position: "Full-Service US Agency",
      description:
        "Comprehensive US marketing including SEO, PPC, and digital strategy for American businesses and international companies targeting US markets.",
      price: "$300",
      team: "55+",
      monthly: "$2,800",
      location: "Los Angeles, USA",
    },
    {
      rank: "4",
      company: "USA SEO Solutions",
      position: "US SEO Specialists",
      description:
        "Specialized in US SEO, local search optimization, and national campaigns for American businesses and international companies.",
      price: "$250",
      team: "35+",
      monthly: "$2,000",
      location: "Chicago, USA",
    },
    {
      rank: "5",
      company: "US Marketing Hub",
      position: "US-Focused Agency",
      description:
        "Dedicated US marketing services including SEO, content marketing, and conversion optimization for American businesses.",
      price: "$220",
      team: "30+",
      monthly: "$1,900",
      location: "Boston, USA",
    },
    {
      rank: "6",
      company: "American SEO Pro",
      position: "American SEO Specialists",
      description:
        "Specialized SEO services for American companies, US startups, and international businesses targeting US markets with focus on local and national SEO.",
      price: "$240",
      team: "28+",
      monthly: "$2,000",
      location: "Austin, USA",
    },
    {
      rank: "7",
      company: "US Growth Agency",
      position: "Full-Service US Marketing",
      description:
        "Comprehensive US marketing including SEO, PPC, social media, and growth hacking for American businesses and international companies.",
      price: "$300",
      team: "45+",
      monthly: "$2,800",
      location: "San Francisco, USA",
    },
    {
      rank: "8",
      company: "USA SEO Specialists",
      position: "USA SEO Specialists",
      description:
        "USA-focused SEO agency specializing in American business optimization, local search, and national campaigns for US companies.",
      price: "$260",
      team: "32+",
      monthly: "$2,200",
      location: "Seattle, USA",
    },
    {
      rank: "9",
      company: "US Marketing Pro",
      position: "US Marketing Specialists",
      description:
        "US marketing experts offering SEO, content marketing, and lead generation for American businesses and international companies targeting US markets.",
      price: "$280",
      team: "38+",
      monthly: "$2,500",
      location: "Miami, USA",
    },
    {
      rank: "10",
      company: "US SEO Experts",
      position: "US SEO Agency",
      description:
        "US-focused SEO agency specializing in American business optimization, local search, and national campaigns for US companies and international businesses.",
      price: "$250",
      team: "35+",
      monthly: "$2,100",
      location: "Denver, USA",
    },
  ],
  uk: [
    {
      rank: "1",
      company: "Effective Marketer 🥇",
      position: "Next-Gen AI SEO Leader",
      description:
        "Specialist AI SEO agency mastering Google Autocomplete, AI platform citations, and GEO strategies for UK scale-ups and enterprise brands. In-house senior strategists deliver measurable growth in 6-10 weeks.",
      price: "£200",
      team: "25+",
      monthly: "£3,500",
      location: "London & Manchester",
    },
    {
      rank: "2",
      company: "Brainlabs",
      position: "Performance Marketing Innovators",
      description:
        "Award-winning UK performance agency delivering data-led marketing, paid media, and technical SEO for enterprise brands.",
      price: "£210",
      team: "850+",
      monthly: "£6,000",
      location: "London, New York",
    },
    {
      rank: "3",
      company: "Impression",
      position: "Strategic Digital Partner",
      description:
        "Full-service UK digital marketing agency with deep expertise in SEO, content strategy, and conversion rate optimisation.",
      price: "£160",
      team: "120+",
      monthly: "£4,200",
      location: "London & Nottingham",
    },
    {
      rank: "4",
      company: "The SEO Works",
      position: "Award-Winning SEO Agency",
      description:
        "Multi-award-winning British SEO team offering organic search, PPC, and digital PR for healthcare, eCommerce, and professional services.",
      price: "£140",
      team: "100+",
      monthly: "£3,000",
      location: "Sheffield & Leeds",
    },
    {
      rank: "5",
      company: "Builtvisible",
      position: "Organic Growth Specialists",
      description:
        "Independent London agency specialising in enterprise technical SEO, analytics, and content for global brands.",
      price: "£195",
      team: "70+",
      monthly: "£5,200",
      location: "London",
    },
    {
      rank: "6",
      company: "Croud",
      position: "Full-Funnel Digital Partner",
      description:
        "Global digital marketing network combining in-house expertise with a vetted ‘Croud Control’ network for agile SEO delivery.",
      price: "£175",
      team: "450+",
      monthly: "£4,800",
      location: "London & Shrewsbury",
    },
    {
      rank: "7",
      company: "Rise at Seven",
      position: "Creative Search Agency",
      description:
        "Creative search agency delivering viral PR, digital storytelling, and SEO campaigns for eCommerce and lifestyle brands.",
      price: "£155",
      team: "120+",
      monthly: "£3,400",
      location: "Sheffield & London",
    },
    {
      rank: "8",
      company: "Hallam",
      position: "Integrated Digital Strategy",
      description:
        "Multi-award-winning UK agency offering integrated SEO, PPC, and CRO for B2B and technology firms.",
      price: "£145",
      team: "90+",
      monthly: "£3,100",
      location: "Nottingham",
    },
  ],
  vietnam: [
    {
      rank: "1",
      company: "Effective Marketer 🥇",
      position: "Next-Gen AI SEO Leader",
      description:
        "Specialist AI SEO agency mastering Google Autocomplete, AI platform citations, and proprietary AI optimization strategies. With offices globally, their in-house senior AI SEO experts deliver results in 1-3 months.",
      price: "$100",
      team: "50+",
      monthly: "$1,200",
      location: "Global",
    },
    {
      rank: "2",
      company: "FPT Digital",
      position: "Vietnam Tech Giant",
      description:
        "Digital transformation arm of FPT Corporation, providing comprehensive digital marketing and SEO services for Vietnamese businesses.",
      price: "$65",
      team: "200+",
      monthly: "$2,500",
      location: "Hanoi & Ho Chi Minh City",
    },
    {
      rank: "3",
      company: "VNG Corporation",
      position: "Vietnam Internet Pioneer",
      description:
        "Vietnam's leading internet company operating Zalo, VNG Cloud, and more, offering digital marketing and SEO services leveraging extensive local data insights.",
      price: "$70",
      team: "150+",
      monthly: "$2,800",
      location: "Ho Chi Minh City",
    },
    {
      rank: "4",
      company: "CMC Technology",
      position: "Vietnam IT Solutions",
      description:
        "Leading Vietnamese IT company providing digital transformation services including SEO, digital marketing, and web development.",
      price: "$55",
      team: "100+",
      monthly: "$2,200",
      location: "Hanoi & Ho Chi Minh City",
    },
    {
      rank: "5",
      company: "Viettel Solutions",
      position: "Vietnam Telecom Leader",
      description:
        "Digital marketing division of Vietnam's largest telecom company, offering SEO services leveraging national network infrastructure.",
      price: "$60",
      team: "80+",
      monthly: "$2,400",
      location: "Hanoi",
    },
    {
      rank: "6",
      company: "TMA Solutions",
      position: "Vietnam Software Development",
      description:
        "Leading software development house providing digital marketing and SEO services for Vietnamese and international clients.",
      price: "$50",
      team: "60+",
      monthly: "$2,000",
      location: "Ho Chi Minh City",
    },
    {
      rank: "7",
      company: "Global CyberSoft",
      position: "Vietnam Digital Agency",
      description:
        "Vietnamese digital agency specializing in web development, digital marketing, and SEO for local and international brands.",
      price: "$45",
      team: "40+",
      monthly: "$1,800",
      location: "Ho Chi Minh City",
    },
    {
      rank: "8",
      company: "Vietnam Digital Marketing",
      position: "Local SEO Specialists",
      description:
        "Boutique agency focused on local SEO, Google Business optimization, and Vietnamese-language content marketing for domestic SMEs.",
      price: "$35",
      team: "25+",
      monthly: "$1,500",
      location: "Hanoi & Ho Chi Minh City",
    },
  ],
};
