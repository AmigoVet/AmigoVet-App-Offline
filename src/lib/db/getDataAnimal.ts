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
                LEFT JOIN (
                    SELECT N1.*
                    FROM Notas N1
                    WHERE N1.fecha = (
                        SELECT MAX(N2.fecha)
                        FROM Notas N2
                        WHERE N1.animalId = N2.animalId
                    )
                ) N ON A.id = N.animalId
                WHERE A.ownerId = ?
                ORDER BY A.created_at DESC
                `,
                [ownerId],
                (_, result) => {
                    const len = result.rows.length;
                    const data: any[] = [];

                    for (let i = 0; i < len; i++) {
                        const item = result.rows.item(i);

                        data.push({
                            id: item.id,
                            ownerId: item.ownerId,
                            identificador: item.identificador,
                            nombre: item.nombre,
                            image: item.animalImage || '',
                            ubicacion: item.ubicacion,
                            genero: item.genero,
                            embarazada: item.embarazada,
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
                    resolve(data);
                },
                (_, error) => {
                    console.error('Error fetching animals with latest note:', error);
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

export const getLastFiveAnimals = (ownerId: string): Promise<{id: string, nombre: string, especie: string, descripcion: string, image: string }[]> => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `SELECT id, nombre, especie, descripcion, image AS image1 
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
                            id: item.id,
                            nombre: item.nombre,
                            especie: item.especie,
                            descripcion: item.descripcion,
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

export const searchAnimals = (ownerId: string, searchText: string): Promise<Animal[]> => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM Animal 
                 WHERE ownerId = ? 
                 AND (nombre LIKE ? OR descripcion LIKE ?) 
                 ORDER BY created_at DESC`,
                [ownerId, `%${searchText}%`, `%${searchText}%`],
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
                    console.error('Error searching animals:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};
