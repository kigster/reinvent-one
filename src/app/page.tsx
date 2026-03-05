import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getOpenSourceProjects } from "@/lib/openSourceData";

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
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <Portfolio />
        <OpenSource projects={projects} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
