"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Download } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PracticeSheetModal } from "@/components/practice-sheet-modal";
interface PracticeSheet {
  letters: string;
  vowels: string;
  vowelNames: string;
  practice: string[];
  answerKey: string[];
}

export default function GenerateHebrewPracticePage() {
  const [letterCount, setLetterCount] = useState(3);
  const [vowelCount, setVowelCount] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const [practiceSheet, setPracticeSheet] = useState<PracticeSheet | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function handleGenerate() {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/generate-hebrew-practice?letters=${letterCount}&vowels=${vowelCount}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch practice sheet");
      }
      const data = await response.json();
      setPracticeSheet(data);
    } catch (error) {
      console.error("Failed to generate practice sheet:", error);
      // You might want to show an error message to the user here
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">
        Generate Hebrew Practice Sheet
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Practice Sheet Parameters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="letterCount">Number of Letters</Label>
              <Input
                id="letterCount"
                type="number"
                min={1}
                max={22}
                value={letterCount}
                onChange={(e) => setLetterCount(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vowelCount">Number of Vowels</Label>
              <Input
                id="vowelCount"
                type="number"
                min={1}
                max={8}
                value={vowelCount}
                onChange={(e) => setVowelCount(Number(e.target.value))}
              />
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
        <Card>
          <CardHeader>
            <CardTitle>Generated Practice Sheet</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading && <Loader2 className="h-8 w-8 animate-spin mx-auto" />}
            {practiceSheet && (
              <div className="space-y-4">
                <div>
                  <strong>Letters:</strong> {practiceSheet.letters}
                </div>
                <div>
                  <strong>Vowels:</strong> {practiceSheet.vowels}
                </div>
                <div>
                  <strong>Vowel Names:</strong> {practiceSheet.vowelNames}
                </div>
                <Tabs defaultValue="practice" className="w-full">
                  <TabsList>
                    <TabsTrigger value="practice">Practice</TabsTrigger>
                    <TabsTrigger value="answer">Answer Key</TabsTrigger>
                  </TabsList>
                  <TabsContent value="practice">
                    <ol className="list-decimal list-inside space-y-4">
                      {practiceSheet.practice.map((line, index) => (
                        <li key={index} className="font-bold text-xl">
                          <span className="font-normal text-base mr-2">
                            {index === 0
                              ? "Single characters:"
                              : index === 1
                              ? "Two-letter combinations:"
                              : index === 2
                              ? "Three-letter combinations:"
                              : index === 3
                              ? "Four-letter combinations:"
                              : index === 4
                              ? "Five-letter combinations:"
                              : "Six-letter combinations:"}
                          </span>
                          <span className="font-mono">{line}</span>
                        </li>
                      ))}
                    </ol>
                  </TabsContent>
                  <TabsContent value="answer">
                    <ol className="list-decimal list-inside space-y-4">
                      {practiceSheet.answerKey.map((line, index) => (
                        <li key={index}>
                          <span className="font-normal text-base mr-2">
                            {index === 0
                              ? "Single characters:"
                              : index === 1
                              ? "Two-letter combinations:"
                              : index === 2
                              ? "Three-letter combinations:"
                              : index === 3
                              ? "Four-letter combinations:"
                              : index === 4
                              ? "Five-letter combinations:"
                              : "Six-letter combinations:"}
                          </span>
                          <span className="font-mono">{line}</span>
                        </li>
                      ))}
                    </ol>
                  </TabsContent>
                </Tabs>
                <Button onClick={() => setIsModalOpen(true)} className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  View and Download
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <PracticeSheetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        practiceSheet={practiceSheet}
      />
    </div>
  );
}
