import React from "react";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Loading from "@/components/loading";

export default function RecentPlans() {
  const lessonPlans = useQuery(api.lessonPlans.getByUser);

  if (!lessonPlans) {
    return <Loading />;
  }

  return (
    <>
      {lessonPlans.slice(0, 3).map((plan) => (
        <Card key={plan._id}>
          <CardHeader>
            <CardTitle>{plan.title}</CardTitle>
            <CardDescription>
              {plan.subject} | Grade {plan.gradeLevel}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Created on {new Date(plan._creationTime).toLocaleDateString()}
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href={`/lesson-plans/${plan._id}`}>
              <Button variant="outline">Edit</Button>
            </Link>
            <Button variant="ghost">Delete</Button>
          </CardFooter>
        </Card>
      ))}
    </>
  );
}
