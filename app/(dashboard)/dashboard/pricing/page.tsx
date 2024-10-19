import { SubscriptionPlans } from "@/components/subscription-plans";
import { SubscriptionStatus } from "@/components/subscription-status";

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Pricing Plans</h1>
      <SubscriptionStatus />
      <div className="mt-8">
        <SubscriptionPlans />
      </div>
    </div>
  );
}
