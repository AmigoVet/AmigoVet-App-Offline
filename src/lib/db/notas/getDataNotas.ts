import { Notes } from "../../interfaces/animal";
import { db } from "../db";

export const getDataNotas = (animalId: string): Promise<Notes[]> => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM Notas WHERE animalId = ? ORDER BY fecha DESC`,
                [animalId],
                (_, result) => {
                    const notas: Notes[] = [];
                    for (let i = 0; i < result.rows.length; i++) {
                        notas.push(result.rows.item(i));
                    }
                    resolve(notas);
                },
                (_, error) => {
                    console.error('Error fetching registers:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};
