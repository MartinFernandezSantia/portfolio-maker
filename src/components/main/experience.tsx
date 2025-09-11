import H2 from "../h2";
import { ExperienceItem } from "@/lib/types";
import ExperienceTimeline from "../experience-timeline";

const experience: ExperienceItem[] = [
  {
    title: "Senior Full Stack Developer",
    company: "TechCorp Solutions",
    location: "San Francisco, CA",
    period: "2022 - Present",
    description: "Led development of microservices architecture serving 100k+ users. Built scalable React applications with Node.js backends.",
  },
  {
    title: "Frontend Developer",
    company: "Digital Innovations",
    location: "New York, NY",
    period: "2020 - 2022",
    description: "Developed responsive web applications using React and TypeScript. Collaborated with design teams to implement pixel-perfect UIs.",
  },
  {
    title: "Junior Developer",
    company: "StartupXYZ",
    location: "Austin, TX",
    period: "2019 - 2020",
    description: "Built REST APIs and database schemas. Participated in agile development cycles and code reviews.",
  },
];

const Experience = () => {

  return (
    <section id="experience" className="py-20 relative">
      <H2 subtitle="My professional journey building impactful digital solutions">
        Work <span className="gradient-text">Experience</span>
      </H2>

      <ExperienceTimeline experiences={experience} />
    </section >
  );
};

export default Experience;