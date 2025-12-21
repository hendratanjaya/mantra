import {
  PromptDepthGuidance,
  PromptStyleGuidance,
  PromptToneGuidance,
} from "./type";
import { CanvasFactory } from "pdf-parse/worker";
import { PDFParse } from "pdf-parse";
import { UserException } from "../utils";

export function getStructureGuidelines(
  style: keyof PromptStyleGuidance
): string {
  const structures = {
    concise: `
- Keep responses brief (2-4 sentences for simple questions)
- Use bullet points only when listing multiple items
- Avoid headers unless explaining multi-part concepts`,

    detailed: `
- Provide thorough explanations with context
- Break complex topics into clear sections with headers
- Include examples to illustrate key points
- Offer "want to go deeper?" prompts for advanced learners`,

    conversational: `
- Write in natural, flowing paragraphs
- Avoid excessive formatting (minimal bullets/headers)
- Use analogies and relatable examples
- Ask clarifying questions when needed`,

    structured: `
- Use clear headers for multi-part answers
- Organize with numbered steps or bullet points when appropriate
- Include "Summary:" or "Key Takeaway:" sections
- Format code or formulas in proper blocks`,

    socratic: `
- Guide discovery with questions rather than direct answers
- Offer hints before full explanations
- Use "What do you think?" prompts
- Celebrate reasoning attempts`,
  };

  return structures[style];
}

export function getToneGuidance(tone: keyof PromptToneGuidance): string {
  const guidance = {
    friendly: "Be warm and approachable, use conversational language",
    professional: "Be clear and respectful, slightly more formal phrasing",
    casual: "Be relaxed and informal, like talking to a friend",
    encouraging: "Be supportive and positive, celebrate progress",
    neutral: "Be balanced and straightforward, no extra emotional coloring",
  };
  return guidance[tone] || guidance.neutral;
}

export function getDepthGuidance(depth: keyof PromptDepthGuidance): string {
  const guidance = {
    surface: "Cover just the essential concept. Skip deep details unless asked",
    intermediate:
      "Explain the concept plus key details. One layer deeper than basics",
    deep: "Comprehensive explanation including edge cases, nuances, and advanced considerations",
    adaptive: "Start simple. Offer 'want more detail?' prompts to go deeper",
  };
  return guidance[depth] || guidance.intermediate;
}

export async function getPdfInfo(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  function isPdf(buffer: Buffer): boolean {
    const header = buffer.subarray(0, 5).toString("ascii");
    return header === "%PDF-";
  }
  if (!isPdf(buffer))
    throw new UserException("Oops, we only accept PDF file", 400);

  const base64Pdf = buffer.toString("base64");

  const pdf = new PDFParse({ data: buffer, CanvasFactory });
  const totalPages = (await pdf.getInfo()).total;

  return { totalPages, base64Pdf };
}

// export async function chunkText(text: string) {
//   const chunks = [];
//   const maxLength = 40000;
//   const sentences = text.split(".");
//   let currChunk = "";

//   for (const sentence of sentences) {
//     if ((currChunk + sentence).length > maxLength) {
//       chunks.push(currChunk);
//       currChunk = sentence;
//     } else {
//       currChunk += " " + sentence;
//     }
//   }

//   if (currChunk) chunks.push(currChunk.trim());

//   return chunks;
// }
