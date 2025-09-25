"use client";

import H2 from "../h2";
import EducationList from "../education-list";
import CertificationList from "../certification-list";
import { usePortfolio } from "@/contexts/PortfolioContext";
import { EducationItem } from "@/lib/types";

const Education = () => {
  const { state } = usePortfolio();
  const { education } = state;

  // Mapper: transformamos Education → EducationItem
  const formalEducation: EducationItem[] = education
    .filter((edu) => edu.certificateType === "diploma" || edu.certificateType === "bootcamp")
    .map((edu) => ({
      degree: edu.title,
      school: edu.academy,
      period: `${edu.startDate} - ${edu.endDate || "Present"}`,
      grade: edu.certificateType, // o algún campo equivalente, podés personalizar
      description: edu.description,
    }));

  // Certifications: solo cursos/otros
  const certifications: string[] = education
    .filter((edu) => edu.certificateType === "course" || edu.certificateType === "other")
    .map((edu) => edu.title);

  return (
    <section id="education" className="py-20 relative">
      <div className="container mx-auto">
        <H2 subtitle="Continuous learning and professional development">
          Education & <span className="gradient-text">Certifications</span>
        </H2>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <EducationList education={formalEducation} />
          <CertificationList certifications={certifications} />
        </div>
      </div>
    </section>
  );
};

export default Education;
