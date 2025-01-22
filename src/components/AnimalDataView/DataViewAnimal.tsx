import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { format } from 'date-fns'
import AnimalTable from './AnimalTable'
import CustomButton from '../Customs/CustomButton'
import CustomImage from '../Customs/CustomImage'
import { useTheme } from '../../lib/context/ThemeContext'
import { createGlobalStyles } from '../../assets/styles/styles'
import { Animal, Notes } from '../../lib/interfaces/animal'
import { CustomInput } from '../Customs'
import { calcularEdad } from '../../lib/functions/CalcularEdad'
import { formatearFecha } from '../../lib/functions/FormateraFecha'
import { getDynamicColors } from '../../assets/styles/colors'


interface DataViewAnimalProps {
  animal: Animal;
  notas: Notes[];
}

const DataViewAnimal = ({ animal, notas }: DataViewAnimalProps) => {

  const { isDarkTheme } = useTheme();
  const GlobalStyles = createGlobalStyles(isDarkTheme);
  const colors = getDynamicColors(isDarkTheme);
  const styles = createStyles(colors);
  console.log(notas)
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
        <Text style={GlobalStyles.textWhite}>Preñes: <Text style={[GlobalStyles.textOrange]}>{animal?.embarazada ? 'Sí' : 'No'}</Text></Text>
        <Text style={GlobalStyles.textWhite}>Nacimiento: <Text style={[GlobalStyles.textOrange]}>{ formatearFecha(animal!.nacimiento ? animal!.nacimiento : '')}</Text>
        </Text>
        <Text style={GlobalStyles.textWhite}>Ultima fecha de calor: <Text style={[GlobalStyles.textOrange]}>{formatearFecha(animal?.celo ? animal?.celo : '')}</Text></Text>
      </View>
      
      {notas && notas.length > 0 && (
        <View style={styles.dataContainer}>
          {notas.map((nota, index) => (
            <Text key={index} style={GlobalStyles.note}>
              ● {nota.nota}{nota.fecha ? ` ${nota.fecha}` : ''}
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


const createStyles = (colors: ReturnType<typeof getDynamicColors>) =>
  StyleSheet.create({
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
      // backgroundColor: colors.verdeDark,
      borderRadius: 15,
      borderWidth: 0.5,
      borderColor: colors.verde,
      paddingHorizontal: 20,
      paddingVertical: 5,
    },
    dataContainer: {
      marginVertical: 10,
      width: '100%',
      alignItems: 'flex-start', 
      marginBottom: 10, 
    },
  
    
  
  });

export default DataViewAnimal