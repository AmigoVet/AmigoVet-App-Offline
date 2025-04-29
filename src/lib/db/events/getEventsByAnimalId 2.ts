import { Events } from "../../interfaces/Events";
import { db } from "../db";

export const getEventsByAnimalId = (animalId: string, page: number = 1, limit: number = 10): Promise<Events[]> => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM Events WHERE animalId = ? AND fecha >= date('now') ORDER BY fecha ASC LIMIT ? OFFSET ?`,
                [animalId, limit, (page - 1) * limit],
                (_, { rows }) => {
                    const events: Events[] = [];
                    for (let i = 0; i < rows.length; i++) {
                        const item = rows.item(i);
                        events.push({
                            id: item.id,
                            animalId: item.animalId,
                            animalName: item.animalName,
                            comentario: item.comentario,
                            fecha: item.fecha,
                            created_at: item.created_at,
                        });
                    }
                    resolve(events);
                },
                (_, error) => {
                    console.error('Error al obtener eventos:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};