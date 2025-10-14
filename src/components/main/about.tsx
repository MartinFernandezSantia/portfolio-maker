"use client";

import { motion } from "framer-motion";
import { usePortfolio } from "@/contexts/PortfolioContext";

const About = () => {
  const { state } = usePortfolio();
  const { aboutMe } = state;

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-lg text-white/80 max-w-5xl mx-auto text-justify whitespace-pre-line">
            {aboutMe.aboutMe}
          </p>
        </motion.div>

        {/* Skills section */}
        <section id="skills" className="py-20 relative">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="gradient-text">Tech Stack</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {aboutMe.techStack.map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-smooth cursor-default group"
                >
                  {/* <tech.icon className="w-4 h-4 group-hover:scale-110 transition-transform" /> */}
                  <span>{tech}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
    </section>
  );

};

export default About;
