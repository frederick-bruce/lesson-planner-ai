import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    clerkId: v.string(),
    imageUrl: v.string(),
  }).index("by_clerk_id", ["clerkId"]),

  hebrewPracticeSheets: defineTable({
    userId: v.id("users"),
    letters: v.string(),
    vowels: v.string(),
    vowelNames: v.string(),
    practice: v.array(v.string()),
    answerKey: v.array(v.string()),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("byCreationTime", ["createdAt"]),
});
