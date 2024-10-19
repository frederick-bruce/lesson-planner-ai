"use client"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const tiers = [
  {
    name: "Hobby",
    id: "hobby",
    priceMonthly: "$15",
    description: "All the basics for starting a new business",
    features: ["Feature 1", "Feature 2", "Feature 3"],
    priceId: "price_1234567890",
  },
  {
    name: "Professional",
    id: "professional",
    priceMonthly: "$25",
    description: "Everything in Hobby plus more storage and features",
    features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"],
    priceId: "price_0987654321",
  },
];

export function SubscriptionPlans() {
  const createCheckoutSession = useAction(api.stripe.createCheckoutSession);
  const [loadingTier, setLoadingTier] = useState<string | null>(null);

  const onSelectTier = async (priceId: string, tierId: string) => {
    setLoadingTier(tierId);
    try {
      const sessionUrl = await createCheckoutSession({ priceId });
      if (sessionUrl) {
        window.location.href = sessionUrl;
      }
    } catch (error) {
      console.error("Failed to create checkout session:", error);
    } finally {
      setLoadingTier(null);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {tiers.map((tier) => (
        <Card key={tier.id} className="flex flex-col justify-between">
          <CardHeader>
            <CardTitle>{tier.name}</CardTitle>
            <CardDescription>{tier.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{tier.priceMonthly}</p>
            <ul className="mt-4 space-y-2">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-green-500"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              onClick={() => onSelectTier(tier.priceId, tier.id)}
              disabled={loadingTier === tier.id}
            >
              {loadingTier === tier.id ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {loadingTier === tier.id ? "Loading..." : "Select Plan"}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
