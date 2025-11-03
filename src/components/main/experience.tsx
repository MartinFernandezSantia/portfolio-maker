"use client";

import H2 from "../h2";
import ExperienceTimeline from "../experience-timeline";
import { usePortfolio } from "@/contexts/PortfolioContext";

const Experience = () => {
  const { state } = usePortfolio();
  const { workExperience } = state;

  console.log("Work Experience:", workExperience);
  // Mapear tus WorkExperience del contexto al formato esperado por ExperienceTimeline

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00');
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const year = date.getFullYear();
    console.log("Formatted Date:", date, "\n Previous Date", dateString);
    return `${month} ${year}`;
  };

   const sortedWorkExperience = [...workExperience].sort((a, b) => {
    const dateA = a.endDate || a.startDate;
    const dateB = b.endDate || b.startDate;
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });

  const experiences = sortedWorkExperience.map((exp) => ({
    title: exp.specialty,
    company: exp.company,
    location: exp.location,
    period: `${exp.startDate ? formatDate(exp.startDate) : ""} - ${exp.endDate ? formatDate(exp.endDate) : "Present"}`,
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
