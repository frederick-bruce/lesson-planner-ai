import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileText, Book, LayoutGrid } from "lucide-react";

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Get started with these common tasks</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Link href="/dashboard/worksheets/new" passHref>
          <Button variant="outline" className="w-full justify-start">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Worksheet
          </Button>
        </Link>
        <Link href="/dashboard/lesson-plans/new" passHref>
          <Button variant="outline" className="w-full justify-start">
            <Book className="mr-2 h-4 w-4" />
            Create New Lesson Plan
          </Button>
        </Link>
        <Link href="/dashboard/worksheets" passHref>
          <Button variant="outline" className="w-full justify-start">
            <FileText className="mr-2 h-4 w-4" />
            View My Worksheets
          </Button>
        </Link>
        <Link href="/lesson-plans" passHref>
          <Button variant="outline" className="w-full justify-start">
            <FileText className="mr-2 h-4 w-4" />
            View My Lesson Plans
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
