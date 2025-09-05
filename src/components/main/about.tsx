"use client";

import { Code2, Lightbulb, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "../ui/card";


const About = () => {
  const features = [
    {
      icon: Code2,
      title: "Clean Code",
      description: "Writing maintainable, scalable code that stands the test of time.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Always exploring new technologies and creative solutions.",
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Working effectively with teams to deliver exceptional results.",
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Optimizing applications for speed and user experience.",
    },
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
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
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            I'm a passionate full-stack developer with over 5 years of experience creating 
            digital solutions that make a difference. I specialize in React, Node.js, and 
            modern web technologies, always focusing on clean code and user experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full hover:glow transition-smooth group">
                <motion.div
                  className="mb-4 p-3 rounded-lg bg-primary/10 w-fit"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <feature.icon className="w-6 h-6 text-primary" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-3 group-hover:gradient-text transition-smooth">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Skills section */}
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
            {[
              "React", "TypeScript", "Node.js", "Next.js", "TailwindCSS", 
              "PostgreSQL", "MongoDB", "AWS", "Docker", "GraphQL"
            ].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="px-4 py-2 bg-secondary rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-smooth cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;