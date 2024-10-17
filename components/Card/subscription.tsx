import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SubscriptionCard() {
  // In a real application, you'd fetch this data from your backend
  const planName = "Pro Plan";
  const renewalDate = new Date("2023-10-01");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription</CardTitle>
        <CardDescription>Your current plan</CardDescription>
      </CardHeader>
      <CardContent>
        <Badge>{planName}</Badge>
        <p className="text-sm text-muted-foreground mt-2">
          Renews on {renewalDate.toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );
}
