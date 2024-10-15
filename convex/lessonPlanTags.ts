import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const addTagToLessonPlan = mutation({
  args: {
    lessonPlanId: v.id("lessonPlans"),
    tagId: v.id("tags"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("lessonPlanTags", args);
  },
});

export const removeTagFromLessonPlan = mutation({
  args: {
    lessonPlanId: v.id("lessonPlans"),
    tagId: v.id("tags"),
  },
  handler: async (ctx, args) => {
    const lessonPlanTag = await ctx.db
      .query("lessonPlanTags")
      .withIndex("by_lesson_plan", (q) =>
        q.eq("lessonPlanId", args.lessonPlanId)
      )
      .filter((q) => q.eq(q.field("tagId"), args.tagId))
      .unique();
    if (lessonPlanTag) {
      await ctx.db.delete(lessonPlanTag._id);
    }
  },
});

export const getTagsByLessonPlan = query({
  args: { lessonPlanId: v.id("lessonPlans") },
  handler: async (ctx, args) => {
    const lessonPlanTags = await ctx.db
      .query("lessonPlanTags")
      .withIndex("by_lesson_plan", (q) =>
        q.eq("lessonPlanId", args.lessonPlanId)
      )
      .collect();
    const tagIds = lessonPlanTags.map((lpt) => lpt.tagId);
    return await Promise.all(tagIds.map((id) => ctx.db.get(id)));
  },
});

export const getLessonPlansByTag = query({
  args: { tagId: v.id("tags") },
  handler: async (ctx, args) => {
    const lessonPlanTags = await ctx.db
      .query("lessonPlanTags")
      .withIndex("by_tag", (q) => q.eq("tagId", args.tagId))
      .collect();
    const lessonPlanIds = lessonPlanTags.map((lpt) => lpt.lessonPlanId);
    return await Promise.all(lessonPlanIds.map((id) => ctx.db.get(id)));
  },
});
