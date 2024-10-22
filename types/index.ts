import { Id } from "@/convex/_generated/dataModel";

// Convex ID types
export type UserId = Id<"users">;


// Document types
export interface User {
  _id: UserId;
  name: string;
  email: string;
  clerkId: string;
  imageUrl: string;
}

