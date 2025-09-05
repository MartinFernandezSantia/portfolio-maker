"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";

const Experience = () => {
  const experiences = [
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

  return (
    <section id="experience" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My professional journey building impactful digital solutions
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-border" />
              
              {/* Timeline dot */}
              <div className="absolute left-6 top-8 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg" />
              
              <div className="ml-16 pb-12">
                <div className="bg-card border rounded-lg p-6 hover:glow transition-smooth">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                    <h3 className="text-xl font-semibold text-foreground">
                      {exp.title}
                    </h3>
                    <div className="flex items-center text-sm text-muted-foreground mt-1 md:mt-0">
                      <Calendar className="w-4 h-4 mr-1" />
                      {exp.period}
                    </div>
                  </div>
                  
                  <div className="flex items-center text-primary font-medium mb-2">
                    {exp.company}
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    {exp.location}
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;