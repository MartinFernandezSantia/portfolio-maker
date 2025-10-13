import { create } from "zustand";

// Tipos para mayor claridad
type Hero = {
  name: string;
  title: string;
  tagline: string;
  profilePhoto?: File | null;
};

type About = {
  description: string;
  techStack: string[];
  profilePhoto?: File | null;
};

type Experience = {
  company: string;
  role: string;
  period: string;
  description: string;
}[];

type Education = {
  school: string;
  degree: string;
  period: string;
}[];

type Project = {
  name: string;
  description: string;
  liveDemo?: string;
  github?: string;
}[];

type Contact = {
  email: string;
  phone?: string;
  linkedin?: string;
  github?: string;
};

// Estado global
type PortfolioState = {
  hero: Hero;
  about: About;
  experience: Experience;
  education: Education;
  projects: Project[];
  contact: Contact;

  // Setters
  setHero: (data: Partial<Hero>) => void;
  setAbout: (data: Partial<About>) => void;
  setExperience: (data: Experience) => void;
  setEducation: (data: Education) => void;
  setProjects: (data: Project[]) => void;
  setContact: (data: Partial<Contact>) => void;
};

// Store
export const usePortfolioStore = create<PortfolioState>((set) => ({
  hero: { name: "", title: "", tagline: "", profilePhoto: null },
  about: { description: "", techStack: [], profilePhoto: null },
  experience: [],
  education: [],
  projects: [],
  contact: { email: "" },

  setHero: (data) => set((state) => ({ hero: { ...state.hero, ...data } })),

  setAbout: (data) => set((state) => ({ about: { ...state.about, ...data } })),

  setExperience: (data) => set({ experience: data }),
  setEducation: (data) => set({ education: data }),
  setProjects: (data) => set({ projects: data }),

  setContact: (data) =>
    set((state) => ({ contact: { ...state.contact, ...data } })),
}));
