"use client";

import H2 from "../h2";
import ExperienceTimeline from "../experience-timeline";
import { workExperience } from "@/data/userData";

const Experience = () => {

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
    period: `${exp.startDate ? formatDate(exp.startDate) : ""} - ${exp.endDate ? formatDate(exp.endDate) : "Presente"}`,
    description: exp.description,
  }));

  return (
    <section id="experience" className="py-20 relative">
      <H2 subtitle="Mi trayectoria profesional construyendo soluciones digitales impactantes">
        <span className="gradient-text">Experiencia</span> Laboral
      </H2>

      <ExperienceTimeline experiences={experiences} />
    </section>
  );
};

export default Experience;
