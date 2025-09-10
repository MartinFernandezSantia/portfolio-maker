"use client";

import H1 from "../h1";
import Subtitle from "../subtitle";
import Avatar from "../avatar";
import CTA from "../cta";
import Socials from "../socials";
import ScrollDown from "../scroll-down";
import { scrollToSection } from "@/lib/utils";

const Hero = () => {
  const scrollToAbout = () => {
    scrollToSection("#about");
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          <Avatar />

          <H1>
            Hi, I&apos;m{" "}
            <span className="gradient-text">Alex Johnson</span>
          </H1>

          <Subtitle>
            Full Stack Developer crafting beautiful, functional web experiences
            with modern technologies and clean code.
          </Subtitle>

          <CTA />

          <Socials />
        </div>
      </div>

      <ScrollDown scrollToNextSection={scrollToAbout} />
    </section>
  );
};

export default Hero;