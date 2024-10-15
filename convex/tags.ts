import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Tag, TagId } from "./types";

export const create = mutation({
  args: { name: v.string() },
  handler: async (ctx, args): Promise<TagId> => {
    return await ctx.db.insert("tags", args);
  },
});

export const getAll = query({
  handler: async (ctx): Promise<Tag[]> => {
    return await ctx.db.query("tags").collect();
  },
});

export const getByName = query({
  args: { name: v.string() },
  handler: async (ctx, args): Promise<Tag | null> => {
    return await ctx.db
      .query("tags")
      .withIndex("by_name", (q) => q.eq("name", args.name))
      .unique();
  },
});