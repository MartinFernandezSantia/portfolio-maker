import React from 'react'
import { motion } from "framer-motion";

type LogoProps = {
    scrollToSection: (href: string) => void;
}

export default function Logo({ scrollToSection }: LogoProps) {
    return (
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
    )
}
