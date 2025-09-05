"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { HeroButton } from "@/components/ui/button-variants";
import { ExternalLink, Github } from "lucide-react";
// import ecommerceProject from "@/assets/project-ecommerce.jpg";
// import taskAppProject from "@/assets/project-taskapp.jpg";
// import weatherProject from "@/assets/project-weather.jpg";
import placeholder from "@/public/placeholder.svg";
import Image from "next/image";

const Projects = () => {
  const projects = [
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
  ];

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and passion for creating 
            innovative web solutions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden group hover:glow transition-smooth">
                <div className="relative overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-smooth group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
                  <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-smooth">
                    <motion.a
                      href={project.github}
                      className="p-2 bg-background/80 rounded-full hover:bg-primary hover:text-primary-foreground transition-smooth"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="View GitHub repository"
                    >
                      <Github className="w-4 h-4" />
                    </motion.a>
                    <motion.a
                      href={project.live}
                      className="p-2 bg-background/80 rounded-full hover:bg-primary hover:text-primary-foreground transition-smooth"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="View live project"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </motion.a>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 group-hover:gradient-text transition-smooth">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-secondary rounded text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <HeroButton variant="outline" size="sm" className="flex-1">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </HeroButton>
                    <HeroButton variant="hero" size="sm" className="flex-1">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </HeroButton>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;