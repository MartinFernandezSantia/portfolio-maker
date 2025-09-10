"use client"
import { motion } from 'framer-motion'

export default function Subtitle({ children }: { children: React.ReactNode }) {
    return (
        <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
        >
            {children}
        </motion.p>
    )
}
