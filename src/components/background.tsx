"use client"
import React from 'react'
import { motion } from 'framer-motion'

export default function Background() {
    return (
        <>
            {/* Background gradient */}
            < div className="absolute inset-0 bg-gradient-secondary opacity-50" />

            {/* Animated background dots */}
            < div className="absolute inset-0" >
                {
                    Array.from({ length: 150 }).map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-primary rounded-full opacity-20"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, -10, 0],
                                opacity: [0.2, 0.5, 0.2],
                            }}
                            transition={{
                                duration: 3 + Math.random() * 2,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                            }}
                        />
                    ))
                }
            </div >
        </>
    )
}
