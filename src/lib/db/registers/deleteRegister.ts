import { db } from "../db";

export const deleteRegister = (id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `DELETE FROM Register WHERE id = ?`,
                [id],
                (_, result) => {
                    resolve();
                },
                (_, error) => {
                    console.error('Error al eliminar registro:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};