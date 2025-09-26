// Team member data for the website
export interface TeamMember {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
  description?: string;
}

export const teamMembers: TeamMember[] = [
  {
    name: "Yavor Stoyanov",
    role: "Founder & CEO",
    image: "/ya.png",
    linkedin: "https://www.linkedin.com/in/yavor-stoyanov",
    description: "Visionary leader with 10+ years in digital marketing and AI SEO innovation"
  },
  {
    name: "Anne Vu",
    role: "CFO",
    image: "/z6743367463015_a433bc2984395bc69c640d30ad23b488.jpg",
    linkedin: "https://www.linkedin.com/in/anne-vu",
    description: "Financial strategist ensuring sustainable growth and operational excellence"
  },
  {
    name: "Lorenzo Payman",
    role: "VP Sales",
    image: "/WhatsApp Image 2025-07-04 at 16.14.17_49746d6b.jpg",
    linkedin: "https://www.linkedin.com/in/lorenzo-payman",
    description: "Sales leader driving client acquisition and relationship management"
  },
  {
    name: "Rusi Zhelev",
    role: "SEO Specialist",
    image: "/WhatsApp Image 2025-06-18 at 15.30.43_bb69c7a1.jpg",
    linkedin: "https://www.linkedin.com/in/rusi-zhelev",
    description: "Technical SEO expert specializing in Google Autosuggest optimization"
  },
  {
    name: "Lucas Lenoir",
    role: "AI Director",
    image: "/lucas.png",
    linkedin: "https://www.linkedin.com/in/lucas-lenoir",
    description: "AI strategist leading our ChatGPT and AI platform optimization initiatives"
  }
];
