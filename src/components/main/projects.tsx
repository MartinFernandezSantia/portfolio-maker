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
        <H2 subtitle="Aquí hay algunos de mis proyectos recientes que muestran mis habilidades y pasión por crear soluciones web innovadoras.">
          Proyectos <span className="gradient-text">Destacados</span>
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
            Aún no hay proyectos destacados. Agrega algunos en el panel de control.
          </p>
        )}
      </div>
    </section>
  );
};

export default Projects;
