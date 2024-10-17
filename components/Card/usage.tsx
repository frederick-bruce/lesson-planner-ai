import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function UsageCard() {
  // In a real application, you'd fetch this data from your backend
  const plansGenerated = 18;
  const totalPlans = 30;
  const percentageUsed = (plansGenerated / totalPlans) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Plan Usage</CardTitle>
        <CardDescription>
          This month&apos;s lesson plan generation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Progress value={percentageUsed} className="w-full" />
        <p className="text-sm text-muted-foreground mt-2">
          {plansGenerated} / {totalPlans} plans generated
        </p>
      </CardContent>
    </Card>
  );
}
