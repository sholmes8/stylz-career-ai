import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("STYLZ Career AI API running...");
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/optimize", async (req, res) => {
  const { resume, job } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `
You are an expert AI career coach and resume strategist.

Analyze the candidate's resume against the job description.

Return ONLY valid JSON in this exact structure:
{
  "message": "string",
  "resumeScore": number,
  "matchScore": number,
  "strengths": ["string", "string", "string"],
  "gaps": ["string", "string", "string"],
  "improvements": ["string", "string", "string"],
  "optimizedResume": "string"
}

Rules:
- resumeScore must be 0-100
- matchScore must be 0-100
- strengths should highlight what aligns well
- gaps should identify missing or weaker areas
- improvements should be actionable
- optimizedResume should be a polished, job-tailored version of the resume
- be realistic and professional
`
        },
        {
          role: "user",
          content: `Resume:\n${resume}\n\nJob Description:\n${job}`
        }
      ]
    });

    const raw = response.choices[0].message.content;
    const parsed = JSON.parse(raw);

    res.json(parsed);
  } catch (error) {
    console.error("OpenAI error:", error);

    res.status(500).json({
      error: "OpenAI request failed",
      details: error?.error?.message || error.message || "Unknown error"
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});