import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

export const gptRequest = async (prompt: string) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4 mini",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
    });

    return completion.choices[0].message;
  } catch (error) {
    console.error("Error with GPT request:", error);
    throw error; 
  }
};
