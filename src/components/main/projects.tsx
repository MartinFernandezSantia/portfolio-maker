"use client";

import H2 from "../h2";
import ProjectsCarousel from "../projects-carousel";
import { usePortfolio } from "@/contexts/PortfolioContext";

const Projects = () => {
  const { state } = usePortfolio();
  const { projects } = state;

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto">
        <H2 subtitle="Here are some of my recent projects that showcase my skills and passion for creating innovative web solutions.">
          Featured <span className="gradient-text">Projects</span>
        </H2>

        {projects.length > 0 ? (
          <ProjectsCarousel
            projects={projects.map((p) => ({
              title: p.projectName,
              description: p.description,
              image: p.projectImages[0]
                ? URL.createObjectURL(p.projectImages[0]) // si son File[]
                : "/placeholder.svg",
              technologies: p.technologiesUsed,
              github: p.githubLink,
              live: p.liveDemoLink,
            }))}
          />
        ) : (
          <p className="text-center text-muted-foreground mt-6">
            No featured projects yet. Add some in the dashboard.
          </p>
        )}
      </div>
    </section>
  );
};

export default Projects;
