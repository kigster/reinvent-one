import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import PublicSpeaking from "@/components/PublicSpeaking";
import Schedule from "@/components/Schedule";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getOpenSourceProjects } from "@/lib/openSourceData";
import { SectionProvider } from "@/components/SectionContext";
import SectionPanel from "@/components/SectionPanel";

const OpenSource = dynamic(() => import("@/components/OpenSource"), {
  ssr: true,
  loading: () => (
    <section
      id="open-source"
      className="relative py-24 bg-brand-darker text-white min-h-[400px] flex items-center justify-center"
    >
      <div className="text-gray-400">Loading open source projects…</div>
    </section>
  ),
});

export default function Home() {
  const projects = getOpenSourceProjects();
  return (
    <SectionProvider>
      <Header />
      <main>
        <SectionPanel id="hero">
          <Hero />
        </SectionPanel>
        <SectionPanel id="services">
          <Services />
        </SectionPanel>
        <SectionPanel id="schedule">
          <Schedule />
        </SectionPanel>
        <SectionPanel id="about">
          <About />
        </SectionPanel>
        <SectionPanel id="portfolio">
          <Portfolio />
        </SectionPanel>
        <SectionPanel id="speaking">
          <PublicSpeaking />
        </SectionPanel>
        <SectionPanel id="open-source">
          <OpenSource projects={projects} />
        </SectionPanel>
        <SectionPanel id="contact">
          <Contact />
        </SectionPanel>
      </main>
      <Footer />
    </SectionProvider>
  );
}
