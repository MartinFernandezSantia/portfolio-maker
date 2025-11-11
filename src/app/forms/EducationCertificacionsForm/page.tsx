"use client";

import React, { useState } from "react";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, GraduationCap, Calendar, School } from "lucide-react";
import { usePortfolio, Education } from "@/contexts/PortfolioContext";
import { Edit } from "lucide-react";

export default function Page() {
  return <EducationCertificationsForm />;
}

const certificateTypes = {
  diploma: "Diploma",
  course: "Curso",
  bootcamp: "Bootcamp",
  other: "Otro",
} as const;

export function EducationCertificationsForm() {
  const { state, dispatch } = usePortfolio();
  const { education } = state;
  const [isAdding, setIsAdding] = useState(false);
  const [newEducation, setNewEducation] = useState<Omit<Education, "id">>({
    title: "",
    academy: "",
    startDate: "",
    endDate: "",
    certificateType: "diploma",
    description: "",
  });

  const handleAddEducation = () => {
    if (newEducation.title && newEducation.academy) {
      const educationItem: Education = {
        ...newEducation,
        id: Date.now().toString(),
      };
      dispatch({ type: "ADD_EDUCATION", payload: educationItem });
      setNewEducation({
        title: "",
        academy: "",
        startDate: "",
        endDate: "",
        certificateType: "diploma",
        description: "",
      });
      setIsAdding(false);
    }
  };

  const handleUpdateEducation = (id: string, field: string, value: string) => {
    dispatch({
      type: "UPDATE_EDUCATION",
      payload: { id, data: { [field]: value } },
    });
  };

  const handleDeleteEducation = (id: string) => {
    dispatch({ type: "DELETE_EDUCATION", payload: id });
  };

  const handleEditEducation = (id: string) => {
    const edu = education.find((e) => e.id === id);
    if (edu) {
      setNewEducation({
        title: edu.title,
        academy: edu.academy,
        startDate: edu.startDate || "",
        endDate: edu.endDate || "",
        certificateType: edu.certificateType || "diploma",
        description: edu.description || "",
      });
      setIsAdding(true);
      handleDeleteEducation(id);
    }
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case "diploma":
        return "default";
      case "course":
        return "secondary";
      case "bootcamp":
        return "outline";
      default:
        return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="form-card">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Educación y Certificaciones
          </CardTitle>
          <CardDescription>
            Agrega tu formación académica, certificaciones y cursos
            profesionales
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Add New Education Button */}
          {!isAdding && (
            <Button
              onClick={() => setIsAdding(true)}
              className="btn-gradient w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Agregar Educación/Certificación
            </Button>
          )}

          {/* Add New Education Form */}
          {isAdding && (
            <Card className="border-dashed border-2 border-primary/30">
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-title">Título/Grado *</Label>
                    <Input
                      id="new-title"
                      value={newEducation.title}
                      onChange={(e) =>
                        setNewEducation({
                          ...newEducation,
                          title: e.target.value.slice(0, 50), // limitar a 50 caracteres
                        })
                      }
                      maxLength={50}
                      placeholder="Licenciatura en Informática"
                      className="transition-all duration-300 focus:shadow-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-academy">Institución/Academia *</Label>
                    <Input
                      id="new-academy"
                      value={newEducation.academy}
                      onChange={(e) =>
                        setNewEducation({
                          ...newEducation,
                          academy: e.target.value.slice(0, 50), // limitar a 50 caracteres
                        })
                      }
                      maxLength={50}
                      placeholder="Universidad de Tecnología"
                      className="transition-all duration-300 focus:shadow-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-cert-type">Tipo de Certificado</Label>
                    <Select
                      value={newEducation.certificateType}
                      onValueChange={(value: any) =>
                        setNewEducation({
                          ...newEducation,
                          certificateType: value,
                        })
                      }
                    >
                      <SelectTrigger className="transition-all duration-300 focus:shadow-lg">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(certificateTypes).map(
                          ([key, label]) => (
                            <SelectItem key={key} value={key}>
                              {label}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-edu-start-date">Fecha de Inicio</Label>
                    <Input
                      id="new-edu-start-date"
                      type="month"
                      value={newEducation.startDate}
                      onChange={(e) =>
                        setNewEducation({
                          ...newEducation,
                          startDate: e.target.value,
                        })
                      }
                      className="transition-all duration-300 focus:shadow-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-edu-end-date">Fecha de Fin</Label>
                    <Input
                      id="new-edu-end-date"
                      type="month"
                      value={newEducation.endDate}
                      onChange={(e) =>
                        setNewEducation({
                          ...newEducation,
                          endDate: e.target.value,
                        })
                      }
                      min={newEducation.startDate} // <-- Solo permite fechas iguales o posteriores al startDate
                      placeholder="Dejar vacío si está en curso"
                      className="transition-all duration-300 focus:shadow-lg"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-edu-description">Descripción</Label>
                  <Textarea
                    id="new-edu-description"
                    value={newEducation.description}
                    onChange={(e) =>
                      setNewEducation({
                        ...newEducation,
                        description: e.target.value,
                      })
                    }
                    placeholder="Describe lo que aprendiste, materias clave, logros o certificaciones obtenidas..."
                    className="min-h-[100px] resize-none transition-all duration-300 focus:shadow-lg"
                  />
                </div>

                <div className="flex space-x-3">
                  <Button onClick={handleAddEducation} className="btn-gradient">
                    Agregar Educación
                  </Button>
                  <Button variant="outline" onClick={() => setIsAdding(false)}>
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Existing Education */}
          {education.length > 0 && (
            <div className="space-y-4 mt-6">
              <Separator />
              <h3 className="text-lg font-semibold">
                Tu Educación y Certificaciones
              </h3>

              {education.map((edu: Education) => (
                <Card
                  key={edu.id}
                  className="group relative overflow-hidden border-l-4 border-l-secondary bg-card p-6 transition-all hover:shadow-md"
                >
                  <div className="space-y-3 overflow-hidden">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <GraduationCap className="w-4 h-4 text-muted-foreground" />
                          {/* Mostrar título como texto estático (limitado al guardar en el formulario) */}
                          <div className="font-semibold text-lg p-0 h-auto bg-transparent break-words">
                            {edu.title}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                          <School className="w-4 h-4 text-muted-foreground" />
                          {/* Mostrar institución como texto estático */}
                          <div className="text-muted-foreground font-medium p-0 h-auto bg-transparent break-words">
                            {edu.academy}
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="flex items-center space-x-2 min-w-0">
                            <Calendar className="w-3 h-3 text-muted-foreground" />
                            <div className="text-sm text-muted-foreground p-0 h-auto bg-transparent truncate">
                              {edu.startDate} - {edu.endDate || "Presente"}
                            </div>
                          </div>
                          <Badge
                            variant={getBadgeVariant(edu.certificateType)}
                            className="ml-auto"
                          >
                            {
                              certificateTypes[
                              edu.certificateType as keyof typeof certificateTypes
                              ]
                            }
                          </Badge>
                        </div>
                      </div>

                      <div className="flex-shrink-0 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditEducation(edu.id)}
                          className="h-8 w-8"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteEducation(edu.id)}
                          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Descripción como texto estático (no editable) */}
                    {edu.description ? (
                      <div className="text-muted-foreground text-sm leading-relaxed break-words max-h-20 overflow-auto whitespace-pre-wrap">
                        {edu.description}
                      </div>
                    ) : null}
                    {edu.description ? (
                      <div className="text-muted-foreground text-sm leading-relaxed w-full max-h-20 overflow-y-auto overflow-x-hidden whitespace-normal break-words break-all">
                        {edu.description}
                      </div>
                    ) : null}
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
