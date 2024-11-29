import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Alert, 
  ScrollView, 
  Image, 
  TouchableOpacity 
} from 'react-native';
import RNFS from 'react-native-fs';
import { colors, GlobalStyles } from '../../assets/styles';
import { 
  launchCamera, 
  launchImageLibrary, 
  ImageLibraryOptions, 
  CameraOptions 
} from 'react-native-image-picker';

// Importa tus utilidades para guardar datos
import { saveData } from '../../assets/utils/asyncStorage';
import { CustomInput, CustomButton, CustomImage } from '../../assets/components';
import Ionicons from 'react-native-vector-icons/Ionicons';

const New: React.FC = () => {
  // Estados para los campos del formulario
  const [name, setName] = useState<string>('');
  const [identifier, setIdentifier] = useState<string>('');
  const [species, setSpecies] = useState<string>('');
  const [breed, setBreed] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const [description, setDescription] = useState<string>('');
  const [purpose, setPurpose] = useState<string>('');
  const [ubicacion, setUbicacion] = useState<string>('');

  // Función para guardar imagen localmente
  const saveImageLocally = async (uri: string): Promise<string> => {
    try {
      // Generar un nombre de archivo único
      const fileName = `animal_${Date.now()}.jpg`;
      
      // Ruta de destino en el almacenamiento de la aplicación
      const destPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
      
      // Verificar si el archivo de origen existe
      const fileExists = await RNFS.exists(uri);
      console.log('Archivo de origen existe:', fileExists);
      
      // Copiar el archivo desde la URI temporal a la ruta de destino
      await RNFS.copyFile(uri, destPath);
      
      // Verificar si el archivo de destino se creó
      const destExists = await RNFS.exists(destPath);
      console.log('Archivo de destino creado:', destExists);
      console.log('Ruta de destino:', destPath);
      
      return destPath;
    } catch (error) {
      console.error('Error guardando imagen:', error);
      Alert.alert('Error', 'No se pudo guardar la imagen');
      return '';
    }
  };

  // Seleccionar imagen desde la galería
  const pickImageFromGallery = async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      selectionLimit: 1,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, async (response) => {
      console.log('Respuesta de la galería:', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
        Alert.alert('Error', 'No se pudo seleccionar la imagen');
      } else if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        console.log('URI de la imagen:', uri);
        if (uri) {
          const localPath = await saveImageLocally(uri);
          console.log('Ruta local de la imagen:', localPath);
          setImage(localPath);
        }
      }
    });
  };

  // Tomar foto con la cámara
  const takePhoto = async () => {
    const options: CameraOptions = {
      mediaType: 'photo',
      cameraType: 'back',
      saveToPhotos: true,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, async (response) => {
      console.log('Respuesta de la cámara:', response);
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        console.log('Camera Error: ', response.errorMessage);
        Alert.alert('Error', 'No se pudo tomar la foto');
      } else if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        console.log('URI de la imagen:', uri);
        if (uri) {
          const localPath = await saveImageLocally(uri);
          console.log('Ruta local de la imagen:', localPath);
          setImage(localPath);
        }
      }
    });
  };

  // Generar ID único
  const generateId = () => Math.random().toString(36).substr(2, 9);

  // Manejar el envío del formulario
  const handleSubmit = () => {
    if (!name || !species || !breed || !age || !weight || !description || !purpose) {
      Alert.alert('Error', 'Por favor, completa todos los campos obligatorios');
      return;
    }
    if (!image) {
      Alert.alert('Error', 'Por favor, selecciona una imagen');
      return;
    }

    const animal = {
      id: generateId(),
      identifier,
      name,
      species,
      breed,
      age,
      gender,
      weight,
      color,
      image: image || '',
      description,
      purpose,
      ubicacion,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    saveData(animal);

    // Mostrar mensaje de éxito
    // Encuntrar mejor manera de mostrar alerta
    Alert.alert('Éxito', 'Animal registrado correctamente');

    // Limpiar formulario
    resetForm();

  };

  const resetForm = () => {
    setName('');
    setSpecies('');
    setBreed('');
    setAge('');
    setGender('');
    setWeight('');
    setColor('');
    setImage(null);
    setDescription('');
    setPurpose('');
    setUbicacion('');
  };

  return (
    <ScrollView 
      style={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Registrar Animal</Text>

      {/* Sección de imagen */}
    <Text style={GlobalStyles.label}>Selecciona o toma una foto</Text>
      <View style={styles.imageContainer}>
        {image && (
          <CustomImage 
            source={image} 
          />
        )}
        <View style={styles.imageButtonContainer}>
          <TouchableOpacity 
            style={styles.imageButton} 
            onPress={pickImageFromGallery}
          >
            <Text>
              <Ionicons name="image-outline" size={40} color={colors.blanco} />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.imageButton} 
            onPress={takePhoto}
          >
            <Text style={styles.imageButtonText}>
              <Ionicons name="camera-outline" size={40} color={colors.blanco} />
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Campos de formulario */}
      <CustomInput
        label="Nombre"
        value={name}
        onChangeText={setName}
        placeholder="Nombre del animal"
      />
      <CustomInput
        label="Identificador"
        value={identifier}
        onChangeText={setIdentifier}
        placeholder="Identificador del animal"
      />
      <CustomInput
        label="Especie"
        value={species}
        onChangeText={setSpecies}
        placeholder="Especie (e.g., Vaca, Caballo)"
      />
      <CustomInput
        label="Raza"
        value={breed}
        onChangeText={setBreed}
        placeholder="Raza del animal"
      />
      <CustomInput
        label="Edad"
        value={age}
        onChangeText={setAge}
        placeholder="Edad en años"
      />
      <CustomInput
        label="Peso"
        value={weight}
        onChangeText={setWeight}
        placeholder="Peso en kg"
      />
      <CustomInput
        label="Género"
        value={gender}
        onChangeText={setGender}
        placeholder="Género"
      />
      <CustomInput
        label="Color"
        value={color}
        onChangeText={setColor}
        placeholder="Color del animal"
      />
      <CustomInput
        label="Descripción"
        value={description}
        onChangeText={setDescription}
        placeholder="Descripción adicional"
      />
      <CustomInput
        label="Propósito"
        value={purpose}
        onChangeText={setPurpose}
        placeholder="Propósito (e.g., Leche, Reproducción)"
      />
      <CustomInput
        label="Ubicación"
        value={ubicacion}
        onChangeText={setUbicacion}
        placeholder="Ubicación del animal"
      />

      {/* Botón de guardar */}
      <CustomButton 
        text="Guardar" 
        onPress={handleSubmit}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fondo,
    padding: 20,
    paddingBottom: 40
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: colors.blancoLight
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
    borderColor: colors.naranja,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 15,
  },
  imageButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  imageButton: {
    marginHorizontal: 20,
  },
  imageButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default New;