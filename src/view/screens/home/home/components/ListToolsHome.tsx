import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { newColors } from '../../../../styles/colors';
import { constants } from '../../../../styles/constants';
import { RootStackParamList } from '../../../../navigator/navigationTypes';

// Tipo para cada botón
type ButtonItem = {
  id: string;
  label: string;
  screen: keyof RootStackParamList; // Nombre de la pantalla a la que redirige
};

// Props del componente
type ButtonBarProps = {
  // Puedes agregar props adicionales si es necesario
};

// Componente principal
const ListToolsHome: React.FC<ButtonBarProps> = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Lista de botones con sus destinos
  const buttons: ButtonItem[] = [
    { id: '1', label: 'Peso Ideal', screen: 'CalculateAppropriateWeight' },
    { id: '2', label: 'Alimento Diario', screen: 'CalculateFoodPerDay' },
    { id: '3', label: 'Dosis Purgante', screen: 'CalculatePurgativeDose' },
    // Puedes agregar más botones según las pantallas disponibles
    // { id: '4', label: 'Búsqueda', screen: 'Busqueda' },
    // { id: '5', label: 'Calendario', screen: 'Calendar' },
  ];

  // Función para manejar la navegación
  const navigateToScreen = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen);
  };

  // Renderiza cada botón
  const renderButtonItem = ({ item }: { item: ButtonItem }) => (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigateToScreen(item.screen)}
      activeOpacity={0.7} // Retroalimentación visual al presionar
    >
      <Text style={styles.buttonText}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={buttons}
        horizontal
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={() => <View style={styles.spacer} />}
        ListFooterComponent={() => <View style={styles.spacer} />}
        keyExtractor={(item) => item.id}
        renderItem={renderButtonItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    backgroundColor: newColors.fondo_principal,
  },
  listContainer: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: newColors.fondo_principal,
    borderRadius: constants.borderRadius,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: newColors.fondo_secundario,
    minWidth: 100,
  },
  buttonText: {
    color: newColors.fondo_secundario,
    fontSize: 14,
    fontWeight: '600',
    fontFamily: constants.FontText,
    textAlign: 'center',
  },
  spacer: {
    width: 20,
  },
});

export default ListToolsHome;
