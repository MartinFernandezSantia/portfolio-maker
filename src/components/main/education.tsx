"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { GraduationCap, Award, Calendar } from "lucide-react";

const Education = () => {
  const education = [
    {
      degree: "Bachelor of Science in Computer Science",
      school: "University of Technology",
      period: "2015 - 2019",
      grade: "Magna Cum Laude",
      description: "Focused on software engineering, algorithms, and data structures. Active in programming competitions.",
    },
    {
      degree: "Full Stack Web Development Bootcamp",
      school: "Code Academy",
      period: "2019",
      grade: "Certificate",
      description: "Intensive 12-week program covering modern web technologies and agile development practices.",
    },
  ];

  const certifications = [
    "AWS Certified Developer",
    "Google Cloud Professional",
    "React Advanced Patterns",
    "Node.js Certification",
  ];

  return (
    <section id="education" className="py-20 relative bg-secondary/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Education & <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Continuous learning and professional development
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Education Cards */}
          <div className="space-y-6">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 hover:glow transition-smooth group">
                  <div className="flex items-start gap-4">
                    <motion.div
                      className="p-3 rounded-lg bg-primary/10 flex-shrink-0"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <GraduationCap className="w-6 h-6 text-primary" />
                    </motion.div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2 group-hover:gradient-text transition-smooth">
                        {edu.degree}
                      </h3>
                      
                      <div className="text-primary font-medium mb-2">
                        {edu.school}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {edu.period}
                        </div>
                        <div className="flex items-center">
                          <Award className="w-4 h-4 mr-1" />
                          {edu.grade}
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {edu.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Certifications */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 h-fit">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">
                  Professional <span className="gradient-text">Certifications</span>
                </h3>
              </div>
              
              <div className="grid gap-3">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={cert}
                    initial={{ x: 20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-smooth"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="font-medium">{cert}</span>
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/20"
              >
                <p className="text-sm text-muted-foreground text-center">
                  Committed to staying current with emerging technologies and industry best practices
                </p>
              </motion.div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;