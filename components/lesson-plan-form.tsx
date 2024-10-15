"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function LessonPlanForm() {
  const router = useRouter();
  const createLessonPlan = useMutation(api.lessonPlans.create);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const [duration, setDuration] = useState("");
  const [objectives, setObjectives] = useState("");
  const [materials, setMaterials] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createLessonPlan({
        title,
        description,
        subject,
        gradeLevel,
        duration: parseInt(duration),
        objectives: objectives.split("\n"),
        materials: materials.split("\n"),
        isPublic: false,
      });
      router.push("/lesson-plans");
    } catch (error) {
      console.error("Error creating lesson plan:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="gradeLevel">Grade Level</Label>
        <Input
          id="gradeLevel"
          value={gradeLevel}
          onChange={(e) => setGradeLevel(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="duration">Duration (minutes)</Label>
        <Input
          id="duration"
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="objectives">Objectives (one per line)</Label>
        <Textarea
          id="objectives"
          value={objectives}
          onChange={(e) => setObjectives(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="materials">Materials (one per line)</Label>
        <Textarea
          id="materials"
          value={materials}
          onChange={(e) => setMaterials(e.target.value)}
          required
        />
      </div>
      <Button type="submit">Create Lesson Plan</Button>
    </form>
  );
}
