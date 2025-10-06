"use client";

import H2 from "../h2";
import ExperienceTimeline from "../experience-timeline";
import { usePortfolio } from "@/contexts/PortfolioContext";

const Experience = () => {
  const { state } = usePortfolio();
  const { workExperience } = state;

  // Mapear tus WorkExperience del contexto al formato esperado por ExperienceTimeline
  const experiences = workExperience.map((exp) => ({
    title: exp.specialty,
    company: exp.company,
    location: exp.location,
    period: `${exp.startDate ? new Date(exp.startDate).toLocaleDateString("en-US", { year: "numeric", month: "short" }) : ""} - ${
      exp.endDate
        ? new Date(exp.endDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
          })
        : "Present"
    }`,
    description: exp.description,
  }));

  return (
    <section id="experience" className="py-20 relative">
      <H2 subtitle="My professional journey building impactful digital solutions">
        Work <span className="gradient-text">Experience</span>
      </H2>

      <ExperienceTimeline experiences={experiences} />
    </section>
  );
};

export default Experience;
