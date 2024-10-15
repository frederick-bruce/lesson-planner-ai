import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Assessment, AssessmentId, LessonPlanId } from "./types";

export const create = mutation({
  args: {
    lessonPlanId: v.id("lessonPlans"),
    type: v.string(),
    description: v.string(),
    criteria: v.array(v.string()),
  },
  handler: async (ctx, args): Promise<AssessmentId> => {
    return await ctx.db.insert("assessments", args);
  },
});

export const getByLessonPlan = query({
  args: { lessonPlanId: v.id("lessonPlans") },
  handler: async (ctx, args): Promise<Assessment[]> => {
    return await ctx.db
      .query("assessments")
      .withIndex("by_lesson_plan", (q) =>
        q.eq("lessonPlanId", args.lessonPlanId as LessonPlanId)
      )
      .collect();
  },
});

export const update = mutation({
  args: {
    id: v.id("assessments"),
    type: v.optional(v.string()),
    description: v.optional(v.string()),
    criteria: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args): Promise<AssessmentId> => {
    const { id, ...updates } = args;
    await ctx.db.patch(id as AssessmentId, updates);
    return id as AssessmentId;
  },
});

export const remove = mutation({
  args: { id: v.id("assessments") },
  handler: async (ctx, args): Promise<void> => {
    await ctx.db.delete(args.id as AssessmentId);
  },
});
