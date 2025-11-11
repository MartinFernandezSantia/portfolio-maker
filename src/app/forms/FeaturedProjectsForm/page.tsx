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
  Edit,
} from "lucide-react";
import { usePortfolio, Project } from "@/contexts/PortfolioContext";

export default function Page() {
  return <FeaturedProjectsForm />;
}

const techOptions = [
  ".NET",
  "Angular",
  "AWS",
  "Azure",
  "Bootstrap",
  "C#",
  "Cypress",
  "Django",
  "Docker",
  "Express",
  "Flask",
  "Flutter",
  "GCP",
  "Git",
  "Go",
  "GraphQL",
  "Java",
  "JavaScript",
  "Jest",
  "Kotlin",
  "Kubernetes",
  "Laravel",
  "Material-UI",
  "MongoDB",
  "MySQL",
  "Next.js",
  "Node.js",
  "PHP",
  "PostgreSQL",
  "Python",
  "Rails",
  "React",
  "React Native",
  "Redis",
  "REST API",
  "Ruby",
  "Rust",
  "Sass",
  "Spring",
  "Swift",
  "TailwindCSS",
  "TypeScript",
  "Unity",
  "Unreal Engine",
  "Vite",
  "Vue.js",
  "Webpack",
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

  // Edit: carga el proyecto al formulario y elimina el original (igual que WorkExperience)
  const handleEditProject = (id: string) => {
    const project = projects.find((p: Project) => p.id === id);
    if (project) {
      setNewProject({
        projectName: project.projectName,
        projectImages: project.projectImages || [],
        description: project.description || "",
        technologiesUsed: project.technologiesUsed || [],
        githubLink: project.githubLink || "",
        liveDemoLink: project.liveDemoLink || "",
      });
      setIsAdding(true);
      handleDeleteProject(id);
    }
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
      const newImage = files[0]; // Only take the first file
      if (projectId) {
        const project = projects.find((p: Project) => p.id === projectId);
        if (project) {
          handleUpdateProject(projectId, "projectImages", [newImage]);
        }
      } else {
        setNewProject({
          ...newProject,
          projectImages: [newImage],
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
            Proyectos Destacados
          </CardTitle>
          <CardDescription>
            Muestra tus mejores proyectos con imágenes, descripciones y
            tecnologías utilizadas
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
              Agregar Proyecto Destacado
            </Button>
          )}

          {/* Add New Project Form */}
          {isAdding && (
            <Card className="border-dashed border-2 border-primary/30">
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="new-project-name">Nombre del Proyecto *</Label>
                  <Input
                    id="new-project-name"
                    value={newProject.projectName}
                    onChange={(e) =>
                      setNewProject({
                        ...newProject,
                        projectName: e.target.value,
                      })
                    }
                    placeholder="Proyecto Increíble"
                    className="transition-all duration-300 focus:shadow-lg"
                  />
                </div>

                {/* Project Images */}
                <div className="space-y-3">
                  <Label>Imágenes del Proyecto</Label>
                  <div className="flex items-center space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center space-x-2"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Subir Imagen</span>
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e.target.files)}
                      className="hidden"
                    />
                  </div>

                  {newProject.projectImages.length > 0 && (
                    <div className="relative group inline-block">
                      <img
                        src={getImageUrl(newProject.projectImages[0])}
                        alt="Project image"
                        className="w-full max-w-md h-48 object-cover rounded-lg border-2 border-border"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImage(0)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-project-description">Descripción *</Label>
                  <Textarea
                    id="new-project-description"
                    value={newProject.description}
                    onChange={(e) =>
                      setNewProject({
                        ...newProject,
                        description: e.target.value,
                      })
                    }
                    placeholder="Describe tu proyecto, su propósito, características clave y qué lo hace especial..."
                    className="min-h-[100px] resize-none transition-all duration-300 focus:shadow-lg"
                  />
                </div>

                {/* Technologies Used */}
                <div className="space-y-3">
                  <Label>Tecnologías Utilizadas</Label>
                  <Select
                    onValueChange={(value: string) =>
                      addTechnology(value, true)
                    }
                  >
                    <SelectTrigger className="transition-all duration-300 focus:shadow-lg">
                      <SelectValue placeholder="Selecciona las tecnologías utilizadas..." />
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
                    <Label htmlFor="new-github-link">Enlace de GitHub</Label>
                    <Input
                      id="new-github-link"
                      value={newProject.githubLink}
                      onChange={(e) =>
                        setNewProject({
                          ...newProject,
                          githubLink: e.target.value,
                        })
                      }
                      placeholder="https://github.com/usuario/proyecto"
                      className="transition-all duration-300 focus:shadow-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-live-demo-link">Enlace de Demo en Vivo</Label>
                    <Input
                      id="new-live-demo-link"
                      value={newProject.liveDemoLink}
                      onChange={(e) =>
                        setNewProject({
                          ...newProject,
                          liveDemoLink: e.target.value,
                        })
                      }
                      placeholder="https://tu-proyecto.com"
                      className="transition-all duration-300 focus:shadow-lg"
                    />
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button onClick={handleAddProject} className="btn-gradient">
                    Agregar Proyecto
                  </Button>
                  <Button variant="outline" onClick={() => setIsAdding(false)}>
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Existing Projects */}
          {projects.length > 0 && (
            <div className="space-y-4 mt-6">
              <Separator />
              <h3 className="text-lg font-semibold">Tus Proyectos Destacados</h3>

              {projects.map((project: Project) => (
                <Card
                  key={project.id}
                  className="group relative overflow-hidden border-l-4 border-l-primary bg-card p-4 transition-all hover:shadow-md"
                >
                  <CardContent className="pt-2 pb-4">
                    <div className="flex justify-between items-start mb-4 gap-4">
                      <div className="flex-1 min-w-0">
                        {/* Título no editable (truncate para evitar overflow) */}
                        <h3 className="text-xl font-semibold text-foreground break-words truncate">
                          {project.projectName}
                        </h3>

                        {/* Project Images */}
                        {project.projectImages.length > 0 && (
                          <div className="relative group inline-block my-3">
                            <img
                              src={getImageUrl(project.projectImages[0])}
                              alt={`${project.projectName} image`}
                              className="w-full max-w-sm h-32 object-cover rounded border"
                            />
                            <Button
                              variant="destructive"
                              size="sm"
                              className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => removeImage(0, project.id)}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        )}

                        {/* Technologies */}
                        {project.technologiesUsed.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
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
                        <div className="flex space-x-4 mb-3">
                          {project.githubLink && (
                            <a
                              href={project.githubLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
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
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                              <span>Live Demo</span>
                            </a>
                          )}
                        </div>

                        {/* Description no editable */}
                        <div className="rounded-md bg-muted/50 p-3 -mx-3">
                          <p className="text-sm leading-relaxed text-muted-foreground break-words">
                            {project.description}
                          </p>
                        </div>
                      </div>

                      {/* Acciones: editar y eliminar - solo desde botones */}
                      <div className="flex-shrink-0 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100 ml-3">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditProject(project.id)}
                          className="h-8 w-8"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteProject(project.id)}
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                    </div>
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
