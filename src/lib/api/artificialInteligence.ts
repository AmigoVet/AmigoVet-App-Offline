import { Animal } from '../interfaces/Animal';

const API_BASE_URL = 'https://amigovet-monolitic.zeabur.app';

export const questionIA = async (animal: Animal, question: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/ia-vet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question,
        animal: {
          id: animal.id,
          ownerId: animal.ownerId,
          identificador: animal.identificador,
          nombre: animal.nombre,
          especie: animal.especie,
          raza: animal.raza,
          nacimiento: animal.nacimiento,
          genero: animal.genero,
          peso: animal.peso,
          color: animal.color,
          descripcion: animal.descripcion,
          image: animal.image,
          image2: animal.image2,
          image3: animal.image3,
          proposito: animal.proposito,
          ubicacion: animal.ubicacion,
          created_at: animal.created_at,
          updated_at: animal.updated_at,
          embarazada: animal.embarazada,
          favorito: animal.favorito,
          notes: animal.notes,
          registers: animal.registers,
          events: animal.events,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to send question: ${response.status} ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending question to IA:', error);
    throw error;
  }
};
