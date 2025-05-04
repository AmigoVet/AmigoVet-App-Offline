import { View, Text, Pressable, StyleSheet, Alert, FlatList, Image } from 'react-native';
import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import LabelLogo from '../../../../assets/svgs/LabelLogo';
import { simplificateName } from '../../../../../lib/functions/simplificateName';
import Icon from '@react-native-vector-icons/ionicons';
import { newColors } from '../../../../styles/colors';
import { RootStackParamList } from '../../../../navigator/navigationTypes';
import { constants } from '../../../../styles/constants';
import { Animal } from '../../../../../lib/interfaces/Animal';


interface HeaderHomeProps {
  userName: string;
  animals: Animal[];
}

const HeaderHome = ({ userName, animals }: HeaderHomeProps) => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const name = simplificateName(userName);

  // Determinar si centrar el contenido del FlatList
  const centerFlatList = animals.length <= 3;
  const styles = createStyles(); // Eliminamos parámetros dinámicos

  return (
    <View style={styles.rootContainer}>
      {/* Contenedor del HeaderHome */}
      <View style={styles.container}>
        <View>
          <LabelLogo width={140} height={140} fill={newColors.fondo_principal} style={styles.marginTop50} />
          <Text style={styles.welcomeText}>Bienvenido {name}</Text>
        </View>
        <View style={styles.iconsContainer}>
          <View style={styles.box}>
            <Pressable onPress={() => navigate('Busqueda')}>
              <Icon name="search-outline" size={25} color={newColors.fondo_principal} />
            </Pressable>
            <Pressable onPress={() => navigate('New')}>
              <Icon name="add-circle-outline" size={25} color={newColors.fondo_principal} />
            </Pressable>
            <Pressable onPress={() => navigate('AllChats')}>
              <Icon name="chatbubble-outline" size={25} color={newColors.fondo_principal} />
            </Pressable>
          </View>
          <Pressable onPress={() => Alert.alert('Settings')}>
            <Icon name="ellipsis-vertical" size={25} color={newColors.fondo_principal} />
          </Pressable>
        </View>
      </View>

      {/* Contenedor del FlatList */}
      <View style={styles.flatListContainer}>
        <FlatList
          data={animals}
          horizontal
          ListHeaderComponent={() => <View style={styles.width20} />}
          ListFooterComponent={() => <View style={styles.width20} />}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={centerFlatList ? styles.centeredFlatList : styles.defaultFlatList}
          renderItem={({ item }) => (
            <Pressable style={styles.animalContainer} onPress={() => navigate('AnimalView', { animal: item })}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.circle} />
              </View>
              <Text style={styles.text}>{item.nombre}</Text>
              <Text style={styles.text2}>{item.especie}</Text>
            </Pressable>
          )}
        />
      </View>
    </View>
  );
};

const createStyles = () =>
  StyleSheet.create({
    rootContainer: {
      zIndex: 1,
    },
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: newColors.fondo_secundario,
      paddingHorizontal: 20,
      paddingTop: 10,
      paddingBottom: 50,
      zIndex: 1,
      borderBottomLeftRadius: 40, // Valor fijo para consistencia
      borderBottomRightRadius: 40,
    },
    welcomeText: {
      fontSize: 12,
      fontWeight: '500',
      color: newColors.fondo_principal,
      marginTop: -45,
      fontFamily: constants.FontTitle,
    },
    iconsContainer: {
      flexDirection: 'row',
      gap: 10,
    },
    flatListContainer: {
      marginTop: -40, // Valor fijo para superponer siempre
      zIndex: 2,
    },
    centeredFlatList: {
      flexGrow: 1,
      justifyContent: 'center', // Centrar horizontalmente cuando hay <= 3 animales
    },
    defaultFlatList: {
      // Estilo por defecto cuando hay más de 3 animales
    },
    animalContainer: {
      alignItems: 'center',
      marginHorizontal: 2,
    },
    imageContainer: {
      backgroundColor: newColors.fondo_principal,
      padding: 5,
      borderRadius: 55,
    },
    circle: {
      width: 75,
      height: 75,
      borderRadius: 55,
      borderWidth: 3,
      borderColor: newColors.fondo_secundario,
    },
    text: {
      fontSize: 14,
      fontWeight: 'bold',
      color: newColors.fondo_secundario,
      marginTop: 3,
      fontFamily: constants.FontTitle,
    },
    text2: {
      marginTop: 3,
      fontSize: 12,
      fontWeight: 'bold',
      color: newColors.fondo_principal,
      backgroundColor: newColors.fondo_secundario,
      paddingHorizontal: 20,
      paddingVertical: 2,
      borderRadius: constants.borderRadius,
      fontFamily: constants.FontText,
    },

    width20: {
      width: 20,
    },
    marginTop50: {
      marginTop: -50,
    },
    box: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });

export default HeaderHome;
