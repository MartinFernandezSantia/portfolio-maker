// components/sections/education.tsx
"use client";

import H2 from "../h2";
import EducationList from "../education-list";
import CertificationList from "../certification-list";
import { usePortfolio } from "@/contexts/PortfolioContext";
import { EducationItem, CertificationItem } from "@/lib/types";

const Education = () => {
  const { state } = usePortfolio();
  const { education } = state;

  // 🎓 Educación formal (Diplomas, Bootcamps, etc.)
  const formalEducation: EducationItem[] = education
    .filter(
      (edu) =>
        edu.certificateType === "diploma" || edu.certificateType === "bootcamp",
    )
    .map((edu) => ({
      degree: edu.title,
      school: edu.academy,
      period: `${edu.startDate} - ${edu.endDate || "Present"}`,
      grade: edu.certificateType, // muestra "diploma" o "bootcamp"
      description: edu.description,
    }));

  // 🏅 Certificaciones, cursos y otros
  const certifications: CertificationItem[] = education
    .filter(
      (edu) =>
        edu.certificateType === "course" || edu.certificateType === "other",
    )
    .map((edu) => ({
      name: edu.title,
      issuer: edu.academy,
      period: `${edu.startDate} - ${edu.endDate || "Present"}`,
      type: edu.certificateType, // muestra "course" o "other"
      description: edu.description,
    }));

  return (
    <section id="education" className="py-20 relative">
      <div className="container mx-auto">
        <H2 subtitle="Continuous learning and professional development">
          Education & <span className="gradient-text">Certifications</span>
        </H2>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <EducationList education={formalEducation} />

          {certifications.length > 0 && (
            <CertificationList certifications={certifications} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Education;
