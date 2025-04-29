import { View, Text, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import { styleSections } from './styles'
import MiniButton from '../../../../components/MiniButton'
import { Modalize } from 'react-native-modalize'
import CustomSelect from '../../../../components/customs/CustomSelect'
import CustomInput from '../../../../components/customs/CustomImput'
import CustomImagePicker from '../../../../components/customs/CustomImagePicker'
import Separator from '../../../../components/Separator'
import CustomButton from '../../../../components/customs/CustomButton'
import { newColors } from '../../../../styles/colors'
import { GlobalStyles } from '../../../../styles/GlobalStyles'
import { useAnimalStore } from '../../../../../lib/store/useAnimalStore'
import { Animal } from '../../../../../lib/interfaces/Animal'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types'
import { RootStackParamList } from '../../../../navigator/navigationTypes'
import RNFS from 'react-native-fs'
import { getStoragePath } from '../../../../../lib/db/db'
import CustomImage from '../../../../components/customs/CustomImage'

interface ExtraSectionProps {
  animal: Animal;
}

const ExtraSection = ({ animal }: ExtraSectionProps) => {
  const modalizeRef = useRef<Modalize>(null);
  const { deleteAnimal, updateAnimalFavorite, updateAnimal, animals, loadAnimals } = useAnimalStore();
  const { goBack } = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  
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
        fullPath = `file://${getStoragePath()}/animals/${imagePath}`;
        // Verify file exists
        const exists = await RNFS.exists(fullPath.replace('file://', ''));
        console.log('[DEBUG] Image exists for', field, ':', exists, 'at path:', fullPath);
        if (!exists) {
          console.warn('[WARN] Image file does not exist:', fullPath);
          fullPath = ''; // Don't set invalid path
        }
      }
      setInputValue(fullPath);
      console.log('[DEBUG] Setting image inputValue for', field, ':', fullPath);
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
        // Handle image update
        let imageFileName = '';
        if (inputValue && inputValue.startsWith('file://')) {
          console.log('[DEBUG] Saving image for', selectedField, ', inputValue:', inputValue);
          const path = inputValue.replace('file://', '');
          const exists = await RNFS.exists(path);
          console.log('[DEBUG] Image exists:', exists, 'at path:', path);
          if (exists) {
            imageFileName = inputValue.split('/').pop() || '';
            console.log('[DEBUG] Image filename:', imageFileName);
            // Verify the file is in the correct directory
            const expectedDir = `${getStoragePath()}/animals`;
            const isInCorrectDir = path.includes(expectedDir);
            console.log('[DEBUG] Image in correct directory:', isInCorrectDir, 'expected:', expectedDir);
            if (!isInCorrectDir) {
              console.warn('[WARN] Image is not in the expected directory:', path);
              Alert.alert('Error', 'La imagen no está en el directorio correcto');
              return;
            }
          } else {
            console.warn('[WARN] Image file does not exist:', inputValue);
            Alert.alert('Error', 'La imagen seleccionada no es válida');
            return;
          }
        }
        updateData[selectedField] = imageFileName;
      } else {
        // Handle text fields
        updateData[selectedField] = inputValue;
      }

      const updatedAnimal: Animal = {
        ...currentAnimal,
        ...updateData,
        updated_at: new Date().toISOString(),
      };

      console.log('[DEBUG] Updating animal with data:', updateData);
      await updateAnimal(updatedAnimal);
      // Reload animals to ensure store and UI are in sync
      await loadAnimals();
      Alert.alert('Éxito', 'Datos actualizados correctamente');
      closeModal();
    } catch (error) {
      console.error('[ERROR] Error al actualizar animal:', error);
      Alert.alert('Error', 'No se pudo actualizar el animal');
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
                  console.log('[DEBUG] Image selected in CustomImagePicker for', selectedField, ':', uri);
                  setInputValue(uri);
                }}
              />
              {/* Display current or selected image */}
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
  )
}

export default ExtraSection