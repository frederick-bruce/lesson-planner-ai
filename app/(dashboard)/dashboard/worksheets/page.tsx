"use client"

import { Button } from "@/components/ui/button";
import { WorksheetList } from "@/components/worksheet-list";
import Link from "next/link";

export default function ViewWorksheetsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Worksheets</h1>
        <Link href="/worksheets/new" passHref>
          <Button>Create New Worksheet</Button>
        </Link>
      </div>
      <WorksheetList />
    </div>
  );
}
