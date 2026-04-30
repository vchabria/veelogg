import OpenAI from "openai";

let client: OpenAI | null = null;

export function getAIClient(): OpenAI {
  if (!client) {
    client = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY!,
    });
  }
  return client;
}

export const DEFAULT_MODEL = "anthropic/claude-sonnet-4-20250514";
