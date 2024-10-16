import { Id } from "./_generated/dataModel";

// Convex ID types
export type UserId = Id<"users">;
export type LessonPlanId = Id<"lessonPlans">;
export type ActivityId = Id<"activities">;
export type AssessmentId = Id<"assessments">;
export type CommentId = Id<"comments">;
export type TagId = Id<"tags">;
export type WorksheetId = Id<"worksheets">;
export type WorksheetTemplateId = Id<"worksheetTemplates">;

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

export interface Worksheet {
  _id: WorksheetId;
  title: string;
  subject: string;
  gradeLevel: string;
  isPublic: boolean;
  createdBy: UserId;
  parameters: WorksheetParameter[];
  content: string;
  _creationTime: number;
}

export interface WorksheetTemplate {
  _id: WorksheetTemplateId;
  name: string;
  subject: string;
  parameters: WorksheetTemplateParameter[];
  _creationTime: number;
}

// Parameter types
export interface WorksheetParameter {
  name: string;
  label: string;
  type: string;
  value: string | number;
}

export interface WorksheetTemplateParameter {
  name: string;
  label: string;
  type: string;
  options?: string[];
  min?: number;
  max?: number;
}

// Additional types for the WorksheetCreator component
export interface Parameter {
  name: string;
  label: string;
  type: string;
  options?: string[];
  min?: number;
  max?: number;
  value?: string | number;
}

// WorksheetSummary type for use in list views
export interface WorksheetSummary {
  _id: WorksheetId;
  title: string;
  subject: string;
  gradeLevel: string;
  createdAt: number;
  isPublic: boolean;
  createdBy: UserId;
}

// LessonPlanSummary type for use in list views
export interface LessonPlanSummary {
  _id: LessonPlanId;
  title: string;
  subject: string;
  gradeLevel: string;
  duration: number;
  createdAt: number;
  isPublic: boolean;
  createdBy: UserId;
}

// UserProfile type for use in profile views
export interface UserProfile {
  _id: UserId;
  name: string;
  email: string;
  imageUrl: string;
  createdAt: number;
}

// SearchResult type for unified search results
export interface SearchResult {
  type: "worksheet" | "lessonPlan";
  _id: WorksheetId | LessonPlanId;
  title: string;
  subject: string;
  gradeLevel: string;
  createdAt: number;
}
