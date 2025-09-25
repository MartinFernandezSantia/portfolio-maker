"use client";

import H1 from "../h1";
import Subtitle from "../subtitle";
import Avatar from "../avatar";
import CTA from "../cta";
import Socials from "../socials";
import ScrollDown from "../scroll-down";
import { usePortfolio } from "@/contexts/PortfolioContext";

const Hero = () => {
  const { state } = usePortfolio();
  const { hero } = state;

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <Avatar />

          <H1>
            Hi, I&apos;m{" "}
            <span className="gradient-text">
              {hero.firstName} {hero.lastName}
            </span>
          </H1>

          <Subtitle size="lg">{hero.headline}</Subtitle>

          <CTA />
          <Socials />
        </div>
      </div>

      <ScrollDown scrollTo={"#about"} />
    </section>
  );
};

export default Hero;
