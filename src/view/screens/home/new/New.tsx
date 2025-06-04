import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import RNFS from 'react-native-fs';
import GlobalContainer from '../../../components/GlobalContainer';
import Header from '../../../components/Header';
import CustomImagePicker from '../../../components/customs/CustomImagePicker';
import { Especie, especiesRazasMap, generos, propositosPorEspecie, Animal, ImagesTable, WeightsTable, Genero, Raza } from '../../../../lib/interfaces/Animal';
import CustomSelect from '../../../components/customs/CustomSelect';
import CustomButton from '../../../components/customs/CustomButton';
import Separator from '../../../components/Separator';
import CustomDatePicker from '../../../components/customs/CustomDatePicker';
import { calculateOld } from '../../../../lib/functions/CalculateOld';
import CustomInput from '../../../components/customs/CustomImput';
import { useAuthStore } from '../../../../lib/store/authStore';
import { useAnimalStore } from '../../../../lib/store/useAnimalStore';
import CustomScrollView from '../../../components/customs/CustomScrollView';
import { GlobalStyles } from '../../../styles/GlobalStyles';

// Extend Animal interface to include temporary form fields
interface FormData extends Partial<Animal> {
  edad?: string;
  fechaNacimiento?: Date | null;
  imageUri?: string; // Temporary field for image URI
  peso?: string; // Temporary field for weight
}

// Define initial form data
const initialFormData: FormData = {
  nombre: '',
  identificador: '',
  especie: undefined,
  raza: undefined,
  genero: undefined,
  peso: '',
  edad: '',
  fechaNacimiento: null,
  color: '',
  proposito: '',
  ubicacion: '',
  descripcion: '',
  imageUri: '',
  ownerId: '',
  id: '',
  created_at: '',
  updated_at: '',
  embarazada: false,
};

const New = () => {
  const { user } = useAuthStore();
  const { addAnimal, addImage, addWeight, loadAnimals } = useAnimalStore();

  const [formData, setFormData] = useState<FormData>(initialFormData);

  // Load animals when the component mounts
  useEffect(() => {
    if (user?.id) {
      loadAnimals(1, 10, user.id).catch((error) => {
        console.error('[ERROR] Error al cargar animales:', error);
        Alert.alert('Error', 'No se pudieron cargar los animales');
      });
    }
  }, [loadAnimals, user]);

  // Generic handler for updating form fields
  const handleChange = (field: keyof FormData, value: string | Date | null | Especie | Raza | Genero) => {
    setFormData((prev) => {
      const newFormData = { ...prev, [field]: value };

      // Reset raza and proposito when especie changes
      if (field === 'especie') {
        newFormData.raza = undefined;
        newFormData.proposito = '';
      }
      // Update edad and nacimiento when fechaNacimiento changes
      if (field === 'fechaNacimiento' && value instanceof Date) {
        newFormData.edad = calculateOld(value);
        newFormData.nacimiento = value.toISOString();
      }
      // Clear fechaNacimiento and nacimiento when edad is manually set
      if (field === 'edad') {
        newFormData.fechaNacimiento = null;
        newFormData.nacimiento = undefined;
      }

      return newFormData;
    });
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (
      !formData.nombre ||
      !formData.especie ||
      !formData.raza ||
      !formData.proposito ||
      !formData.genero ||
      !formData.color ||
      !formData.ubicacion
    ) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }

    if (!user?.id) {
      Alert.alert('Error', 'Usuario no autenticado');
      return;
    }

    const animalId = uuidv4();
    const now = new Date().toISOString();

    // Handle image file
    let imageUrl = '';
    if (formData.imageUri) {
      try {
        // Ensure the source file exists
        const sourcePath = formData.imageUri.replace('file://', '');
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
        imageUrl = `file://${destPath}`;
      } catch (error: any) {
        console.error('[ERROR] Error al mover la imagen:', error.message);
        Alert.alert('Error', `No se pudo procesar la imagen: ${error.message}`);
        return;
      }
    }

    const animalData: Animal = {
      ownerId: user.id,
      id: animalId,
      identificador: formData.identificador || '',
      nombre: formData.nombre,
      especie: formData.especie,
      raza: formData.raza,
      nacimiento: formData.nacimiento,
      genero: formData.genero,
      color: formData.color,
      descripcion: formData.descripcion || '',
      proposito: formData.proposito,
      ubicacion: formData.ubicacion,
      created_at: now,
      updated_at: now,
      embarazada: false,
      favorito: false,
      isPublic: false,
      isRespalded: false,
      isChanged: false,
    };

    try {
      // Add the animal
      await addAnimal(animalData);

      // Add image to Images table if provided
      if (imageUrl) {
        const imageData: ImagesTable = {
          id: uuidv4(),
          animalId: animalId,
          fecha: now,
          url: imageUrl,
        };
        await addImage(imageData);
      }

      // Add weight to Weights table if provided
      if (formData.peso) {
        const weightData: WeightsTable = {
          id: uuidv4(),
          animalId: animalId,
          fecha: now,
          peso: formData.peso,
        };
        await addWeight(weightData);
      }

      Alert.alert('Éxito', 'Animal guardado correctamente');
      setFormData(initialFormData);
    } catch (error: any) {
      console.error('[ERROR] Error al guardar animal:', error.message);
      Alert.alert('Error', `No se pudo guardar el animal: ${error.message || 'Error desconocido'}`);
    }
  };

  // Ensure razasDisponibles and propositosDisponibles are always arrays
  const razasDisponibles =
    formData.especie && especiesRazasMap[formData.especie as Especie]
      ? especiesRazasMap[formData.especie as Especie]
      : [];
  const propositosDisponibles =
    formData.especie && propositosPorEspecie[formData.especie as Especie]
      ? propositosPorEspecie[formData.especie as Especie]
      : [];

  return (
    <GlobalContainer>
      <Header
        title="Agrega un Animal"
        onPress={() => Alert.alert('Debería mostrar info de cómo agregar un animal y cosas así')}
      />
      <CustomScrollView style={GlobalStyles.padding20}>
        <CustomImagePicker
          onImageSelected={(uri) => handleChange('imageUri', uri)}
        />

        <CustomInput
          required
          label="Nombre"
          value={formData.nombre || ''}
          onChangeText={(value) => handleChange('nombre', value)}
          placeholder="Nombre del animal"
        />

        <CustomInput
          label="Identificador"
          value={formData.identificador || ''}
          onChangeText={(value) => handleChange('identificador', value)}
          placeholder="Identificador único"
        />

        <CustomSelect
          required
          label="Especie"
          value={formData.especie || ''}
          options={Object.keys(especiesRazasMap) as Especie[]}
          onChange={(value) => handleChange('especie', value as Especie)}
        />

        <CustomSelect
          required
          label="Raza"
          value={formData.raza || ''}
          options={razasDisponibles}
          onChange={(value) => handleChange('raza', value as Raza)}
        />

        <CustomSelect
          required
          label="Propósito"
          value={formData.proposito || ''}
          options={propositosDisponibles}
          onChange={(value) => handleChange('proposito', value)}
        />

        <CustomSelect
          required
          label="Género"
          value={formData.genero || ''}
          options={generos}
          onChange={(value) => handleChange('genero', value as Genero)}
        />

        <CustomDatePicker
          label="Fecha de Nacimiento"
          value={formData.fechaNacimiento || null}
          onDateChange={(date) => handleChange('fechaNacimiento', date)}
        />

        <CustomInput
          label="Peso"
          value={formData.peso || ''}
          onChangeText={(value) => handleChange('peso', value)}
          placeholder="Peso en kg"
          type="number"
        />

        <CustomInput
          required
          label="Color"
          value={formData.color || ''}
          onChangeText={(value) => handleChange('color', value)}
          placeholder="Color del animal"
        />

        <CustomInput
          required
          label="Ubicación"
          value={formData.ubicacion || ''}
          onChangeText={(value) => handleChange('ubicacion', value)}
          placeholder="Ubicación del animal"
        />

        <CustomInput
          label="Descripción"
          value={formData.descripcion || ''}
          onChangeText={(value) => handleChange('descripcion', value)}
          placeholder="Descripción adicional"
          multiline
        />

        <CustomButton text="Guardar" onPress={handleSubmit} />
        <Separator height={200} />
      </CustomScrollView>
    </GlobalContainer>
  );
};

export default New;
