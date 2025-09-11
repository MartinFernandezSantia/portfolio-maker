import placeholder from "@/public/placeholder.svg";
import H2 from "../h2";
import { ProjectItem } from "@/lib/types";
import ProjectsCarousel from "../projects-carousel";

const projects: ProjectItem[] = [
  {
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with React, Node.js, and Stripe integration. Features include user authentication, product management, and real-time inventory tracking.",
    image: placeholder,
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "TailwindCSS"],
    github: "#",
    live: "#",
  },
  {
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features built with modern web technologies.",
    image: placeholder,
    technologies: ["React", "TypeScript", "Socket.io", "PostgreSQL", "Framer Motion"],
    github: "#",
    live: "#",
  },
  {
    title: "Weather Dashboard",
    description: "A beautiful weather dashboard with location-based forecasts, interactive charts, and responsive design. Integrates with multiple weather APIs for accurate data.",
    image: placeholder,
    technologies: ["React", "TypeScript", "Chart.js", "Weather API", "TailwindCSS"],
    github: "#",
    live: "#",
  },
  {
    title: "Portfolio Website",
    description: "A personal portfolio website to showcase projects, skills, and experience.",
    image: placeholder,
    technologies: ["Next.js", "TypeScript", "Framer Motion", "TailwindCSS"],
    github: "#",
    live: "#",
  },
  {
    title: "Blog Platform",
    description: "A modern blog platform with markdown support, user authentication, and SEO optimization.",
    image: placeholder,
    technologies: ["Next.js", "TypeScript", "Prisma", "TailwindCSS"],
    github: "#",
    live: "#",
  },
  {
    title: "Chat Application",
    description: "A real-time chat application with user authentication, private messaging, and group chats.",
    image: placeholder,
    technologies: ["Next.js", "TypeScript", "Socket.io", "TailwindCSS"],
    github: "#",
    live: "#",
  },
];

const Projects = () => {

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-6">
        <H2
          subtitle="Here are some of my recent projects that showcase my skills and passion for creating
            innovative web solutions."
        >
          Featured <span className="gradient-text">Projects</span>
        </H2>

        <ProjectsCarousel projects={projects} />
      </div>
    </section>
  );
};

export default Projects;