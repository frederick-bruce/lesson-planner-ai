import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface WelcomeCardProps {
  userName: string;
  onReadMoreClick: () => void;
}

export default function WelcomeCard({
  userName,
  onReadMoreClick,
}: WelcomeCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Welcome back, {userName}!</CardTitle>
        <CardDescription>
          Here&apos;s what&apos;s new with Lesson Plan AI
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-5 space-y-2">
          <li>New feature: Collaborative lesson planning</li>
          <li>Improved AI model for more accurate and diverse lesson plans</li>
          <li>Added 100+ new templates across various subjects</li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button variant="link" onClick={onReadMoreClick} className="p-0">
          Read full update
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
