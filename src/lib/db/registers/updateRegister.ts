import { Register } from "../../interfaces/Register";
import { db } from "../db";

export const updateRegister = (register: Register): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `UPDATE Register SET comentario = ?, accion = ?, fecha = ? WHERE id = ?`,
                [
                    register.comentario,
                    register.accion,
                    register.fecha,
                    register.id,
                ],
                (_, result) => {
                    resolve();
                },
                (_, error) => {
                    console.error('Error al actualizar registro:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};