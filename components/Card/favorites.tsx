import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function FavoritesCard() {
  // In a real application, you'd fetch favorites from your backend
  const hasFavorites = false;

  if (hasFavorites) {
    // Render favorites list
    return (
      <Card>
        <CardHeader>
          <CardTitle>Favorites</CardTitle>
          <CardDescription>Your favorite lesson plans</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Render list of favorite lesson plans here */}
        </CardContent>
      </Card>
    );
  }

  // Render empty state
  return (
    <Card>
      <CardHeader>
        <CardTitle>No favorites yet</CardTitle>
        <CardDescription>
          Start marking lesson plans as favorites to see them here
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Link href="/lesson-plans/new">
          <Button variant="outline">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Lesson Plan
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
