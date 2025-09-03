"use client"

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { HeroButton } from "../ui/button-variants";

export const Navigation = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: "Home", href: "#" },
        { name: "About", href: "#about" },
        { name: "Projects", href: "#projects" },
        { name: "Contact", href: "#contact" },
    ];

    const scrollToSection = (href: string) => {
        if (href === "#") {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${isScrolled
                ? 'bg-background/90 backdrop-blur-md border-b border-border'
                : 'bg-transparent'
                }`}
        >
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <motion.a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            scrollToSection("#");
                        }}
                        className="text-xl font-bold gradient-text"
                        whileHover={{ scale: 1.05 }}
                    >
                        Alex Johnson
                    </motion.a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <motion.a
                                key={item.name}
                                href={item.href}
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection(item.href);
                                }}
                                className="text-foreground hover:text-primary transition-smooth relative group"
                                whileHover={{ y: -2 }}
                            >
                                {item.name}
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-smooth origin-left" />
                            </motion.a>
                        ))}
                        <HeroButton variant="hero" size="sm">
                            Hire Me
                        </HeroButton>
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 text-foreground hover:text-primary transition-smooth"
                        whileTap={{ scale: 0.95 }}
                        aria-label="Toggle mobile menu"
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-5 h-5" />
                        ) : (
                            <Menu className="w-5 h-5" />
                        )}
                    </motion.button>
                </div>

                {/* Mobile Navigation */}
                <motion.div
                    initial={false}
                    animate={{
                        height: isMobileMenuOpen ? 'auto' : 0,
                        opacity: isMobileMenuOpen ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="md:hidden overflow-hidden"
                >
                    <div className="py-4 space-y-4 border-t border-border">
                        {navItems.map((item) => (
                            <motion.a
                                key={item.name}
                                href={item.href}
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection(item.href);
                                }}
                                className="block text-foreground hover:text-primary transition-smooth"
                                whileHover={{ x: 5 }}
                            >
                                {item.name}
                            </motion.a>
                        ))}
                        <div className="pt-2">
                            <HeroButton variant="hero" size="sm" className="w-full">
                                Hire Me
                            </HeroButton>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.nav>
    );
};

