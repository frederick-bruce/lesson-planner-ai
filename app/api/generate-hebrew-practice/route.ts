import { NextResponse } from "next/server";

const hebrewLetters = [
  "א",
  "ב",
  "ג",
  "ד",
  "ה",
  "ו",
  "ז",
  "ח",
  "ט",
  "י",
  "כ",
  "ל",
  "מ",
  "נ",
  "ס",
  "ע",
  "פ",
  "צ",
  "ק",
  "ר",
  "ש",
  "ת",
];
const hebrewVowels = ["ָ", "ַ", "ֵ", "ֶ", "ִ", "ֹ", "ֻ", "ְ"];
const vowelNames = [
  "kamatz",
  "patach",
  "tzere",
  "segol",
  "chirik",
  "cholam",
  "kubutz",
  "shva",
];

function getRandomElements(arr: string[], count: number): string[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function generateProgressiveCombinations(
  letters: string[],
  vowels: string[]
): string[] {
  const combinations: string[] = [];

  // Line 1: Single letter or vowel
  combinations.push(getRandomElements([...letters, ...vowels], 7).join(" "));

  // Line 2: Two-letter combinations with vowels
  const twoLetterCombos = [];
  for (let i = 0; i < 5; i++) {
    const letter1 = letters[Math.floor(Math.random() * letters.length)];
    const letter2 = letters[Math.floor(Math.random() * letters.length)];
    const vowel = vowels[Math.floor(Math.random() * vowels.length)];
    twoLetterCombos.push(`${letter1}${vowel}${letter2}`);
  }
  combinations.push(twoLetterCombos.join(" "));

  // Line 3: Three-letter combinations with vowels
  const threeLetterCombos = [];
  for (let i = 0; i < 4; i++) {
    const letter1 = letters[Math.floor(Math.random() * letters.length)];
    const letter2 = letters[Math.floor(Math.random() * letters.length)];
    const letter3 = letters[Math.floor(Math.random() * letters.length)];
    const vowel1 = vowels[Math.floor(Math.random() * vowels.length)];
    const vowel2 = vowels[Math.floor(Math.random() * vowels.length)];
    threeLetterCombos.push(`${letter1}${vowel1}${letter2}${vowel2}${letter3}`);
  }
  combinations.push(threeLetterCombos.join(" "));

  // Line 4: Four-letter combinations with vowels
  const fourLetterCombos = [];
  for (let i = 0; i < 3; i++) {
    const letter1 = letters[Math.floor(Math.random() * letters.length)];
    const letter2 = letters[Math.floor(Math.random() * letters.length)];
    const letter3 = letters[Math.floor(Math.random() * letters.length)];
    const letter4 = letters[Math.floor(Math.random() * letters.length)];
    const vowel1 = vowels[Math.floor(Math.random() * vowels.length)];
    const vowel2 = vowels[Math.floor(Math.random() * vowels.length)];
    const vowel3 = vowels[Math.floor(Math.random() * vowels.length)];
    fourLetterCombos.push(
      `${letter1}${vowel1}${letter2}${vowel2}${letter3}${vowel3}${letter4}`
    );
  }
  combinations.push(fourLetterCombos.join(" "));

  // Line 5: Five-letter combinations with vowels
  const fiveLetterCombos = [];
  for (let i = 0; i < 2; i++) {
    const letter1 = letters[Math.floor(Math.random() * letters.length)];
    const letter2 = letters[Math.floor(Math.random() * letters.length)];
    const letter3 = letters[Math.floor(Math.random() * letters.length)];
    const letter4 = letters[Math.floor(Math.random() * letters.length)];
    const letter5 = letters[Math.floor(Math.random() * letters.length)];
    const vowel1 = vowels[Math.floor(Math.random() * vowels.length)];
    const vowel2 = vowels[Math.floor(Math.random() * vowels.length)];
    const vowel3 = vowels[Math.floor(Math.random() * vowels.length)];
    const vowel4 = vowels[Math.floor(Math.random() * vowels.length)];
    fiveLetterCombos.push(
      `${letter1}${vowel1}${letter2}${vowel2}${letter3}${vowel3}${letter4}${vowel4}${letter5}`
    );
  }
  combinations.push(fiveLetterCombos.join("  "));

  // Line 6: Six-letter combinations with vowels
  const sixLetterCombos = [];
  for (let i = 0; i < 2; i++) {
    const letter1 = letters[Math.floor(Math.random() * letters.length)];
    const letter2 = letters[Math.floor(Math.random() * letters.length)];
    const letter3 = letters[Math.floor(Math.random() * letters.length)];
    const letter4 = letters[Math.floor(Math.random() * letters.length)];
    const letter5 = letters[Math.floor(Math.random() * letters.length)];
    const letter6 = letters[Math.floor(Math.random() * letters.length)];
    const vowel1 = vowels[Math.floor(Math.random() * vowels.length)];
    const vowel2 = vowels[Math.floor(Math.random() * vowels.length)];
    const vowel3 = vowels[Math.floor(Math.random() * vowels.length)];
    const vowel4 = vowels[Math.floor(Math.random() * vowels.length)];
    const vowel5 = vowels[Math.floor(Math.random() * vowels.length)];
    sixLetterCombos.push(
      `${letter1}${vowel1}${letter2}${vowel2}${letter3}${vowel3}${letter4}${vowel4}${letter5}${vowel5}${letter6}`
    );
  }
  combinations.push(sixLetterCombos.join("  "));

  return combinations;
}

function transliterate(combination: string): string {
  const letterSounds: { [key: string]: string } = {
    א: "(silent)",
    ע: "(silent)",
    ב: "V",
    ג: "G",
    ד: "D",
    ה: "H",
    ו: "V",
    ז: "Z",
    ח: "CH",
    ט: "T",
    י: "Y",
    כ: "CH",
    ל: "L",
    מ: "M",
    נ: "N",
    ס: "S",
    פ: "F",
    צ: "TZ",
    ק: "K",
    ר: "R",
    שׁ: "SH",
    שׂ: "S",
    בּ: "B",
    פּ: "P",
    כּ: "K",
    ת: "T",
  };
  const vowelSounds: { [key: string]: string } = {
    "ָ": "AH",
    "ַ": "AH",
    "ֵ": "EH",
    "ֶ": "EH",
    "ִ": "EE",
    "ֹ": "OH",
    "ֻ": "OO",
    "ְ": "(silent)",
  };

  let result = "";
  for (let i = 0; i < combination.length; i++) {
    const char = combination[i];
    if (letterSounds[char]) {
      result += letterSounds[char];
    } else if (vowelSounds[char]) {
      result += vowelSounds[char];
    } else {
      result += char;
    }
  }
  return result;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const letterCount = Math.min(
    Math.max(parseInt(searchParams.get("letters") || "3", 10), 1),
    22
  );
  const vowelCount = Math.min(
    Math.max(parseInt(searchParams.get("vowels") || "2", 10), 1),
    8
  );

  const selectedLetters = getRandomElements(hebrewLetters, letterCount);
  const selectedVowels = getRandomElements(hebrewVowels, vowelCount);

  const combinations = generateProgressiveCombinations(
    selectedLetters,
    selectedVowels
  );
  const answerKey = combinations.map((line) =>
    line
      .split(" ")
      .map((combo) => `${combo} ${transliterate(combo)}`)
      .join(" ")
  );

  const practiceSheet = {
    letters: selectedLetters.join(""),
    vowels: selectedVowels.join(""),
    vowelNames: selectedVowels
      .map((v) => vowelNames[hebrewVowels.indexOf(v)])
      .join(", "),
    practice: combinations,
    answerKey: answerKey,
  };

  return NextResponse.json(practiceSheet);
}
