"use client"

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'

export default function Socials() {

    const socialItems = [
        { Icon: Github, href: "#", label: "GitHub" },
        { Icon: Linkedin, href: "#", label: "LinkedIn" },
        { Icon: Mail, href: "#", label: "Email" },
    ]

    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex justify-center gap-6 mb-16"
        >
            {socialItems.map(({ Icon, href, label }) => (
                <motion.a
                    key={label}
                    href={href}
                    className="p-3 rounded-full border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-smooth glow"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={label}
                >
                    <Icon className="w-5 h-5" />
                </motion.a>
            ))}
        </motion.div>
    )
}
