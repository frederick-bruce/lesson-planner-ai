import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Skeleton } from "./skeleton";
import { WorksheetCard } from "./worksheet-card";

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
      <p className="text-center text-gray-500">
        No worksheets found. Create your first one!
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {worksheets.map((worksheet) => (
        <WorksheetCard
          key={worksheet._id}
          worksheet={{
            ...worksheet,
            isPublic: true,
            createdBy: {},
            parameters: {},
            content: "",
            _creationTime: worksheet.createdAt,
          }}
        />
      ))}
    </div>
  );
}
