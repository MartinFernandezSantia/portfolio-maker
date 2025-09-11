"use client";

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

type MobileMenuButtonProps = {
    isMobileMenuOpen: boolean;
    setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MobileMenuButton({ isMobileMenuOpen, setIsMobileMenuOpen }: MobileMenuButtonProps) {
    return (
        <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:text-primary transition-smooth"
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle mobile menu"
        >
            {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
            ) : (
                <Menu className="w-5 h-5" />
            )}
        </motion.button>
    )
}
