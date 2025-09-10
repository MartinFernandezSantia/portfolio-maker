"use client"

import { motion } from 'framer-motion'
import { HeroButton } from '@/components/ui/button-variants'
import { scrollToSection } from '@/lib/utils'
import { Button } from './ui/button'

export default function CTA() {
    return (
        <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
            <HeroButton
                variant="hero"
                size="lg"
                className="group"
                onClick={() => scrollToSection('#projects')}>
                View My Work
                <motion.span
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    →
                </motion.span>
            </HeroButton>

            <HeroButton
                variant="outline"
                size="lg"
                onClick={() => scrollToSection('#contact')}>
                Get In Touch
            </HeroButton>

        </motion.div>
    )
}
