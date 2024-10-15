import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { LessonPlanId, TagId, Tag } from "./types";

export const addTagToLessonPlan = mutation({
  args: {
    lessonPlanId: v.id("lessonPlans"),
    tagId: v.id("tags"),
  },
  handler: async (ctx, args): Promise<void> => {
    await ctx.db.insert("lessonPlanTags", args);
  },
});

export const removeTagFromLessonPlan = mutation({
  args: {
    lessonPlanId: v.id("lessonPlans"),
    tagId: v.id("tags"),
  },
  handler: async (ctx, args): Promise<void> => {
    const lessonPlanTag = await ctx.db
      .query("lessonPlanTags")
      .withIndex("by_lesson_plan", (q) =>
        q.eq("lessonPlanId", args.lessonPlanId as LessonPlanId)
      )
      .filter((q) => q.eq(q.field("tagId"), args.tagId as TagId))
      .unique();
    if (lessonPlanTag) {
      await ctx.db.delete(lessonPlanTag._id);
    }
  },
});

export const getTagsByLessonPlan = query({
  args: { lessonPlanId: v.id("lessonPlans") },
  handler: async (ctx, args): Promise<Tag[]> => {
    const lessonPlanTags = await ctx.db
      .query("lessonPlanTags")
      .withIndex("by_lesson_plan", (q) =>
        q.eq("lessonPlanId", args.lessonPlanId as LessonPlanId)
      )
      .collect();

    const tagIds = lessonPlanTags.map((lpt) => lpt.tagId as TagId);

    if (tagIds.length === 0) {
      return [];
    }

    const tags = await Promise.all(tagIds.map((tagId) => ctx.db.get(tagId)));

    return tags.filter((tag): tag is Tag => tag !== null);
  },
});

export const getLessonPlansByTag = query({
  args: { tagId: v.id("tags") },
  handler: async (ctx, args): Promise<LessonPlanId[]> => {
    const lessonPlanTags = await ctx.db
      .query("lessonPlanTags")
      .withIndex("by_tag", (q) => q.eq("tagId", args.tagId as TagId))
      .collect();
    return lessonPlanTags.map((lpt) => lpt.lessonPlanId as LessonPlanId);
  },
});
