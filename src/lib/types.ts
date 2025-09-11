export type NavItem = {
    name: string;
    href: string;
}

export type EducationItem = {
    degree: string;
    school: string;
    period: string;
    grade: string;
    description: string;
}

export type ExperienceItem = {
    title: string;
    company: string;
    location: string;
    period: string;
    description: string;
}

export type ProjectItem = {
    title: string;
    description: string;
    image: string;
    technologies: string[];
    github: string;
    live: string;
}