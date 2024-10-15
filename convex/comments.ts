import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Comment, CommentId, LessonPlanId, UserId } from "./types";

export const create = mutation({
  args: {
    lessonPlanId: v.id("lessonPlans"),
    content: v.string(),
  },
  handler: async (ctx, args): Promise<CommentId> => {
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
    return await ctx.db.insert("comments", {
      ...args,
      userId: user._id as UserId,
      createdAt: Date.now(),
    });
  },
});

export const getByLessonPlan = query({
  args: { lessonPlanId: v.id("lessonPlans") },
  handler: async (ctx, args): Promise<Comment[]> => {
    return await ctx.db
      .query("comments")
      .withIndex("by_lesson_plan", (q) =>
        q.eq("lessonPlanId", args.lessonPlanId as LessonPlanId)
      )
      .order("desc")
      .collect();
  },
});

export const remove = mutation({
  args: { id: v.id("comments") },
  handler: async (ctx, args): Promise<void> => {
    await ctx.db.delete(args.id as CommentId);
  },
});
