"use client";

import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { usePdfGeneration } from "@/hooks/use-pdf-generation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PracticeSheet } from "@/hooks/use-hebrew-practice-sheet";

interface PracticeSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  practiceSheet: PracticeSheet | null;
}

export function PracticeSheetModal({
  isOpen,
  onClose,
  practiceSheet,
}: PracticeSheetModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const { generatePdf, isGenerating, error } = usePdfGeneration();
  const [includeAnswerKey, setIncludeAnswerKey] = useState(true);

  const handleDownload = async () => {
    if (!practiceSheet || !contentRef.current) return;

    const filename = `hebrew_practice_sheet${includeAnswerKey ? "_with_answers" : ""}.pdf`;
    await generatePdf(contentRef.current, filename);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-full max-h-full w-[95vw] h-[95vh] p-0 bg-white">
        <DialogHeader className="p-6">
          <DialogTitle>Hebrew Practice Sheet</DialogTitle>
          <DialogDescription>
            View the generated practice sheet and download as PDF.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-grow overflow-auto p-6">
          <div ref={contentRef} className="p-24 text-3xl">
            {practiceSheet ? (
              <PracticeSheetContent
                practiceSheet={practiceSheet}
                includeAnswerKey={includeAnswerKey}
              />
            ) : (
              <p>No practice sheet data available.</p>
            )}
          </div>
        </div>
        <footer className="p-6 space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={includeAnswerKey}
                onChange={(e) => setIncludeAnswerKey(e.target.checked)}
                className="form-checkbox h-5 w-5 text-primary"
              />
              <span>Include Answer Key</span>
            </label>
            <Button onClick={handleDownload} disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating PDF...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </>
              )}
            </Button>
          </div>
        </footer>
      </DialogContent>
    </Dialog>
  );
}

interface PracticeSheetContentProps {
  practiceSheet: PracticeSheet;
  includeAnswerKey: boolean;
}

const PracticeSheetContent: React.FC<PracticeSheetContentProps> = React.memo(
  ({ practiceSheet, includeAnswerKey }) => (
    <article className="text-3xl">
      <h1 className="text-7xl font-bold text-center mb-16">
        Hebrew Practice Sheet
      </h1>
      <section className="space-y-16">
        <div>
          <h2 className="text-5xl font-semibold mb-4">Letters:</h2>
          <p className="text-4xl">{practiceSheet.letters}</p>
        </div>
        <div>
          <h2 className="text-5xl font-semibold mb-4">Vowels:</h2>
          <p className="text-4xl">{practiceSheet.vowels}</p>
        </div>
        <div>
          <h2 className="text-5xl font-semibold mb-4">Vowel Names:</h2>
          <p className="text-4xl">{practiceSheet.vowelNames}</p>
        </div>
        <PracticeSection title="Practice" items={practiceSheet.practice} />
        {includeAnswerKey && (
          <PracticeSection title="Answer Key" items={practiceSheet.answerKey} />
        )}
      </section>
    </article>
  )
);

PracticeSheetContent.displayName = "PracticeSheetContent";

const PracticeSection: React.FC<{ title: string; items: string[] }> =
  React.memo(({ title, items }) => (
    <section className="space-y-12">
      <h2 className="text-5xl font-semibold mb-8">{title}</h2>
      <ol className="list-none space-y-8">
        {items.map((line, index) => (
          <li key={index} className="flex items-start">
            <span className="mr-6 font-bold text-4xl">{index + 1}.</span>
            <div className="flex-1">
              <span className="block text-2xl text-muted-foreground mb-2">
                {getCombinationLabel(index)}
              </span>
              <span className="font-mono text-4xl">{line}</span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  ));

PracticeSection.displayName = "PracticeSection";

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
