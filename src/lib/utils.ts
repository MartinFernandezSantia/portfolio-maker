"use client";

import { PortfolioState } from "@/contexts/PortfolioContext";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Client-side validation schema
const portfolioDataSchema = z.object({
  aboutMe: z.object({
    fullName: z.string().min(1, "Full name is required"),
    jobTitle: z.string().min(1, "Job title is required"),
    githubLink: z.string().optional(),
    linkedinLink: z.string().optional(),
    email: z.string().email("Valid email is required"),
    aboutMe: z.string().min(1, "About me description is required"),
    techStack: z.array(z.string()).min(1, "At least one tech skill is required"),
    features: z.array(
      z.object({
        title: z.string().min(1, "Feature title is required"),
        description: z.string().min(1, "Feature description is required"),
      })
    ),
  }),
  workExperience: z.array(
    z.object({
      id: z.string(),
      specialty: z.string().min(1),
      company: z.string().min(1),
      location: z.string().min(1),
      description: z.string(),
      startDate: z.string().min(1),
      endDate: z.string().min(1),
    })
  ),
  education: z.array(
    z.object({
      id: z.string(),
      title: z.string().min(1),
      academy: z.string().min(1),
      startDate: z.string().min(1),
      endDate: z.string().min(1),
      certificateType: z.enum(['diploma', 'course', 'bootcamp', 'other']),
      description: z.string(),
    })
  ),
  projects: z.array(
    z.object({
      id: z.string(),
      projectName: z.string().min(1),
      description: z.string().min(1),
      technologiesUsed: z.array(z.string()).min(1),
      githubLink: z.string().optional(),
      liveDemoLink: z.string().optional(),
      imageCount: z.number(),
    })
  ),
  currentSection: z.enum(['about', 'work', 'education', 'projects']),
});

export const scrollToSection = (href: string) => {
  if (href === "#") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  }
};

export const downloadPortfolio = async (data: PortfolioState) => {
  try {
    const formData = new FormData();

    // Send structured data as a single JSON string
    const portfolioData = {
      aboutMe: {
        fullName: data.aboutMe.fullName,
        jobTitle: data.aboutMe.jobTitle,
        githubLink: data.aboutMe.githubLink || '',
        linkedinLink: data.aboutMe.linkedinLink || '',
        email: data.aboutMe.email,
        aboutMe: data.aboutMe.aboutMe,
        techStack: data.aboutMe.techStack,
        features: data.aboutMe.features,
      },
      workExperience: data.workExperience,
      education: data.education,
      projects: data.projects.map(p => ({
        id: p.id,
        projectName: p.projectName,
        description: p.description,
        technologiesUsed: p.technologiesUsed,
        githubLink: p.githubLink || '',
        liveDemoLink: p.liveDemoLink || '',
        imageCount: p.projectImages.length,
      })),
      currentSection: data.currentSection,
    };

    // Validate data before sending
    const validationResult = portfolioDataSchema.safeParse(portfolioData);
    if (!validationResult.success) {
      console.error('Client validation failed:', validationResult.error.issues);
      throw new Error('Please fill in all required fields before downloading');
    }

    // Add the JSON data
    formData.append('portfolioData', JSON.stringify(portfolioData));

    // Add profile photo if exists
    if (data.aboutMe.profilePhoto) {
      formData.append('profilePhoto', data.aboutMe.profilePhoto);
    }

    // Add project images with clear naming
    data.projects.forEach((project) => {
      project.projectImages.forEach((image, index) => {
        formData.append(`projectImage_${project.id}_${index}`, image);
      });
    });

    const response = await fetch('/api/download-portfolio', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error generating portfolio:', errorData);
      throw new Error(errorData.error || 'Failed to generate portfolio');
    }

    const blob = await response.blob();

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading portfolio:', error);
    throw error;
  }
}