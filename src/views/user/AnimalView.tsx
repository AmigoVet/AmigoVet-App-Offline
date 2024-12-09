import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { colors, GlobalStyles } from "../../assets/styles";
import { useRoute, RouteProp } from "@react-navigation/native";
import { Modalize } from "react-native-modalize";
import useAnimals from "../../assets/hooks/useAnimals";
import {
  CustomButton,
  CustomImage,
  CustomInput,
  DataViewAnimal,
  HeaderRegisterTable,
  ModalButton,
  RowRegister,
} from "../../assets/components";
import { saveNoteAnimal, saveRegister, updateAnimalData } from "../../assets/utils/asyncStorage";
import { useRegisters } from "../../assets/hooks/useRegisters";
import { Register } from "../../assets/interfaces/registers";
import { RootStackParamList } from "../Welcome";
import { InseminationRegister, PregnancyRegister, TreatmentRegister } from "../../assets/interfaces/animal";
import { calculateDueDate } from "../../assets/functions/CalcularFechaParto";
import { calcularEdad } from "../../assets/functions";

const AnimalView = () => {
  const route = useRoute<RouteProp<RootStackParamList, "AnimalView">>();
  const { id } = route.params;
  const { animal, isLoading, error } = useAnimals(id);
  const modalRef = useRef<Modalize>(null);
  const editModalRef = useRef<Modalize>(null);
  const confirmDeleteModalRef = useRef<Modalize>(null);
  const modalCreateRegister = useRef<Modalize>(null);

  const [currentField, setCurrentField] = useState("");
  const [fieldValue, setFieldValue] = useState("");
  const [registers, setRegisters] = useState<Register[]>([]);
  const [registerToDelete, setRegisterToDelete] = useState<Register | null>(null);

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

  const handleCreateRegisterModal = (field: string) => {
    setCurrentField(field);
    modalRef.current?.close();
    modalCreateRegister.current?.open();
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

      await updateAnimalData(id, currentField, fieldValue);
      await updateAnimalData(id, "updated_at", new Date().toISOString());
      await saveRegister(register);


      // Actualizar registros en el estado
      setRegisters((prev) => [...prev, register]);

      editModalRef.current?.close();
      setCurrentField("");
      setFieldValue("");
    }
  };

  const handleCreateRegister = async () => {
    if (currentField) {
      const generateId = () => Math.random().toString(36).substr(2, 9);
      const actualDay = calculateDueDate(animal!.especie, new Date());

      const baseRegister: Register = {
        id: generateId(),
        animalId: id,
        comentario: fieldValue,
        accion: currentField,
        fecha: new Date().toISOString(),
      };

      let specificRegister: Register | PregnancyRegister | TreatmentRegister | InseminationRegister;

      if (currentField === "Registrar Embarazo") {
        specificRegister = {
          ...baseRegister,
          fechaPartoEstimada: fieldValue,
        };
        await saveNoteAnimal(animal!.id, {nota: `Posible fecha de parto: ${actualDay}`});

      } else if (currentField === "Registrar Tratamiento") {
        specificRegister = {
          ...baseRegister,
          tipoTratamiento: fieldValue,
        };
        await saveNoteAnimal(animal!.id, {nota: `Ultimo tratamiento: ${actualDay} de ${fieldValue}`});
      } else if (currentField === "Registrar Inseminacion") {
        specificRegister = {
          ...baseRegister,
          semenProveedor: fieldValue,
        };
        await saveNoteAnimal(animal!.id, {nota: `Posible fecha de parto: ${actualDay}`});
      } else {
        specificRegister = baseRegister;
      }

      await saveRegister(specificRegister);

      // Actualizar lista de registros
      setRegisters((prev) => [...prev, specificRegister]);

      modalCreateRegister.current?.close();
      setCurrentField("");
      setFieldValue("");
    }
  };

  // Mostrar modal de confirmación para eliminar registro
  const handleDeletePrompt = (item: Register) => {
    setRegisterToDelete(item);
    confirmDeleteModalRef.current?.open();
  };

  // Confirmar eliminación del registro
  const handleConfirmDelete = () => {
    if (registerToDelete) {
      const newRegisters = registers.filter((item) => item.id !== registerToDelete.id);
      setRegisters(newRegisters);
      Alert.alert("Registro eliminado", "El registro fue eliminado correctamente.");
      setRegisterToDelete(null);
      confirmDeleteModalRef.current?.close();
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
      <SwipeListView
        style={styles.swipeListContainer}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <CustomImage
              source={animal!.image}
              full
              style={{
                marginTop: -16,
                marginHorizontal: -16,
              }}
            />
            <DataViewAnimal animal={animal!} />
            <CustomButton text="Registrar Cambio de Datos" onPress={handleOpenModal} />
            {registers.length > 0 && <HeaderRegisterTable />}
          </View>
        }
        ListFooterComponent={<View style={{ height: 100 }} />}
        data={registers}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <RowRegister
            register={item}
            bgColor={index % 2 === 0 ? colors.rowBgDark : colors.rowBgLight}
            isLast={index === registers.length - 1}
          />
        )}
        renderHiddenItem={({ item, index }) => (
          <View
            style={[
              styles.hiddenContainer,
              index === registers.length - 1 && styles.lastHiddenContainer,
            ]}
          >
            <TouchableOpacity
              style={[
                styles.deleteButton,
                index === registers.length - 1 && styles.lastDeleteButton,
              ]}
              onPress={() => handleDeletePrompt(item)}
            >
              <Text style={styles.deleteText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
        leftOpenValue={0}
        rightOpenValue={-75}
      />

      <Modalize ref={confirmDeleteModalRef} modalHeight={200} modalStyle={{ backgroundColor: colors.fondo }}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>¿Estás seguro de eliminar este registro?</Text>
          <View style={styles.modalActions}>
            <ModalButton text="Cancelar" onPress={() => confirmDeleteModalRef.current?.close()} />
            <ModalButton text="Eliminar" onPress={handleConfirmDelete} red />
          </View>
        </View>
      </Modalize>

      <Modalize ref={modalRef} modalHeight={650} modalStyle={{ backgroundColor: colors.fondo }}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>¿Qué registro deseas realizar?</Text>
          <ModalButton text="Editar Nombre" actualData={animal!.nombre} onPress={() => handleEditField("nombre", animal!.nombre)} />
          <ModalButton text="Editar Identificador" actualData={animal!.identificador} onPress={() => handleEditField("identificador", animal!.identificador)} />
          <ModalButton text="Editar Peso" actualData={animal!.peso} onPress={() => handleEditField("peso", animal!.peso)} />
          <ModalButton text="Editar Propósito" actualData={animal!.proposito} onPress={() => handleEditField("proposito", animal!.proposito)} />
          <ModalButton text="Editar Edad" actualData={animal!.edad} onPress={() => handleEditField("edad", calcularEdad(animal!.nacimiento))} />
          <ModalButton text="Editar Ubicación" actualData={animal!.ubicacion} onPress={() => handleEditField("ubicacion", animal!.ubicacion)} />
          <ModalButton text="Editar Descripción" actualData={animal!.descripcion} onPress={() => handleEditField("descripcion", animal!.descripcion)} />

          <View style={{ width: "100%", height: 0.5, backgroundColor: colors.blanco }} />

          {animal!.genero === "Hembra" && <ModalButton text="Registrar Embarazo" onPress={() => handleCreateRegisterModal("Registrar Embarazo")} />}
          {animal!.genero === "Hembra" && <ModalButton text="Registrar Inseminación" onPress={() => handleCreateRegisterModal("Registrar Inseminacion")} />}

          <ModalButton text="Registrar Tratamiento" onPress={() => handleCreateRegisterModal("Registrar Tratamiento")} />
        </View>
      </Modalize>

      <Modalize ref={editModalRef} modalHeight={600} modalStyle={{ backgroundColor: colors.fondo }}>
        <View style={styles.modalContent}>
          <CustomInput
            label={"Ingresa el " +currentField}
            placeholder={currentField}
            value={fieldValue} 
            onChangeText={setFieldValue} 
          />
          <CustomButton text="Guardar" onPress={handleSave} />
          <CustomButton
            text="Cancelar"
            onPress={() => {
              editModalRef.current?.close();
              setCurrentField("");
              setFieldValue("");
            }}
            red
          />
        </View>
      </Modalize>

      <Modalize ref={modalCreateRegister} modalHeight={600} modalStyle={{ backgroundColor: colors.fondo }}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{currentField}</Text>
          {currentField === "Registrar Embarazo" && (
            <CustomInput label="Comentario" placeholder="Comentario" value={fieldValue} onChangeText={setFieldValue} />
          )}
          {currentField === "Registrar Tratamiento" && (
            <CustomInput label="Comentario del tratamiento" placeholder="Tipo de tratamiento" value={fieldValue} onChangeText={setFieldValue} />
          )}
          {currentField === "Registrar Inseminacion" && (
            <CustomInput label="Comentario de inseminación" placeholder="Proveedor del semen" value={fieldValue} onChangeText={setFieldValue} />
          )}
          <CustomButton text="Guardar" onPress={handleCreateRegister} />
          <CustomButton
            text="Cancelar"
            onPress={() => {
              modalCreateRegister.current?.close();
              setCurrentField("");
              setFieldValue("");
            }}
            red
          />
        </View>
      </Modalize>
    </>
  );
};

const styles = StyleSheet.create({
  swipeListContainer: {
    flex: 1,
    backgroundColor: colors.fondo,
    padding: 16,
  },
  headerContainer: {},
  container: {
    padding: 16,
    backgroundColor: colors.fondo,
  },
  modalContent: {
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: colors.naranja,
    textAlign: "center",
  },
  modalActions: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  hiddenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: colors.rojo,
  },
  lastHiddenContainer: {
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  deleteButton: {
    width: 75,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.rojo,
  },
  lastDeleteButton: {
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  deleteText: {
    color: colors.blancoLight,
    fontWeight: "bold",
  },
});

export default AnimalView;
