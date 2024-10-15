import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Activity, ActivityId, LessonPlanId } from "@/types";

export const create = mutation({
  args: {
    lessonPlanId: v.id("lessonPlans"),
    title: v.string(),
    description: v.string(),
    duration: v.number(),
    order: v.number(),
  },
  handler: async (ctx, args): Promise<ActivityId> => {
    return await ctx.db.insert("activities", args);
  },
});

export const getByLessonPlan = query({
  args: { lessonPlanId: v.id("lessonPlans") },
  handler: async (ctx, args): Promise<Activity[]> => {
    return await ctx.db
      .query("activities")
      .withIndex("by_lesson_plan", (q) =>
        q.eq("lessonPlanId", args.lessonPlanId as LessonPlanId)
      )
      .collect();
  },
});

export const update = mutation({
  args: {
    id: v.id("activities"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    duration: v.optional(v.number()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args): Promise<ActivityId> => {
    const { id, ...updates } = args;
    await ctx.db.patch(id as ActivityId, updates);
    return id as ActivityId;
  },
});

export const remove = mutation({
  args: { id: v.id("activities") },
  handler: async (ctx, args): Promise<void> => {
    await ctx.db.delete(args.id as ActivityId);
  },
});
