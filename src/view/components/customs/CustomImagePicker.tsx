import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { launchCamera, launchImageLibrary, CameraOptions, ImageLibraryOptions } from 'react-native-image-picker';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Icon from '@react-native-vector-icons/ionicons';
import { Platform } from 'react-native';
import { newStyles } from '../../screens/home/new/styles';
import { newColors } from '../../styles/colors';
import { GlobalStyles } from '../../styles/GlobalStyles';
import CustomImage from './CustomImage';

interface CustomImagePickerProps {
  onImageSelected: (uri: string) => void; // Callback para pasar la URI de la imagen seleccionada
}

const CustomImagePicker: React.FC<CustomImagePickerProps> = ({ onImageSelected }) => {
  const [image, setImage] = useState<string | null>(null);

  // Seleccionar imagen de la galería
  const pickImageFromGallery = async () => {
    try {
      const permission =
        Platform.OS === 'android' ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES : PERMISSIONS.IOS.PHOTO_LIBRARY;

      const result = await check(permission);

      if (result !== RESULTS.GRANTED) {
        const requestResult = await request(permission);
        if (requestResult !== RESULTS.GRANTED) {
          Alert.alert('Permiso denegado', 'Por favor, habilita el acceso a la galería en la configuración.');
          return;
        }
      }

      const options: ImageLibraryOptions = {
        mediaType: 'photo',
        selectionLimit: 1,
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
      };

      launchImageLibrary(options, (response) => {
        if (response.didCancel) {
          console.log('Usuario canceló la selección');
        } else if (response.errorCode) {
          console.error('Error en la galería:', response.errorCode, response.errorMessage);
          Alert.alert('Error', `No se pudo seleccionar la imagen: ${response.errorMessage}`);
        } else if (response.assets && response.assets[0].uri) {
          const uri = response.assets[0].uri;
          setImage(uri);
          onImageSelected(uri);
        }
      });
    } catch (error) {
      console.error('Error al acceder a la galería:', error);
      Alert.alert('Error', 'No se pudo acceder a la galería.');
    }
  };

  // Tomar foto con la cámara
  const takePhoto = async () => {
    try {
      const cameraPermission = Platform.OS === 'android' ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.IOS.CAMERA;
      const cameraResult = await check(cameraPermission);

      if (cameraResult !== RESULTS.GRANTED) {
        const requestResult = await request(cameraPermission);
        if (requestResult !== RESULTS.GRANTED) {
          Alert.alert('Permiso denegado', 'Por favor, habilita el acceso a la cámara en la configuración.');
          return;
        }
      }

      const options: CameraOptions = {
        mediaType: 'photo',
        cameraType: 'back',
        saveToPhotos: true,
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
      };

      launchCamera(options, (response) => {
        if (response.didCancel) {
          console.log('Usuario canceló la cámara');
        } else if (response.errorCode) {
          console.error('Error en la cámara:', response.errorCode, response.errorMessage);
          Alert.alert('Error', `No se pudo tomar la foto: ${response.errorMessage}`);
        } else if (response.assets && response.assets[0].uri) {
          const uri = response.assets[0].uri;
          setImage(uri);
          onImageSelected(uri);
        }
      });
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
      Alert.alert('Error', 'No se pudo acceder a la cámara.');
    }
  };

  return (
    <>
      <Text style={GlobalStyles.subtitle}>Selecciona o toma una foto</Text>
      <View style={newStyles.imageContainer}>
        {image && <CustomImage source={image} style={{ height: 250 }} />}
        <View style={newStyles.imageButtonContainer}>
          <TouchableOpacity style={newStyles.imageButton} onPress={pickImageFromGallery}>
            <Icon name="image-outline" size={40} color={newColors.fondo_secundario} />
          </TouchableOpacity>
          <TouchableOpacity style={newStyles.imageButton} onPress={takePhoto}>
            <Icon name="camera-outline" size={40} color={newColors.fondo_secundario} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default CustomImagePicker;