"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import placeholder from "../../public/placeholder.svg";
import { aboutMe, getProfileImagePath } from "@/data/userData";

export default function Avatar({ className = "" }: { className?: string }) {
  const profileImgPath = getProfileImagePath();
  console.log("Profile Image Path:", profileImgPath);

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`mb-4 2xl:mb-8 ${className}`}
    >
      <Image
        src={profileImgPath || placeholder}
        alt={aboutMe.fullName || "Profile"}
        width={128}
        height={128}
        className="w-40 h-40 2xl:w-44 2xl:h-44 rounded-full mx-auto glow border-4 border-primary"
      />
    </motion.div>
  );
}
