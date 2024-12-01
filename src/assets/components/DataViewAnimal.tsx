import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { format } from 'date-fns'
import { GlobalStyles } from '../styles'
import AnimalTable from './AnimalTable'
import CustomButton from './CustomButton'
import CustomImage from './CustomImage'
import CustomInput from './CustomInput'
import { Animal } from '../interfaces/animal'

interface DataViewAnimalProps {
  animal: Animal;
}

const DataViewAnimal = ({ animal }: DataViewAnimalProps) => {
  return (
<ScrollView contentContainerStyle={{}}>

      
      <View style={styles.titleContainer}>
        <Text style={[GlobalStyles.title]}>{animal?.nombre}<Text style={[GlobalStyles.miniText]}>({animal?.id})</Text></Text>
        <Text style={[GlobalStyles.subTitle]}>{animal?.identificador}</Text>
      </View>

      <View style={styles.dataContainer}>
        <Text style={GlobalStyles.textWhite}>Especie: <Text style={[GlobalStyles.textOrange]}>{animal?.especie}</Text></Text>
        <Text style={GlobalStyles.textWhite}>Raza: <Text style={[GlobalStyles.textOrange]}>{animal?.raza}</Text></Text>
        <Text style={GlobalStyles.textWhite}>Color: <Text style={[GlobalStyles.textOrange]}>{animal?.color}</Text></Text>
      </View>

      <CustomInput 
        label="Descripción"
        placeholder='Escribe una descripción'
        value={animal!.descripcion}
        onChangeText={() => {}}
        multiline
        editable={false}
      />

      <AnimalTable 
        peso={animal!.peso}
        genero={animal!.genero}
        proposito={animal!.proposito}
        edad={animal!.edad}
      />
      
      <View style={styles.dataContainer}>
        <Text style={[GlobalStyles.subTitle]}>Ubicación actual:</Text>
        <Text style={[GlobalStyles.miniText, {fontSize:20}]}>{animal?.ubicacion}</Text>
      </View>


      <View style={styles.dataContainer}>
        <Text style={GlobalStyles.textWhite}>
          Ingresada el :{' '}
          <Text style={[GlobalStyles.textOrange]}>
            {animal?.created_at ? format(new Date(animal.created_at), 'yyyy-MM-dd') : ''}
          </Text>
        </Text>
        <Text style={GlobalStyles.textWhite}>
          Ultima actualización :{' '}
          <Text style={[GlobalStyles.textOrange]}>
            {animal?.updated_at ? format(new Date(animal.updated_at), 'yyyy-MM-dd') : ''}
          </Text>
        </Text>
      </View>


    </ScrollView>
  )
}


const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 16,
    },
    titleContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between', 
      alignItems: 'center', 
      marginBottom: 10, 
    },
    dataContainer: {
      marginVertical: 10,
      width: '100%',
      alignItems: 'flex-start', 
      marginBottom: 10, 
    },
  
    
  
  });

export default DataViewAnimal