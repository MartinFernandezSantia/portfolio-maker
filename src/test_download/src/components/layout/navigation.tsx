"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Logo from "../logo";
import { NavItem } from "@/lib/types";
import DesktopNav from "../desktop-nav";
import MobileMenuButton from "../mobile-menu-btn";
import MobileNav from "../mobile-nav";

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems: NavItem[] = [
    { name: "Inicio", href: "#" },
    { name: "Acerca", href: "#about" },
    { name: "Habilidades", href: "#skills" },
    { name: "Experiencia", href: "#experience" },
    { name: "Educación", href: "#education" },
    { name: "Proyectos", href: "#projects" },
    { name: "Contacto", href: "#contact" },
  ];

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${isScrolled
        ? "bg-background/90 backdrop-blur-md border-b border-border"
        : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Logo onClick={closeMobileMenu} />

          <div className="hidden lg:flex items-center space-x-8">
            <DesktopNav onClick={closeMobileMenu} navItems={navItems} />
          </div>

          <MobileMenuButton
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
        </div>

        <MobileNav
          isMobileMenuOpen={isMobileMenuOpen}
          onClick={closeMobileMenu}
          navItems={navItems}
        />
      </div>
    </motion.nav>
  );
};
