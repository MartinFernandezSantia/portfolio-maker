"use client"

import Image from 'next/image';

import { motion } from 'framer-motion';
import { HeroButton } from './ui/button-variants';
import { ExternalLink, Github } from 'lucide-react';
import { Card } from './ui/card';
import { ProjectItem } from '@/lib/types';
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useWindowSize } from '@/hooks/useWindowSize';

type ProjectsCarouselProps = {
    projects: ProjectItem[];
}

export default function ProjectsCarousel({ projects }: ProjectsCarouselProps) {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const { width } = useWindowSize();

    const totalProjects = projects.length;
    const slidesToShow = width < 768 ? 1 : width < 1024 ? 2 : 3;
    const carouselBullets = Math.ceil(totalProjects / slidesToShow);

    // Update current slide on select
    useEffect(() => {
        if (!api) return;

        setCurrent(api.selectedScrollSnap())

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap())
        })

    }, [api])

    return (
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className='max-w-screen mx-4'
        >
            <Carousel
                setApi={setApi}
                opts={{
                    slidesToScroll: 1,
                    breakpoints: {
                        '(min-width: 768px)': { slidesToScroll: 2 },
                        '(min-width: 1024px)': {
                            slidesToScroll: 3,
                            active: totalProjects > 3,
                            watchDrag: false
                        },
                    }
                }}
            >
                <CarouselContent className=''>
                    {projects.map((project, index) => (
                        <CarouselItem key={project.title} className="md:basis-1/2 lg:basis-1/3">
                            <Project project={project} index={index} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {totalProjects > 3 && (
                    <>
                        <CarouselPrevious className='hidden lg:flex' />
                        <CarouselNext className='hidden lg:flex' />
                    </>
                )}
            </Carousel>
            <div className='w-full flex justify-center mt-4 gap-4 '>
                {Array.from({ length: carouselBullets }, (_, index) => (
                    <Button
                        key={index}
                        className={cn('h-2.5 w-2.5 p-0 m-0 rounded-full', {
                            'bg-white': current === index,
                            'bg-muted': current !== index,
                        })}
                    />
                ))}
            </div>
        </motion.div>
    )
}

type ProjectProps = {
    project: ProjectItem;
    index: number;
}

function Project({ project }: ProjectProps) {
    const { title, description, image, technologies, github, live } = project;

    return (

        <Card className="overflow-hidden group hover:glow transition-smooth h-full ">
            <div className="relative overflow-hidden flex-2">
                <Image
                    src={image}
                    alt={title}
                    className="w-full h-48 object-cover transition-smooth group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
                <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-smooth">
                    <motion.a
                        href={github}
                        className="p-2 bg-background/80 rounded-full hover:bg-primary hover:text-primary-foreground transition-smooth"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="View GitHub repository"
                    >
                        <Github className="w-4 h-4" />
                    </motion.a>
                    <motion.a
                        href={live}
                        className="p-2 bg-background/80 rounded-full hover:bg-primary hover:text-primary-foreground transition-smooth"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="View live project"
                    >
                        <ExternalLink className="w-4 h-4" />
                    </motion.a>
                </div>
            </div>

            <div className="p-6 flex flex-col flex-3">
                <h3 className="text-xl font-semibold mb-3 group-hover:gradient-text transition-smooth">
                    {title}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                    {technologies.map((tech) => (
                        <span
                            key={tech}
                            className="px-2 py-1 bg-secondary rounded text-xs font-medium"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <HeroButton variant="outline" size="sm" className="flex-1">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                    </HeroButton>
                    <HeroButton variant="hero" size="sm" className="flex-1">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                    </HeroButton>
                </div>
            </div>
        </Card>
    );
}
