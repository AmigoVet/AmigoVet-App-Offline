import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Icon from '@react-native-vector-icons/ionicons';
import { Animal } from '../../../../../lib/interfaces/Animal';
import { newColors } from '../../../../styles/colors';
import { constants } from '../../../../styles/constants';
import { DateFormatter } from '../../../../../lib/functions/DateFormatter';
import { calculateOld } from '../../../../../lib/functions/CalculateOld';


interface BasicDataAnimalViewProps {
  animal: Animal;
}

const BasicDataAnimalView = (animal: BasicDataAnimalViewProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerContainer}>
        <View style={styles.data}>
          <View style={styles.dataTextContainer}>
            <Icon color={newColors.fondo_secundario} name="paw-outline" size={20} />
            <Text style={styles.dataText}>Especie</Text>
          </View>
          <View style={styles.dataTextContainer}>
            <Icon color={newColors.fondo_secundario} name="paw-outline" size={20} />
            <Text style={styles.dataText}>Raza</Text>
          </View>
          <View style={styles.dataTextContainer}>
            <Icon color={newColors.fondo_secundario} name="color-palette-outline" size={20} />
            <Text style={styles.dataText}>Color</Text>
          </View>
          <View style={styles.dataTextContainer}>
            <Icon color={newColors.fondo_secundario} name="gift-outline" size={20} />
            <Text style={styles.dataText}>Preñes</Text>
          </View>
          <View style={styles.dataTextContainer}>
            <Icon color={newColors.fondo_secundario} name="today-outline" size={20} />
            <Text style={styles.dataText}>Nacimiento</Text>
          </View>
        </View>
        <View>
            <Text style={styles.element}>{animal.animal.especie}</Text>
            <Text style={styles.element}>{animal.animal.raza}</Text>
            <Text style={styles.element}>{animal.animal.color}</Text>
            <Text style={styles.element}>{animal.animal.embarazada ? "Sí" : "No"}</Text>
            <Text style={styles.element}>{DateFormatter(animal.animal.nacimiento!)}</Text>
        </View>
      </View>
      <View style={styles2.containerContainer}>
        <View style={styles2.element}>
          <View style={styles2.iconContainer}>
            <Icon color={newColors.verde} name="fitness-outline" size={30} />
            <Text style={styles2.textIcon}>Peso</Text>
          </View>
          <Text style={styles2.text}>{animal.animal.peso} Kg</Text>
        </View>
        <View style={styles2.element}>
          <View style={styles2.iconContainer}>
            <Icon color={newColors.verde} name="clipboard-outline" size={30} />
            <Text style={styles2.textIcon}>Proposito</Text>
          </View>
          <Text style={styles2.text}>{animal.animal.proposito}</Text>
        </View>
        <View style={styles2.element}>
          <View style={styles2.iconContainer}>
            <Icon color={newColors.verde} name={animal.animal.genero === "Macho" ? "male-outline" : "female-outline"} size={30} />
            <Text style={styles2.textIcon}>Genero</Text>
          </View>
          <Text style={styles2.text}>{animal.animal.genero}</Text>
        </View>
        <View style={styles2.element}>
          <View style={styles2.iconContainer}>
            <Icon color={newColors.verde} name="today-outline" size={30} />
            <Text style={styles2.textIcon}>Edad</Text>
          </View>
          <Text style={styles2.text}>{calculateOld(animal.animal.nacimiento)}</Text>
        </View>
      </View>
    </View>
  )
}

const separation = 2.5

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  containerContainer: {
    borderWidth: constants.borderWidth,
    borderColor: newColors.fondo_secundario,
    width: '90%',
    borderRadius: constants.borderRadius,
    paddingVertical: 10,
    flexDirection: 'row',
  },
  element:{
      borderBottomWidth: 1,
      padding: 5,
      marginVertical: separation,
      borderRadius: constants.borderRadius,
      width: '100%',
      color: newColors.fondo_secundario,
      fontWeight: '600',
      fontFamily: constants.FontText,
      minHeight: 30,
      maxHeight: 40,
  },
  data: {
    borderRadius: constants.borderRadius,
    paddingLeft: 15,
  },
  dataTextContainer:{
    flexDirection: 'row', 
    alignItems: 'center', 
    borderBottomWidth: 1,
    borderRadius: constants.borderRadius,
    minHeight: 30,
    maxHeight: 40,
  },
  dataText:{
    textAlign: 'center',
    marginVertical: separation,
    padding: 5,
    color: newColors.fondo_secundario,
    fontWeight: 'bold',
    fontFamily: constants.FontTitle
  }
})
const styles2 = StyleSheet.create({
  containerContainer:{
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: 20,
  },
  element: {
    width: '23%', 
    alignItems: 'center',
    marginHorizontal: 3,
  },
  
  iconContainer:{
    alignItems: 'center',
  },
  textIcon:{
    fontWeight: '700',
    color: newColors.verde,
    fontFamily: constants.FontTitle,
  },
  text:{
    backgroundColor: newColors.verde_light,
    borderRadius: constants.borderRadius / 3,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontWeight: '500',
    color: newColors.fondo_secundario,
    fontFamily: constants.FontText,
  }
})

export default BasicDataAnimalView