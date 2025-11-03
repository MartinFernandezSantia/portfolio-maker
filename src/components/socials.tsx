"use client";

import { usePortfolio } from "@/contexts/PortfolioContext";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Socials() {
  const { state } = usePortfolio();
  const { aboutMe } = state;

  const socialItems = [
    { Icon: Github, href: aboutMe.githubLink, label: "GitHub" },
    { Icon: Linkedin, href: aboutMe.linkedinLink, label: "LinkedIn" },
    { Icon: Mail, href: `mailto:${aboutMe.email}`, label: "Email" },
  ];

  const visibleSocials = socialItems.filter(item => item.href && item.href.trim() !== "");

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="flex justify-center gap-6 mb-4 2xl:mb-8"
    >
      {visibleSocials.map(({ Icon, href, label }) => (
        <motion.a
          key={label}
          href={href}
          target="_blank"
          className="p-3 rounded-full border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-smooth glow"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label={label}
        >
          <Icon className="w-5 h-5" />
        </motion.a>
      ))}
    </motion.div>
  );
}
