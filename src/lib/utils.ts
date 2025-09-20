"use client";

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import html2pdf from "html2pdf.js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const scrollToSection = (href: string) => {
  if (href === "#") {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  }
}

export async function generatePortfolioPDF() {
  if (typeof window === "undefined") return; // evita SSR

  const html2pdf = (await import("html2pdf.js")).default;

  const element = document.getElementById("portfolio-content");
  if (!element) return;

  const opt = {
    margin: 0.5,
    filename: "my-portfolio.pdf",
    image: { type: "jpeg" as "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" as "portrait" },
  };

  html2pdf().set(opt).from(element).save();
}