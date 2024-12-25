import OpenAI from "openai";
const openai = new OpenAI();

const gptRequest = async (prompt: string) => {
    const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            {
                role: "user",
                content: prompt,
            },
        ],
    });

    return completion.choices[0].message;
};
