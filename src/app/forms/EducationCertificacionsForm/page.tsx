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

export default function Page() {
  return <EducationCertificationsForm />;
}

const certificateTypes = {
  diploma: "Diploma",
  course: "Course",
  bootcamp: "Bootcamp",
  other: "Other",
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
            Education & Certifications
          </CardTitle>
          <CardDescription>
            Add your educational background, certifications, and professional
            courses
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
              Add Education/Certification
            </Button>
          )}

          {/* Add New Education Form */}
          {isAdding && (
            <Card className="border-dashed border-2 border-primary/30">
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-title">Title/Degree *</Label>
                    <Input
                      id="new-title"
                      value={newEducation.title}
                      onChange={(e) =>
                        setNewEducation({
                          ...newEducation,
                          title: e.target.value,
                        })
                      }
                      placeholder="Bachelor of Computer Science"
                      className="transition-all duration-300 focus:shadow-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-academy">Institution/Academy *</Label>
                    <Input
                      id="new-academy"
                      value={newEducation.academy}
                      onChange={(e) =>
                        setNewEducation({
                          ...newEducation,
                          academy: e.target.value,
                        })
                      }
                      placeholder="University of Technology"
                      className="transition-all duration-300 focus:shadow-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-cert-type">Certificate Type</Label>
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
                    <Label htmlFor="new-edu-start-date">Start Date</Label>
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
                    <Label htmlFor="new-edu-end-date">End Date</Label>
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
                      placeholder="Leave empty if ongoing"
                      className="transition-all duration-300 focus:shadow-lg"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-edu-description">Description</Label>
                  <Textarea
                    id="new-edu-description"
                    value={newEducation.description}
                    onChange={(e) =>
                      setNewEducation({
                        ...newEducation,
                        description: e.target.value,
                      })
                    }
                    placeholder="Describe what you learned, key subjects, achievements, or certifications obtained..."
                    className="min-h-[100px] resize-none transition-all duration-300 focus:shadow-lg"
                  />
                </div>

                <div className="flex space-x-3">
                  <Button onClick={handleAddEducation} className="btn-gradient">
                    Add Education
                  </Button>
                  <Button variant="outline" onClick={() => setIsAdding(false)}>
                    Cancel
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
                Your Education & Certifications
              </h3>

              {education.map((edu: Education) => (
                <Card key={edu.id} className="border-l-4 border-l-secondary">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <GraduationCap className="w-4 h-4 text-secondary" />
                          <Input
                            value={edu.title}
                            onChange={(e) =>
                              handleUpdateEducation(
                                edu.id,
                                "title",
                                e.target.value,
                              )
                            }
                            className="font-semibold text-lg border-none p-0 h-auto bg-transparent focus-visible:ring-0"
                            placeholder="Title/Degree"
                          />
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                          <School className="w-4 h-4 text-secondary" />
                          <Input
                            value={edu.academy}
                            onChange={(e) =>
                              handleUpdateEducation(
                                edu.id,
                                "academy",
                                e.target.value,
                              )
                            }
                            className="text-secondary font-medium border-none p-0 h-auto bg-transparent focus-visible:ring-0"
                            placeholder="Institution/Academy"
                          />
                        </div>
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-3 h-3 text-muted-foreground" />
                            <Input
                              type="month"
                              value={edu.startDate}
                              onChange={(e) =>
                                handleUpdateEducation(
                                  edu.id,
                                  "startDate",
                                  e.target.value,
                                )
                              }
                              className="text-sm text-muted-foreground border-none p-0 h-auto bg-transparent focus-visible:ring-0 w-auto"
                            />
                            <span className="text-muted-foreground">-</span>
                            <Input
                              type="month"
                              value={edu.endDate}
                              onChange={(e) =>
                                handleUpdateEducation(
                                  edu.id,
                                  "endDate",
                                  e.target.value,
                                )
                              }
                              min={edu.startDate} // <-- Solo permite fechas iguales o posteriores al startDate
                              placeholder="Present"
                              className="text-sm text-muted-foreground border-none p-0 h-auto bg-transparent focus-visible:ring-0 w-auto"
                            />
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
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteEducation(edu.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <Textarea
                      value={edu.description}
                      onChange={(e) =>
                        handleUpdateEducation(
                          edu.id,
                          "description",
                          e.target.value,
                        )
                      }
                      placeholder="Describe what you learned, key subjects, or achievements..."
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
