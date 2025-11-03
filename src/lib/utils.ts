"use client";

import { PortfolioState } from "@/contexts/PortfolioContext";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { PortfolioState } from "@/contexts/PortfolioContext";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

    // Add hero data
    formData.append('hero.firstName', data.hero.firstName);
    formData.append('hero.lastName', data.hero.lastName);
    formData.append('hero.headline', data.hero.headline);

    // Add about me data
    formData.append('aboutMe.fullName', data.aboutMe.fullName);
    formData.append('aboutMe.jobTitle', data.aboutMe.jobTitle);
    formData.append('aboutMe.githubLink', data.aboutMe.githubLink);
    formData.append('aboutMe.linkedinLink', data.aboutMe.linkedinLink);
    formData.append('aboutMe.email', data.aboutMe.email);
    formData.append('aboutMe.aboutMe', data.aboutMe.aboutMe);
    formData.append('aboutMe.techStack', JSON.stringify(data.aboutMe.techStack));
    formData.append('aboutMe.features', JSON.stringify(data.aboutMe.features));

    // Add profile photo
    if (data.aboutMe.profilePhoto) {
      formData.append('aboutMe.profilePhoto', data.aboutMe.profilePhoto);
    }

    // Add work experience
    formData.append('workExperience', JSON.stringify(data.workExperience));

    // Add education
    formData.append('education', JSON.stringify(data.education));

    // Add projects (without images first)
    const projectsWithoutImages = data.projects.map(project => ({
      id: project.id,
      projectName: project.projectName,
      description: project.description,
      technologiesUsed: project.technologiesUsed,
      githubLink: project.githubLink,
      liveDemoLink: project.liveDemoLink,
    }));
    formData.append('projects', JSON.stringify(projectsWithoutImages));

    // Add project images
    data.projects.forEach((project) => {
      project.projectImages.forEach((image, index) => {
        formData.append(`project.${project.id}.image.${index}`, image);
      });
    });

    // Call API route to generate zip
    const response = await fetch('/api/download-portfolio', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate portfolio');
    }

    // Get the zip file as blob
    const blob = await response.blob();

    // Trigger download
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