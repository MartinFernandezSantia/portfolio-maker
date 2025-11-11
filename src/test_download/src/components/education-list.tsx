"use client";

import { EducationItem } from "@/lib/types";
import { Card } from "./ui/card";
import { GraduationCap, Award, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";

export default function EducationList({
  education,
}: {
  education: EducationItem[];
}) {
  return (
    <Carousel orientation="vertical" opts={{
      startIndex: 0,
      loop: true,
      align: "start",
      breakpoints: {
        "(min-width: 768px)": { slidesToScroll: 2 },
        "(min-width: 1024px)": {
          slidesToScroll: 1,
        },
      },
    }}>
      <CarouselContent className="max-h-100 md:max-h-130">
        {education.map((edu, index) => (
          <CarouselItem key={index}>
            <EducationCard key={index} edu={edu} index={index} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
    </Carousel>
  );
}

type EducationCardProps = {
  edu: EducationItem;
  index: number;
};

export function EducationCard({ edu, index }: EducationCardProps) {
  const { degree, school, period, grade, description } = edu;

  return (
    <motion.div
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
              {degree}
            </h3>

            <div className="text-primary font-medium mb-2">{school}</div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {period}
              </div>
              <div className="flex items-center">
                <Award className="w-4 h-4 mr-1" />
                {grade}
              </div>
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
