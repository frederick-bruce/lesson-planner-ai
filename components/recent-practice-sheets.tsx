"use client";

import React, { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import Link from "next/link";
import { PracticeSheetModal } from "@/components/practice-sheet-modal";
import { PracticeSheet } from "@/hooks/use-hebrew-practice-sheet";

export function RecentPracticeSheets() {
  const practiceSheetQuery = useQuery(api.hebrewPracticeSheets.list, {
    limit: 3,
  });
  const practiceSheets = practiceSheetQuery?.practiceSheets ?? [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSheet, setSelectedSheet] = useState<PracticeSheet | null>(
    null
  );

  const handleViewSheet = (sheet: PracticeSheet) => {
    setSelectedSheet(sheet);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSheet(null);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Recent Hebrew Practice Sheets</CardTitle>
          <CardDescription>
            Your latest generated practice sheets
          </CardDescription>
        </CardHeader>
        <CardContent>
          {practiceSheets.length > 0 ? (
            <ul className="space-y-4">
              {practiceSheets.map((sheet: PracticeSheet) => (
                <li
                  key={sheet._id}
                  className="flex items-center justify-between border-b pb-2"
                >
                  <div className="flex items-center">
                    <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>
                      {sheet.letters} - {sheet.vowels}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-muted-foreground mr-4">
                      {new Date(sheet.createdAt).toLocaleDateString()}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewSheet(sheet)}
                    >
                      View
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-muted-foreground">
              No practice sheets generated yet. Create your first one!
            </p>
          )}
          {practiceSheets.length > 0 && (
            <div className="mt-4 text-center">
              <Link href="/generate-hebrew-practice">
                <Button variant="outline">View All Practice Sheets</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      <PracticeSheetModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        practiceSheet={selectedSheet}
      />
    </>
  );
}
