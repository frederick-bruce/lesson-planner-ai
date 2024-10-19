import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  try {
    await convex.action(api.stripe.handleWebhook, { body, signature });
    return NextResponse.json({ received: true });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}
