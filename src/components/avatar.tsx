import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import placeholder from '@/public/placeholder.svg'

export default function Avatar() {
    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
        >
            <Image
                src={placeholder}
                alt="Alex Johnson"
                className="w-32 h-32 rounded-full mx-auto glow border-4 border-primary"
            />
        </motion.div>
    )
}
