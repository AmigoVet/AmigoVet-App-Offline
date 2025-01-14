import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getDynamicColors, newColors } from '../../assets/styles/colors';
import { Animal } from '../../lib/interfaces/animal';
import { RootStackParamList } from '../../views/Welcome';
import { useTheme } from '../../lib/context/ThemeContext';

interface PrivateAnimalCardProps {
  animal: Animal;
}

const PrivateAnimalCard: React.FC<PrivateAnimalCardProps> = ({ animal }) => {
  const { navigate } = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { isDarkTheme } = useTheme();
  const colors = getDynamicColors(isDarkTheme);
  const styles = dynamicStyles(colors);

  return (
    <Pressable
      style={styles.container}
      onPress={() => navigate('AnimalView', { id: animal.id })}
    >
      <View style={styles.box}>
        <Text style={styles.text}>Animal: {animal.nombre}</Text>
      </View>
    </Pressable>
  );
};

const dynamicStyles = (colors: ReturnType<typeof getDynamicColors>) =>
  StyleSheet.create({
    container: {
      borderRadius: 10,
      backgroundColor: colors.fondo,
    },
    box: {
      height: 150,
      width: 340,
      backgroundColor: newColors.verde,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    text: {
      color: colors.fondo,
      fontSize: 16,
    },
  });

export default PrivateAnimalCard;
