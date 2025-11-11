"use client";

import { ExperienceItem as TExperienceItem } from "@/lib/types";
import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";

type ExperienceTimelineProps = {
  experiences: TExperienceItem[];
};

export default function ExperienceTimeline({
  experiences,
}: ExperienceTimelineProps) {
  return (
    <div className="max-w-4xl mx-auto">
      {experiences.map((exp, index) => (
        <ExperienceItem key={index} exp={exp} index={index} />
      ))}
    </div>
  );
}

type ExperienceItemProps = {
  exp: TExperienceItem;
  index: number;
};

function ExperienceItem({ exp, index }: ExperienceItemProps) {
  const { title, company, location, period, description } = exp;

  return (
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
        <div className="bg-card border rounded-lg p-6 hover:glow transition-smooth max-w-full w-full overflow-hidden">
          {/* Título y fecha en dos bloques */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-3 gap-2">
            <div className="flex-1 min-w-0">
              {/* break-all permite cortar cadenas sin espacios en pantallas pequeñas */}
              <h3 className="text-xl font-semibold text-foreground break-words break-all whitespace-normal overflow-hidden">
                {title}
              </h3>
            </div>

            <div className="flex-shrink-0 md:w-36 mt-2 md:mt-0 md:text-right text-sm text-muted-foreground whitespace-nowrap">
              <div className="flex items-center justify-start md:justify-end gap-1">
                <Calendar className="w-4 h-4 flex-shrink-0" />
                <span>{period}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center text-primary font-medium mb-2 overflow-hidden">
            <span className="truncate">{company}</span>
          </div>

          {location && (
            <div className="flex items-center text-sm text-muted-foreground mb-4 overflow-hidden">
              <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
              <span className="truncate">{location}</span>
            </div>
          )}

          {description && (
            <div className="rounded-md bg-muted/50 p-3">
              <p className="text-muted-foreground leading-relaxed break-words break-all whitespace-pre-wrap">
                {description}
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
