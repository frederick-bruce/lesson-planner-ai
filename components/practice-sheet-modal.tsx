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
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface PracticeSheet {
  letters: string;
  vowels: string;
  vowelNames: string;
  practice: string[];
  answerKey: string[];
}

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
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    if (!practiceSheet || !contentRef.current) return;

    setIsGenerating(true);

    try {
      const canvas = await html2canvas(contentRef.current, {
        useCORS: true,
        logging: false,
        width: 2100,
        height: 2970,
        letterRendering: true,
      });

      const imgData = canvas.toDataURL("image/pdf", 1.3);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, "PDF", 0, 0, pdfWidth, pdfHeight);
      pdf.save("hebrew_practice_sheet.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("An error occurred while generating the PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-full max-h-full w-[95vw] h-[95vh] p-0">
        <DialogHeader className="p-6">
          <DialogTitle>Hebrew Practice Sheet</DialogTitle>
          <DialogDescription>
            View the generated practice sheet and download as PDF.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-grow overflow-auto p-6">
          <div
            ref={contentRef}
            className="w-[2100px] h-[2970px] p-16 bg-white shadow-lg rounded-lg"
            style={{ fontSize: "32-px" }}
          >
            {practiceSheet && (
              <>
                <h2 className="text-6xl font-bold text-center mb-16">
                  Hebrew Practice Sheet
                </h2>
                <div className="space-y-12 text-2xl">
                  <div>
                    <strong className="text-3xl">Letters:</strong>{" "}
                    {practiceSheet.letters}
                  </div>
                  <div>
                    <strong className="text-3xl">Vowels:</strong>{" "}
                    {practiceSheet.vowels}
                  </div>
                  <div>
                    <strong className="text-3xl">Vowel Names:</strong>{" "}
                    {practiceSheet.vowelNames}
                  </div>
                  <div className="space-y-12">
                    <h3 className="text-4xl font-semibold">Practice</h3>
                    <ol className="list-decimal list-inside space-y-8">
                      {practiceSheet.practice.map((line, index) => (
                        <li key={index} className="text-3xl">
                          <span className="font-normal mr-4">
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
                  </div>
                  <div className="space-y-12">
                    <h3 className="text-4xl font-semibold">Answer Key</h3>
                    <ol className="list-decimal list-inside space-y-8">
                      {practiceSheet.answerKey.map((line, index) => (
                        <li key={index} className="text-3xl">
                          <span className="font-normal mr-4">
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
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="p-6">
          <Button
            onClick={handleDownload}
            className="w-full"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating High-Quality PDF...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Download High-Quality PDF
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
