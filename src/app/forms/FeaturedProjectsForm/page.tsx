"use client";

import React, { useState, useRef } from "react";
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
import { Separator } from "@/components/ui/separator";
import {
  Plus,
  Trash2,
  X,
  Upload,
  ExternalLink,
  Github,
  Image as ImageIcon,
} from "lucide-react";
import { usePortfolio, Project } from "@/contexts/PortfolioContext";

export default function Page() {
  return <FeaturedProjectsForm />;
}

const techOptions = [
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
  "React Native",
  "Flutter",
  "Swift",
  "Kotlin",
  "Unity",
  "Unreal Engine",
];

export function FeaturedProjectsForm() {
  const { state, dispatch } = usePortfolio();
  const { projects } = state;
  const [isAdding, setIsAdding] = useState(false);
  const [newProject, setNewProject] = useState<Omit<Project, "id">>({
    projectName: "",
    projectImages: [],
    description: "",
    technologiesUsed: [],
    githubLink: "",
    liveDemoLink: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddProject = () => {
    if (newProject.projectName && newProject.description) {
      const project: Project = {
        ...newProject,
        id: Date.now().toString(),
      };
      dispatch({ type: "ADD_PROJECT", payload: project });
      setNewProject({
        projectName: "",
        projectImages: [],
        description: "",
        technologiesUsed: [],
        githubLink: "",
        liveDemoLink: "",
      });
      setIsAdding(false);
    }
  };

  const handleUpdateProject = (id: string, field: string, value: any) => {
    dispatch({
      type: "UPDATE_PROJECT",
      payload: { id, data: { [field]: value } },
    });
  };

  const handleDeleteProject = (id: string) => {
    dispatch({ type: "DELETE_PROJECT", payload: id });
  };

  const addTechnology = (tech: string, isNew: boolean = false) => {
    const technologies = isNew ? newProject.technologiesUsed : [];
    if (!technologies.includes(tech)) {
      const updated = [...technologies, tech];
      if (isNew) {
        setNewProject({ ...newProject, technologiesUsed: updated });
      }
    }
  };

  const removeTechnology = (tech: string, projectId?: string) => {
    if (projectId) {
      const project = projects.find((p: Project) => p.id === projectId);
      if (project) {
        const updated = project.technologiesUsed.filter(
          (t: string) => t !== tech,
        );
        handleUpdateProject(projectId, "technologiesUsed", updated);
      }
    } else {
      const updated = newProject.technologiesUsed.filter(
        (t: string) => t !== tech,
      );
      setNewProject({ ...newProject, technologiesUsed: updated });
    }
  };

  const handleImageUpload = (files: FileList | null, projectId?: string) => {
    if (files && files.length > 0) {
      const newImages = Array.from(files);
      if (projectId) {
        const project = projects.find((p: Project) => p.id === projectId);
        if (project) {
          const updated = [...project.projectImages, ...newImages];
          handleUpdateProject(projectId, "projectImages", updated);
        }
      } else {
        setNewProject({
          ...newProject,
          projectImages: [...newProject.projectImages, ...newImages],
        });
      }
    }
  };

  const removeImage = (index: number, projectId?: string) => {
    if (projectId) {
      const project = projects.find((p: Project) => p.id === projectId);
      if (project) {
        const updated = project.projectImages.filter(
          (_: File, i: number) => i !== index,
        );
        handleUpdateProject(projectId, "projectImages", updated);
      }
    } else {
      const updated = newProject.projectImages.filter(
        (_: File, i: number) => i !== index,
      );
      setNewProject({ ...newProject, projectImages: updated });
    }
  };

  const getImageUrl = (file: File) => URL.createObjectURL(file);

  return (
    <div className="space-y-6">
      <Card className="form-card">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Featured Projects
          </CardTitle>
          <CardDescription>
            Showcase your best projects with images, descriptions, and
            technologies used
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Add New Project Button */}
          {!isAdding && (
            <Button
              onClick={() => setIsAdding(true)}
              className="btn-gradient w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Featured Project
            </Button>
          )}

          {/* Add New Project Form */}
          {isAdding && (
            <Card className="border-dashed border-2 border-primary/30">
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="new-project-name">Project Name *</Label>
                  <Input
                    id="new-project-name"
                    value={newProject.projectName}
                    onChange={(e) =>
                      setNewProject({
                        ...newProject,
                        projectName: e.target.value,
                      })
                    }
                    placeholder="Awesome Project"
                    className="transition-all duration-300 focus:shadow-lg"
                  />
                </div>

                {/* Project Images */}
                <div className="space-y-3">
                  <Label>Project Images</Label>
                  <div className="flex items-center space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center space-x-2"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Upload Images</span>
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => handleImageUpload(e.target.files)}
                      className="hidden"
                    />
                  </div>

                  {newProject.projectImages.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {newProject.projectImages.map(
                        (image: File, index: number) => (
                          <div key={index} className="relative group">
                            <img
                              src={getImageUrl(image)}
                              alt={`Project image ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg border-2 border-border"
                            />
                            <Button
                              variant="destructive"
                              size="sm"
                              className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => removeImage(index)}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        ),
                      )}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-project-description">Description *</Label>
                  <Textarea
                    id="new-project-description"
                    value={newProject.description}
                    onChange={(e) =>
                      setNewProject({
                        ...newProject,
                        description: e.target.value,
                      })
                    }
                    placeholder="Describe your project, its purpose, key features, and what makes it special..."
                    className="min-h-[100px] resize-none transition-all duration-300 focus:shadow-lg"
                  />
                </div>

                {/* Technologies Used */}
                <div className="space-y-3">
                  <Label>Technologies Used</Label>
                  <Select
                    onValueChange={(value: string) =>
                      addTechnology(value, true)
                    }
                  >
                    <SelectTrigger className="transition-all duration-300 focus:shadow-lg">
                      <SelectValue placeholder="Select technologies used..." />
                    </SelectTrigger>
                    <SelectContent>
                      {techOptions
                        .filter(
                          (tech) => !newProject.technologiesUsed.includes(tech),
                        )
                        .map((tech) => (
                          <SelectItem key={tech} value={tech}>
                            {tech}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>

                  {newProject.technologiesUsed.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {newProject.technologiesUsed.map((tech: string) => (
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
                            onClick={() => removeTechnology(tech)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-github-link">GitHub Link</Label>
                    <Input
                      id="new-github-link"
                      value={newProject.githubLink}
                      onChange={(e) =>
                        setNewProject({
                          ...newProject,
                          githubLink: e.target.value,
                        })
                      }
                      placeholder="https://github.com/username/project"
                      className="transition-all duration-300 focus:shadow-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-live-demo-link">Live Demo Link</Label>
                    <Input
                      id="new-live-demo-link"
                      value={newProject.liveDemoLink}
                      onChange={(e) =>
                        setNewProject({
                          ...newProject,
                          liveDemoLink: e.target.value,
                        })
                      }
                      placeholder="https://your-project.com"
                      className="transition-all duration-300 focus:shadow-lg"
                    />
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button onClick={handleAddProject} className="btn-gradient">
                    Add Project
                  </Button>
                  <Button variant="outline" onClick={() => setIsAdding(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Existing Projects */}
          {projects.length > 0 && (
            <div className="space-y-4 mt-6">
              <Separator />
              <h3 className="text-lg font-semibold">Your Featured Projects</h3>

              {projects.map((project: Project) => (
                <Card key={project.id} className="border-l-4 border-l-primary">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <Input
                          value={project.projectName}
                          onChange={(e) =>
                            handleUpdateProject(
                              project.id,
                              "projectName",
                              e.target.value,
                            )
                          }
                          className="font-semibold text-xl border-none p-0 h-auto bg-transparent focus-visible:ring-0 mb-4"
                          placeholder="Project Name"
                        />

                        {/* Project Images */}
                        {project.projectImages.length > 0 && (
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                            {project.projectImages.map(
                              (image: File, index: number) => (
                                <div key={index} className="relative group">
                                  <img
                                    src={getImageUrl(image)}
                                    alt={`${project.projectName} image ${index + 1}`}
                                    className="w-full h-20 object-cover rounded border"
                                  />
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    className="absolute top-1 right-1 h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={() =>
                                      removeImage(index, project.id)
                                    }
                                  >
                                    <X className="w-2 h-2" />
                                  </Button>
                                </div>
                              ),
                            )}
                          </div>
                        )}

                        {/* Technologies */}
                        {project.technologiesUsed.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-4">
                            {project.technologiesUsed.map((tech: string) => (
                              <Badge
                                key={tech}
                                variant="outline"
                                className="text-xs"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        )}

                        {/* Links */}
                        <div className="flex space-x-4 mb-4">
                          {project.githubLink && (
                            <a
                              href={project.githubLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                              <Github className="w-4 h-4" />
                              <span>GitHub</span>
                            </a>
                          )}
                          {project.liveDemoLink && (
                            <a
                              href={project.liveDemoLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                              <span>Live Demo</span>
                            </a>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteProject(project.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <Textarea
                      value={project.description}
                      onChange={(e) =>
                        handleUpdateProject(
                          project.id,
                          "description",
                          e.target.value,
                        )
                      }
                      placeholder="Describe your project, its purpose, and key features..."
                      className="min-h-[80px] resize-none transition-all duration-300 focus:shadow-lg"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
