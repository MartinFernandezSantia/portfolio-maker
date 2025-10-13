// components/certification-list.tsx
"use client";

// import { CertificationItem } from "@/lib/types";
import { Card } from "./ui/card";
import { Award } from "lucide-react";
import { motion } from "framer-motion";
import { CertificationItem as TCertificationItem } from "@/lib/types";

type CertificationListProps = {
  certifications: TCertificationItem[];
};

export default function CertificationList({ certifications }: CertificationListProps) {
  return (
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

        <div className="grid gap-3 max-h-50 overflow-y-auto">
          {certifications.map((cert, index) => (
            <CertificationItem key={index} cert={cert} index={index} />
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
  )
}

function CertificationItem({ cert, index }: { cert: TCertificationItem; index: number }) {
  return (
    <motion.div
      key={index}
      initial={{ x: 20, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-smooth"
    >
      <div className="w-2 h-2 bg-primary rounded-full" />
      <span className="font-medium">{cert.name}</span>
    </motion.div>
  );
}
