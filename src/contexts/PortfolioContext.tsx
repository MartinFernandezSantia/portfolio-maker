"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";

// Types for portfolio data
export interface Hero {
  firstName: string;
  lastName: string;
  headline: string;
}

export interface Feature {
  title: string;
  description: string;
}

export interface AboutMe {
  profilePhoto?: File | null;
  fullName: string;
  jobTitle: string;
  githubLink: string;
  linkedinLink: string;
  email: string;
  aboutMe: string;
  techStack: string[];
  features: Feature[];
}

export interface WorkExperience {
  id: string;
  specialty: string;
  company: string;
  location: string;
  description: string;
  startDate: string;
  endDate: string;
}

export interface Education {
  id: string;
  title: string;
  academy: string;
  startDate: string;
  endDate: string;
  certificateType: "diploma" | "course" | "bootcamp" | "other";
  description: string;
}

export interface Project {
  id: string;
  projectName: string;
  projectImages: File[];
  description: string;
  technologiesUsed: string[];
  githubLink?: string;
  liveDemoLink?: string;
}

export interface PortfolioState {
  hero: Hero;
  aboutMe: AboutMe;
  workExperience: WorkExperience[];
  education: Education[];
  projects: Project[];
  currentSection: "about" | "work" | "education" | "projects";
}

// Initial state
const initialState: PortfolioState = {
  hero: {
    firstName: "",
    lastName: "",
    headline: "",
  },
  aboutMe: {
    profilePhoto: null,
    fullName: "",
    jobTitle: "",
    githubLink: "",
    linkedinLink: "",
    email: "",
    aboutMe: "",
    features: [],
    techStack: [],
  },
  workExperience: [],
  education: [],
  projects: [],
  currentSection: "about",
};

// Action types
type PortfolioAction =
  | { type: "UPDATE_HERO"; payload: Partial<Hero> }
  | { type: "UPDATE_ABOUT_ME"; payload: Partial<AboutMe> }
  | { type: "ADD_WORK_EXPERIENCE"; payload: WorkExperience }
  | {
    type: "UPDATE_WORK_EXPERIENCE";
    payload: { id: string; data: Partial<WorkExperience> };
  }
  | { type: "DELETE_WORK_EXPERIENCE"; payload: string }
  | { type: "ADD_EDUCATION"; payload: Education }
  | {
    type: "UPDATE_EDUCATION";
    payload: { id: string; data: Partial<Education> };
  }
  | { type: "DELETE_EDUCATION"; payload: string }
  | { type: "ADD_PROJECT"; payload: Project }
  | { type: "UPDATE_PROJECT"; payload: { id: string; data: Partial<Project> } }
  | { type: "DELETE_PROJECT"; payload: string }
  | { type: "SET_CURRENT_SECTION"; payload: PortfolioState["currentSection"] };

// Reducer
function portfolioReducer(
  state: PortfolioState,
  action: PortfolioAction,
): PortfolioState {
  switch (action.type) {
    case "UPDATE_HERO":
      return {
        ...state,
        hero: { ...state.hero, ...action.payload },
      };
    case "UPDATE_ABOUT_ME":
      return {
        ...state,
        aboutMe: { ...state.aboutMe, ...action.payload },
      };
    case "ADD_WORK_EXPERIENCE":
      return {
        ...state,
        workExperience: [...state.workExperience, action.payload],
      };
    case "UPDATE_WORK_EXPERIENCE":
      return {
        ...state,
        workExperience: state.workExperience.map((item) =>
          item.id === action.payload.id
            ? { ...item, ...action.payload.data }
            : item,
        ),
      };
    case "DELETE_WORK_EXPERIENCE":
      return {
        ...state,
        workExperience: state.workExperience.filter(
          (item) => item.id !== action.payload,
        ),
      };
    case "ADD_EDUCATION":
      return {
        ...state,
        education: [...state.education, action.payload],
      };
    case "UPDATE_EDUCATION":
      return {
        ...state,
        education: state.education.map((item) =>
          item.id === action.payload.id
            ? { ...item, ...action.payload.data }
            : item,
        ),
      };
    case "DELETE_EDUCATION":
      return {
        ...state,
        education: state.education.filter((item) => item.id !== action.payload),
      };
    case "ADD_PROJECT":
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    case "UPDATE_PROJECT":
      return {
        ...state,
        projects: state.projects.map((item) =>
          item.id === action.payload.id
            ? { ...item, ...action.payload.data }
            : item,
        ),
      };
    case "DELETE_PROJECT":
      return {
        ...state,
        projects: state.projects.filter((item) => item.id !== action.payload),
      };
    case "SET_CURRENT_SECTION":
      return {
        ...state,
        currentSection: action.payload,
      };
    default:
      return state;
  }
}

// Context
interface PortfolioContextType {
  state: PortfolioState;
  dispatch: React.Dispatch<PortfolioAction>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(
  undefined,
);

// Provider
interface PortfolioProviderProps {
  children: ReactNode;
}

export function PortfolioProvider({ children }: PortfolioProviderProps) {
  const [state, dispatch] = useReducer(portfolioReducer, initialState);

  return (
    <PortfolioContext.Provider value={{ state, dispatch }}>
      {children}
    </PortfolioContext.Provider>
  );
}

// Hook
export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
