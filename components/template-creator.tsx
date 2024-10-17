"use client";

import React, { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { WorksheetTemplateParameter } from "@/convex/types";

interface TemplateCreatorProps {
  onComplete?: () => void;
}

export default function TemplateCreator({ onComplete }: TemplateCreatorProps) {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [parameters, setParameters] = useState<WorksheetTemplateParameter[]>(
    []
  );

  const createTemplate = useMutation(api.worksheets.createWorksheetTemplate);

  const handleAddParameter = () => {
    setParameters([...parameters, { name: "", label: "", type: "text" }]);
  };

  const handleParameterChange = (
    index: number,
    field: keyof WorksheetTemplateParameter,
    value: string
  ) => {
    const newParameters = [...parameters];
    newParameters[index] = { ...newParameters[index], [field]: value };
    setParameters(newParameters);
  };

  const handleSubmit = async () => {
    try {
      await createTemplate({
        name,
        subject,
        parameters,
      });
      toast({
        title: "Template created",
        description: "Your worksheet template has been successfully created.",
      });
      setName("");
      setSubject("");
      setParameters([]);
      onComplete?.();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create template. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Worksheet Template</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Template Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          <Label>Parameters</Label>
          {parameters.map((param, index) => (
            <div key={index} className="flex space-x-2">
              <Input
                placeholder="Name"
                value={param.name}
                onChange={(e) =>
                  handleParameterChange(index, "name", e.target.value)
                }
              />
              <Input
                placeholder="Label"
                value={param.label}
                onChange={(e) =>
                  handleParameterChange(index, "label", e.target.value)
                }
              />
              <Select
                value={param.type}
                onValueChange={(value) =>
                  handleParameterChange(index, "type", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                  <SelectItem value="select">Select</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ))}
          <Button onClick={handleAddParameter}>Add Parameter</Button>
        </div>
        <Button onClick={handleSubmit} className="w-full">
          Create Template
        </Button>
      </CardContent>
    </Card>
  );
}
