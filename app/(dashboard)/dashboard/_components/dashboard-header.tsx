import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types";
import { Skeleton } from "@/components/skeleton";

interface DashboardHeaderProps {
  user: User | null;
  isLoading: boolean;
}

export function DashboardHeader({ user, isLoading }: DashboardHeaderProps) {
  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Dashboard</CardTitle>
        {!isLoading && user ? (
          <Avatar>
            <AvatarImage src={user.imageUrl} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        ) : (
          <Skeleton className="h-12 w-12 rounded-full" />
        )}
      </CardHeader>
      <CardContent>
        {!isLoading && user ? (
          <>
            <CardDescription className="text-xl">
              Welcome back, {user.name}!
            </CardDescription>
            <p className="mt-2 text-sm text-muted-foreground">
              Here's an overview of your recent activity and quick actions.
            </p>
          </>
        ) : (
          <>
            <Skeleton className="h-6 w-1/2 mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </>
        )}
      </CardContent>
    </Card>
  );
}
