import { Navigation } from "@/components/layout/navigation";

import About from "@/components/main/about";
import Experience from "@/components/main/experience";
import Education from "@/components/main/education";
import Projects from "@/components/main/projects";
import Contact  from "@/components/main/contact";
import Hero from "@/components/main/hero";


export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Experience />
        <Education />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}


