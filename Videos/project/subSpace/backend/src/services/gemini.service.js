import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const summarizeTranscript = async (transcript) => {
  // ✅ SAFETY CHECK
  if (!Array.isArray(transcript) || transcript.length === 0) {
    return {
      summary: "No speech detected.",
      sections: [],
    };
  }

  const text = transcript.map((t) => t.text).join(" ");

  // ✅ CORRECT MODEL NAME
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
  });

  const prompt = `
You are given a transcript of a screen-recorded video.

1. Write a short 2–3 sentence summary.
2. Create logical sections with approximate start times (in seconds).

Transcript:
${text}

Return ONLY valid JSON in this format:
{
  "summary": "string",
  "sections": [
    { "title": "Section title", "start": 0 }
  ]
}
`;

  try {
    const result = await model.generateContent(prompt);
    const raw = result.response.text();

    // 🔥 Gemini sometimes wraps JSON in ```json
    const clean = raw.replace(/```json|```/g, "").trim();

    return JSON.parse(clean);
  } catch (err) {
    console.error("Gemini parse error:", err);

    return {
      summary: text.slice(0, 200) + "...",
      sections: [],
    };
  }
};
