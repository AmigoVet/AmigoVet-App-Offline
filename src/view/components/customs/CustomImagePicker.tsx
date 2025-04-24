import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { launchCamera, launchImageLibrary, CameraOptions, ImageLibraryOptions } from 'react-native-image-picker';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import RNFS from 'react-native-fs';
import Icon from '@react-native-vector-icons/ionicons';
import { Platform } from 'react-native';
import { newStyles } from '../../screens/home/new/styles';
import { newColors } from '../../styles/colors';
import { GlobalStyles } from '../../styles/GlobalStyles';
import CustomImage from './CustomImage';
import { constants } from '../../styles/constants';
import { v4 as uuidv4 } from 'uuid';
import { getStoragePath } from '../../../lib/db/db';

interface CustomImagePickerProps {
  onImageSelected: (uri: string) => void;
}

const CustomImagePicker: React.FC<CustomImagePickerProps> = ({ onImageSelected }) => {
  const [image, setImage] = useState<string | null>(null);

  // Normalize URI and copy to persistent directory
  const normalizeUri = async (uri: string): Promise<string> => {
    const fileName = `${uuidv4()}.jpg`;
    const destPath = `${getStoragePath()}/animals/${fileName}`; // Usar getStoragePath
    
    try {
      // Crear directorio persistente
      await RNFS.mkdir(`${getStoragePath()}/animals`);
      
      // Manejar diferentes esquemas de URI
      let sourcePath = uri;
      if (uri.startsWith('file://')) {
        sourcePath = uri.replace('file://', '');
      } else if (uri.startsWith('content://')) {
        sourcePath = uri;
      } else {
        throw new Error(`Invalid URI format: ${uri}`);
      }

      // Copiar el archivo al directorio persistente
      await RNFS.copyFile(sourcePath, destPath);

      // Verificar que el archivo existe
      const exists = await RNFS.exists(destPath);
      if (!exists) {
        throw new Error(`Failed to copy image: File does not exist at ${destPath}`);
      }

      const finalUri = `file://${destPath}`;
      return finalUri;
    } catch (error) {
      console.error('Error normalizing URI:', error);
      throw error;
    }
  };

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

      launchImageLibrary(options, async (response) => {
        if (response.didCancel) {
          console.log('Usuario canceló la selección');
        } else if (response.errorCode) {
          console.error('Error en la galería:', response.errorCode, response.errorMessage);
          Alert.alert('Error', `No se pudo seleccionar la imagen: ${response.errorMessage}`);
        } else if (response.assets && response.assets[0].uri) {
          try {
            const uri = await normalizeUri(response.assets[0].uri);
            setImage(uri);
            onImageSelected(uri);
          } catch (error) {
            console.error('Error al normalizar URI:', error);
            Alert.alert('Error', 'No se pudo procesar la imagen seleccionada.');
          }
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
        saveToPhotos: false,
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
      };

      launchCamera(options, async (response) => {
        if (response.didCancel) {
          console.log('Usuario canceló la cámara');
        } else if (response.errorCode) {
          console.error('Error en la cámara:', response.errorCode, response.errorMessage);
          Alert.alert('Error', `No se pudo tomar la foto: ${response.errorMessage}`);
        } else if (response.assets && response.assets[0].uri) {
          try {
            const uri = await normalizeUri(response.assets[0].uri);
            setImage(uri);
            onImageSelected(uri);
          } catch (error) {
            console.error('Error al normalizar URI:', error);
            Alert.alert('Error', 'No se pudo procesar la foto tomada.');
          }
        }
      });
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
      Alert.alert('Error', 'No se pudo acceder a la cámara.');
    }
  };

  return (
    <>
      <Text style={GlobalStyles.subtitle}>
        Selecciona o toma una foto <Text style={{ color: newColors.rojo }}>*</Text>
      </Text>
      <View style={styles.imageContainer}>
        {image && <CustomImage source={image} style={{ height: 250 }} />}
        <View style={styles.imageButtonContainer}>
          <TouchableOpacity style={styles.imageButton} onPress={pickImageFromGallery}>
            <Icon name="image-outline" size={40} color={newColors.fondo_secundario} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.imageButton} onPress={takePhoto}>
            <Icon name="camera-outline" size={40} color={newColors.fondo_secundario} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
    borderColor: newColors.fondo_secundario,
    borderWidth: 2,
    borderRadius: constants.borderRadius / 2,
    paddingHorizontal: 5,
    paddingVertical: 15,
  },
  imageButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  imageButton: {
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 5,
  },
});

export default CustomImagePicker;