import { Notes } from "../../interfaces/Notes";
import { db } from "../db";

export const getNotesByAnimalId = (animalId: string, page: number = 1, limit: number = 10): Promise<Notes[]> => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM Notas WHERE animalId = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`,
                [animalId, limit, (page - 1) * limit],
                (_, { rows }) => {
                    const notes: Notes[] = [];
                    for (let i = 0; i < rows.length; i++) {
                        const item = rows.item(i);
                        notes.push({
                            id: item.id,
                            animalId: item.animalId,
                            nota: item.nota,
                            fecha: item.fecha,
                            created_at: item.created_at,
                        });
                    }
                    resolve(notes);
                },
                (_, error) => {
                    console.error('Error al obtener notas:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};