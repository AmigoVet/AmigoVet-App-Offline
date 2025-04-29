import { View, Text, Alert } from 'react-native'
import React, { useRef } from 'react'
import { styleSections } from './styles'
import MiniButton from '../../../../components/MiniButton'
import { Modalize } from 'react-native-modalize'
import { Notes } from '../../../../../lib/interfaces/Notes'
import CustomButton from '../../../../components/customs/CustomButton'
import CustomInput from '../../../../components/customs/CustomImput'
import Separator from '../../../../components/Separator'
import { newColors } from '../../../../styles/colors'
import { GlobalStyles } from '../../../../styles/GlobalStyles'
import { useAnimalStore } from '../../../../../lib/store/useAnimalStore'
import { Animal } from '../../../../../lib/interfaces/Animal'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types'
import { RootStackParamList } from '../../../../navigator/navigationTypes'

interface ExtraSectionProps {
  animal: Animal;
}

const ExtraSection = ({ animal }: ExtraSectionProps) => {
  const modalizeRef = useRef<Modalize>(null);
  const { deleteAnimal, updateAnimalFavorite, animals } = useAnimalStore();
  const { goBack } = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  
  // Find the current animal from the store to get real-time updates
  const currentAnimal = animals.find(a => a.id === animal.id) || animal;

  const openModal = () => {
    modalizeRef.current?.open();
  };

  const closeModal = () => {
    modalizeRef.current?.close();
  };

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
            onPress={openModal} 
          />
        </View>
        
        <View style={styleSections.content}>
          <MiniButton
            text={currentAnimal.favorito ? 'En favoritos' : 'No favorito'}
            icon={currentAnimal.favorito ? 'star' : 'star-outline'}
            onPress={toggleFavorite}
            bg={currentAnimal.favorito ? newColors.verde_light : newColors.gris}
            color={newColors.fondo_principal}
          />
          <Separator height={50} />
          <MiniButton
            text='Eliminar Animal'
            onPress={handleDeleteAnimal}
            icon='trash-outline'
            bg={newColors.rojo}
            color={newColors.fondo_principal}
          />
        </View>
      </View>

      <Modalize
        ref={modalizeRef}
        adjustToContentHeight
        modalStyle={GlobalStyles.modalContainer}
        handlePosition="outside"
        scrollViewProps={{ showsVerticalScrollIndicator: false }}
      >
        <View style={GlobalStyles.modalHeader}>
          <Text style={[styleSections.title, { color: newColors.fondo_secundario }]}>
            Editar Datos
          </Text>
          <MiniButton
            text="Cerrar"
            icon="close-outline"
            bg={newColors.rojo}
            onPress={closeModal}
            color={newColors.fondo_principal}
          />
        </View>
        <View style={{ padding: 20 }}>
        </View>
      </Modalize>
    </>
  )
}

export default ExtraSection