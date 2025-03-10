import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {  newColors } from '../../assets/styles/colors';
import { AnimalWithNotes } from '../../lib/interfaces/animal';
import { CustomIcon, CustomImage } from '../Customs';
import { constants } from '../../assets/styles/constants';
import { RootStackParamList } from '../../lib/interfaces/navigate';

interface PrivateAnimalCardProps {
  animal: AnimalWithNotes;
}

const PrivateAnimalCard: React.FC<PrivateAnimalCardProps> = ({ animal }) => {
  const { navigate } = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Pressable style={styles.box} onPress={() => navigate('AnimalView', { id: animal.id })}>
      <View style={styles.imageContainer}>
        <CustomImage source={animal.image} />
      </View>
      <View style={styles.textContainer}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
        <Text style={[styles.text, { fontWeight: 'bold' }]}>{animal.identificador}</Text>
        <Text style={styles.text}>{animal.nombre}</Text>
      </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-start' }}>
          <CustomIcon name="location-outline" size={20} color={newColors.principal} />
          <Text style={[styles.text, { fontWeight: 200 }]}>{animal.ubicacion || '-'}</Text>
        </View>
        <View >
          {animal.notes.length > 0 ? (
            animal.notes.map((note) => (
              <View key={note.id}>
                <Text style={[styles.text, {fontWeight: 200, fontSize: 12}]}>{note.nota}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.emptyNotes}>Sin notas relevantes</Text>
          )}
        </View>
        <View>
        {animal.embarazada && <Text style={styles.text}>En estado de preñez</Text>}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
    box: {
      marginVertical: 5,
      height: 150, 
      width: 360,
      backgroundColor: newColors.verde,
      borderRadius: constants.borderRadius,
      flexDirection: 'row',
      alignSelf: 'center'
    },
    imageContainer: {
      width: '50%',
      padding: 10,
    },
    textContainer: {
      width: '50%', 
      justifyContent: 'flex-start', 
      paddingVertical: 10,
      paddingRight: 10,
      paddingLeft: 5,
    },
    text: {
      fontSize: 14,
      textAlign: 'left', 
      fontWeight: 400,
      color: newColors.fondo_principal,
    },
    noteDate: {
      fontSize: 13,
      fontWeight: 'bold',
      color: newColors.principalLight,
    },
    emptyNotes: {
      fontSize: 12,
      fontStyle: 'italic',
      color: '#888',
    },
  });

export default PrivateAnimalCard;
