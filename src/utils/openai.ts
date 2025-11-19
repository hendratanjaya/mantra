import OpenAI from "openai";

const { OPENROUTER_API_KEY, OPENROUTER_URL } = process.env;

export const openai = new OpenAI({
  baseURL: OPENROUTER_URL,
  apiKey: OPENROUTER_API_KEY,
});
