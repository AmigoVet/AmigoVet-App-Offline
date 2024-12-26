import { Animal } from '../interfaces/animal';
import { db } from './db';

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