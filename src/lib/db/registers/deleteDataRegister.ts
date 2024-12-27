import { db } from "../db";

export const deleteDataRegister = (registerId: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `DELETE FROM Register WHERE id = ?`, 
                [registerId], 
                (_, result) => {
                    console.log(`Animal con ID ${registerId} eliminado correctamente.`);
                    resolve();
                },
                (_, error) => {
                    console.error("Error en SQL:", error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};
