import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { format } from 'date-fns'
import { GlobalStyles } from '../styles'
import AnimalTable from './AnimalTable'
import CustomButton from './CustomButton'
import CustomImage from './CustomImage'
import CustomInput from './CustomInput'
import { Animal } from '../interfaces/animal'
import { calcularEdad, formatearFecha } from '../functions'
import { useTheme } from '../context/ThemeContext'
import { getDynamicColors } from '../styles/colors'
import { createGlobalStyles } from '../styles/styles'
import { createNewStyles } from '../styles/NewStyles'

interface DataViewAnimalProps {
  animal: Animal;
}

const DataViewAnimal = ({ animal }: DataViewAnimalProps) => {

  const { isDarkTheme } = useTheme();
  const GlobalStyles = createGlobalStyles(isDarkTheme);
  
  return (
  <View>

      
      <View style={styles.titleContainer}>
        <Text style={[GlobalStyles.title]}>{animal?.nombre}<Text style={[GlobalStyles.miniText]}>({animal?.id})</Text></Text>
        <Text style={[GlobalStyles.subTitle]}>{animal?.identificador}</Text>
      </View>

      <View style={styles.dataContainer}>
        <Text style={GlobalStyles.textWhite}>Especie: <Text style={[GlobalStyles.textOrange]}>{animal?.especie}</Text></Text>
        <Text style={GlobalStyles.textWhite}>Raza: <Text style={[GlobalStyles.textOrange]}>{animal?.raza}</Text></Text>
        <Text style={GlobalStyles.textWhite}>Color: <Text style={[GlobalStyles.textOrange]}>{animal?.color}</Text></Text>
        <Text style={GlobalStyles.textWhite}>Embarazo: <Text style={[GlobalStyles.textOrange]}>{animal?.embarazada ? 'Sí' : 'No'}</Text></Text>
        <Text style={GlobalStyles.textWhite}>Fecha Nacimiento: 
          <Text style={[GlobalStyles.textOrange]}>
            {formatearFecha(animal!.nacimiento ? animal!.nacimiento : '')}
          </Text>
        </Text>
      </View>
      {animal.notas && animal.notas.length > 0 && (
        <View style={styles.dataContainer}>
          {animal.notas.map((nota, index) => (
            <Text key={index} style={GlobalStyles.note}>
              ● {nota.nota}
            </Text>
          ))}
        </View>
      )}



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
        edad={
          animal!.nacimiento ? calcularEdad(animal!.nacimiento) : "Edad desconocida"
        }
      />

      
      <View style={styles.dataContainer}>
        <Text style={[GlobalStyles.subTitle]}>Ubicación actual:</Text>
        <Text style={[GlobalStyles.miniText, {fontSize:20}]}>{animal?.ubicacion}</Text>
      </View>


      <View style={styles.dataContainer}>
        <Text style={GlobalStyles.textWhite}>
          Ingresada el :{' '}
          <Text style={[GlobalStyles.textOrange]}>
            {formatearFecha(animal?.created_at ? animal.created_at : '')}
          </Text>
        </Text>
        <Text style={GlobalStyles.textWhite}>
          Ultima actualización :{' '}
          <Text style={[GlobalStyles.textOrange]}>
            {formatearFecha(animal?.updated_at ? animal.updated_at : '')}
          </Text>
        </Text>
      </View>


    </View>
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