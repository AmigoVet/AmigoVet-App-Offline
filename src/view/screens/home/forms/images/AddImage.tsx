import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Alert } from 'react-native';
import { useAnimalStore } from '../../../../../lib/store/useAnimalStore';
import CustomButton from '../../../../components/customs/CustomButton';
import CustomImagePicker from '../../../../components/customs/CustomImagePicker';
import CustomScrollView from '../../../../components/customs/CustomScrollView';
import GlobalContainer from '../../../../components/GlobalContainer';
import { RootStackParamList } from '../../../../navigator/navigationTypes';
import { GlobalStyles } from '../../../../styles/GlobalStyles';
import { v4 as uuidv4 } from 'uuid';
import RNFS from 'react-native-fs';
import Header from '../../../../components/Header';

type AddImageRouteProp = RouteProp<RootStackParamList, 'AddImage'>;

const AddImage = () => {
  const { animalId, animalName } = useRoute<AddImageRouteProp>().params;
  const { addImage } = useAnimalStore();
  const { goBack } = useNavigation();
  const [imageUri, setImageUri] = useState<string>('');

  const handleSubmit = async () => {
    if (!imageUri) {
      Alert.alert('Error', 'Por favor selecciona una imagen');
      return;
    }

    try {
      // Verify the source file exists
      const sourcePath = imageUri.replace('file://', '');
      const exists = await RNFS.exists(sourcePath);
      if (!exists) {
        throw new Error('La imagen seleccionada no existe');
      }

      // Create the animals directory
      const animalsDir = `${RNFS.DocumentDirectoryPath}/animals`;
      await RNFS.mkdir(animalsDir);

      // Move the image to the animals directory
      const fileName = `${animalId}_${Date.now()}.jpg`;
      const destPath = `${animalsDir}/${fileName}`;
      await RNFS.moveFile(sourcePath, destPath);

      // Create image data for ImagesTable
      const imageData = {
        id: uuidv4(),
        animalId,
        fecha: new Date().toISOString(),
        url: `file://${destPath}`,
      };

      // Save to database
      await addImage(imageData);

      Alert.alert('Éxito', 'Imagen agregada correctamente');
      goBack();
    } catch (error: any) {
      console.error('[ERROR] Error al agregar imagen:', error.message);
      Alert.alert('Error', `No se pudo agregar la imagen: ${error.message || 'Error desconocido'}`);
    }
  };

  return (
    <GlobalContainer>
      <Header
        title={`Agregar foto de ${animalName}`}
        onPress={goBack}
        iconOnPress="chevron-back-outline"
      />
      <CustomScrollView style={GlobalStyles.padding20}>
        <CustomImagePicker
          label="Seleccionar Imagen"
          onImageSelected={(uri) => setImageUri(uri)}
        />
        <CustomButton text="Guardar Imagen" onPress={handleSubmit} />
      </CustomScrollView>
    </GlobalContainer>
  );
};

export default AddImage;
