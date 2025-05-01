import { View, Text, Alert } from 'react-native';
import React, { useRef, useState } from 'react';
import { styleSections } from './styles';
import MiniButton from '../../../../components/MiniButton';
import { Modalize } from 'react-native-modalize';
import CustomSelect from '../../../../components/customs/CustomSelect';
import CustomInput from '../../../../components/customs/CustomImput';
import CustomImagePicker from '../../../../components/customs/CustomImagePicker';
import Separator from '../../../../components/Separator';
import CustomButton from '../../../../components/customs/CustomButton';
import CustomImage from '../../../../components/customs/CustomImage';
import { newColors } from '../../../../styles/colors';
import { GlobalStyles } from '../../../../styles/GlobalStyles';
import { useAnimalStore } from '../../../../../lib/store/useAnimalStore';
import { Animal } from '../../../../../lib/interfaces/Animal';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import { RootStackParamList } from '../../../../navigator/navigationTypes';
import RNFS from 'react-native-fs';
import { getStoragePath } from '../../../../../lib/db/db';
import { createAnimal, createEvent, createNote, createRegister, updateAnimalApi } from '../../../../../lib/api/publications';

interface ExtraSectionProps {
  animal: Animal;
}

const ExtraSection = ({ animal }: ExtraSectionProps) => {
  const modalizeRef = useRef<Modalize>(null);
  const { deleteAnimal, updateAnimalFavorite, updateAnimal, animals, loadAnimals } = useAnimalStore();
  const { goBack } = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [isRespalding, setIsRespalding] = useState(false);

  // Find the current animal from the store for real-time updates
  const currentAnimal = animals.find(a => a.id === animal.id) || animal;

  // State for modal
  const [selectedField, setSelectedField] = useState<
    'peso' | 'proposito' | 'descripcion' | 'ubicacion' | 'image' | 'image2' | 'image3' | ''
  >('');
  const [inputValue, setInputValue] = useState<string>('');

  // Field options as strings for CustomSelect
  const fieldOptions = [
    'Peso',
    'Propósito',
    'Descripción',
    'Ubicación',
    'Imagen Principal',
    'Imagen Secundaria',
    'Imagen Terciaria',
  ];

  // Mapping from label to field name
  const fieldLabelToName: Record<string, 'peso' | 'proposito' | 'descripcion' | 'ubicacion' | 'image' | 'image2' | 'image3'> = {
    'Peso': 'peso',
    'Propósito': 'proposito',
    'Descripción': 'descripcion',
    'Ubicación': 'ubicacion',
    'Imagen Principal': 'image',
    'Imagen Secundaria': 'image2',
    'Imagen Terciaria': 'image3',
  };

  const openModal = () => {
    modalizeRef.current?.open();
    setSelectedField('');
    setInputValue('');
  };

  const closeModal = () => {
    modalizeRef.current?.close();
    setSelectedField('');
    setInputValue('');
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
      // Mark as changed
      await updateAnimal({
        ...currentAnimal,
        favorito: !currentAnimal.favorito,
      });
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar el estado de favorito');
    }
  };

  const handleFieldChange = async (value: string) => {
    const field = fieldLabelToName[value] || '';
    setSelectedField(field);
    // Set initial input value for text fields
    if (['peso', 'proposito', 'descripcion', 'ubicacion'].includes(field)) {
      setInputValue(currentAnimal[field] || '');
    } else {
      // For images, reconstruct the full URI and validate existence
      const imageField = field as 'image' | 'image2' | 'image3';
      const imagePath = currentAnimal[imageField];
      let fullPath = '';
      if (imagePath) {
        fullPath = imagePath.startsWith('file://') ? imagePath : `file://${getStoragePath()}/animals/${imagePath}`;
        const exists = await RNFS.exists(fullPath.replace('file://', ''));
        if (!exists) {
          fullPath = '';
        }
      }
      setInputValue(fullPath);
    }
  };

  const handleSave = async () => {
    if (!selectedField) {
      Alert.alert('Error', 'Por favor selecciona un campo para editar');
      return;
    }

    try {
      let updateData: Partial<Animal> = {};
      if (['image', 'image2', 'image3'].includes(selectedField)) {
        let imageFileName = '';
        if (inputValue && inputValue.startsWith('file://')) {
          const path = inputValue.replace('file://', '');
          const exists = await RNFS.exists(path);
          if (exists) {
            imageFileName = inputValue.split('/').pop() || '';
            const expectedDir = `${getStoragePath()}/animals`;
            const isInCorrectDir = path.includes(expectedDir);
            if (!isInCorrectDir) {
              Alert.alert('Error', 'La imagen no está en el directorio correcto');
              return;
            }
          } else {
            Alert.alert('Error', 'La imagen seleccionada no es válida');
            return;
          }
        }
        updateData[selectedField] = imageFileName;
      } else {
        updateData[selectedField] = inputValue;
      }

      const updatedAnimal: Animal = {
        ...currentAnimal,
        ...updateData,
        updated_at: new Date().toISOString(),
        isChanged: true, // Mark as changed
      };

      await updateAnimal(updatedAnimal);
      await loadAnimals();
      Alert.alert('Éxito', 'Datos actualizados correctamente');
      closeModal();
    } catch (error) {
      console.error('[ERROR] Error al actualizar animal:', error);
      Alert.alert('Error', 'No se pudo actualizar el animal');
    }
  };

  const syncAnimalToCloud = async () => {
    setIsRespalding(true);
    try {
      let updatedAnimal = { ...currentAnimal };

      if (!currentAnimal.isRespalded) {
        // Create new animal in the cloud
        await createAnimal({
          ...currentAnimal,
          isRespalded: true,
          isChanged: false,
        });
        updatedAnimal = {
          ...currentAnimal,
          isRespalded: true,
          isChanged: false,
        };
        await updateAnimal(updatedAnimal);
      } else if (currentAnimal.isChanged) {
        // Update existing animal in the cloud
        await updateAnimalApi({
          ...currentAnimal,
          isChanged: false,
        });
        updatedAnimal = {
          ...currentAnimal,
          isChanged: false,
        };
        await updateAnimal(updatedAnimal);
      }

      // Sync notes
      if (currentAnimal.notes && currentAnimal.notes.length > 0) {
        for (const note of currentAnimal.notes) {
          await createNote(note);
        }
      }

      // Sync registers
      if (currentAnimal.registers && currentAnimal.registers.length > 0) {
        for (const register of currentAnimal.registers) {
          await createRegister(register);
        }
      }

      // Sync events
      if (currentAnimal.events && currentAnimal.events.length > 0) {
        for (const event of currentAnimal.events) {
          await createEvent(event);
        }
      }

      await loadAnimals();
      Alert.alert('Éxito', currentAnimal.isRespalded ? 'Animal actualizado en la nube' : 'Animal respaldado en la nube');
    } catch (error) {
      console.error('[ERROR] Error al sincronizar animal:', error);
      Alert.alert('Error', 'No se pudo sincronizar el animal con la nube');
    }
    setIsRespalding(false);
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
          <Separator height={20} />
            {/* TODO: Hacer que funcione correctamente la actualizacion(Actualmente solo puede crearse pero no se actualizan los datos, trata de crearlos) */}
          <MiniButton
            text={currentAnimal.isRespalded ? 'Información Respaldada' : 'Respaldar Información'}
            icon={currentAnimal.isRespalded ? 'checkmark-outline' : 'cloud-upload-outline'}
            onPress={syncAnimalToCloud}
            bg={currentAnimal.isRespalded ? newColors.verde_light : newColors.gris}
            color={newColors.fondo_principal}
            disabled={isRespalding}
          />
          <Separator height={20} />
          <MiniButton
            text="Eliminar Animal"
            onPress={handleDeleteAnimal}
            icon="trash-outline"
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
          <CustomSelect
            label="Campo a editar"
            value={Object.keys(fieldLabelToName).find(
              (key) => fieldLabelToName[key] === selectedField
            ) || ''}
            options={fieldOptions}
            onChange={handleFieldChange}
          />
          <Separator height={10} />
          {['peso', 'proposito', 'descripcion', 'ubicacion'].includes(selectedField) && (
            <CustomInput
              label={fieldOptions.find((opt) => fieldLabelToName[opt] === selectedField) || 'Valor'}
              value={inputValue}
              onChangeText={setInputValue}
              placeholder={`Ingresa ${selectedField}`}
              multiline={selectedField === 'descripcion'}
              type={selectedField === 'peso' ? 'number' : 'text'}
            />
          )}
          {['image', 'image2', 'image3'].includes(selectedField) && (
            <View>
              <CustomImagePicker
                onImageSelected={(uri) => {
                  setInputValue(uri);
                }}
              />
              {inputValue && (
                <CustomImage
                  source={inputValue}
                  style={{ height: 100, marginTop: 10 }}
                />
              )}
            </View>
          )}
          <Separator height={10} />
          <CustomButton
            text="Guardar"
            onPress={handleSave}
          />
        </View>
      </Modalize>
    </>
  );
};

export default ExtraSection;
