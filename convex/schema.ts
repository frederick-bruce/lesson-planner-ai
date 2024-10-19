import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    imageUrl: v.string(),
    clerkId: v.string(),
    stripeCustomerId: v.optional(v.string()),
    subscriptionId: v.optional(v.string()),
    subscriptionStatus: v.optional(v.string()),
    subscriptionTier: v.optional(v.string()),
    subscriptionEndsOn: v.optional(v.number()),
    trialEndingSoon: v.optional(v.boolean()),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_stripe_customer_id", ["stripeCustomerId"])
    .index("by_subscription_id", ["subscriptionId"]),

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

  lessons: defineTable({
    userId: v.id("users"),
    title: v.string(),
    description: v.string(),
    content: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("byCreationTime", ["createdAt"]),
});
