import OpenAI from "openai";
import env from "../../../dotenvConfig";
import { Animal } from "../interfaces/animal";
import { Register } from "../interfaces/registers";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY, 
});

export const gptRequest = async (question: string, animal: Animal, registers: Register[]) => {
  console.log(question);
  console.log(animal);
  console.log(registers);
  try {
    // Validar que la API Key esté configurada
    if (!env.OPENAI_API_KEY) {
      throw new Error("La clave API no está configurada.");
    }

    // Prompt que se enviará a la API
    const messages = [
      {
        role: "system",
        content: "You are a helpful assistant."
      },
      {
        role: "user",
        content: `Plan a comprehensive travel itinerary. I am travelling with family. I am going to Paris for 7 days. And I want to include the following activities: sightseeing, dining.`
      }
    ];

    // Solicitud a la API de OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: messages,
      }),
    });

    // Manejar errores HTTP
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error en la API: ${errorData.error.message}`);
    }

    // Procesar y devolver la respuesta
    const data = await response.json();
    return data.choices[0].message.content; // Retorna el contenido generado
  } catch (error) {
    console.error("Error al realizar la solicitud GPT:", error);
    throw error; // Lanza el error para manejarlo en otros lugares
  }
};
