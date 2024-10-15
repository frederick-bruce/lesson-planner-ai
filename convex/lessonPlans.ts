// convex/lessonPlans.ts

import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { LessonPlan, LessonPlanId, UserId } from "./types";

export const create = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    subject: v.string(),
    gradeLevel: v.string(),
    duration: v.number(),
    objectives: v.array(v.string()),
    materials: v.array(v.string()),
    isPublic: v.boolean(),
  },
  handler: async (ctx, args): Promise<LessonPlanId> => {
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
    return await ctx.db.insert("lessonPlans", {
      ...args,
      createdBy: user._id as UserId,
    });
  },
});

export const getById = query({
  args: { id: v.id("lessonPlans") },
  handler: async (ctx, args): Promise<LessonPlan | null> => {
    return await ctx.db.get(args.id as LessonPlanId);
  },
});

export const getByUser = query({
  handler: async (ctx): Promise<LessonPlan[]> => {
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
    return await ctx.db
      .query("lessonPlans")
      .withIndex("by_created_by", (q) => q.eq("createdBy", user._id as UserId))
      .order("desc")
      .take(100);
  },
});

export const update = mutation({
  args: {
    id: v.id("lessonPlans"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    subject: v.optional(v.string()),
    gradeLevel: v.optional(v.string()),
    duration: v.optional(v.number()),
    objectives: v.optional(v.array(v.string())),
    materials: v.optional(v.array(v.string())),
    isPublic: v.optional(v.boolean()),
  },
  handler: async (ctx, args): Promise<LessonPlanId> => {
    const { id, ...updates } = args;
    await ctx.db.patch(id as LessonPlanId, updates);
    return id as LessonPlanId;
  },
});

export const remove = mutation({
  args: { id: v.id("lessonPlans") },
  handler: async (ctx, args): Promise<void> => {
    await ctx.db.delete(args.id as LessonPlanId);
  },
});

export const getRecentLessonPlans = query({
  args: { limit: v.optional(v.number()) },
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

    const lessonPlans = await ctx.db
      .query("lessonPlans")
      .withIndex("by_created_by", (q) => q.eq("createdBy", user._id))
      .order("desc")
      .take(args.limit || 5);

    return lessonPlans.map((lessonPlan) => ({
      _id: lessonPlan._id,
      title: lessonPlan.title,
      subject: lessonPlan.subject,
      gradeLevel: lessonPlan.gradeLevel,
      createdAt: lessonPlan._creationTime,
    }));
  },
});
