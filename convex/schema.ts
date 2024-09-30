import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    clerkId: v.string(),
    imageUrl: v.string(),
  }).index("by_clerk_id", ["clerkId"]),

  lessonPlans: defineTable({
    title: v.string(),
    description: v.string(),
    subject: v.string(),
    gradeLevel: v.string(),
    duration: v.number(),
    objectives: v.array(v.string()),
    materials: v.array(v.string()),
    createdBy: v.id("users"),
    isPublic: v.boolean(),
  }).index("by_created_by", ["createdBy"]),

  activities: defineTable({
    lessonPlanId: v.id("lessonPlans"),
    title: v.string(),
    description: v.string(),
    duration: v.number(),
    order: v.number(),
  }).index("by_lesson_plan", ["lessonPlanId"]),

  assessments: defineTable({
    lessonPlanId: v.id("lessonPlans"),
    type: v.string(),
    description: v.string(),
    criteria: v.array(v.string()),
  }).index("by_lesson_plan", ["lessonPlanId"]),

  comments: defineTable({
    lessonPlanId: v.id("lessonPlans"),
    userId: v.id("users"),
    content: v.string(),
    createdAt: v.number(),
  }).index("by_lesson_plan", ["lessonPlanId"]),

  tags: defineTable({
    name: v.string(),
  }).index("by_name", ["name"]),

  lessonPlanTags: defineTable({
    lessonPlanId: v.id("lessonPlans"),
    tagId: v.id("tags"),
  })
    .index("by_lesson_plan", ["lessonPlanId"])
    .index("by_tag", ["tagId"]),
});
