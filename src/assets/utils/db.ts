import { enablePromise, openDatabase } from "react-native-sqlite-storage";

enablePromise(true);

const DATABSE_NAME = 'AnimalsDB.db';

export async function getDBConection() {
    const db = await openDatabase({
        name: DATABSE_NAME,
        location: 'default',
    });
    return db;
}




