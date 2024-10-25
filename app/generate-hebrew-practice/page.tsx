"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { PracticeSheetModal } from "@/components/practice-sheet-modal";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useHebrewPracticeSheet } from "@/hooks/use-hebrew-practice-sheet";
import { PracticeSheetDisplay } from "@/components/practice-sheet-display";

export default function GenerateHebrewPracticePage() {
  const {
    letterCount,
    vowelCount,
    isLoading,
    practiceSheet,
    error,
    setLetterCount,
    setVowelCount,
    handleGenerate,
  } = useHebrewPracticeSheet();

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <div className="container mx-auto px-4 py-8 md:py-16 h-full">
      <div className="flex flex-col h-full">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Generate Hebrew Practice Sheet
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl">
                Practice Sheet Parameters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="letterCount" className="text-sm font-medium">
                  Number of Letters
                </Label>
                <Input
                  id="letterCount"
                  type="number"
                  min={1}
                  max={22}
                  value={letterCount}
                  onChange={(e) => setLetterCount(Number(e.target.value))}
                  className="w-full"
                  aria-describedby="letterCountHint"
                />
                <p
                  id="letterCountHint"
                  className="text-sm text-muted-foreground"
                >
                  Choose between 1 and 22 letters
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="vowelCount" className="text-sm font-medium">
                  Number of Vowels
                </Label>
                <Input
                  id="vowelCount"
                  type="number"
                  min={1}
                  max={8}
                  value={vowelCount}
                  onChange={(e) => setVowelCount(Number(e.target.value))}
                  className="w-full"
                  aria-describedby="vowelCountHint"
                />
                <p
                  id="vowelCountHint"
                  className="text-sm text-muted-foreground"
                >
                  Choose between 1 and 8 vowels
                </p>
              </div>
              <Button
                onClick={handleGenerate}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Practice Sheet"
                )}
              </Button>
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl">
                Generated Practice Sheet
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading && (
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              )}
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {practiceSheet && (
                <PracticeSheetDisplay
                  practiceSheet={practiceSheet}
                  onViewDownload={() => setIsModalOpen(true)}
                />
              )}
            </CardContent>
          </Card>
        </div>
        {practiceSheet && (
          <PracticeSheetModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            practiceSheet={practiceSheet}
          />
        )}
      </div>
    </div>
  );
}
