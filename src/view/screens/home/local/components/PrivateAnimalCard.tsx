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

interface PrivateAnimalCardProps {
  animal: Animal;
}

const PrivateAnimalCard: React.FC<PrivateAnimalCardProps> = ({ animal }) => {
  const { navigate } = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Pressable style={styles.box} onPress={() => navigate('AnimalView', { animal: animal })}>
      <View style={styles.imageContainer}>
        <CustomImage source={animal.image} style={{height: '100%'}} />
      </View>
      <View style={styles.textContainer}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
        <Text style={[styles.text, { fontWeight: 'bold', fontFamily: constants.FontTitle }]}>
          {animal.favorito && <Icon name="star" size={15} color={newColors.principal} style={{marginHorizontal: 20}} />}
          {animal.nombre }
        </Text>
        <Text style={styles.text}>{animal.identificador || 'Sin Identificador'}</Text>
      </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-start' }}>
          <Icon name="location-outline" size={20} color={newColors.principal} />
          <Text style={[styles.text, { fontWeight: 200 }]}>{animal.ubicacion || '-'}</Text>
        </View>
        <View >

            <Text style={styles.emptyNotes}>Sin notas relevantes</Text>
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
      width: '95%',
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
      fontFamily: constants.FontText
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
