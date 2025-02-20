import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { newColors } from '../../../../assets/styles/colors'
import { constants } from '../../../../assets/styles/constants'
import { CustomIcon } from '../../../../components/Customs'
import { Animal } from '../../../../lib/interfaces/animal'
import { formatearFecha } from '../../../../lib/functions/FormateraFecha'
import { calcularEdad } from '../../../../lib/functions/CalcularEdad'

interface BasicDataProps {
  animal: Animal;
}

const BasicData = (animal: BasicDataProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerContainer}>
        <View style={styles.data}>
          <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            <CustomIcon color={newColors.fondo_secundario} name="paw-outline" size={20} />
            <Text style={styles.dataText}>Especie</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CustomIcon color={newColors.fondo_secundario} name="paw-outline" size={20} />
            <Text style={styles.dataText}>Raza</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CustomIcon color={newColors.fondo_secundario} name="color-palette-outline" size={20} />
            <Text style={styles.dataText}>Color</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CustomIcon color={newColors.fondo_secundario} name="gift-outline" size={20} />
            <Text style={styles.dataText}>Preñes</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CustomIcon color={newColors.fondo_secundario} name="today-outline" size={20} />
            <Text style={styles.dataText}>Nacimiento</Text>
          </View>
        </View>
        <View>
            <Text style={styles.element}>{animal.animal.especie}</Text>
            <Text style={styles.element}>{animal.animal.raza}</Text>
            <Text style={styles.element}>{animal.animal.color}</Text>
            <Text style={styles.element}>{animal.animal.embarazada ? "Sí" : "No"}</Text>
            <Text style={styles.element}>{formatearFecha(animal.animal.nacimiento!)}</Text>
        </View>
      </View>
      <View style={styles2.containerContainer}>
        <View style={styles2.element}>
          <View style={styles2.iconContainer}>
            <CustomIcon color={newColors.verde} name="fitness-outline" size={30} />
            <Text style={styles2.textIcon}>Peso</Text>
          </View>
          <Text style={styles2.text}>{animal.animal.peso} Kg</Text>
        </View>
        <View style={styles2.element}>
          <View style={styles2.iconContainer}>
            <CustomIcon color={newColors.verde} name="clipboard-outline" size={30} />
            <Text style={styles2.textIcon}>Proposito</Text>
          </View>
          <Text style={styles2.text}>{animal.animal.proposito}</Text>
        </View>
        <View style={styles2.element}>
          <View style={styles2.iconContainer}>
            <CustomIcon color={newColors.verde} name="female-outline" size={30} />
            <Text style={styles2.textIcon}>Genero</Text>
          </View>
          <Text style={styles2.text}>{animal.animal.genero}</Text>
        </View>
        <View style={styles2.element}>
          <View style={styles2.iconContainer}>
            <CustomIcon color={newColors.verde} name="today-outline" size={30} />
            <Text style={styles2.textIcon}>Edad</Text>
          </View>
          <Text style={styles2.text}>{calcularEdad(animal.animal.nacimiento)}</Text>
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
    justifyContent: 'flex-start',
    paddingVertical: 10,
  },
  containerContainer: {
    borderWidth: constants.borderWidth,
    borderColor: newColors.fondo_secundario,
    width: '90%',
    borderRadius: constants.borderRadius,
    padding: 10,
    flexDirection: 'row',
    gap: 10,
  },
  element:{
      backgroundColor: newColors.verde_light,
      padding: 5,
      paddingHorizontal: 10,
      marginVertical: separation,
      borderRadius: constants.borderRadius,
      width: '100%',
      color: newColors.fondo_secundario,
      fontWeight: 'bold',
  },
  data: {
    backgroundColor: newColors.verde_light,
    borderRadius: constants.borderRadius,
    paddingHorizontal: 15,

  },
  dataText:{
    textAlign: 'center',
    marginVertical: separation,
    padding: 5,
    color: newColors.fondo_secundario,
    fontWeight: 'bold',
  }
})
const styles2 = StyleSheet.create({
  containerContainer:{
    flexDirection: 'row',
    marginTop: 10,
  },
  element: {
    width: '23%', 
    alignItems: 'center',
    marginHorizontal: 5,
  },
  
  iconContainer:{
    alignItems: 'center',
  },
  textIcon:{
    fontWeight: '700',
    color: newColors.verde,
  },
  text:{
    backgroundColor: newColors.verde_light,
    borderRadius: constants.borderRadius / 3,
    paddingHorizontal: 15,
    paddingVertical: 5,
    fontWeight: '700',
    color: newColors.fondo_secundario,
  }
})

export default BasicData