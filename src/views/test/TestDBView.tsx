import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import SQLite from 'react-native-sqlite-storage'
import { createGlobalStyles } from '../../assets/styles/styles'
import { useTheme } from '../../lib/context/ThemeContext'
import { CustomButton, CustomInput } from '../../components/Customs'
import { Animal } from '../../lib/interfaces/animal'
import { createAnimalTable } from '../../lib/db/createTable'

const TestDBView = () => {

    const [name, setName] = React.useState('')
    const [age, setAge] = React.useState('')
    const [animal, setAnimal] = React.useState<Animal>()

    useEffect(() => {
        createAnimalTable()
    }, [])


    const {isDarkTheme} = useTheme()
    const GLobalStyles = createGlobalStyles(isDarkTheme)


    return (
        <View style={GLobalStyles.container}>
            <CustomInput placeholder="name" label="name" value={name} onChangeText={setName} />
            <CustomInput placeholder="age" label="age" value={age} onChangeText={setAge} />
            
        </View>
    );
    
}

export default TestDBView