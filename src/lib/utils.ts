"use client";

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

export async function downloadPortfolio(state: PortfolioState) {
  const formData = new FormData();
  //formData.append("hero", JSON.stringify(state.hero));
  formData.append("aboutMe", JSON.stringify(state.aboutMe));
  formData.append("workExperience", JSON.stringify(state.workExperience));
  formData.append("education", JSON.stringify(state.education));
  formData.append("projects", JSON.stringify(state.projects));
  formData.append("currentSection", state.currentSection);

  if (state.aboutMe.profilePhoto) {
    formData.append("profilePhoto", state.aboutMe.profilePhoto);
  }
  state.projects.forEach((project, idx) => {
    project.projectImages.forEach((file, fileIdx) => {
      formData.append(`projectImage_${idx}_${fileIdx}`, file);
    });
  });

  const response = await fetch("/api/download-portfolio", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    // Lee el JSON de error y muestra los detalles
    const errorData = await response.json();
    if (errorData.details && Array.isArray(errorData.details)) {
      alert("Errores:\n" + errorData.details.join("\n"));
    } else {
      alert(errorData.error || "Error generating portfolio");
    }
    return;
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "portfolio.zip";
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}