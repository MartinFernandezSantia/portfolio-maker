"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, Building2, Calendar, MapPin, Edit } from "lucide-react";
import { usePortfolio, WorkExperience } from "@/contexts/PortfolioContext";

export default function WorkExperienceForm() {
  const { state, dispatch } = usePortfolio();
  const { workExperience } = state;
  const [isAdding, setIsAdding] = useState(false);
  const [newExperience, setNewExperience] = useState<
    Omit<WorkExperience, "id">
  >({
    specialty: "",
    company: "",
    location: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const handleAddExperience = () => {
    if (newExperience.specialty && newExperience.company && newExperience.startDate) {
      const experience: WorkExperience = {
        ...newExperience,
        id: Date.now().toString(),
      };
      dispatch({ type: "ADD_WORK_EXPERIENCE", payload: experience });
      setNewExperience({
        specialty: "",
        company: "",
        location: "",
        description: "",
        startDate: "",
        endDate: "",
      });
      setIsAdding(false);
    }
  };

  const [formData, setFormData] = useState<Omit<WorkExperience, "id">>({
    specialty: "",
    company: "",
    location: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const handleDeleteExperience = (id: string) => {
    dispatch({ type: "DELETE_WORK_EXPERIENCE", payload: id });
  };


  const handleEdit = (id: string) => {
    const experience = workExperience.find((exp) => exp.id === id)
    if (experience) {
      setNewExperience({
        specialty: experience.specialty,
        company: experience.company,
        location: experience.location || "",
        startDate: experience.startDate,
        endDate: experience.endDate || "",
        description: experience.description || "",
      })
      handleDeleteExperience(id)
    }
  };

  {


    const formatDate = (dateString: string) => {
      if (!dateString) return "";
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      });
    };

    return (
      <div className="space-y-6">
        <Card className="form-card">
          <CardHeader>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Experiencia Laboral
            </CardTitle>
            <CardDescription>
              Agrega tu experiencia laboral profesional y logros
            </CardDescription>
          </CardHeader>
          <CardContent>

            {/* Add New Experience Form */}
            <Card className="border-dashed border-2 border-primary/30">
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-specialty">Puesto/Especialidad *</Label>
                    <Input
                      id="new-specialty"
                      value={newExperience.specialty}
                      onChange={(e) =>
                        setNewExperience({
                          ...newExperience,
                          specialty: e.target.value,
                        })
                      }
                      placeholder="Desarrollador Frontend"
                      className="transition-all duration-300 focus:shadow-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-company">Empresa *</Label>
                    <Input
                      id="new-company"
                      value={newExperience.company}
                      onChange={(e) =>
                        setNewExperience({
                          ...newExperience,
                          company: e.target.value,
                        })
                      }
                      placeholder="Empresa Tecnológica S.A."
                      className="transition-all duration-300 focus:shadow-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-location">Ubicación</Label>
                    <Input
                      id="new-location"
                      value={newExperience.location}
                      onChange={(e) =>
                        setNewExperience({
                          ...newExperience,
                          location: e.target.value,
                        })
                      }
                      placeholder="Madrid, España"
                      className="transition-all duration-300 focus:shadow-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-start-date">Fecha de Inicio *</Label>
                    <Input
                      id="new-start-date"
                      type="month"
                      value={newExperience.startDate}
                      onChange={(e) =>
                        setNewExperience({
                          ...newExperience,
                          startDate: e.target.value,
                        })
                      }
                      className="transition-all duration-300 focus:shadow-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-end-date">Fecha de Fin</Label>
                    <Input
                      id="new-end-date"
                      type="month"
                      value={newExperience.endDate}
                      onChange={(e) =>
                        setNewExperience({
                          ...newExperience,
                          endDate: e.target.value,
                        })
                      }
                      min={newExperience.startDate}
                      placeholder="Dejar vacío si es actual"
                      className="transition-all duration-300 focus:shadow-lg"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-description">Descripción</Label>
                  <Textarea
                    id="new-description"
                    value={newExperience.description}
                    onChange={(e) =>
                      setNewExperience({
                        ...newExperience,
                        description: e.target.value,
                      })
                    }
                    placeholder="Describe tus responsabilidades, logros y contribuciones clave..."
                    className="min-h-[100px] resize-none transition-all duration-300 focus:shadow-lg"
                  />
                </div>

                <div className="flex space-x-3">
                  <Button
                    onClick={handleAddExperience}
                    className="btn-gradient"
                  >
                    Agregar Experiencia
                  </Button>
                  <Button variant="outline" onClick={() => setIsAdding(false)}>
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>


            {/* Existing Work Experiences */}
            {workExperience.length > 0 && (
              <div className="space-y-4 mt-6">
                <Separator />
                <h3 className="text-lg font-semibold">Tu Experiencia Laboral</h3>

                {workExperience.map((exp: WorkExperience, index: number) => (
                  <Card
                    key={index}
                    className="group relative overflow-hidden border-l-4 border-l-primary bg-card p-6 transition-all hover:shadow-md"
                  >
                    <div className="space-y-3 overflow-hidden">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0 overflow-hidden">
                          <h3 className="text-xl font-semibold text-foreground break-words">{exp.specialty}</h3>
                        </div>
                        <div className="flex-shrink-0 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(exp.id)} className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteExperience(exp.id)}
                            className="h-8 w-8 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <p className="text-base font-medium text-muted-foreground flex items-center gap-2 overflow-hidden text-ellipsis">
                        <Building2 className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{exp.company}</span>
                      </p>

                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4 flex-shrink-0" />
                        </span>
                        {exp.location && (
                          <span className="flex items-center gap-1.5 overflow-hidden">
                            <MapPin className="h-4 w-4 flex-shrink-0" />
                            <span className="truncate">{exp.location}</span>
                          </span>
                        )}
                      </div>

                      {exp.description && (
                        <div className="rounded-md bg-muted/50 !p-3">
                          <p className="text-sm leading-relaxed text-muted-foreground break-words">
                            {exp.description}
                          </p>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }
}
