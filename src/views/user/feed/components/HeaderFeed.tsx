import { View, Text, Pressable, StyleSheet, Alert, FlatList, Image } from 'react-native';
import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { getDynamicColors, newColors, staticColors } from '../../../../assets/styles/colors';
import { CustomIcon } from '../../../../components/Customs';
import LabelLogo from '../../../../assets/svgs/LabelLogo';
import { obtenerPalabras } from '../../../../lib/functions/SeccionarNombre';
import { constants } from '../../../../assets/styles/constants';
import { RootStackParamList } from '../../../../lib/interfaces/navigate';

interface HeaderFeedProps {
  userName: string;
  animals: { nombre: string; especie: string; image: string }[];
}

const HeaderFeed = ({ userName, animals }: HeaderFeedProps) => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const name = obtenerPalabras(userName);

  // Determinar si centrar el contenido del FlatList
  const centerFlatList = animals.length <= 3;
  const marginTop = centerFlatList ? 0 : -40;
  const borderRadius = centerFlatList ? 80 : 40;
  const styles = createStyles(marginTop, borderRadius);

  return (
    <View style={styles.rootContainer}>
      {/* Contenedor del HeaderFeed */}
      <View style={styles.container}>
        <View>
          <LabelLogo width={140} height={140} fill={newColors.fondo_principal} style={{ marginTop: -50 }} />
          <Text style={styles.welcomeText}>Bienvenido {name}</Text>
        </View>
        <View style={styles.iconsContainer}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 5 }}>
            <Pressable onPress={() => navigate('Busqueda')}>
              <CustomIcon name="search-outline" size={25} color={staticColors.blancoLight} />
            </Pressable>
            <Pressable onPress={() => navigate('Nuevo')}>
              <CustomIcon name="add-circle-outline" size={25} color={staticColors.blancoLight} />
            </Pressable>
            <Pressable onPress={() => Alert.alert('Llegará pronto!!')}>
              <CustomIcon name="chatbubble-outline" size={25} color={staticColors.blancoLight} />
            </Pressable>
          </View>
          <Pressable onPress={() => Alert.alert('Settings')}>
            <CustomIcon name="ellipsis-vertical" size={25} color={staticColors.blancoLight} />
          </Pressable>
        </View>
      </View>

      {/* Contenedor del FlatList */}
      <View style={styles.flatListContainer}>
        <FlatList
          data={animals}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={centerFlatList ? styles.centeredFlatList : null}
          renderItem={({ item }) => (
            <View style={styles.animalContainer}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.circle} />
              </View>
              <Text style={styles.text}>{item.nombre}</Text>
              <Text style={styles.text2}>{item.especie}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const createStyles = (marginTop: number, borderRadius: number) =>
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
      borderBottomLeftRadius: borderRadius, 
      borderBottomRightRadius: borderRadius,
    },
    welcomeText: {
      fontSize: 12,
      fontWeight: '300',
      color: newColors.fondo_principal,
      marginTop: -45,
    },
    iconsContainer: {
      flexDirection: 'row',
      gap: 10,
    },
    flatListContainer: {
      marginTop: marginTop, 
      zIndex: 2, 
    },
    centeredFlatList: {
      flexGrow: 1,
      justifyContent: 'center',
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
    },
  });

export default HeaderFeed;