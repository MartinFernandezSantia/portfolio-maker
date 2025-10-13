"use client";

import { Navigation } from "@/components/layout/navigation";
import About from "@/components/main/about";
import Experience from "@/components/main/experience";
import Education from "@/components/main/education";
import Projects from "@/components/main/projects";
import Contact from "@/components/main/contact";
import Hero from "@/components/main/hero";
import Footer from "@/components/layout/footer";
import Background from "@/components/background";
import { PortfolioState } from "@/contexts/PortfolioContext";

export default function PreviewPage({ state }: { state: PortfolioState }) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="flex justify-end p-4"></div>

      <div id="portfolio-content">
        <Background />
        <Navigation />
        <main className="px-6">
          <Hero />
          <About />
          <Experience />
          <Education />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
