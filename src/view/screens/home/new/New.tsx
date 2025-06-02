import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import RNFS from 'react-native-fs';
import GlobalContainer from '../../../components/GlobalContainer';
import Header from '../../../components/Header';
import CustomImagePicker from '../../../components/customs/CustomImagePicker';
import { Especie, especiesRazasMap, generos, propositosPorEspecie, Animal } from '../../../../lib/interfaces/Animal';
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
  image: '',
  ownerId: '',
  id: '',
  created_at: '',
  updated_at: '',
  embarazada: false,
};

const New = () => {
  const { user } = useAuthStore();
  const { addAnimal, loadAnimals } = useAnimalStore();

  const [formData, setFormData] = useState<FormData>(initialFormData);

  // Load animals when the component mounts
  useEffect(() => {
    loadAnimals(1, 10, user!.id).catch((error) => {
      console.error('[ERROR] Error al cargar animales:', error);
      Alert.alert('Error', 'No se pudieron cargar los animales');
    });
  }, [loadAnimals]);

  // Generic handler for updating form fields
  const handleChange = async (field: keyof FormData, value: string | Date | null) => {
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
      !formData.peso ||
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

    // Extraer solo el nombre del archivo de la URI
    let imageFileName = '';
    if (formData.image) {
      const exists = await RNFS.exists(formData.image.replace('file://', ''));
      if (exists) {
        imageFileName = formData.image.split('/').pop() || '';
      }
    }

    const animalData: Animal = {
      ownerId: user.id,
      id: uuidv4(),
      identificador: formData.identificador || '',
      nombre: formData.nombre || '',
      especie: formData.especie,
      raza: formData.raza,
      nacimiento: formData.nacimiento,
      genero: formData.genero,
      peso: formData.peso || '',
      color: formData.color || '',
      descripcion: formData.descripcion || '',
      image: imageFileName, // Guardar solo el nombre del archivo
      image2: '',
      image3: '',
      proposito: formData.proposito || '',
      ubicacion: formData.ubicacion || '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      embarazada: false,
      favorito: false,
    };

    try {
      await addAnimal(animalData);
      Alert.alert('Éxito', 'Animal guardado correctamente');
      setFormData(initialFormData);
    } catch (error) {
      console.error('[ERROR] Error al guardar animal:', error);
      Alert.alert('Error', 'No se pudo guardar el animal');
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
    <GlobalContainer >
      <Header
        title="Agrega un Animal"
        onPress={() => Alert.alert('Debería mostrar info de cómo agregar un animal y cosas así')}
      />
      <CustomScrollView style={GlobalStyles.padding20}>
        <CustomImagePicker
          onImageSelected={(uri) => handleChange('image', uri)}
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
          options={Object.keys(especiesRazasMap)}
          onChange={(value) => handleChange('especie', value)}
        />

        <CustomSelect
          required
          label="Raza"
          value={formData.raza || ''}
          options={razasDisponibles}
          onChange={(value) => handleChange('raza', value)}
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
          onChange={(value) => handleChange('genero', value)}
        />

        <CustomDatePicker
          label="Fecha de Nacimiento"
          value={formData.fechaNacimiento || null}
          onDateChange={(date) => handleChange('fechaNacimiento', date)}
        />

        <CustomInput
          required
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
