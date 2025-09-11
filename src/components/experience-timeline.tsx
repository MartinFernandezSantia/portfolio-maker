"use client"

import { ExperienceItem as TExperienceItem } from '@/lib/types';
import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';

type ExperienceTimelineProps = {
    experiences: TExperienceItem[];
}

export default function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
    return (
        <div className="max-w-4xl mx-auto">
            {experiences.map((exp, index) => (
                <ExperienceItem key={index} exp={exp} index={index} />
            ))}
        </div>
    )
}

type ExperienceItemProps = {
    exp: TExperienceItem;
    index: number;
}

function ExperienceItem({ exp, index }: ExperienceItemProps) {
    const { title, company, location, period, description } = exp;

    return (
        <motion.div
            key={index}
            initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="relative"
        >
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-border" />

            {/* Timeline dot */}
            <div className="absolute left-6 top-8 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg" />

            <div className="ml-16 pb-12">
                <div className="bg-card border rounded-lg p-6 hover:glow transition-smooth">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                        <h3 className="text-xl font-semibold text-foreground">
                            {title}
                        </h3>
                        <div className="flex items-center text-sm text-muted-foreground mt-1 md:mt-0">
                            <Calendar className="w-4 h-4 mr-1" />
                            {period}
                        </div>
                    </div>

                    <div className="flex items-center text-primary font-medium mb-2">
                        {company}
                    </div>

                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                        <MapPin className="w-4 h-4 mr-1" />
                        {location}
                    </div>

                    <p className="text-muted-foreground leading-relaxed">
                        {description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
