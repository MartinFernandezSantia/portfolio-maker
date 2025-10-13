"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import placeholder from "@/public/placeholder.svg";
import { usePortfolio } from "@/contexts/PortfolioContext";

export default function Avatar() {
  const { state } = usePortfolio();
  const { aboutMe } = state;

  const getProfilePhotoUrl = (): string | undefined => {
    if (aboutMe.profilePhoto) {
      return URL.createObjectURL(aboutMe.profilePhoto);
    }
    return undefined;
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mb-8 mt-8 sm:mt-0"
    >
      <Image
        src={getProfilePhotoUrl() || placeholder}
        alt={aboutMe.fullName || "Profile"}
        width={128}
        height={128}
        className="w-44 h-44 rounded-full mx-auto glow border-4 border-primary"
      />
    </motion.div>
  );
}
