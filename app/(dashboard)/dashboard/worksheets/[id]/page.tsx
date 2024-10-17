"use client";

import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Skeleton } from "@/components/skeleton";

export default function WorksheetPage() {
  const params = useParams();
  const worksheetId = params.id as Id<"worksheets">;

  const worksheet = useQuery(api.worksheets.getWorksheet, { id: worksheetId });

  if (worksheet === undefined) {
    return (
      <div className="container mx-auto p-4">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (worksheet === null) {
    return (
      <div className="container mx-auto p-4">
        <Card>
          <CardHeader>
            <CardTitle>Worksheet Not Found</CardTitle>
            <CardDescription>
              The requested worksheet could not be found.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link href="/worksheets">
              <Button>Back to Worksheets</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>{worksheet.title}</CardTitle>
          <CardDescription>
            {worksheet.subject} - Grade {worksheet.gradeLevel}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>
              <strong>Created on:</strong>{" "}
              {new Date(worksheet._creationTime).toLocaleDateString()}
            </p>
            <p>
              <strong>Visibility:</strong>{" "}
              {worksheet.isPublic ? "Public" : "Private"}
            </p>
            <div>
              <h3 className="text-lg font-semibold mb-2">Content:</h3>
              <div className="whitespace-pre-wrap">{worksheet.content}</div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href={`/worksheets/${worksheetId}/edit`}>
            <Button variant="outline">Edit Worksheet</Button>
          </Link>
          <Link href="/worksheets">
            <Button>Back to Worksheets</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
