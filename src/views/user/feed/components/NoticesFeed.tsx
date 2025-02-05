import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { newColors } from '../../../../assets/styles/colors'
import { constants } from '../../../../assets/styles/constants'
import { getLastFiveAnimals } from '../../../../lib/db/getDataAnimal'

interface MiniAnimalListProps {
  nombre: string;
  especie: string;
  image: string;
}

interface MiniAnimalListComponentProps {
  animals: MiniAnimalListProps[];
}


const NoticesFeed = ({ animals }: MiniAnimalListComponentProps) => {
  
    console.log(animals[0])
    console.log(animals[1])
    console.log(animals[2])
    console.log(animals[3])
    console.log(animals[4])

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Informacion</Text>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    borderRadius: constants.borderRadius,
    borderWidth: 2,
    borderColor: newColors.fondo_secundario,
    flex: 1,
    alignItems: 'center',
    minHeight: 200,
  },
  title:{
    fontSize: 20,
    fontWeight: 'bold',
    color: newColors.fondo_secundario,
  }
})
export default NoticesFeed