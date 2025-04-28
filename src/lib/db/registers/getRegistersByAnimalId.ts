import { Register } from "../../interfaces/Register";
import { db } from "../db";

export const getRegistersByAnimalId = (animalId: string, page: number = 1, limit: number = 10): Promise<Register[]> => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM Register WHERE animalId = ? ORDER BY fecha DESC LIMIT ? OFFSET ?`,
                [animalId, limit, (page - 1) * limit],
                (_, { rows }) => {
                    const registers: Register[] = [];
                    for (let i = 0; i < rows.length; i++) {
                        const item = rows.item(i);
                        registers.push({
                            id: item.id,
                            animalId: item.animalId,
                            comentario: item.comentario,
                            accion: item.accion,
                            fecha: item.fecha,
                        });
                    }
                    resolve(registers);
                },
                (_, error) => {
                    console.error('Error al obtener registros:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};