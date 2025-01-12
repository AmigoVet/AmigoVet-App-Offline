import OpenAI from "openai";
import env from "../../../dotenvConfig";
import { Animal, Notes } from "../interfaces/animal";
import { Register } from "../interfaces/registers";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export const gptRequest = async (question: string, animal: Animal, registers: Register[], notas: Notes[]) => {
  // console.log(question);
  // console.log(animal);
  // console.log(registers);
  // console.log(notas);

  try {
    // Validar que la API Key esté configurada
    if (!env.OPENAI_API_KEY) {
      throw new Error("La clave API no está configurada.");
    }

    // Crear el contexto dinámico para el asistente
    const animalDetails = `
    Propietario: ${animal.ownerId}
    ID: ${animal.id}
    Identificador: ${animal.identificador}
    Nombre: ${animal.nombre}
    Especie: ${animal.especie}
    Raza: ${animal.raza}
    Edad: ${animal.edad || "Desconocida"}
    Fecha de nacimiento: ${animal.nacimiento || "No especificada"}
    Género: ${animal.genero}
    Peso: ${animal.peso}
    Color: ${animal.color}
    Descripción: ${animal.descripcion}
    Imágenes: 
      - Principal: ${animal.image}
      - Secundaria: ${animal.image2 || "No especificada"}
      - Tercera: ${animal.image3 || "No especificada"}
    Propósito: ${animal.proposito}
    Ubicación: ${animal.ubicacion}
    Fecha de creación: ${animal.created_at}
    Última actualización: ${animal.updated_at}
    Embarazada: ${animal.embarazada ? "Sí" : "No"}
    `;

    const registersDetails = registers
      .map(
        (reg) => `- Acción: ${reg.accion}, Fecha: ${reg.fecha}, Comentario: ${reg.comentario || "Sin comentario"}`
      )
      .join("\n");

    const notesDetails = notas
      .map(
        (nota) => `- Nota: ${nota.nota}, Fecha: ${nota.fecha}, Creada el: ${nota.created_at}`
      )
      .join("\n");

    const prompt = `
Eres un veterinario experto que analiza datos de animales y responde preguntas relacionadas en español. A continuación, tienes los detalles de un animal, sus registros históricos y notas. Responde con base en esta información.

**Detalles del animal:**
${animalDetails}

**Registros históricos:**
${registersDetails || "No hay registros históricos."}

**Notas del animal:**
${notesDetails || "No hay notas registradas."}

**Pregunta del usuario:**
${question}
No recomiendes ir con un veterinario a menos que no sepas lo que pasa,Analiza todos los datos del animal, las notas, y registros y segun esa informacion responde a la pregunta del usuario.
    `;

    // Solicitud a la API de OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini-2024-07-18",
        messages: [
          {
            role: "system",
            content: "Eres un veterinario experto que siempre responde en español, dando respuestas detalladas y precisas, relacionando si los tratamientos tienen algo que ver con la pregunta o problema del animal, y si los registros tienen algo que ver con la pregunta o problema del animal, tu respuesta debe ser menor a 1000 caracteres",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    // Manejar errores HTTP
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error en la API: ${errorData.error.message}`);
    }
    console.log("------------------------------------------------------------------------------------------------");
    console.log(prompt);
    console.log("------------------------------------------------------------------------------------------------");
    // Procesar y devolver la respuesta
    const data = await response.json();
    return data.choices[0].message.content; // Retorna el contenido generado
  } catch (error) {
    console.error("Error al realizar la solicitud GPT:", error);
    throw error; // Lanza el error para manejarlo en otros lugares
  }
};
