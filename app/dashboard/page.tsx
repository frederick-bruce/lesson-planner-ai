"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, HelpCircle, PlusCircle, Settings } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const recentPlans = [
    {
      id: 1,
      title: "Introduction to Photosynthesis",
      subject: "Biology",
      grade: "9-12",
      date: "2023-09-15",
    },
    {
      id: 2,
      title: "World War II: Causes and Effects",
      subject: "History",
      grade: "6-8",
      date: "2023-09-14",
    },
    {
      id: 3,
      title: "Algebraic Equations",
      subject: "Mathematics",
      grade: "9-12",
      date: "2023-09-13",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
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
                <PlusCircle className="mr-2 h-4 w-4" />
                New Lesson Plan
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Link href="/generate-hebrew-practice">
                  New Hebrew Practice Sheet
                </Link>
              </Button>

              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                My Lesson Plans
              </Button>
            </CardContent>
          </Card>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="recent">Recent Plans</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Welcome back, Teacher!</CardTitle>
                <CardDescription>
                  Here&apos;s what&apos;s new with Lesson Plan AI
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>New feature: Collaborative lesson planning</li>
                  <li>
                    Improved AI model for more accurate and diverse lesson plans
                  </li>
                  <li>Added 100+ new templates across various subjects</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="link">Read full update</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="recent" className="space-y-4">
            {recentPlans.map((plan) => (
              <Card key={plan.id}>
                <CardHeader>
                  <CardTitle>{plan.title}</CardTitle>
                  <CardDescription>
                    {plan.subject} | Grade {plan.grade}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Created on {plan.date}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Edit</Button>
                  <Button variant="ghost">Delete</Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
          <TabsContent value="favorites" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>No favorites yet</CardTitle>
                <CardDescription>
                  Start marking lesson plans as favorites to see them here
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create New Lesson Plan
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex justify-between">
          <Button variant="ghost">
            <Settings className="mr-2 h-4 w-4" />
            Account Settings
          </Button>
          <Button variant="ghost">
            <HelpCircle className="mr-2 h-4 w-4" />
            Help & Support
          </Button>
        </div>
      </div>
    </div>
  );
}
