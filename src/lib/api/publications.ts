import { Animal } from '../interfaces/Animal';
import { Notes } from '../interfaces/Notes';
import { Register } from '../interfaces/Register';
import { Events } from '../interfaces/Events';

const API_BASE_URL = 'https://amigovet-monolitic.zeabur.app';

export const createAnimal = async (animal: Animal) => {
  try {
    const response = await fetch(`${API_BASE_URL}/animal`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
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
        createdAt: animal.created_at,
        updatedAt: animal.updated_at,
        embarazada: animal.embarazada,
        favorito: animal.favorito,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create animal: ${response.status} ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating animal:', error);
    throw error;
  }
};

export const updateAnimalApi = async (animal: Animal) => {
  try {
    const response = await fetch(`${API_BASE_URL}/animal/${animal.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
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
        updatedAt: animal.updated_at,
        embarazada: animal.embarazada,
        favorito: animal.favorito,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update animal: ${response.status} ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating animal:', error);
    throw error;
  }
};

export const createNote = async (note: Notes) => {
  try {
    const response = await fetch(`${API_BASE_URL}/animal/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: note.id,
        animalId: note.animalId,
        content: note.nota, // Mapeo 'nota' a 'content' para la API
        fecha: note.fecha,
        created_at: note.created_at,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create note: ${response.status} ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating note:', error);
    throw error;
  }
};

export const createRegister = async (register: Register) => {
  try {
    const response = await fetch(`${API_BASE_URL}/animal/registers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: register.id,
        animalId: register.animalId,
        details: register.comentario, // Mapeo 'comentario' a 'details' para la API
        fecha: register.fecha,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create register: ${response.status} ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating register:', error);
    throw error;
  }
};

export const createEvent = async (event: Events) => {
  try {
    const response = await fetch(`${API_BASE_URL}/animal/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: event.id,
        animalId: event.animalId,
        animalName: event.animalName,
        comentario: event.comentario,
        fecha: event.fecha,
        created_at: event.created_at,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create event: ${response.status} ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};
