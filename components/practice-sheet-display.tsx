import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download } from "lucide-react";
import { PracticeSheet } from "@/hooks/use-hebrew-practice-sheet";

interface PracticeSheetDisplayProps {
  practiceSheet: PracticeSheet;
  onViewDownload: () => void;
}

export const PracticeSheetDisplay: React.FC<PracticeSheetDisplayProps> =
  React.memo(({ practiceSheet, onViewDownload }) => {
    return (
      <div className="space-y-4 text-lg">
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
            <PracticeList items={practiceSheet.practice} />
          </TabsContent>
          <TabsContent value="answer">
            <PracticeList items={practiceSheet.answerKey} />
          </TabsContent>
        </Tabs>
        <Button onClick={onViewDownload} className="w-full">
          <Download className="mr-2 h-4 w-4" />
          View and Download
        </Button>
      </div>
    );
  });

PracticeSheetDisplay.displayName = "PracticeSheetDisplay";

const PracticeList: React.FC<{ items: string[] }> = React.memo(({ items }) => (
  <ol className="list-none space-y-4">
    {items.map((line, index) => (
      <li key={index} className="flex items-start">
        <span className="mr-4 font-bold">{index + 1}.</span>
        <div className="flex-1">
          <span className="block text-sm text-muted-foreground mb-1">
            {getCombinationLabel(index)}
          </span>
          <span className="font-mono text-lg">{line}</span>
        </div>
      </li>
    ))}
  </ol>
));

PracticeList.displayName = "PracticeList";

function getCombinationLabel(index: number): string {
  const labels = [
    "Single characters",
    "Two-letter combinations",
    "Three-letter combinations",
    "Four-letter combinations",
    "Five-letter combinations",
    "Six-letter combinations",
  ];
  return labels[index] || `${index + 1}-letter combinations`;
}
