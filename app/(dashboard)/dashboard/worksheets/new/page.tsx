import { WorksheetForm } from "@/components/worksheet-form";

export default function NewWorksheetPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Worksheet</h1>
      <WorksheetForm />
    </div>
  );
}
