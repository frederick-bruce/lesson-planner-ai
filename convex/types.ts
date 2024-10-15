import { Id } from "./_generated/dataModel";

// Convex ID types
export type UserId = Id<"users">;
export type LessonPlanId = Id<"lessonPlans">;
export type ActivityId = Id<"activities">;
export type AssessmentId = Id<"assessments">;
export type CommentId = Id<"comments">;
export type TagId = Id<"tags">;

// Document types
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
  _creationTime: number;
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
  _creationTime: number;
}

export interface LessonPlanTag {
  _id: Id<"lessonPlanTags">;
  lessonPlanId: LessonPlanId;
  tagId: TagId;
}

// You can add more types as needed for your Convex functions
