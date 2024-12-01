import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { colors, GlobalStyles } from '../../assets/styles';
import { useRoute, RouteProp } from '@react-navigation/native';
import { Modalize } from 'react-native-modalize';
import useAnimals from '../../assets/hooks/useAnimals';
import { RootStackParamList } from '../Welcome';
import { CustomButton, DataViewAnimal, ModalButton } from '../../assets/components';
import { updateAnimalData } from '../../assets/utils/asyncStorage';

const AnimalView = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'AnimalView'>>();
  const { id } = route.params;
  const { animal, isLoading, error } = useAnimals(id);
  const modalRef = useRef<Modalize>(null);
  const editModalRef = useRef<Modalize>(null);

  const [currentField, setCurrentField] = useState('');
  const [fieldValue, setFieldValue] = useState('');

  // Abre el modal con las opciones
  const handleOpenModal = () => {
    modalRef.current?.open();
  };

  // Abre el segundo modal para editar un campo
  const handleEditField = (field: string, value: string) => {
    setCurrentField(field);
    setFieldValue(value);
    modalRef.current?.close();
    editModalRef.current?.open();
  };

  // Guarda el valor actualizado en AsyncStorage
  const handleSave = async () => {
    if (currentField) {
      await updateAnimalData(id, currentField, fieldValue);
      editModalRef.current?.close();
      setCurrentField('');
      setFieldValue('');
    }
  };

  if (isLoading) {
    return (
      <View style={GlobalStyles.loadingContainer}>
        <Text>Cargando información del animal...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={GlobalStyles.errorContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <>
      <DataViewAnimal animal={animal!} />

      <View style={styles.container}>
        <CustomButton text="Registrar Cambio de Datos" onPress={handleOpenModal} />
        <View>
          <Text style={GlobalStyles.title}>Registros</Text>
        </View>
      </View>

      {/* Modal con opciones */}
      <Modalize
        ref={modalRef}
        modalHeight={650}
        modalStyle={{ backgroundColor: colors.fondo }}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>¿Qué registro deseas realizar?</Text>
          <ModalButton
            text="Editar Nombre"
            actualData={animal!.name}
            onPress={() => handleEditField('name', animal!.name)}
          />
          <ModalButton
            text="Editar Identificador"
            actualData={animal!.identifier}
            onPress={() => handleEditField('identifier', animal!.identifier)}
          />
          <ModalButton
            text="Editar Edad"
            actualData={animal!.age}
            onPress={() => handleEditField('age', animal!.age)}
          />
          <ModalButton
            text="Editar Peso"
            actualData={animal!.weight}
            onPress={() => handleEditField('weight', animal!.weight)}
          />
          <ModalButton
            text="Editar Descripción"
            actualData={animal!.description}
            onPress={() => handleEditField('description', animal!.description)}
          />
          <ModalButton
            text="Editar Propósito"
            actualData={animal!.purpose}
            onPress={() => handleEditField('purpose', animal!.purpose)}
          />
          <ModalButton
            text="Editar Ubicación"
            actualData={animal!.ubicacion}
            onPress={() => handleEditField('ubicacion', animal!.ubicacion)}
          />
        </View>
      </Modalize>

      {/* Modal para editar el valor */}
      <Modalize
        ref={editModalRef}
        modalHeight={300}
        modalStyle={{ backgroundColor: colors.fondo }}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Editar {currentField}</Text>
          <TextInput
            style={styles.input}
            value={fieldValue}
            onChangeText={setFieldValue}
          />
          <CustomButton text="Guardar" onPress={handleSave} />
          <CustomButton
            text="Cancelar"
            onPress={() => {
              editModalRef.current?.close();
              setCurrentField('');
              setFieldValue('');
            }}
          />
        </View>
      </Modalize>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.fondo,
  },
  modalContent: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: colors.naranja,
    textAlign: 'center',
  },
  input: {
    width: '90%',
    height: 40,
    borderColor: colors.naranja,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
});

export default AnimalView;
