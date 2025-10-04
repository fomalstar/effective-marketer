export interface TeamMember {
  name: string;
  role: string;
  description: string;
  image: string;
  linkedin?: string;
}

export const teamMembers: TeamMember[] = [
  {
    name: "Yavor Stoyanov",
    role: "Founder & CEO",
    description:
      "Visionary leader with 10+ years in digital marketing and AI SEO innovation",
    image: "/ya.png",
    linkedin: "https://www.linkedin.com/in/yavorseo/",
  },
  {
    name: "Anne Vu",
    role: "CFO",
    description:
      "Financial strategist ensuring sustainable growth and operational excellence",
    image: "/z6743367463015_a433bc2984395bc69c640d30ad23b488.jpg",
    linkedin: "https://www.linkedin.com/in/anne-thuy-nga-645105180",
  },
  {
    name: "Lorenzo Payman",
    role: "VP Sales",
    description:
      "Sales leader driving client acquisition and relationship management",
    image: "/WhatsApp Image 2025-07-04 at 16.14.17_49746d6b.jpg",
    linkedin: "https://www.linkedin.com/in/lorenzopayman/",
  },
  {
    name: "Rusi Zhelev",
    role: "SEO Specialist",
    description:
      "Technical SEO expert specializing in Google Autosuggest optimization",
    image: "/1597586218054.jpg",
    linkedin: "https://www.linkedin.com/in/zhelev/",
  },
  {
    name: "Lucas Lenoir",
    role: "AI Director",
    description:
      "AI strategist leading our ChatGPT and AI platform optimization initiatives",
    image: "/lucas.png",
    linkedin: "https://www.linkedin.com/in/lucaslenoir/",
  },
  {
    name: "Ivaylo Dimitrov",
    role: "Growth Strategist",
    description:
      "Growth expert specializing in scaling businesses through strategic marketing and optimization",
    image: "/1757946188540.png",
    linkedin: "https://www.linkedin.com/in/ivaylo-dimitrov-7a2865381/",
  },
];
