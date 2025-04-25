import { Register } from "../../interfaces/Register";
import { db } from "../db";

export const setDataRegister = (register: Register): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `INSERT INTO Register (id, animalId, comentario, accion, fecha) VALUES (?, ?, ?, ?, ?)`,
                [
                    register.id,
                    register.animalId,
                    register.comentario,
                    register.accion,
                    register.fecha,
                ],
                (_, result) => {
                    resolve();
                },
                (_, error) => {
                    console.error('Error en SQL:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};
