import { httpRouter } from "convex/server";
import { internal } from "./_generated/api";
import { httpAction } from "./_generated/server";

const http = httpRouter();

http.route({
  path: "/stripe",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const signature = request.headers.get("stripe-signature") as string;

    const result = await ctx.runAction(internal.stripe.fulfill, {
      payload: await request.text(),
      signature,
    });

    if (result.success) {
      return new Response(null, {
        status: 200,
      });
    } else {
      return new Response("Webhook Error", {
        status: 400,
      });
    }
  }),
});

http.route({
  path: "/clerk",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const payloadString = await request.text();
    const headerPayload = request.headers;

    try {
      const result = await ctx.runAction(internal.clerk.fulfill, {
        payload: payloadString,
        headers: {
          svix_id: headerPayload.get("svix-id")!,
          svix_timestamp: headerPayload.get("svix-timestamp")!,
          svix_signature: headerPayload.get("svix-signature")!,
        },
      });

      console.log(result.data);

      switch (result.type) {
        case "user.created":
          await ctx.runMutation(internal.users.createUser, {
            email: result.data.email_addresses[0]?.email_address,
            clerkId: result.data.id,
            name: `${result.data.first_name} ${result.data.last_name}`,
            imageUrl: result.data.image_url,
          });
          break;
        case "user.updated":
          await ctx.runMutation(internal.users.updateUser, {
            clerkId: result.data.id,
            imageUrl: result.data.image_url,
            name: `${result.data.first_name} ${result.data.last_name}`,
          });
          break;
      }

      return new Response(null, {
        status: 200,
      });
    } catch (err) {
      console.error(err);
      return new Response("Webhook Error", {
        status: 400,
      });
    }
  }),
});

export default http;
