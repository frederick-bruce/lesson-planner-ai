import { NextResponse } from "next/server";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

const WorksheetSchema = z.object({
  title: z.string(),
  subject: z.string(),
  gradeLevel: z.string(),
  instructions: z.string(),
  questions: z.array(
    z.object({
      type: z.enum([
        "multiple_choice",
        "short_answer",
        "fill_in_the_blank",
        "matching",
        "essay",
      ]),
      question: z.string(),
      options: z.array(z.string()).optional(),
      correctAnswer: z.string().optional(),
      points: z.number(),
    })
  ),
  totalPoints: z.number(),
  estimatedTime: z.number(), // in minutes
  difficultyLevel: z.enum(["easy", "medium", "hard"]),
  additionalNotes: z.string().optional(),
});

const modelName = "gpt-4-1106-preview"; // Using the latest GPT-4 model

export async function POST(req: Request) {
  const {
    subject,
    gradeLevel,
    worksheetType,
    topicFocus,
    numberOfQuestions,
    difficultyLevel,
  } = await req.json();

  const client = new OpenAI();

  const response = await client.chat.completions.create({
    model: modelName,
    messages: [
      {
        role: "system",
        content:
          "You are an expert educator and worksheet designer. Your task is to create detailed, engaging worksheets based on the provided parameters. Ensure that the questions are age-appropriate, aligned with the subject and topic focus, and match the specified difficulty level.",
      },
      {
        role: "user",
        content: `Create a ${worksheetType} worksheet for ${subject} for grade ${gradeLevel}. The topic focus is: ${topicFocus}. Include ${numberOfQuestions} questions at a ${difficultyLevel} difficulty level.`,
      },
    ],
    response_format: zodResponseFormat(WorksheetSchema, "worksheetSchema"),
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
