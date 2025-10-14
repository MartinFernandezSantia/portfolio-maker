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
  const { aboutMe } = state;

  return (
    <section className="min-h-screen flex items-center justify-center overflow-hidden">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center py-8">
          <Avatar />

          <H1>
            Hi, I&apos;m{" "}
            <span className="gradient-text">
              {aboutMe.fullName}
            </span>
          </H1>

          <Subtitle className="text-lg 2xl:text-xl">
            {aboutMe.jobTitle} crafting beautiful, functional experiences
            with modern technologies and clean code.
          </Subtitle>

          <CTA />
          <Socials />
          <ScrollDown scrollTo={"#about"} />
        </div>
        {/* <div className="w-full h-16"> */}
        {/* </div> */}
      </div>
    </section>
  );
};

export default Hero;
