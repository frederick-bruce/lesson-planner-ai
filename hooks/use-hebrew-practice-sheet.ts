import { useState, useCallback } from "react";

export interface PracticeSheet {
  letters: string;
  vowels: string;
  vowelNames: string;
  practice: string[];
  answerKey: string[];
}

export function useHebrewPracticeSheet() {
  const [letterCount, setLetterCount] = useState(3);
  const [vowelCount, setVowelCount] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const [practiceSheet, setPracticeSheet] = useState<PracticeSheet | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    setIsLoading(true);
    setError(null);
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
      setError("Failed to generate practice sheet. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [letterCount, vowelCount]);

  return {
    letterCount,
    vowelCount,
    isLoading,
    practiceSheet,
    error,
    setLetterCount,
    setVowelCount,
    handleGenerate,
  };
}
