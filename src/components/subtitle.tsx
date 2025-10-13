"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type SubtitleProps = {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
};

const sizeClasses = {
  sm: "text-sm md:text-md",
  md: "text-md md:text-lg",
  lg: "text-lg md:text-xl",
};

export default function Subtitle({ children, size = "md" }: SubtitleProps) {
  return (
    <motion.p
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className={cn(
        "text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto",
        sizeClasses[size],
      )}
    >
      {children}
    </motion.p>
  );
}
