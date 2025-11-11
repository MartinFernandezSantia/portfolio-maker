"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { downloadPortfolio } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  User,
  Briefcase,
  GraduationCap,
  FolderOpen,
  Eye,
  Download,
  Menu,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { usePortfolio } from "@/contexts/PortfolioContext";
import AboutMeForm from "../AboutMeForm/page";
import WorkExperienceForm from "../WorkExperienceForm/page";
import EducationCertificationsForm from "../EducationCertificacionsForm/page";
import FeaturedProjectsForm from "../FeaturedProjectsForm/page";
import heroImage from "@/assets/hero-portfolio.jpg";
import ThemeToggle from "@/components/theme-toggle";
import { useRouter } from "next/navigation";
import router from "next/router";

export default function Page() {
  return <PortfolioDashboard />;
}

function PreviewButton({ className = "" }: { className?: string }) {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      size="sm"
      className={`justify-start ${className}`}
      onClick={() => router.push("/preview")}
    >
      <Eye className="w-4 h-4 mr-2" />
      Vista Previa
    </Button>
  );
}


const navigationItems = [
  {
    id: "about" as const,
    title: "Sobre Mí",
    icon: User,
    description: "Información personal y habilidades",
  },
  {
    id: "work" as const,
    title: "Experiencia Laboral",
    icon: Briefcase,
    description: "Experiencia profesional",
  },
  {
    id: "education" as const,
    title: "Educación y Certificaciones",
    icon: GraduationCap,
    description: "Formación académica",
  },
  {
    id: "projects" as const,
    title: "Proyectos Destacados",
    icon: FolderOpen,
    description: "Muestra tu trabajo",
  },
];

function PortfolioSidebar({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  const { state, dispatch } = usePortfolio();

  const handleSectionChange = (
    sectionId: (typeof navigationItems)[0]["id"],
  ) => {
    dispatch({ type: "SET_CURRENT_SECTION", payload: sectionId });
  };

  return (
    <div
      className={`${collapsed ? "w-16" : "w-80"} transition-all duration-300 bg-card border-r flex flex-col`}
    >
      <div className="p-4 space-y-6 flex-1">
        {/* Header */}
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-lg">Portfolio Maker</h2>
                <p className="text-sm text-muted-foreground">
                  Crea tu portafolio
                </p>
              </div>
            </div>
          )}
          <Button variant="ghost" size="sm" onClick={onToggle} className="p-2">
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </Button>
        </div>

        {!collapsed && <Separator />}

        {/* Navigation */}
        <div className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = state.currentSection === item.id;

            return (
              <div
                key={item.id}
                onClick={() => handleSectionChange(item.id)}
                className={`sidebar-nav-item cursor-pointer flex items-center p-2 rounded-md hover:bg-accent/20 transition-colors ${isActive ? "bg-accent/30" : ""}`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && (
                  <div className="ml-3">
                    <div className="font-medium">{item.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {item.description}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!collapsed && (
          <>
            <Separator />

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Action Buttons */}
            <div className="space-y-3">
              <div className="space-y-3">
                <PreviewButton />
                <Button
                  className="btn-gradient w-full justify-start"
                  size="sm"
                  onClick={async () => await downloadPortfolio(state)}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Generar Portafolio
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function MobileSidebar() {
  const { state, dispatch } = usePortfolio();

  const handleSectionChange = (
    sectionId: (typeof navigationItems)[0]["id"],
  ) => {
    dispatch({ type: "SET_CURRENT_SECTION", payload: sectionId });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="lg:hidden">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0">
        <div className="p-4 space-y-6">
          {/* Header */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg">Portfolio Maker</h2>
              <p className="text-sm text-muted-foreground">
                Crea tu portafolio
              </p>
            </div>
          </div>

          <Separator />

          {/* Navigation */}
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = state.currentSection === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => handleSectionChange(item.id)}
                  className={`sidebar-nav-item cursor-pointer ${isActive ? "active" : ""}`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <div className="ml-3">
                    <div className="font-medium">{item.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {item.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <Separator />
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Action Buttons */}
          <div className="space-y-3">
            <PreviewButton className="w-full justify-start" />
            <Button
              className="btn-gradient w-full justify-start"
              size="sm"

            >
              <Download className="w-4 h-4 mr-2" />
              Generate Portfolio
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function MainContent() {
  const { state } = usePortfolio();

  const renderCurrentSection = () => {
    switch (state.currentSection) {
      case "about":
        return <AboutMeForm />;
      case "work":
        return <WorkExperienceForm />;
      case "education":
        return <EducationCertificationsForm />;
      case "projects":
        return <FeaturedProjectsForm />;
      default:
        return <AboutMeForm />;
    }
  };

  const getCurrentSectionTitle = () => {
    const section = navigationItems.find(
      (item) => item.id === state.currentSection,
    );
    return section?.title || "Sobre Mí";
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <MobileSidebar />
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {getCurrentSectionTitle()}
              </h1>
              <p className="text-sm text-muted-foreground">
                Construye tu portafolio profesional paso a paso
              </p>
            </div>
          </div>

          {/*Action Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <PreviewButton className="w-auto justify-center" />
            <Button
              className="btn-gradient"
              size="sm"
              onClick={async () => await downloadPortfolio(state)}
            >
              <Download className="w-4 h-4 mr-2" />
              Generar Portafolio
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4 lg:p-8">
        <div className="max-w-4xl mx-auto">{renderCurrentSection()}</div>
      </main>

      {/* Mobile Action Bar */}
      <div className="lg:hidden sticky bottom-0 bg-background/80 backdrop-blur-sm border-t p-4">
        <div className="flex space-x-3">
          <Button variant="outline" className="flex-1" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            Vista Previa
          </Button>
          <Button className="btn-gradient flex-1" size="sm" onClick={async () => await downloadPortfolio(state)}>
            <Download className="w-4 h-4 mr-2" />
            Generar
          </Button>
        </div>
      </div>
    </div>
  );
}

export function PortfolioDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen w-full flex bg-gradient-to-br from-background to-muted/30">
      <div className="hidden lg:block">
        <PortfolioSidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>
      <MainContent />
    </div>
  );
}
