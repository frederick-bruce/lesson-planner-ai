import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { WorksheetSummary } from "@/types";

interface WorksheetCardProps {
  worksheet: WorksheetSummary;
}

export function WorksheetCard({ worksheet }: WorksheetCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{worksheet.title}</CardTitle>
        <CardDescription>
          {worksheet.subject} - Grade {worksheet.gradeLevel}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">
          Created on: {new Date(worksheet.createdAt).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-500">
          Visibility: {worksheet.isPublic ? "Public" : "Private"}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={`/worksheets/${worksheet._id}`} passHref>
          <Button variant="outline">View</Button>
        </Link>
        <Link href={`/worksheets/${worksheet._id}/edit`} passHref>
          <Button>Edit</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
