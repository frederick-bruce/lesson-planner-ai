import { mutation } from "./_generated/server";
import { query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {
    limit: v.optional(v.number()),
    cursor: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { limit = 10, cursor } = args;

    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) {
      throw new Error("User not found");
    }

    let practiceSheetQuery = ctx.db
      .query("hebrewPracticeSheets")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .order("desc");

    if (cursor) {
      practiceSheetQuery = practiceSheetQuery.filter((q) =>
        q.lt(q.field("_creationTime"), parseInt(cursor, 10))
      );
    }

    const practiceSheets = await practiceSheetQuery.take(limit);

    const newCursor =
      practiceSheets.length === limit
        ? practiceSheets[practiceSheets.length - 1]._creationTime.toString()
        : null;

    return {
      practiceSheets,
      cursor: newCursor,
    };
  },
});

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

  // Single letter or vowel
  combinations.push(getRandomElements([...letters, ...vowels], 7).join(" "));

  // Two-letter combinations with vowels
  combinations.push(
    Array(5)
      .fill(null)
      .map(() => {
        const [letter1, letter2] = getRandomElements(letters, 2);
        const vowel = getRandomElements(vowels, 1)[0];
        return `${letter1}${vowel}${letter2}`;
      })
      .join(" ")
  );

  // Three-letter combinations with vowels
  combinations.push(
    Array(4)
      .fill(null)
      .map(() => {
        const [letter1, letter2, letter3] = getRandomElements(letters, 3);
        const [vowel1, vowel2] = getRandomElements(vowels, 2);
        return `${letter1}${vowel1}${letter2}${vowel2}${letter3}`;
      })
      .join(" ")
  );

  // Four-letter combinations with vowels
  combinations.push(
    Array(3)
      .fill(null)
      .map(() => {
        const [letter1, letter2, letter3, letter4] = getRandomElements(
          letters,
          4
        );
        const [vowel1, vowel2, vowel3] = getRandomElements(vowels, 3);
        return `${letter1}${vowel1}${letter2}${vowel2}${letter3}${vowel3}${letter4}`;
      })
      .join(" ")
  );

  // Five-letter combinations with vowels
  combinations.push(
    Array(2)
      .fill(null)
      .map(() => {
        const [letter1, letter2, letter3, letter4, letter5] = getRandomElements(
          letters,
          5
        );
        const [vowel1, vowel2, vowel3, vowel4] = getRandomElements(vowels, 4);
        return `${letter1}${vowel1}${letter2}${vowel2}${letter3}${vowel3}${letter4}${vowel4}${letter5}`;
      })
      .join("  ")
  );

  // Six-letter combinations with vowels
  combinations.push(
    Array(2)
      .fill(null)
      .map(() => {
        const [letter1, letter2, letter3, letter4, letter5, letter6] =
          getRandomElements(letters, 6);
        const [vowel1, vowel2, vowel3, vowel4, vowel5] = getRandomElements(
          vowels,
          5
        );
        return `${letter1}${vowel1}${letter2}${vowel2}${letter3}${vowel3}${letter4}${vowel4}${letter5}${vowel5}${letter6}`;
      })
      .join("  ")
  );

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

  return combination
    .split("")
    .map((char) => letterSounds[char] || vowelSounds[char] || char)
    .join("");
}

export const generate = mutation({
  args: {
    letterCount: v.number(),
    vowelCount: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) {
      throw new Error("User not found");
    }

    const letterCount = Math.min(Math.max(args.letterCount, 1), 22);
    const vowelCount = Math.min(Math.max(args.vowelCount, 1), 8);

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
      userId: user._id,
      letters: selectedLetters.join(""),
      vowels: selectedVowels.join(""),
      vowelNames: selectedVowels
        .map((v) => vowelNames[hebrewVowels.indexOf(v)])
        .join(", "),
      practice: combinations,
      answerKey: answerKey,
      createdAt: Date.now(),
    };

    // Save the practice sheet to the database
    const id = await ctx.db.insert("hebrewPracticeSheets", practiceSheet);

    return { id, ...practiceSheet };
  },
});
