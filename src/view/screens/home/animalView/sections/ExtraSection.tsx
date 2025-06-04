import { View, Text, Alert } from 'react-native';
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
  const { goBack , navigate} = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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
      // Mark as changed
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
            // onPress={syncAnimalToCloud}
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

export default ExtraSection;
