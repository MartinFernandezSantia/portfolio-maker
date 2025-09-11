"use client"
import { motion } from "framer-motion";
import Subtitle from "./subtitle";

type H2Props = {
    children: React.ReactNode,
    subtitle?: string
}

export default function H2({ children, subtitle }: H2Props) {
    return (
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
        >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {children}
            </h2>

            <Subtitle size="md">
                {subtitle}
            </Subtitle>

        </motion.div>
    )
}
