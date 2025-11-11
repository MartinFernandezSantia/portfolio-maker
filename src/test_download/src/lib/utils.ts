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