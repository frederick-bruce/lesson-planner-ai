"use client";

import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SubscriptionStatus() {
  const subscriptionStatus = useQuery(api.stripe.getSubscriptionStatus);

  if (!subscriptionStatus) {
    return null;
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Subscription Status</CardTitle>
        <CardDescription>Your current subscription information</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          <strong>Status:</strong>{" "}
          {subscriptionStatus.status || "No active subscription"}
        </p>
        {subscriptionStatus.tier && (
          <p>
            <strong>Tier:</strong> {subscriptionStatus.tier}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
