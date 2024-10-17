import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { WorksheetCard } from "./worksheet-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Id } from "@/convex/_generated/dataModel";
import { Skeleton } from "./skeleton";

interface WorksheetQueryResult {
  _id: Id<"worksheets">;
  title: string;
  subject: string;
  gradeLevel: string;
  createdAt: number;
}

export interface WorksheetSummary {
  _id: Id<"worksheets">;
  title: string;
  subject: string;
  gradeLevel: string;
  createdAt: number;
  isPublic: boolean;
  createdBy: Id<"users">;
}

export function WorksheetList() {
  const worksheets = useQuery(api.worksheets.getRecentWorksheets, {
    limit: 10,
  });

  if (worksheets === undefined) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
    );
  }

  if (worksheets.length === 0) {
    return (
      <div className="text-center">
        <p className="text-gray-500 mb-4">No worksheets found.</p>
        <Link href="/worksheets/new" passHref>
          <Button>Create Your First Worksheet</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Worksheets</h2>
        <Link href="/worksheets/new" passHref>
          <Button>Create New Worksheet</Button>
        </Link>
      </div>
      <div className="space-y-4">
        {worksheets.map((worksheet: WorksheetQueryResult) => (
          <WorksheetCard
            key={worksheet._id}
            worksheet={{
              ...worksheet,
              isPublic: false,
              createdBy: "unknown" as Id<"users">,
            }}
          />
        ))}
      </div>
    </div>
  );
}
