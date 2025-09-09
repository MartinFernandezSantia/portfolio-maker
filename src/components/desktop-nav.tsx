import React from 'react'
import { motion } from "framer-motion";
import { HeroButton } from './ui/button-variants';
import { NavItem } from '@/lib/types';

type DesktopNavProps = {
    scrollToSection: (href: string) => void;
    navItems: NavItem[];
}

export default function DesktopNav({ scrollToSection, navItems }: DesktopNavProps) {
    return (
        <>
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
                </motion.a>
            ))}
            <HeroButton variant="hero" size="sm">
                Hire Me
            </HeroButton>
        </>
    )
}
