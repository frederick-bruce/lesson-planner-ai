/* eslint-disable @typescript-eslint/no-explicit-any */
import { internalAction } from "./_generated/server";
import { v } from "convex/values";
import { Webhook } from "svix";

export const fulfill = internalAction({
  args: {
    payload: v.string(),
    headers: v.object({
      svix_id: v.string(),
      svix_timestamp: v.string(),
      svix_signature: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
    if (!webhookSecret) {
      throw new Error("CLERK_WEBHOOK_SECRET is not defined");
    }

    const wh = new Webhook(webhookSecret);
    const payload = JSON.parse(args.payload);

    try {
      const evt = wh.verify(args.payload, {
        "svix-id": args.headers.svix_id,
        "svix-timestamp": args.headers.svix_timestamp,
        "svix-signature": args.headers.svix_signature,
      }) as any;
      return {
        type: evt.type,
        data: evt.data,
      };
    } catch (err) {
      console.error(err);
      throw new Error("Webhook verification failed");
    }
  },
});
