import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../../../../lib/context/ThemeContext';
import { getDynamicColors, newColors } from '../../../../assets/styles/colors';
import { constants } from '../../../../assets/styles/constants';
import { CustomImage } from '../../../../components/Customs';
import { RootStackParamList } from '../../../Welcome';
import { MiniAnimalListProps } from './NoticesFeed';

interface FeedCardProps {
  animal: MiniAnimalListProps;
}

const FeedCard: React.FC<FeedCardProps> = ({ animal }) => {
  const { navigate } = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { isDarkTheme } = useTheme();
  const colors = getDynamicColors(isDarkTheme);
  const styles = dynamicStyles(colors);

  return (
    <Pressable style={styles.box} onPress={() => navigate('AnimalView', { id: animal.id! })}>
      
      {/* Imagen de fondo */}
      <CustomImage source={animal.image} style={styles.image} />

      {/* Bloque de información sobre la imagen */}
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{animal.nombre}</Text>
        <Text style={styles.description}>{animal.descripcion}</Text>
      </View>

    </Pressable>
  );
};

const dynamicStyles = (colors: ReturnType<typeof getDynamicColors>) =>
  StyleSheet.create({
    box: {
      width: 330,
      height: 150,
      borderRadius: constants.borderRadius,
      overflow: 'hidden',
      position: 'relative',
      marginVertical: 5,
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
      borderRadius: constants.borderRadius,
    },
    infoContainer: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      backgroundColor: newColors.verde,
      padding: 10,
      borderRadius: constants.borderRadius,
      width: '35%',
      height: '100%',
    },
    name: {
      color: newColors.principal,
      fontSize: 14,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    description: {
      color: newColors.principalLight,
      fontSize: 12,
      textAlign: 'center',
      marginTop: 5,
    },
  });

export default FeedCard;
