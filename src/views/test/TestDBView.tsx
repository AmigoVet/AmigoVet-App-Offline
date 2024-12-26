import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import SQLite from 'react-native-sqlite-storage'
import { createGlobalStyles } from '../../assets/styles/styles'
import { useTheme } from '../../lib/context/ThemeContext'
import { CustomButton, CustomInput } from '../../components/Customs'

const db = SQLite.openDatabase(
    {
        name: 'test.db',
        location: 'default',
    },
    () => {},
    (error) => {console.log(error)}
)

interface person {
    name: string
    age: number
}

const TestDBView = () => {

    const [name, setName] = React.useState('')
    const [age, setAge] = React.useState('')
    const [dataPerson , setDataPerson] = React.useState<person[]>()

    useEffect(() => {
        createTable()
    }, [])

    const createTable = () => {
        db.transaction((tx) => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age INTEGER)"
            )
        })
    }

    const setData = async () => {
        try {
            await db.transaction(async(tx) => {
                await tx.executeSql(
                    "INSERT INTO test (name, age) VALUES (?, ?)",
                    [name, age]
                )
            })
        } catch (error) {
            console.log(error)
        }

    }

    const getData = () => {
        try {
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT * FROM test",
                    [],
                    (tx, results) => {
                        let len = results.rows.length;
                        let data = [];
                        for (let i = 0; i < len; i++) {
                            data.push(results.rows.item(i));
                        }
                        setDataPerson(data);
                    },
                    (error) => {
                        console.log(error);
                    }
                );
            });
        } catch (error) {
            console.log(error);
        }
    };
    

    const {isDarkTheme} = useTheme()
    const GLobalStyles = createGlobalStyles(isDarkTheme)


    return (
        <View style={GLobalStyles.container}>
            <CustomInput placeholder="name" label="name" value={name} onChangeText={setName} />
            <CustomInput placeholder="age" label="age" value={age} onChangeText={setAge} />
            <CustomButton text="Guardar" onPress={setData} />
            <CustomButton text="Obtener" onPress={getData} />
            
            <View>
                {dataPerson?.map((person, index) => (
                    <View key={index} style={{ marginVertical: 5 }}>
                        <Text style={GLobalStyles.label}>name: {person.name}</Text>
                        <Text style={GLobalStyles.label}>age: {person.age}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
    
}

export default TestDBView