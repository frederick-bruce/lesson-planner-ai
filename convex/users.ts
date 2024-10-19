import { internalMutation, query, mutation } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { Id } from "./_generated/dataModel";

export const createUser = internalMutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    imageUrl: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("users", {
      clerkId: args.clerkId,
      email: args.email,
      imageUrl: args.imageUrl,
      name: args.name,
      stripeCustomerId: undefined,
      subscriptionId: undefined,
      subscriptionStatus: undefined,
      subscriptionTier: undefined,
      trialEndingSoon: false,
    });
  },
});

export const updateUser = internalMutation({
  args: {
    clerkId: v.string(),
    imageUrl: v.string(),
    name: v.string(),
  },
  async handler(ctx, args) {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    await ctx.db.patch(user._id, {
      imageUrl: args.imageUrl,
      name: args.name,
    });
  },
});

export const deleteUser = internalMutation({
  args: { clerkId: v.string() },
  async handler(ctx, args) {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    await ctx.db.delete(user._id);
  },
});

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
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

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      imageUrl: user.imageUrl,
      stripeCustomerId: user.stripeCustomerId,
      subscriptionId: user.subscriptionId,
      subscriptionStatus: user.subscriptionStatus,
      subscriptionTier: user.subscriptionTier,
      trialEndingSoon: user.trialEndingSoon,
    };
  },
});

// export const getUserByClerkId = query({
//   args: { clerkId: v.string() },
//   handler: async (ctx, args) => {
//     const user = await ctx.db
//       .query("users")
//       .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
//       .unique();

//     if (!user) {
//       throw new Error("User not found");
//     }

//     return user;
//   },
// });

// export const updateStripeCustomerId = internalMutation({
//   args: {
//     userId: v.id("users"),
//     stripeCustomerId: v.string(),
//   },
//   async handler(ctx, args) {
//     await ctx.db.patch(args.userId, {
//       stripeCustomerId: args.stripeCustomerId,
//     });
//   },
// });

export const updateStripeCustomerId = mutation({
  args: { userId: v.id("users"), stripeCustomerId: v.string() },
  handler: async (ctx, args) => {
    const { userId, stripeCustomerId } = args;

    const user = await ctx.db.get(userId);
    if (!user) {
      throw new Error("User not found");
    }

    await ctx.db.patch(userId, { stripeCustomerId });
  },
});

export const getUserByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();
    return user;
  },
});

export const updateSubscriptionStatus = internalMutation({
  args: {
    userId: v.id("users"),
    subscriptionId: v.string(),
    subscriptionStatus: v.string(),
    subscriptionTier: v.string(),
    subscriptionEndsOn: v.number(),
  },
  async handler(ctx, args) {
    const user = await ctx.db.get(args.userId);
    if (!user) {
      throw new ConvexError("User not found");
    }

    await ctx.db.patch(args.userId, {
      subscriptionId: args.subscriptionId,
      subscriptionStatus: args.subscriptionStatus,
      subscriptionTier: args.subscriptionTier,
      subscriptionEndsOn: args.subscriptionEndsOn,
    });
  },
});

export const getUserByStripeCustomerId = query({
  args: { stripeCustomerId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_stripe_customer_id", (q) =>
        q.eq("stripeCustomerId", args.stripeCustomerId)
      )
      .unique();

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  },
});

export const updateTrialEndingSoon = internalMutation({
  args: {
    userId: v.id("users"),
    trialEndingSoon: v.boolean(),
  },
  async handler(ctx, args) {
    await ctx.db.patch(args.userId, {
      trialEndingSoon: args.trialEndingSoon,
    });
  },
});

export const updateSubscriptionById = internalMutation({
  args: {
    subscriptionId: v.string(),
    subscriptionStatus: v.string(),
    subscriptionTier: v.string(),
    subscriptionEndsOn: v.number(),
  },
  async handler(ctx, args) {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("subscriptionId"), args.subscriptionId))
      .unique();

    if (!user) {
      throw new ConvexError("User with this subscription ID not found");
    }

    await ctx.db.patch(user._id, {
      subscriptionStatus: args.subscriptionStatus,
      subscriptionTier: args.subscriptionTier,
      subscriptionEndsOn: args.subscriptionEndsOn,
    });
  },
});
