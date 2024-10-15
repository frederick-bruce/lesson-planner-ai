import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    lessonPlanId: v.id("lessonPlans"),
    title: v.string(),
    description: v.string(),
    duration: v.number(),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("activities", args);
  },
});

export const getByLessonPlan = query({
  args: { lessonPlanId: v.id("lessonPlans") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("activities")
      .withIndex("by_lesson_plan", (q) =>
        q.eq("lessonPlanId", args.lessonPlanId)
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
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    return await ctx.db.patch(id, updates);
  },
});

export const remove = mutation({
  args: { id: v.id("activities") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});
