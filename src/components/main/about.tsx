"use client";

import { motion } from "framer-motion";
import { Card } from "../ui/card";
import { usePortfolio } from "@/contexts/PortfolioContext";
import { Github, Linkedin } from "lucide-react";

const About = () => {
  const { state } = usePortfolio();
  const { aboutMe } = state;

  const getProfilePhotoUrl = (): string | undefined => {
    if (aboutMe.profilePhoto) {
      return URL.createObjectURL(aboutMe.profilePhoto);
    }
    return undefined;
  };

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto">
        {/* Header con foto y nombre */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 flex flex-col items-center"
        >
          {getProfilePhotoUrl() && (
            <img
              src={getProfilePhotoUrl()}
              alt={aboutMe.fullName || "Profile"}
              className="w-32 h-32 rounded-full object-cover"
            />
          )}

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {aboutMe.fullName || "Your Name"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-4">
            {aboutMe.aboutMe ||
              "Tell us about yourself, your passion, and your soft skills..."}
          </p>
          <div className="flex gap-4 justify-center">
            {aboutMe.githubLink && (
              <a
                href={aboutMe.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition"
              >
                <Github className="w-6 h-6" />
              </a>
            )}
            {aboutMe.linkedinLink && (
              <a
                href={aboutMe.linkedinLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            )}
          </div>
        </motion.div>
        {/* Features dinámicos */}
        {aboutMe.features && aboutMe.features.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {aboutMe.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full hover:glow transition-smooth group">
                  <h3 className="text-xl font-semibold mb-3 group-hover:gradient-text transition-smooth">
                    {feature.title || "Untitled Feature"}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description || "No description provided."}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Tech Stack dinámico */}
        {aboutMe.techStack.length > 0 && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <h3 className="text-2xl font-bold mb-8">
              <span className="gradient-text">Tech Stack</span>
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {aboutMe.techStack.map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="px-4 py-2 bg-secondary rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground transition cursor-default"
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default About;
