import H2 from "../h2";
import { EducationItem } from "@/lib/types";
import EducationList from "../education-list";
import CertificationList from "../certification-list";

const education: EducationItem[] = [
  {
    degree: "Bachelor of Science in Computer Science",
    school: "University of Technology",
    period: "2015 - 2019",
    grade: "Magna Cum Laude",
    description: "Focused on software engineering, algorithms, and data structures. Active in programming competitions.",
  },
  {
    degree: "Full Stack Web Development Bootcamp",
    school: "Code Academy",
    period: "2019",
    grade: "Certificate",
    description: "Intensive 12-week program covering modern web technologies and agile development practices.",
  },
];

const Education = () => {

  const certifications = [
    "AWS Certified Developer",
    "Google Cloud Professional",
    "React Advanced Patterns",
    "Node.js Certification",
  ];

  return (
    <section id="education" className="py-20 relative">
      <div className="container mx-auto px-6">

        <H2 subtitle="Continuous learning and professional development">
          Education & <span className="gradient-text">Certifications</span>
        </H2>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">

          <EducationList education={education} />

          <CertificationList certifications={certifications} />

        </div>
      </div>
    </section>
  );
};

export default Education;