"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function LessonPlanDetail({ id }: { id: Id<"lessonPlans"> }) {
  const router = useRouter();
  const lessonPlan = useQuery(api.lessonPlans.getById, { id });
  const deleteLessonPlan = useMutation(api.lessonPlans.remove);

  if (!lessonPlan) {
    return <div>Loading...</div>;
  }

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this lesson plan?")) {
      await deleteLessonPlan({ id });
      router.push("/lesson-plans");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{lessonPlan.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          <strong>Subject:</strong> {lessonPlan.subject}
        </p>
        <p>
          <strong>Grade Level:</strong> {lessonPlan.gradeLevel}
        </p>
        <p>
          <strong>Duration:</strong> {lessonPlan.duration} minutes
        </p>
        <p>
          <strong>Description:</strong> {lessonPlan.description}
        </p>
        <h3 className="font-bold mt-4">Objectives:</h3>
        <ul className="list-disc pl-5">
          {lessonPlan.objectives.map((objective, index) => (
            <li key={index}>{objective}</li>
          ))}
        </ul>
        <h3 className="font-bold mt-4">Materials:</h3>
        <ul className="list-disc pl-5">
          {lessonPlan.materials.map((material, index) => (
            <li key={index}>{material}</li>
          ))}
        </ul>
        <div className="mt-6 space-x-4">
          <Button onClick={() => router.push(`/lesson-plans/${id}/edit`)}>
            Edit
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
