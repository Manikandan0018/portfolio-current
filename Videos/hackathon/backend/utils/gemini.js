import fetch from "node-fetch";

export const generateAIStudyPlan = async (missingSkills, availability) => {
  try {
    if (!missingSkills || missingSkills.length === 0) {
      return "You already meet all prerequisite skills. No study plan needed.";
    }

    const prompt = `
A student is missing these skills: ${missingSkills.join(", ")}.

Daily study time: ${availability || "Not specified"}.

Generate a short, clear study plan with friendly advice.
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      },
    );

    const data = await response.json();

    console.log("Gemini Raw Response:", JSON.stringify(data, null, 2));

    return (
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "AI study plan unavailable"
    );
  } catch (err) {
    console.error("Gemini Failure:", err);
    return "AI generation failed";
  }
};
