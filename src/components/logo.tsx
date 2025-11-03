"use client";

import { MotionLink } from "./motion-link";
import { scrollToSection } from "@/lib/utils";
import { usePortfolio } from "@/contexts/PortfolioContext";

type LogoProps = {
  onClick: () => void;
};

export default function Logo({ onClick }: LogoProps) {
  const { state } = usePortfolio();
  const { aboutMe } = state;

  return (
    <MotionLink
      href="#"
      onClick={(e) => {
        e.preventDefault();
        scrollToSection("#");
        onClick();
      }}
      className="text-xl font-bold gradient-text logo"
      whileHover={{ scale: 1.05 }}
    >
      {aboutMe?.fullName || "Mi Portfolio"}
    </MotionLink>
  );
}
