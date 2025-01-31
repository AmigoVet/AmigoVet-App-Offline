import { Animal } from '../interfaces/animal';
import { db } from './db';

export const getSimplificatedDataAnimalsWithNotes = async (ownerId: string): Promise<any[]> => {
    if (!ownerId) {
        throw new Error('OwnerId is required');
    }

    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `
                SELECT 
                    A.id,
                    A.ownerId,
                    A.identificador, 
                    A.nombre, 
                    A.image AS animalImage, 
                    A.ubicacion, 
                    A.genero, 
                    A.embarazada,
                    A.celo,
                    A.especie,
                    A.raza,
                    A.nacimiento,
                    A.peso,
                    A.color,
                    A.descripcion,
                    A.proposito,
                    A.created_at AS animalCreatedAt,
                    A.updated_at AS animalUpdatedAt,
                    N.id AS noteId, 
                    N.nota, 
                    N.fecha AS noteDate,
                    N.created_at AS noteCreatedAt
                FROM Animal A
                LEFT JOIN Notas N ON A.id = N.animalId
                WHERE A.ownerId = ?
                ORDER BY A.created_at DESC, N.fecha DESC
                `,
                [ownerId],
                (_, result) => {
                    const len = result.rows.length;
                    const data: any[] = [];

                    for (let i = 0; i < len; i++) {
                        const item = result.rows.item(i);

                        const existingAnimalIndex = data.findIndex(
                            (animal) => animal.id === item.id
                        );

                        if (existingAnimalIndex >= 0) {
                            if (item.noteId) {
                                data[existingAnimalIndex].notes.push({
                                    id: item.noteId,
                                    nota: item.nota,
                                    fecha: item.noteDate,
                                    created_at: item.noteCreatedAt,
                                });
                            }
                        } else {
                            data.push({
                                id: item.id,
                                ownerId: item.ownerId,
                                identificador: item.identificador,
                                nombre: item.nombre,
                                image: item.animalImage || '',
                                ubicacion: item.ubicacion,
                                genero: item.genero,
                                embarazada: item.embarazada,
                                celo: item.celo,
                                especie: item.especie,
                                raza: item.raza,
                                nacimiento: item.nacimiento,
                                peso: item.peso,
                                color: item.color,
                                descripcion: item.descripcion,
                                proposito: item.proposito,
                                created_at: item.animalCreatedAt,
                                updated_at: item.animalUpdatedAt,
                                notes: item.noteId
                                    ? [
                                          {
                                              id: item.noteId,
                                              nota: item.nota,
                                              fecha: item.noteDate,
                                              created_at: item.noteCreatedAt,
                                          },
                                      ]
                                    : [],
                            });
                        }
                    }
                    resolve(data);
                },
                (_, error) => {
                    console.error('Error fetching animals with notes:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};

export const getDataAnimal = (ownerId: string): Promise<Animal[]> => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM Animal WHERE ownerId = ? ORDER BY created_at DESC`,
                [ownerId],
                (_, result) => {
                    const len = result.rows.length;
                    const animals: Animal[] = [];
                    
                    for (let i = 0; i < len; i++) {
                        const item = result.rows.item(i);
                        animals.push({
                            ...item,
                            embarazada: Boolean(item.embarazada),
                            image: item.image || '',
                            image2: item.image2 || '',
                            image3: item.image3 || ''
                        });
                    }
                    resolve(animals);
                },
                (_, error) => {
                    console.error('Error fetching animals:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};

export const getDataAnimalbyId = async (id: string): Promise<Animal | null> => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM Animal WHERE id = ?`,
                [id],
                (_, result) => {
                    if (result.rows.length > 0) {
                        // Convertir el resultado en un objeto Animal
                        const item = result.rows.item(0);
                        const animal: Animal = {
                            ...item,
                            embarazada: Boolean(item.embarazada),
                            image: item.image || '',
                            image2: item.image2 || '',
                            image3: item.image3 || ''
                        };
                        resolve(animal);
                    } else {
                        console.warn(`No animal found with id: ${id}`);
                        resolve(null); // Devuelve null si no se encuentra el animal
                    }
                },
                (_, error) => {
                    console.error('Error fetching animal by ID:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};

export const getLenghtAnimal = async (ownerId: string): Promise<number> => {
    const animals = await getDataAnimal(ownerId);
    const len = animals.length;

    return len
};

export const getLastFiveAnimals = (ownerId: string): Promise<{ nombre: string, especie: string, image: string }[]> => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `SELECT nombre, especie, image AS image1 
                 FROM Animal 
                 WHERE ownerId = ? 
                 ORDER BY created_at DESC 
                 LIMIT 5`,
                [ownerId],
                (_, result) => {
                    const len = result.rows.length;
                    const animals = [];

                    for (let i = 0; i < len; i++) {
                        const item = result.rows.item(i);
                        animals.push({
                            nombre: item.nombre,
                            especie: item.especie,
                            image: item.image1 || ''
                        });
                    }
                    resolve(animals);
                },
                (_, error) => {
                    console.error('Error fetching last five animals:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};
