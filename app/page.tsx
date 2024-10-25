"use client";
import Banner from "@/components/banner";
import Dashboard from "@/components/dashboard";
import Features from "@/components/features";
import { Authenticated, Unauthenticated } from "convex/react";

export default function HomePage() {
  return (
    <>
      <Unauthenticated>
        <Banner />
        <Features />
      </Unauthenticated>
      <Authenticated>
        <Dashboard />
      </Authenticated>
    </>
  );
}
