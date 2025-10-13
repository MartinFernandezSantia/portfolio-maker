"use client";
import { motion } from "framer-motion";

export default function H1({ children }: { children: React.ReactNode }) {
  return (
    <motion.h1
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
    >
      {children}
    </motion.h1>
  );
}
