import { Register } from "../../interfaces/Register";
import { db } from "../db";

export const getRegistersByAnimalId = (animalId: string): Promise<Register[]> => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM Register WHERE animalId = ?`,
                [animalId],
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