import SQLite from 'react-native-sqlite-storage';


export const db = SQLite.openDatabase(
    {
        name: 'test.db',
        location: 'default',
    },
    () => { console.log('Database opened successfully'); },
    (error) => { console.log(error); }
);