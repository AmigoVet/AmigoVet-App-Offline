import { Register } from "../../interfaces/registers";
import { db } from "../db";

export const getDataRegisters = (animalId: string): Promise<Register[]> => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM Register WHERE animalId = ? ORDER BY fecha DESC`,
                [animalId],
                (_, result) => {
                    const registers: Register[] = [];
                    for (let i = 0; i < result.rows.length; i++) {
                        registers.push(result.rows.item(i));
                    }
                    resolve(registers);
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
