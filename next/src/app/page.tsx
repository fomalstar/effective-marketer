import Hero from "@/components/home/Hero";
import CaseStudyLogos from "@/components/home/CaseStudyLogos";
import Future from "@/components/home/Future";
import Team from "@/components/home/Team";
import Dashboard from "@/components/home/Dashboard";
import Roadmap from "@/components/home/Roadmap";
import GetStarted from "@/components/home/GetStarted";
import Contact from "@/components/home/Contact";
import FinalCTA from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <CaseStudyLogos />
      <Future />
      <Team />
      <Dashboard />
      <Roadmap />
      <GetStarted />
      <Contact />
      <FinalCTA />
    </div>
  );
}
