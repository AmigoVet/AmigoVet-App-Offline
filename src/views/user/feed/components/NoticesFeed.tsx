import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { newColors } from '../../../../assets/styles/colors';
import { constants } from '../../../../assets/styles/constants';
import FeedCard from './FeedCard';

export interface MiniAnimalListProps {
  id?: string;
  nombre: string;
  especie: string;
  descripcion: string;
  image: string;
}

interface MiniAnimalListComponentProps {
  animals: MiniAnimalListProps[];
}

const NoticesFeed = ({ animals }: MiniAnimalListComponentProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Información</Text>
      {animals.length === 0 ? (
        <Text style={styles.noAnimalsText}>No hay animales registrados</Text>
      ) : (
        animals.map((animal) => (
          <FeedCard key={animal.id} animal={animal} />
        ))
      )}
    </View>
  );
};

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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: newColors.fondo_secundario,
  },
  noAnimalsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: newColors.fondo_secundario,
    textAlign: 'center',
    marginTop: 20, 
  },
});

export default NoticesFeed;