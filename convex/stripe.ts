import { action, internalAction, mutation, query } from "./_generated/server";
import { api, internal } from "./_generated/api";
import Stripe from "stripe";
import { Id } from "./_generated/dataModel";
import { v } from "convex/values";

const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY!, {
  apiVersion: "2024-09-30.acacia",
});

export const pay = action({
  args: {},
  handler: async (ctx) => {
    const clerkUser = await ctx.auth.getUserIdentity();
    const user = await ctx.runQuery(api.users.getCurrentUser, {});

    if (!user || !clerkUser) {
      throw new Error("User not authenticated!");
    }

    if (!clerkUser.emailVerified) {
      throw new Error("User email not verified!");
    }

    const domain = process.env.NEXT_PUBLIC_HOSTING_URL!;

    const session: Stripe.Response<Stripe.Checkout.Session> =
      await stripe.checkout.sessions.create({
        mode: "subscription",
        line_items: [
          {
            price: process.env.STRIPE_ONE_TIME_PRICE_ID!,
            quantity: 1,
          },
        ],
        customer_email: clerkUser.email,
        metadata: {
          userId: user._id,
        },
        success_url: `${domain}`,
        cancel_url: `${domain}`,
      });
    return session.url;
  },
});

// export const createCheckoutSession = mutation({
//   args: { priceId: v.string() },
//   handler: async (ctx, args) => {
//     const identity = await ctx.auth.getUserIdentity();
//     if (!identity) {
//       throw new Error("Not authenticated");
//     }

//     const user = await ctx.db
//       .query("users")
//       .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
//       .unique();

//     if (!user) {
//       throw new Error("User not found");
//     }

//     let stripeCustomerId = user.stripeCustomerId;

//     if (!stripeCustomerId) {
//       const customerData: Stripe.CustomerCreateParams = {
//         metadata: {
//           clerkId: identity.subject,
//           convexId: user._id,
//         },
//       };

//       if (identity.email) {
//         customerData.email = identity.email;
//       }

//       const customer = await stripe.customers.create(customerData);
//       stripeCustomerId = customer.id;
//       await ctx.db.patch(user._id, { stripeCustomerId });
//     }

//     const session = await stripe.checkout.sessions.create({
//       customer: stripeCustomerId,
//       mode: "subscription",
//       payment_method_types: ["card"],
//       line_items: [{ price: args.priceId, quantity: 1 }],
//       success_url: `${process.env.NEXT_PUBLIC_HOSTING_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${process.env.NEXT_PUBLIC_HOSTING_URL}/pricing`,
//     });

//     return session.url;
//   },
// });

export const createCheckoutSession = action({
  args: { priceId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const user = await ctx.runQuery(api.users.getUserByClerkId, {
      clerkId: identity.subject,
    });
    if (!user) {
      throw new Error("User not found");
    }

    let stripeCustomerId = user.stripeCustomerId;

    if (!stripeCustomerId) {
      const customerData: Stripe.CustomerCreateParams = {
        metadata: {
          clerkId: identity.subject,
          convexId: user._id,
        },
      };

      if (identity.email) {
        customerData.email = identity.email;
      }

      const customer = await stripe.customers.create(customerData);
      stripeCustomerId = customer.id;
      await ctx.runMutation(api.users.updateStripeCustomerId, {
        userId: user._id,
        stripeCustomerId,
      });
    }

    const session: Stripe.Checkout.Session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: args.priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_HOSTING_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_HOSTING_URL}/pricing`,
    });

    return session.url;
  },
});

export const getSubscriptionStatus = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) {
      return null;
    }

    return {
      status: user.subscriptionStatus,
      tier: user.subscriptionTier,
      endsOn: user.subscriptionEndsOn,
    };
  },
});

type Metadata = {
  userId: Id<"users">;
};

export const fulfill = internalAction({
  args: { signature: v.string(), payload: v.string() },
  handler: async ({ runQuery, runMutation }, { signature, payload }) => {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;
    try {
      const event = await stripe.webhooks.constructEventAsync(
        payload,
        signature,
        webhookSecret
      );
      const completedEvent = event.data.object as Stripe.Checkout.Session & {
        metadata: Metadata;
      };

      if (event.type === "checkout.session.completed") {
        const subscription = await stripe.subscriptions.retrieve(
          completedEvent.subscription as string
        );

        const userId = completedEvent.metadata.userId;

        await runMutation(internal.users.updateSubscriptionStatus, {
          userId,
          subscriptionId: subscription.id,
          subscriptionStatus: subscription.status,
          subscriptionTier: (subscription.items.data[0].price.nickname ||
            "default") as string,
          subscriptionEndsOn: subscription.current_period_end * 1000,
        });
      }

      if (event.type === "invoice.payment_succeeded") {
        const subscription = await stripe.subscriptions.retrieve(
          completedEvent.subscription as string
        );

        await runMutation(internal.users.updateSubscriptionById, {
          subscriptionId: subscription.id,
          subscriptionStatus: subscription.status,
          subscriptionTier: (subscription.items.data[0].price.nickname ||
            "default") as string,
          subscriptionEndsOn: subscription.current_period_end * 1000,
        });
      }

      return { success: true };
    } catch (error) {
      console.log(error);
      return { success: false, error: (error as { message: string }).message };
    }
  },
});
