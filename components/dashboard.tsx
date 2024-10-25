"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="w-full h-full">
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8 h-full">
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Plan Usage</CardTitle>
              <CardDescription>
                This month&apos;s lesson plan generation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={60} className="w-full" />
              <p className="text-sm text-muted-foreground mt-2">
                18 / 30 plans generated
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Subscription</CardTitle>
              <CardDescription>Your current plan</CardDescription>
            </CardHeader>
            <CardContent>
              <Badge>Pro Plan</Badge>
              <p className="text-sm text-muted-foreground mt-2">
                Renews on Oct 1, 2023
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Get started quickly</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Link
                  href="/generate-hebrew-practice"
                  className="flex items-center w-full"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Hebrew Practice Sheet
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
