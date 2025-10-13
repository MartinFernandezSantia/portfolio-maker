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
import { Plus, Trash2, Building2, Calendar, MapPin } from "lucide-react";
import { usePortfolio, WorkExperience } from "@/contexts/PortfolioContext";

export default function Page() {
  return <WorkExperienceForm />;
}

export function WorkExperienceForm() {
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

  const handleUpdateExperience = (id: string, field: string, value: string) => {
    dispatch({
      type: "UPDATE_WORK_EXPERIENCE",
      payload: { id, data: { [field]: value } },
    });
  };

  const handleDeleteExperience = (id: string) => {
    dispatch({ type: "DELETE_WORK_EXPERIENCE", payload: id });
  };

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
            Work Experience
          </CardTitle>
          <CardDescription>
            Add your professional work experience and achievements
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Add New Experience Button */}
          {!isAdding && (
            <Button
              onClick={() => setIsAdding(true)}
              className="btn-gradient w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Work Experience
            </Button>
          )}

          {/* Add New Experience Form */}
          {isAdding && (
            <Card className="border-dashed border-2 border-primary/30">
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-specialty">Position/Specialty *</Label>
                    <Input
                      id="new-specialty"
                      value={newExperience.specialty}
                      onChange={(e) =>
                        setNewExperience({
                          ...newExperience,
                          specialty: e.target.value,
                        })
                      }
                      placeholder="Frontend Developer"
                      className="transition-all duration-300 focus:shadow-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-company">Company *</Label>
                    <Input
                      id="new-company"
                      value={newExperience.company}
                      onChange={(e) =>
                        setNewExperience({
                          ...newExperience,
                          company: e.target.value,
                        })
                      }
                      placeholder="Tech Company Inc."
                      className="transition-all duration-300 focus:shadow-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-location">Location</Label>
                    <Input
                      id="new-location"
                      value={newExperience.location}
                      onChange={(e) =>
                        setNewExperience({
                          ...newExperience,
                          location: e.target.value,
                        })
                      }
                      placeholder="San Francisco, CA"
                      className="transition-all duration-300 focus:shadow-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-start-date">Start Date *</Label>
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
                    <Label htmlFor="new-end-date">End Date</Label>
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
                        placeholder="Leave empty if current"
                        className="transition-all duration-300 focus:shadow-lg"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-description">Description</Label>
                  <Textarea
                    id="new-description"
                    value={newExperience.description}
                    onChange={(e) =>
                      setNewExperience({
                        ...newExperience,
                        description: e.target.value,
                      })
                    }
                    placeholder="Describe your responsibilities, achievements, and key contributions..."
                    className="min-h-[100px] resize-none transition-all duration-300 focus:shadow-lg"
                  />
                </div>

                <div className="flex space-x-3">
                  <Button
                    onClick={handleAddExperience}
                    className="btn-gradient"
                  >
                    Add Experience
                  </Button>
                  <Button variant="outline" onClick={() => setIsAdding(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Existing Work Experiences */}
          {workExperience.length > 0 && (
            <div className="space-y-4 mt-6">
              <Separator />
              <h3 className="text-lg font-semibold">Your Work Experience</h3>

              {workExperience.map((exp: WorkExperience, index: number) => (
                <Card key={exp.id} className="border-l-4 border-l-primary">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Building2 className="w-4 h-4 text-primary" />
                          <Input
                            value={exp.specialty}
                            onChange={(e) =>
                              handleUpdateExperience(
                                exp.id,
                                "specialty",
                                e.target.value,
                              )
                            }
                            className="font-semibold text-lg border-none p-0 h-auto bg-transparent focus-visible:ring-0"
                            placeholder="Position/Specialty"
                          />
                        </div>
                        <Input
                          value={exp.company}
                          onChange={(e) =>
                            handleUpdateExperience(
                              exp.id,
                              "company",
                              e.target.value,
                            )
                          }
                          className="text-primary font-medium border-none p-0 h-auto bg-transparent focus-visible:ring-0 mb-2"
                          placeholder="Company Name"
                        />
                        {exp.location && (
                          <div className="flex items-center space-x-2 mb-2">
                            <MapPin className="w-3 h-3 text-muted-foreground" />
                            <Input
                              value={exp.location}
                              onChange={(e) =>
                                handleUpdateExperience(
                                  exp.id,
                                  "location",
                                  e.target.value,
                                )
                              }
                              className="text-sm text-muted-foreground border-none p-0 h-auto bg-transparent focus-visible:ring-0"
                              placeholder="Location"
                            />
                          </div>
                        )}
                        <div className="flex items-center space-x-2 mb-4">
                          <Calendar className="w-3 h-3 text-muted-foreground" />
                          <div className="flex items-center space-x-2">
                            <Input
                              type="month"
                              value={exp.startDate}
                              onChange={(e) =>
                                handleUpdateExperience(
                                  exp.id,
                                  "startDate",
                                  e.target.value,
                                )
                              }
                              className="text-sm text-muted-foreground border-none p-0 h-auto bg-transparent focus-visible:ring-0 w-auto"
                            />
                            <span className="text-muted-foreground">-</span>
                            <Input
                              type="month"
                              value={exp.endDate}
                              onChange={(e) =>
                                handleUpdateExperience(
                                  exp.id,
                                  "endDate",
                                  e.target.value,
                                )
                              }
                              placeholder="Present"
                              className="text-sm text-muted-foreground border-none p-0 h-auto bg-transparent focus-visible:ring-0 w-auto"
                            />
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteExperience(exp.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <Textarea
                      value={exp.description}
                      onChange={(e) =>
                        handleUpdateExperience(
                          exp.id,
                          "description",
                          e.target.value,
                        )
                      }
                      placeholder="Describe your responsibilities and achievements..."
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
