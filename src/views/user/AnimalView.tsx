import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import { colors, GlobalStyles } from '../../assets/styles';
import { useRoute, RouteProp } from '@react-navigation/native';
import { Modalize } from 'react-native-modalize';
import useAnimals from '../../assets/hooks/useAnimals';
import { RootStackParamList } from '../Welcome';
import { CustomButton, DataViewAnimal, HeaderRegisterTable, ModalButton, RowRegister } from '../../assets/components';
import { saveRegister, updateAnimalData } from '../../assets/utils/asyncStorage';
import { useRegisters } from '../../assets/hooks/useRegisters';
import { Register } from '../../assets/interfaces/registers'; 
import Header from '../../assets/components/Header';

const AnimalView = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'AnimalView'>>();
  const { id } = route.params;
  const { animal, isLoading, error } = useAnimals(id);
  const modalRef = useRef<Modalize>(null);
  const editModalRef = useRef<Modalize>(null);

  const [currentField, setCurrentField] = useState('');
  const [fieldValue, setFieldValue] = useState('');
  const [registers, setRegisters] = useState<Register[]>([]); 

  // Cargar registros del animal al montar el componente
  useEffect(() => {
    const fetchRegisters = async () => {
      const loadedRegisters = await useRegisters(id);
      setRegisters(loadedRegisters);
    };
    fetchRegisters();
  }, [id]);

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

  // Guarda el valor actualizado y crea un registro
  const handleSave = async () => {
    if (currentField) {
      const generateId = () => Math.random().toString(36).substr(2, 9);

      const register: Register = {
        id: generateId(),
        animalId: id,
        comentario: fieldValue,
        accion: `Cambio de ${currentField}`,
        fecha: new Date().toISOString(),
      };
      updateAnimalData(id, "updatedAt", new Date().toISOString());

      await saveRegister(register);

      // Actualizar registros en el estado
      setRegisters((prev) => [...prev, register]);

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
      
      <FlatList
  ListHeaderComponent={
    <>
      <DataViewAnimal animal={animal!} />
      <View style={styles.container}>
        <CustomButton text="Registrar Cambio de Datos" onPress={handleOpenModal} />
      </View>
    </>
  }
  data={registers}
  keyExtractor={(item) => item.id}
  ListEmptyComponent={
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.error}>No hay registros para mostrar</Text> 
    </View>
  }
  renderItem={({ item, index }) => (
    <>
      {index === 0 && <HeaderRegisterTable />}
      <RowRegister
        register={item}
        bgColor={index % 2 === 0 ? colors.rowBgDark : colors.rowBgLight}
        isLast={index === registers.length - 1}
      />
    </>
  )}
/>



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
            actualData={animal!.nombre}
            onPress={() => handleEditField('nombre', animal!.nombre)}
          />
          <ModalButton
            text="Editar Identificador"
            actualData={animal!.identificador}
            onPress={() => handleEditField('identificador', animal!.identificador)}
          />
          <ModalButton
            text="Editar Edad"
            actualData={animal!.edad}
            onPress={() => handleEditField('edad', animal!.edad)}
          />
          <ModalButton
            text="Editar Peso"
            actualData={animal!.peso}
            onPress={() => handleEditField('peso', animal!.peso)}
          />
          <ModalButton
            text="Editar Descripción"
            actualData={animal!.descripcion}
            onPress={() => handleEditField('descripcion', animal!.descripcion)}
          />
          <ModalButton
            text="Editar Propósito"
            actualData={animal!.proposito}
            onPress={() => handleEditField('proposito', animal!.proposito)}
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
  registerItem: {
    marginVertical: 4,
    padding: 8,
    borderRadius: 4,
    backgroundColor: colors.naranja,
  },
  registerText: {
    color: colors.blancoLight,
  },
});

export default AnimalView;
