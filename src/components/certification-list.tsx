// components/certification-list.tsx
"use client";

import { CertificationItem } from "@/lib/types";
import { Card } from "./ui/card";
import { Award, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function CertificationList({
  certifications,
}: {
  certifications: CertificationItem[];
}) {
  return (
    <div className="space-y-6">
      {certifications.map((cert, index) => (
        <CertificationCard
          key={`${cert.name}-${index}`}
          cert={cert}
          index={index}
        />
      ))}
    </div>
  );
}

type CertificationCardProps = {
  cert: CertificationItem;
  index: number;
};

export function CertificationCard({ cert, index }: CertificationCardProps) {
  const { name, issuer, period, description, type } = cert;

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
            <Award className="w-6 h-6 text-primary" />
          </motion.div>

          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2 group-hover:gradient-text transition-smooth">
              {name}
            </h3>

            <div className="text-primary font-medium mb-2">{issuer}</div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {period}
              </div>

              {type && (
                <div className="flex items-center">
                  <Award className="w-4 h-4 mr-1" />
                  <span className="capitalize">{type}</span>
                </div>
              )}
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
