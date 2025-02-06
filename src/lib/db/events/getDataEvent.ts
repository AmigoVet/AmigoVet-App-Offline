import { Events } from "../../interfaces/events";
import { db } from "../db";

export const getDataEventByAnimalId = (animalId: string): Promise<Events[]> => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM Events WHERE animalId = ? ORDER BY fecha DESC`,
                [animalId],
                (_, result) => {
                    const len = result.rows.length;
                    const events: Events[] = [];

                    for (let i = 0; i < len; i++) {
                        events.push(result.rows.item(i));
                    }

                    resolve(events);
                },
                (_, error) => {
                    console.error('Error fetching events:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};

export const getDataEventByCurrentRange = (): Promise<Events[]> => {
    return new Promise((resolve, reject) => {
        // Obtener fecha actual en formato YYYY-MM-DD
        const today = new Date();
        
        // Calcular tres días antes y después
        const threeDaysBefore = new Date(today);
        threeDaysBefore.setDate(today.getDate() - 3);

        const threeDaysAfter = new Date(today);
        threeDaysAfter.setDate(today.getDate() + 3);

        // Formatear fechas a 'YYYY-MM-DD'
        const formatDate = (date: Date): string => date.toISOString().split('T')[0];

        const fecha_inicio = formatDate(threeDaysBefore);
        const fecha_fin = formatDate(threeDaysAfter);

        db.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM Events WHERE fecha BETWEEN ? AND ? ORDER BY fecha DESC`,
                [fecha_inicio, fecha_fin],
                (_, result) => {
                    const len = result.rows.length;
                    const events: Events[] = [];

                    for (let i = 0; i < len; i++) {
                        events.push(result.rows.item(i));
                    }

                    resolve(events);
                },
                (_, error) => {
                    console.error('Error fetching events by date range:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};