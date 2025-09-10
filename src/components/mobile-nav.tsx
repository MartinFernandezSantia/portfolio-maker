import React from 'react'
import { motion } from "framer-motion";
import { HeroButton } from './ui/button-variants';
import { NavItem } from '@/lib/types';
import { MotionLink } from './motion-link';
import { scrollToSection } from '@/lib/utils';

type MobileNavProps = {
    isMobileMenuOpen: boolean;
    onClick: () => void;
    navItems: NavItem[];
}

export default function MobileNav({ isMobileMenuOpen, onClick, navItems }: MobileNavProps) {
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
                    <MotionLink
                        key={item.name}
                        href={item.href}
                        onClick={(e) => {
                            e.preventDefault();
                            scrollToSection(item.href);
                            onClick();
                        }}
                        className="block text-foreground hover:text-primary transition-smooth"
                        whileHover={{ x: 5 }}
                    >
                        {item.name}
                    </MotionLink>
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
