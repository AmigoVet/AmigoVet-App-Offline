import React, { useState } from 'react';
import { FlatList, StyleSheet, View, Text, Alert } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NavigationProp, RootStackParamList } from '../../../../navigator/navigationTypes';
import GlobalContainer from '../../../../components/GlobalContainer';
import Header from '../../../../components/Header';
import Separator from '../../../../components/Separator';
import { newColors } from '../../../../styles/colors';
import { constants } from '../../../../styles/constants';
import MiniButton from '../../../../components/MiniButton';
import { WeightsTable } from '../../../../../lib/interfaces/Animal';
import { useAnimalStore } from '../../../../../lib/store/useAnimalStore';

type ViewWeightsRouteProp = RouteProp<RootStackParamList, 'ViewWeights'>;

const ViewWeights = () => {
  const { weights: initialWeights, animalName } = useRoute<ViewWeightsRouteProp>().params;
  const { goBack } = useNavigation<NavigationProp>();
  const { deleteWeight } = useAnimalStore();
  const [weights, setWeights] = useState<WeightsTable[]>(initialWeights);

  const handleDeleteWeight = (weight: WeightsTable) => {
    if (weights.length === 1) {
      Alert.alert('No se puede eliminar', 'No puedes eliminar el último registro de peso.');
      return;
    }

    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que quieres eliminar este peso? Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteWeight(weight.id);
              setWeights(weights.filter((w) => w.id !== weight.id));
              Alert.alert('Éxito', 'Peso eliminado correctamente');
            } catch (error: any) {
              console.error('[ERROR] Error al eliminar peso:', error.message);
              Alert.alert('Error', `No se pudo eliminar el peso: ${error.message || 'Error desconocido'}`);
            }
          },
        },
      ]
    );
  };

  return (
    <GlobalContainer>
      <Header
        title={'Pesos de ' + animalName}
        iconOnPress="chevron-back-outline"
        onPress={goBack}
      />
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={<Separator height={20} />}
          data={weights}
          keyExtractor={(item) => item.id}
          renderItem={({ item }: { item: WeightsTable }) => (
            <WeightCard weight={item} onDelete={() => handleDeleteWeight(item)} />
          )}
          ListEmptyComponent={
            <Text style={styles.noDataText}>No hay pesos registrados</Text>
          }
        />
      </View>
    </GlobalContainer>
  );
};

const WeightCard = ({ weight, onDelete }: { weight: WeightsTable; onDelete: () => void }) => {
  // Format date to a readable format (e.g., "DD/MM/YYYY HH:mm")
  const formattedDate = new Date(weight.fecha).toLocaleString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <View style={styles.weightCard}>
      <View style={styles.header}>
        <Text style={styles.text}>{formattedDate}</Text>
        <MiniButton
          icon="trash-outline"
          text="Eliminar"
          onPress={onDelete}
          backgroundColor={newColors.rojo}
          color={newColors.fondo_principal}
        />
      </View>
      <Text style={styles.weightText}>{weight.peso} kg</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
  },
  weightCard: {
    marginVertical: 10,
    borderRadius: constants.borderRadius,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderBottomColor: newColors.fondo_secundario,
    borderBottomWidth: constants.borderWidth,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 16,
    color: newColors.verde_light,
    fontFamily: constants.FontText,
    fontWeight: '600',
  },
  weightText: {
    fontSize: 18,
    color: newColors.fondo_secundario,
    fontFamily: constants.FontText,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    marginTop: 5,
  },
  noDataText: {
    fontSize: 14,
    color: newColors.fondo_principal,
    textAlign: 'center',
    marginTop: 20,
    fontFamily: constants.FontText,
  },
});

export default ViewWeights;
