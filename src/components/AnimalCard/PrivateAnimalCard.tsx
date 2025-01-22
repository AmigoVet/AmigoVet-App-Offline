import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getDynamicColors, newColors } from '../../assets/styles/colors';
import { AnimalWithNotes } from '../../lib/interfaces/animal';
import { RootStackParamList } from '../../views/Welcome';
import { useTheme } from '../../lib/context/ThemeContext';
import { CustomIcon, CustomImage } from '../Customs';
import { constants } from '../../assets/styles/constants';

interface PrivateAnimalCardProps {
  animal: AnimalWithNotes;
}

const PrivateAnimalCard: React.FC<PrivateAnimalCardProps> = ({ animal }) => {
  const { navigate } = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { isDarkTheme } = useTheme();
  const colors = getDynamicColors(isDarkTheme);
  const styles = dynamicStyles(colors);

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
          <Text style={[styles.text, { fontWeight: 200 }]}>{animal.ubicacion}</Text>
        </View>
        <View >
          {animal.notes.length > 0 ? (
            animal.notes.map((note) => (
              <View key={note.id}>
                <Text style={[styles.text, {fontWeight: 200, fontSize: 12}]}>{note.nota}</Text>
                <Text style={styles.noteDate}>{note.fecha}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.emptyNotes}>Sin notas relevantes</Text>
          )}
        </View>
        <View>
          {animal.embarazada && <Text style={styles.text}>En estado de preñez</Text>}
          {animal.genero === "Hembra" && <Text style={[styles.text, {fontWeight: 200, fontSize: 12}]}>Fecha de gestación: {}</Text>}
        </View>
      </View>
    </Pressable>
  );
};

const dynamicStyles = (colors: ReturnType<typeof getDynamicColors>) =>
  StyleSheet.create({
    box: {
      height: 150, 
      width: 340,
      backgroundColor: newColors.verde,
      borderRadius: constants.borderRadius,
      flexDirection: 'row',
      overflow: 'hidden',
    },
    imageContainer: {
      width: '50%',
      justifyContent: 'center', 
      alignItems: 'center', 
    },
    textContainer: {
      width: '50%', 
      justifyContent: 'flex-start', 
      paddingVertical: 10,
      paddingRight: 10,
      paddingLeft: 5,
    },
    text: {
      color: colors.fondo,
      fontSize: 14,
      textAlign: 'left', 
      fontWeight: 400,
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
