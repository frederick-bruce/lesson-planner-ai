/* prettier-ignore-start */

/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as activities from "../activities.js";
import type * as assessments from "../assessments.js";
import type * as comments from "../comments.js";
import type * as http from "../http.js";
import type * as lessonPlans from "../lessonPlans.js";
import type * as lessonPlanTags from "../lessonPlanTags.js";
import type * as tags from "../tags.js";
import type * as types from "../types.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  activities: typeof activities;
  assessments: typeof assessments;
  comments: typeof comments;
  http: typeof http;
  lessonPlans: typeof lessonPlans;
  lessonPlanTags: typeof lessonPlanTags;
  tags: typeof tags;
  types: typeof types;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

/* prettier-ignore-end */
