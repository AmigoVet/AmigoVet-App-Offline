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
                        console.log('Raw item from DB:', item); // Debugging
                        animals.push({
                            ...item,
                            embarazada: Boolean(item.embarazada),
                            image: item.image || '',
                            image2: item.image2 || '',
                            image3: item.image3 || ''
                        });
                    }
                    console.log('Processed animals:', animals); // Debugging
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