import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Worksheet } from "@/convex/types";

interface WorksheetCardProps {
  worksheet: Worksheet;
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
          {worksheet.content.substring(0, 100)}...
        </p>
      </CardContent>
      <CardFooter>
        <Link href={`/worksheets/${worksheet._id}`} passHref>
          <Button variant="outline">View Worksheet</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
