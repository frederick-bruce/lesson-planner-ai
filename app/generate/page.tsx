/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { z } from "zod";
import { parse } from "partial-json";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

const LessonPlanSchema = z.object({
  title: z.string(),
  subject: z.string(),
  gradeLevel: z.string(),
  duration: z.number(),
  objectives: z.array(z.string()),
  materials: z.array(z.string()),
  introduction: z.string(),
  mainContent: z.array(
    z.object({
      activity: z.string(),
      duration: z.number(),
      description: z.string(),
    })
  ),
  conclusion: z.string(),
  assessment: z.string(),
  extensions: z.array(z.string()).optional(),
});

export default function GeneratePage() {
  const [subject, setSubject] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const [duration, setDuration] = useState(60);
  const [objectives, setObjectives] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lessonPlan, setLessonPlan] =
    useState<z.infer<typeof LessonPlanSchema>>();

  async function handleSubmit() {
    setIsLoading(true);
    setLessonPlan(undefined);

    const res = await fetch("/api/generate-lesson-plan", {
      method: "POST",
      body: JSON.stringify({
        subject,
        gradeLevel,
        duration,
        objectives: objectives.split("\n"),
      }),
    });

    const reader = res.body?.getReader();
    if (!reader) {
      setIsLoading(false);
      return;
    }

    const decoder = new TextDecoder();
    let data = "";
    let parsed = {};
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      data += decoder.decode(value);
      parsed = parse(data);
      setLessonPlan(parsed as z.infer<typeof LessonPlanSchema>);
    }

    setIsLoading(false);
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">
        Generate Lesson Plan
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Lesson Parameters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g., Mathematics, History, Science"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gradeLevel">Grade Level</Label>
              <Select value={gradeLevel} onValueChange={setGradeLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select grade level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="K-2">K-2</SelectItem>
                  <SelectItem value="3-5">3-5</SelectItem>
                  <SelectItem value="6-8">6-8</SelectItem>
                  <SelectItem value="9-12">9-12</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Lesson Duration (minutes)</Label>
              <Slider
                id="duration"
                min={15}
                max={120}
                step={5}
                value={[duration]}
                onValueChange={(value) => setDuration(value[0])}
              />
              <p className="text-sm text-muted-foreground text-right">
                {duration} minutes
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="objectives">
                Learning Objectives (one per line)
              </Label>
              <Textarea
                id="objectives"
                value={objectives}
                onChange={(e) => setObjectives(e.target.value)}
                placeholder="Enter the main learning objectives for this lesson"
              />
            </div>
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Lesson Plan"
              )}
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Generated Lesson Plan</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading && <Loader2 className="h-8 w-8 animate-spin mx-auto" />}
            {lessonPlan && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">{lessonPlan.title}</h2>
                <p>
                  <strong>Subject:</strong> {lessonPlan.subject}
                </p>
                <p>
                  <strong>Grade Level:</strong> {lessonPlan.gradeLevel}
                </p>
                <p>
                  <strong>Duration:</strong> {lessonPlan.duration} minutes
                </p>
                <div>
                  <strong>Objectives:</strong>
                  <ul className="list-disc pl-5">
                    {lessonPlan.objectives?.map((objective, index) => (
                      <li key={index}>{objective}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <strong>Materials:</strong>
                  <ul className="list-disc pl-5">
                    {lessonPlan.materials?.map((material, index) => (
                      <li key={index}>{material}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <strong>Introduction:</strong>
                  <p>{lessonPlan.introduction}</p>
                </div>
                <div>
                  <strong>Main Content:</strong>
                  {lessonPlan.mainContent?.map((content, index) => (
                    <div key={index} className="ml-5 mt-2">
                      <p>
                        <strong>{content.activity}</strong> ({content.duration}{" "}
                        minutes)
                      </p>
                      <p>{content.description}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <strong>Conclusion:</strong>
                  <p>{lessonPlan.conclusion}</p>
                </div>
                <div>
                  <strong>Assessment:</strong>
                  <p>{lessonPlan.assessment}</p>
                </div>
                {lessonPlan.extensions && (
                  <div>
                    <strong>Extensions:</strong>
                    <ul className="list-disc pl-5">
                      {lessonPlan.extensions?.map((extension, index) => (
                        <li key={index}>{extension}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
