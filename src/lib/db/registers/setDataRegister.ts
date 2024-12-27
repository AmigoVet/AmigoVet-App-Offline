import { Register } from "../../interfaces/registers";
import { db } from "../db";

export const setDataRegister = (register: Register): Promise<void> => {
    console.log("Registro a guardar:", JSON.stringify(register, null, 2));
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `INSERT INTO Register (id, animalId, comentario, accion, fecha) VALUES (?, ?, ?, ?, ?)`,
                [
                    register.id,
                    register.animalId,
                    register.comentario || "", 
                    register.accion || "",     
                    register.fecha || new Date().toISOString(),
                ],
                (_, result) => {
                    console.log('Registro guardado:', register);
                    resolve();
                },
                (_, error) => {
                    console.error('Error en SQL:', error);
                    reject(error);
                }
            );
        });
    });
};

