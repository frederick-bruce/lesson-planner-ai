import React from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "circle" | "text";
  width?: string | number;
  height?: string | number;
}

export function Skeleton({
  className,
  variant = "default",
  width,
  height,
  ...props
}: SkeletonProps) {
  const baseStyles = "animate-pulse bg-muted";

  const variantStyles = {
    default: "rounded-md",
    circle: "rounded-full",
    text: "rounded h-4 w-full",
  };

  const style: React.CSSProperties = {
    width: width,
    height: height,
  };

  return (
    <div
      className={cn(baseStyles, variantStyles[variant], className)}
      style={style}
      {...props}
    />
  );
}

export function SkeletonText({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      <Skeleton variant="text" className="w-[80%]" />
      <Skeleton variant="text" className="w-[100%]" />
      <Skeleton variant="text" className="w-[70%]" />
    </div>
  );
}

export function SkeletonCard({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("space-y-5", className)} {...props}>
      <Skeleton className="h-40 w-full" />
      <div className="space-y-2">
        <Skeleton variant="text" className="w-[60%]" />
        <Skeleton variant="text" className="w-[80%]" />
        <Skeleton variant="text" className="w-[70%]" />
      </div>
    </div>
  );
}
