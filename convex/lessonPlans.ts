import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

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
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const userId = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();
    if (!userId) {
      throw new Error("User not found");
    }
    return await ctx.db.insert("lessonPlans", {
      ...args,
      createdBy: userId._id,
    });
  },
});

export const getById = query({
  args: { id: v.id("lessonPlans") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getByUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("lessonPlans")
      .withIndex("by_created_by", (q) => q.eq("createdBy", args.userId))
      .collect();
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
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    return await ctx.db.patch(id, updates);
  },
});

export const remove = mutation({
  args: { id: v.id("lessonPlans") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});
