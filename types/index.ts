import { Id } from "@/convex/_generated/dataModel";

// Convex ID types
export type UserId = Id<"users">;
export type LessonPlanId = Id<"lessonPlans">;
export type ActivityId = Id<"activities">;
export type AssessmentId = Id<"assessments">;
export type CommentId = Id<"comments">;
export type TagId = Id<"tags">;

// Other custom types
export interface User {
  _id: UserId;
  name: string;
  email: string;
  clerkId: string;
  imageUrl: string;
}

export interface LessonPlan {
  _id: LessonPlanId;
  title: string;
  description: string;
  subject: string;
  gradeLevel: string;
  duration: number;
  objectives: string[];
  materials: string[];
  createdBy: UserId;
  isPublic: boolean;
}

export interface Activity {
  _id: ActivityId;
  lessonPlanId: LessonPlanId;
  title: string;
  description: string;
  duration: number;
  order: number;
}

export interface Assessment {
  _id: AssessmentId;
  lessonPlanId: LessonPlanId;
  type: string;
  description: string;
  criteria: string[];
}

export interface Comment {
  _id: CommentId;
  lessonPlanId: LessonPlanId;
  userId: UserId;
  content: string;
  createdAt: number;
}

export interface Tag {
  _id: TagId;
  name: string;
}

