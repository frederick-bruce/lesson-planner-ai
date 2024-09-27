import { NextResponse } from "next/server";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

const LessonPlanSchema = z.object({
  title: z.string(),
  subject: z.string(),
  gradeLevel: z.string(),
  duration: z.number(),
  objectives: z.array(z.string()),
  materials: z.array(z.string()),
  introduction: z.string(),
  mainContent: z.array(
    z.object({
      activity: z.string(),
      duration: z.number(),
      description: z.string(),
    })
  ),
  conclusion: z.string(),
  assessment: z.string(),
  extensions: z.array(z.string()).optional(),
});

const modelName = "gpt-4o-2024-08-06";

export async function POST(req: Request) {
  const { subject, gradeLevel, duration, objectives } = await req.json();

  const client = new OpenAI();

  const response = await client.chat.completions.create({
    model: modelName,
    messages: [
      {
        role: "system",
        content:
          "You are an expert educator and curriculum designer. Your task is to create detailed, engaging lesson plans based on the provided parameters.",
      },
      {
        role: "user",
        content: `Create a lesson plan for ${subject} for grade ${gradeLevel}, lasting ${duration} minutes. The learning objectives are: ${objectives.join(
          ", "
        )}`,
      },
    ],
    response_format: zodResponseFormat(LessonPlanSchema, "lessonPlanSchema"),
    stream: true,
  });

  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of response) {
        const content = chunk.choices[0]?.delta?.content || "";
        controller.enqueue(new TextEncoder().encode(content));
      }
      controller.close();
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/plain",
      "Transfer-Encoding": "chunked",
    },
  });
}
