// components/sections/education.tsx
"use client";

import H2 from "../h2";
import EducationList from "../education-list";
import CertificationList from "../certification-list";
import { EducationItem, CertificationItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { education } from "@/data/userData";

const Education = () => {

  const sortedEducation = [...education].sort((a, b) => {
    const dateA = a.endDate || a.startDate;
    const dateB = b.endDate || b.startDate;
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });

  // 🎓 Educación formal (Diplomas, Bootcamps, etc.)
  const formalEducation: EducationItem[] = sortedEducation
    .filter(
      (edu) =>
        edu.certificateType === "diploma" || edu.certificateType === "bootcamp",
    )
    .map((edu) => ({
      degree: edu.title,
      school: edu.academy,
      period: `${edu.startDate} - ${edu.endDate || "Present"}`,
      grade: edu.certificateType,
      description: edu.description,
    }));

  // 🏅 Certificaciones, cursos y otros
  const certifications: CertificationItem[] = sortedEducation
    .filter(
      (edu) =>
        edu.certificateType === "course" || edu.certificateType === "other",
    )
    .map((edu) => ({
      name: edu.title,
      issuer: edu.academy,
      period: `${edu.startDate} - ${edu.endDate || "Present"}`,
      type: edu.certificateType,
      description: edu.description,
    }));

  return (
    <section id="education" className="py-20 relative">
      <div className="container mx-auto">
        <H2 subtitle="Aprendizaje continuo y desarrollo profesional">
          Educación y <span className="gradient-text">Certificaciones</span>
        </H2>

        <div className={cn(" max-w-6xl mx-auto", {
          "grid lg:grid-cols-2 gap-8": formalEducation.length > 0 && certifications.length > 0,
          "flex items-center justify-center": formalEducation.length <= 0 || certifications.length <= 0
        }
        )}>
          {formalEducation.length > 0 && (
            <EducationList education={formalEducation} />
          )}

          {certifications.length > 0 && (
            <CertificationList certifications={certifications} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Education;
