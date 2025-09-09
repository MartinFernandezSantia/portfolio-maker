import React from 'react'
import { motion } from "framer-motion";
import { HeroButton } from './ui/button-variants';
import { NavItem } from '@/lib/types';

type MobileNavProps = {
    isMobileMenuOpen: boolean;
    scrollToSection: (href: string) => void;
    navItems: NavItem[];
}

export default function MobileNav({ isMobileMenuOpen, scrollToSection, navItems }: MobileNavProps) {
    return (
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
    )
}
