"use client";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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

export const downloadPortfolio = async () => {
  const vars = {
    fullname: "John Doe",
    email: "john.doe@example.com",
    apiKey: "your_api_key"
  };

  try {
    // Call API route to generate zip
    const response = await fetch('/api/download-portfolio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vars),
    });

    if (!response.ok) {
      throw new Error('Failed to generate portfolio');
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