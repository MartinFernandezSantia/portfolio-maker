import { Navigation } from "@/components/layout/navigation";

import About from "@/components/main/about";
import Experience from "@/components/main/experience";
import Education from "@/components/main/education";
import Projects from "@/components/main/projects";
import Contact from "@/components/main/contact";
import Hero from "@/components/main/hero";
import Footer from "@/components/layout/footer";
import Background from "@/components/background";


export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <Background />
      <Navigation />
      <main className="my-5 px-6">
        <Hero />
        <About />
        <Experience />
        <Education />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}


