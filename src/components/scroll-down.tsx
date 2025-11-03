"use client";

import { scrollToSection } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

type ScrollDownProps = {
  scrollTo: string;
  className?: string;
};

export default function ScrollDown({ scrollTo }: ScrollDownProps) {
  return (
    <motion.button
      onClick={() => scrollToSection(scrollTo)}
      className={"text-primary "}
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      aria-label="Scroll to about section"
    >
      <ChevronDown className="w-6 h-6" />
    </motion.button>
  );
}
