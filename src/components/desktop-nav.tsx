"use client";

import { HeroButton } from "./ui/button-variants";
import { NavItem } from "@/lib/types";
import { MotionLink } from "./motion-link";
import { scrollToSection } from "@/lib/utils";

type DesktopNavProps = {
  onClick: () => void;
  navItems: NavItem[];
};

export default function DesktopNav({ onClick, navItems }: DesktopNavProps) {
  return (
    <>
      {navItems.map((item) => (
        <MotionLink
          key={item.name}
          href={item.href}
          onClick={(e) => {
            e.preventDefault();
            scrollToSection(item.href);
            onClick();
          }}
          className="text-foreground hover:text-primary transition-smooth relative group"
          whileHover={{ y: -2 }}
        >
          {item.name}
        </MotionLink>
      ))}
      <HeroButton variant="hero" size="sm">
        Hire Me
      </HeroButton>
    </>
  );
}
