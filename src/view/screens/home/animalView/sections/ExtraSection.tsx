import { View, Text, Alert, StyleSheet } from 'react-native';
import { styleSections } from './styles';
import MiniButton from '../../../../components/MiniButton';
import Separator from '../../../../components/Separator';
import { newColors } from '../../../../styles/colors';
import { useAnimalStore } from '../../../../../lib/store/useAnimalStore';
import { Animal } from '../../../../../lib/interfaces/Animal';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import { RootStackParamList } from '../../../../navigator/navigationTypes';

interface ExtraSectionProps {
  animal: Animal;
}

const ExtraSection = ({ animal }: ExtraSectionProps) => {
  const { deleteAnimal, updateAnimalFavorite, updateAnimal, animals } = useAnimalStore();
  const { goBack, navigate } = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Find the current animal from the store for real-time updates
  const currentAnimal = animals.find(a => a.id === animal.id) || animal;

  const handleDeleteAnimal = () => {
    Alert.alert(
      'Confirmar eliminación',
      `¿Estás seguro de que quieres eliminar a ${currentAnimal.nombre}? Esta acción no se puede deshacer.`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteAnimal(currentAnimal.id);
              goBack();
            } catch (error) {
              Alert.alert('Error', 'No se pudo eliminar el animal');
            }
          },
        },
      ]
    );
  };

  const toggleFavorite = async () => {
    try {
      await updateAnimalFavorite(currentAnimal.id, !currentAnimal.favorito);
      await updateAnimal({
        ...currentAnimal,
        favorito: !currentAnimal.favorito,
      });
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar el estado de favorito');
    }
  };

  return (
    <>
      <View style={styleSections.container}>
        <View style={styleSections.header}>
          <Text style={styleSections.title}>Editar Datos</Text>
          <MiniButton
            text="Editar datos del animal"
            icon="create-outline"
            onPress={() => navigate('Update', { animal: currentAnimal })}
          />
        </View>

        <View style={styleSections.content}>
          {/* Two-Column Table for Image and Weight Buttons */}
          <View style={styleSections.tableContainer}>
            {/* Row 1: Add Photo and View Photos */}
            <View style={styles.row}>
              <View style={styles.cell}>
                <MiniButton
                  text="Agregar nueva Foto"
                  icon="camera-outline"
                  onPress={() => navigate('AddImage', { animalId: currentAnimal.id, animalName: currentAnimal.nombre })}
                  backgroundColor={newColors.verde_light}
                  color={newColors.fondo_principal}
                />
              </View>
              <View style={styles.cell}>
                <MiniButton
                  text="Ver Fotos"
                  icon="images-outline"
                  onPress={() => navigate('ViewImages', { animalId: currentAnimal.id, animalName: currentAnimal.nombre, images: currentAnimal.images || [] })}
                  backgroundColor={newColors.verde_light}
                  color={newColors.fondo_principal}
                />
              </View>
            </View>
            {/* Row 2: Add Weight and View Weights */}
            <View style={styles.row}>
              <View style={styles.cell}>
                <MiniButton
                  text="Registrar nuevo peso"
                  icon="scale-outline"
                  onPress={() => navigate('AddWeight', { animalId: currentAnimal.id, animalName: currentAnimal.nombre })}
                  backgroundColor={newColors.verde_light}
                  color={newColors.fondo_principal}
                />
              </View>
              <View style={styles.cell}>
                <MiniButton
                  text="Ver pesos"
                  icon="list-outline"
                  onPress={() => navigate('ViewWeights', { animalId: currentAnimal.id, animalName: currentAnimal.nombre, weights: currentAnimal.pesos || [] })}
                  backgroundColor={newColors.verde_light}
                  color={newColors.fondo_principal}
                />
              </View>
            </View>
          </View>

          <Separator height={20} />
          <MiniButton
            text={currentAnimal.favorito ? 'En favoritos' : 'No favorito'}
            icon={currentAnimal.favorito ? 'star' : 'star-outline'}
            onPress={toggleFavorite}
            backgroundColor={newColors.verde_light}
            color={newColors.fondo_principal}
          />
          <Separator height={20} />
          <MiniButton
            text={'Consulta un Veterinario'}
            icon={'fitness-outline'}
            onPress={() => Alert.alert('Funcionalidad no disponible', 'Pronto podras contactar directamente a un veterinario')}
            backgroundColor={newColors.gris}
            color={newColors.fondo_principal}
          />
          <Separator height={20} />
          <MiniButton
            text={currentAnimal.isRespalded ? 'Información Respaldada' : 'Respaldar Información'}
            icon={currentAnimal.isRespalded ? 'checkmark-outline' : 'cloud-upload-outline'}
            onPress={() => Alert.alert('Funcionalidad no disponible', 'Pronto podras respaldar la informacion de tus mascotas')}
            backgroundColor={newColors.gris}
            color={newColors.fondo_principal}
          />
          <Separator height={20} />
          <MiniButton
            text="Eliminar Animal"
            onPress={handleDeleteAnimal}
            icon="trash-outline"
            backgroundColor={newColors.rojo}
            color={newColors.fondo_principal}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    width: '100%',
    marginVertical: 5,
  },
  cell: {
    flex: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ExtraSection;
