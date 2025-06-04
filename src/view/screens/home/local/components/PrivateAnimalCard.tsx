import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import { RootStackParamList } from '../../../../navigator/navigationTypes';
import { newColors } from '../../../../styles/colors';
import CustomImage from '../../../../components/customs/CustomImage';
import Icon from '@react-native-vector-icons/ionicons';
import { Animal } from '../../../../../lib/interfaces/Animal';
import { constants } from '../../../../styles/constants';
import { GlobalStyles } from '../../../../styles/GlobalStyles';

interface PrivateAnimalCardProps {
  animal: Animal;
}

const PrivateAnimalCard: React.FC<PrivateAnimalCardProps> = ({ animal }) => {
  const { navigate } = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Get the most recent image (if any)
  const latestImage = animal.images && animal.images.length > 0
    ? animal.images.reduce((latest, current) => 
        new Date(current.fecha) > new Date(latest.fecha) ? current : latest
      ).url
    : undefined;

  // Get the first two notes (or fewer if not enough exist)
  const howManyNotes = animal.embarazada ? 1 : 2;
  const firstTwoNotes = animal.notes && animal.notes.length > 0 ? animal.notes.slice(0, howManyNotes) : [];

  return (
    <Pressable style={styles.box} onPress={() => navigate('AnimalView', { animal })}>
      <View style={styles.imageContainer}>
        <CustomImage source={latestImage || ''} />
      </View>
      <View style={styles.textContainer}>
        <View style={styles.box1}>
          <Text style={[styles.text, styles.headerText]}>
            {animal.favorito && <Icon name="star" size={15} color={newColors.principal} style={GlobalStyles.marginHorizontal20} />}
            {animal.nombre}
          </Text>
          <Text style={styles.text}>{animal.identificador || 'Sin Identificador'}</Text>
        </View>
        <View style={styles.box2}>
          <Icon name="location-outline" size={20} color={newColors.principal} />
          <Text style={[styles.text, GlobalStyles.fontWeight200]}>{animal.ubicacion || '-'}</Text>
        </View>
        {animal.embarazada && (
          <>
            <View style={styles.separator} />
            <View style={styles.preñesStateContainer}>
              <Icon name="paw-outline" size={14} color={newColors.principal} />
              <Text style={styles.preñesState}>En estado de preñez</Text>
            </View>
          </>
        )}
        <View style={styles.separator} />
        <View>
          {firstTwoNotes.length > 0 ? (
            firstTwoNotes.map((note, index) => (
              <View key={index} style={styles.noteContainer}>
                <Text style={[styles.text, styles.noteDate]} numberOfLines={1} ellipsizeMode="tail">
                  {note.fecha}
                </Text>
                <Text style={[styles.text, GlobalStyles.fontWeight200]} numberOfLines={1} ellipsizeMode="tail">
                  {note.nota}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.emptyNotes}>Sin notas relevantes</Text>
          )}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  box: {
    marginVertical: 5,
    height: 150,
    width: '95%',
    backgroundColor: newColors.verde,
    borderRadius: constants.borderRadius,
    flexDirection: 'row',
    alignSelf: 'center',
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
    fontWeight: '400',
    color: newColors.fondo_principal,
    fontFamily: constants.FontText,
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
  box1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  box2: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  headerText: {
    fontWeight: 'bold',
    fontFamily: constants.FontTitle,
  },
  separator: {
    height: 0.5,
    marginVertical: 4,
    width: '100%',
    backgroundColor: newColors.fondo_principal,
  },
  noteContainer: {
    marginBottom: 5,
  },
  preñesState: {
    fontSize: 14,
    textAlign: 'left',
    fontWeight: '600',
    color: newColors.fondo_principal,
    fontFamily: constants.FontText,
  },
  preñesStateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default PrivateAnimalCard;
