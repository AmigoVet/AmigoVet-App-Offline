import { Animal } from '../interfaces/animal';
import { db } from './db';

export const getSimplificatedDataAnimalsWithNotes = async (ownerId: string): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `
                SELECT 
                    A.id,
                    A.identificador, 
                    A.nombre, 
                    A.image AS animalImage, 
                    A.ubicacion, 
                    A.genero, 
                    A.embarazada,
                    N.id AS noteId, 
                    N.nota, 
                    N.fecha AS noteDate
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
                            if (item.noteId && item.nota.toLowerCase().includes('parto')) {
                                data[existingAnimalIndex].notes.push({
                                    id: item.noteId,
                                    nota: item.nota,
                                    fecha: item.noteDate,
                                });
                            }
                        } else {
                            data.push({
                                id: item.id,
                                identificador: item.identificador,
                                nombre: item.nombre,
                                image: item.animalImage || '',
                                ubicacion: item.ubicacion,
                                genero: item.genero,
                                notes: item.noteId && item.nota.toLowerCase().includes('parto')
                                    ? [
                                          {
                                              id: item.noteId,
                                              nota: item.nota,
                                              fecha: item.noteDate,
                                          },
                                      ]
                                    : [], // Solo agrega notas con "parto"
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