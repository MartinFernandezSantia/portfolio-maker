"use client";

import H2 from "../h2";
import ProjectsCarousel from "../projects-carousel";
import { getProjectImagePath, getProjectImages, projects } from "@/data/userData";

const Projects = () => {

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
              image: getProjectImages(p.id)[0]
                ? getProjectImagePath(p.id, 0)
                : "/placeholder.svg",
              technologies: p.technologiesUsed,
              github: p.githubLink,
              live: p.liveDemoLink,
            }))}
          />
        ) : (
          <p className="text-center text-muted-foreground mt-6">
            Aún no hay proyectos destacados. Agrega algunos en el panel.
          </p>
        )}
      </div>
    </section>
  );
};

export default Projects;
