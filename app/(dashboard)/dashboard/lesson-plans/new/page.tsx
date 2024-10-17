import { LessonPlanForm } from "@/components/lesson-plan-form";

export default function NewLessonPlanPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Lesson Plan</h1>
      <LessonPlanForm />
    </div>
  );
}