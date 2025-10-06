"use client";

import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, X, Plus } from "lucide-react";
import { usePortfolio } from "@/contexts/PortfolioContext";

export default function Page() {
  return <AboutMeForm />;
}

const techStackOptions = [
  "React",
  "Next.js",
  "Vue.js",
  "Angular",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Express",
  "Python",
  "Django",
  "Flask",
  "Java",
  "Spring",
  "C#",
  ".NET",
  "PHP",
  "Laravel",
  "Ruby",
  "Rails",
  "Go",
  "Rust",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "Redis",
  "Docker",
  "Kubernetes",
  "AWS",
  "Azure",
  "GCP",
  "Git",
  "GraphQL",
  "REST API",
  "TailwindCSS",
  "Material-UI",
  "Bootstrap",
  "Sass",
  "Webpack",
  "Vite",
  "Jest",
  "Cypress",
];

export function AboutMeForm() {
  const { state, dispatch } = usePortfolio();
  const { aboutMe } = state;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: string, value: string) => {
    dispatch({
      type: "UPDATE_ABOUT_ME",
      payload: { [field]: value },
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      dispatch({
        type: "UPDATE_ABOUT_ME",
        payload: { profilePhoto: file },
      });
    }
  };

  const addTechStack = (tech: string) => {
    if (!aboutMe.techStack.includes(tech)) {
      dispatch({
        type: "UPDATE_ABOUT_ME",
        payload: { techStack: [...aboutMe.techStack, tech] },
      });
    }
  };

  const removeTechStack = (tech: string) => {
    dispatch({
      type: "UPDATE_ABOUT_ME",
      payload: {
        techStack: aboutMe.techStack.filter((t: string) => t !== tech),
      },
    });
  };

  const getProfilePhotoUrl = () => {
    if (aboutMe?.profilePhoto) {
      return URL.createObjectURL(aboutMe.profilePhoto);
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <Card className="form-card">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            About Me
          </CardTitle>
          <CardDescription>
            Let's start with your basic information and professional profile
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Photo */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative group">
              <Avatar className="w-32 h-32 border-4 border-primary/20">
                <AvatarImage src={getProfilePhotoUrl() || undefined} />
                <AvatarFallback className="text-2xl bg-gradient-to-br from-primary to-secondary text-white">
                  {aboutMe.fullName ? (
                    aboutMe.fullName.charAt(0).toUpperCase()
                  ) : (
                    <Camera />
                  )}
                </AvatarFallback>
              </Avatar>
              <Button
                variant="outline"
                size="sm"
                className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0 bg-background border-2"
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <p className="text-sm text-muted-foreground text-center">
              Click the camera icon to upload your profile photo
            </p>
          </div>

          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                value={aboutMe.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                placeholder="John Doe"
                className="transition-all duration-300 focus:shadow-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={aboutMe.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="john@example.com"
                className="transition-all duration-300 focus:shadow-lg"
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="githubLink">GitHub Link</Label>
              <Input
                id="githubLink"
                value={aboutMe.githubLink}
                onChange={(e) =>
                  handleInputChange("githubLink", e.target.value)
                }
                placeholder="https://github.com/johndoe"
                className="transition-all duration-300 focus:shadow-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedinLink">LinkedIn Link</Label>
              <Input
                id="linkedinLink"
                value={aboutMe.linkedinLink}
                onChange={(e) =>
                  handleInputChange("linkedinLink", e.target.value)
                }
                placeholder="https://linkedin.com/in/johndoe"
                className="transition-all duration-300 focus:shadow-lg"
              />
            </div>
          </div>

          {/* About Me */}
          <div className="space-y-2">
            <Label htmlFor="aboutMe">About Me *</Label>
            <Textarea
              id="aboutMe"
              value={aboutMe.aboutMe}
              onChange={(e) => handleInputChange("aboutMe", e.target.value)}
              placeholder="Tell us about yourself, your passion, and your soft skills..."
              className="min-h-[120px] resize-none transition-all duration-300 focus:shadow-lg"
            />
          </div>

          {/* Features */}
          <div className="space-y-4">
            <Label>Features</Label>

            {aboutMe.features?.map((feature, index) => (
              <div key={index} className="mb-4 border p-3 rounded space-y-2">
                <Input
                  placeholder="Feature title"
                  value={feature.title}
                  onChange={(e) => {
                    const newFeatures = [...aboutMe.features];
                    newFeatures[index].title = e.target.value;
                    dispatch({
                      type: "UPDATE_ABOUT_ME",
                      payload: { features: newFeatures },
                    });
                  }}
                />
                <Textarea
                  placeholder="Feature description"
                  value={feature.description}
                  onChange={(e) => {
                    const newFeatures = [...aboutMe.features];
                    newFeatures[index].description = e.target.value;
                    dispatch({
                      type: "UPDATE_ABOUT_ME",
                      payload: { features: newFeatures },
                    });
                  }}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500"
                  onClick={() => {
                    const newFeatures = aboutMe.features.filter(
                      (_, i) => i !== index,
                    );
                    dispatch({
                      type: "UPDATE_ABOUT_ME",
                      payload: { features: newFeatures },
                    });
                  }}
                >
                  Eliminar
                </Button>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              className="flex items-center gap-2"
              onClick={() =>
                dispatch({
                  type: "UPDATE_ABOUT_ME",
                  payload: {
                    features: [
                      ...(aboutMe.features || []),
                      { title: "", description: "" },
                    ],
                  },
                })
              }
            >
              <Plus className="w-4 h-4" /> Agregar Feature
            </Button>
          </div>

          {/* Tech Stack */}
          <div className="space-y-4">
            <Label>Tech Stack</Label>
            <Select onValueChange={addTechStack}>
              <SelectTrigger className="transition-all duration-300 focus:shadow-lg">
                <SelectValue placeholder="Select technologies to add..." />
              </SelectTrigger>
              <SelectContent>
                {techStackOptions
                  .filter((tech) => !aboutMe.techStack.includes(tech))
                  .map((tech) => (
                    <SelectItem key={tech} value={tech}>
                      {tech}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            {/* Selected Tech Stack */}
            {aboutMe.techStack.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {aboutMe.techStack.map((tech: string) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="bg-gradient-to-r from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20 transition-all duration-300"
                  >
                    {tech}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-2 h-auto p-0 text-muted-foreground hover:text-destructive"
                      onClick={() => removeTechStack(tech)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
