import { useState, useCallback } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function usePdfGeneration() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generatePdf = useCallback(
    async (element: HTMLElement, filename: string) => {
      setIsGenerating(true);
      setError(null);

      try {
        const canvas = await html2canvas(element, {
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
          format: "a1",
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        pdf.addImage(imgData, "PDF", 0, 0, pdfWidth, pdfHeight);
        pdf.save(filename);
      } catch (err) {
        console.error("Error generating PDF:", err);
        setError(
          "An error occurred while generating the PDF. Please try again."
        );
      } finally {
        setIsGenerating(false);
      }
    },
    []
  );

  return { generatePdf, isGenerating, error };
}
