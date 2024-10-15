import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";
import { WorksheetTemplate } from "./types";
import OpenAI from "openai";

export const createWorksheet = mutation({
  args: {
    title: v.string(),
    subject: v.string(),
    gradeLevel: v.string(),
    isPublic: v.boolean(),
    parameters: v.array(
      v.object({
        name: v.string(),
        label: v.string(),
        type: v.string(),
        value: v.union(v.string(), v.number()),
      })
    ),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const userId = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();
    if (!userId) {
      throw new Error("User not found");
    }
    return await ctx.db.insert("worksheets", {
      ...args,
      createdBy: userId._id,
    });
  },
});

export const getWorksheetsByUser = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const userId = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();
    if (!userId) {
      throw new Error("User not found");
    }
    return await ctx.db
      .query("worksheets")
      .withIndex("by_created_by", (q) => q.eq("createdBy", userId._id))
      .collect();
  },
});

export const getWorksheetTemplates = query({
  args: {
    subject: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const worksheetTemplatesQuery = ctx.db
      .query("worksheetTemplates")
      .withIndex("by_subject", (q) =>
        args.subject ? q.eq("subject", args.subject) : q
      )
      .order("desc");

    let templates = await worksheetTemplatesQuery.collect();

    if (args.limit) {
      templates = templates.slice(0, args.limit);
    }

    return templates;
  },
});

export const createWorksheetTemplate = mutation({
  args: {
    name: v.string(),
    subject: v.string(),
    parameters: v.array(
      v.object({
        name: v.string(),
        label: v.string(),
        type: v.string(),
        options: v.optional(v.array(v.string())),
        min: v.optional(v.number()),
        max: v.optional(v.number()),
      })
    ),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("worksheetTemplates", args);
  },
});

export const generateWorksheet = mutation({
  args: {
    title: v.string(),
    subject: v.string(),
    gradeLevel: v.string(),
    topic: v.string(),
    numberOfQuestions: v.number(),
    difficultyLevel: v.string(),
    additionalInstructions: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated call to mutation");
    }

    // Fetch the user's ID from the users table
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) =>
        q.eq("clerkId", identity.tokenIdentifier)
      )
      .unique();

    if (!user) {
      throw new Error("User not found");
    }

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Construct the prompt for GPT
    const prompt = `Generate a worksheet with the following details:
    Title: ${args.title}
    Subject: ${args.subject}
    Grade Level: ${args.gradeLevel}
    Topic: ${args.topic}
    Number of Questions: ${args.numberOfQuestions}
    Difficulty Level: ${args.difficultyLevel}
    Additional Instructions: ${args.additionalInstructions || "None"}

    Please provide a well-structured worksheet with questions and space for answers.`;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const worksheetContent = completion.choices[0].message.content;

    if (!worksheetContent) {
      throw new Error("Failed to generate worksheet content");
    }

    // Save the generated worksheet to the database
    const worksheetId = await ctx.db.insert("worksheets", {
      title: args.title,
      subject: args.subject,
      gradeLevel: args.gradeLevel,
      createdBy: user._id,
      isPublic: false, // You might want to add this as an argument to the function
      content: worksheetContent,
      parameters: [
        { name: "topic", type: "string", label: "Topic", value: args.topic },
        {
          name: "numberOfQuestions",
          type: "number",
          label: "Number of Questions",
          value: args.numberOfQuestions,
        },
        {
          name: "difficultyLevel",
          type: "string",
          label: "Difficulty Level",
          value: args.difficultyLevel,
        },
      ],
    });

    return { worksheetId, content: worksheetContent };
  },
});

export const getRecentWorksheets = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) {
      throw new Error("User not found");
    }

    const worksheets = await ctx.db
      .query("worksheets")
      .withIndex("by_created_by", (q) => q.eq("createdBy", user._id))
      .order("desc")
      .take(args.limit || 5);

    return worksheets.map((worksheet) => ({
      _id: worksheet._id,
      title: worksheet.title,
      subject: worksheet.subject,
      gradeLevel: worksheet.gradeLevel,
      createdAt: worksheet._creationTime,
    }));
  },
});

