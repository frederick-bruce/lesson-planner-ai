"use client";

import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { WorksheetTemplate, Parameter } from "@/convex/types";

interface WorksheetCreatorProps {
  onComplete?: () => void;
}

export default function WorksheetCreator({
  onComplete,
}: WorksheetCreatorProps) {
  const [selectedTemplate, setSelectedTemplate] =
    useState<WorksheetTemplate | null>(null);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [parameters, setParameters] = useState<Parameter[]>([]);
  const [content, setContent] = useState("");

  const templates = useQuery(api.worksheets.getWorksheetTemplates, {}) || [];
  const createWorksheet = useMutation(api.worksheets.createWorksheet);

  useEffect(() => {
    if (selectedTemplate) {
      setSubject(selectedTemplate.subject);
      setParameters(
        selectedTemplate.parameters.map((p) => ({ ...p, value: "" }))
      );
    }
  }, [selectedTemplate]);

  const handleParameterChange = (name: string, value: string | number) => {
    setParameters((prev) =>
      prev.map((p) => (p.name === name ? { ...p, value } : p))
    );
  };

  const handleSubmit = async () => {
    try {
      await createWorksheet({
        title,
        subject,
        gradeLevel,
        isPublic,
        parameters: parameters.map(({ name, label, type, value }) => ({
          name,
          label,
          type,
          value: value || "",
        })),
        content,
      });
      toast({
        title: "Worksheet created",
        description: "Your worksheet has been successfully created.",
      });
      // Reset form
      setTitle("");
      setSubject("");
      setGradeLevel("");
      setIsPublic(false);
      setParameters([]);
      setContent("");
      setSelectedTemplate(null);
      onComplete?.();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create worksheet. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Worksheet</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="template">Template</Label>
          <Select
            onValueChange={(value) =>
              setSelectedTemplate(
                templates.find((t) => t._id === value) || null
              )
            }
          >
            <SelectTrigger id="template">
              <SelectValue placeholder="Select a template" />
            </SelectTrigger>
            <SelectContent>
              {templates.map((template) => (
                <SelectItem key={template._id} value={template._id}>
                  {template.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="gradeLevel">Grade Level</Label>
          <Input
            id="gradeLevel"
            value={gradeLevel}
            onChange={(e) => setGradeLevel(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="isPublic"
            checked={isPublic}
            onCheckedChange={setIsPublic}
          />
          <Label htmlFor="isPublic">Make worksheet public</Label>
        </div>
        {parameters.map((param) => (
          <div key={param.name} className="space-y-2">
            <Label htmlFor={param.name}>{param.label}</Label>
            {param.type === "select" ? (
              <Select
                onValueChange={(value) =>
                  handleParameterChange(param.name, value)
                }
              >
                <SelectTrigger id={param.name}>
                  <SelectValue
                    placeholder={`Select ${param.label.toLowerCase()}`}
                  />
                </SelectTrigger>
                <SelectContent>
                  {param.options?.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : param.type === "number" ? (
              <Input
                id={param.name}
                type="number"
                min={param.min}
                max={param.max}
                value={param.value || ""}
                onChange={(e) =>
                  handleParameterChange(param.name, Number(e.target.value))
                }
              />
            ) : (
              <Input
                id={param.name}
                type="text"
                value={param.value || ""}
                onChange={(e) =>
                  handleParameterChange(param.name, e.target.value)
                }
              />
            )}
          </div>
        ))}
        <div className="space-y-2">
          <Label htmlFor="content">Worksheet Content</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
          />
        </div>
        <Button onClick={handleSubmit} className="w-full">
          Create Worksheet
        </Button>
      </CardContent>
    </Card>
  );
}
