import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Basic",
    price: "$9.99",
    description: "Perfect for individual teachers",
    features: [
      "10 AI-generated lesson plans per month",
      "Basic customization options",
      "Email support",
    ],
  },
  {
    name: "Pro",
    price: "$24.99",
    description: "Ideal for experienced educators",
    features: [
      "Unlimited AI-generated lesson plans",
      "Advanced customization options",
      "Priority email support",
      "Access to premium resources",
    ],
  },
  {
    name: "School",
    price: "$99.99",
    description: "Best for entire schools or districts",
    features: [
      "Unlimited AI-generated lesson plans for all teachers",
      "Full customization and branding options",
      "24/7 phone and email support",
      "Dedicated account manager",
      "Professional development workshops",
    ],
  },
];

export default function PlansPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">
          Choose Your Plan
        </h1>
        <p className="text-xl text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Select the perfect plan for your needs and start creating AI-powered
          lesson plans today.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={index === 1 ? "border-purple-500 border-2" : ""}
            >
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold mb-4">
                  {plan.price}
                  <span className="text-base font-normal text-muted-foreground">
                    /month
                  </span>
                </p>
                <ul className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={index === 1 ? "default" : "outline"}
                >
                  Choose Plan
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Not sure which plan is right for you?
          </p>
          <Link
            href="/contact"
            className="text-purple-600 hover:underline font-medium"
          >
            Contact us for a personalized recommendation
          </Link>
        </div>
      </div>
    </div>
  );
}
