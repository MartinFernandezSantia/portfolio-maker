"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Background() {
  const [dots, setDots] = useState<
    Array<{ left: number; top: number; delay: number; duration: number }>
  >([]);

  useEffect(() => {
    // Generate dots only on client-side
    const newDots = Array.from({ length: 150 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2,
    }));
    setDots(newDots);
  }, []);

  return (
    <>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-secondary opacity-50" />

      {/* Animated background dots */}
      <div className="absolute inset-0">
        {dots.map((dot, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full opacity-20"
            style={{
              left: `${dot.left}%`,
              top: `${dot.top}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: dot.duration,
              repeat: Infinity,
              delay: dot.delay,
            }}
          />
        ))}
      </div>
    </>
  );
}
