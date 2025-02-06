// **Librerías externas**
import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { useRoute, RouteProp } from "@react-navigation/native";
import { Modalize } from "react-native-modalize";
import { CameraOptions, ImageLibraryOptions, launchCamera, launchImageLibrary } from "react-native-image-picker";

// **Interfaces y tipos**
import { Register } from "../../lib/interfaces/registers";
import { RootStackParamList } from "../Welcome";
import { Animal, Notes } from "../../lib/interfaces/animal";

// **Contexto y estilos**
import { useTheme } from '../../lib/context/ThemeContext';
import { getDynamicColors } from '../../assets/styles/colors';

// **Componentes locales**
import { CarouselImages, DataViewAnimal, HeaderRegisterTable, RowRegister } from "../../components/AnimalDataView";
import { CustomButton, CustomImage, CustomIcon, CustomInput, CustomDatePicker } from "../../components/Customs";
import { ModalButton } from "../../components/global";


// ** AsyncStorage**
import RequestGPTButton from "../../components/global/RequestGPTButton";
import {getDataAnimalbyId } from "../../lib/db/getDataAnimal";
import { getDataRegisters } from "../../lib/db/registers/getDataRegister";
import { handleCreateRegister } from "./functions/handleCreateRegister";
import { handleSave, handleSaveCelo } from "./functions/handleSave";
import { saveImagePermanently } from "../../lib/functions/saveImage";
import { deleteDataRegister } from "../../lib/db/registers/deleteDataRegister";
import { getDataNotas } from "../../lib/db/notas/getDataNotas";
import LoaderScreen from "../../components/global/LoaderScreen";
import { AnimalViewStyles } from "../../assets/styles/AnimalViewStyles";
import ContentModalSelecionaropcion from "../../components/modals/AnimalView/ContentModalSelecionaropcion";
import ContentModalSelectImage from "../../components/modals/AnimalView/ContentModalSelectImage";
import ButtonAddRegister from "../../components/AnimalDataView/ButtonAddRegister";
import { set } from "date-fns";
import ButtonAddEvent from "../../components/AnimalDataView/ButtonAddEvent";


const AnimalView = () => {
  const route = useRoute<RouteProp<RootStackParamList, "AnimalView">>();
  const { id } = route.params;
  const modalRef = useRef<Modalize>(null);
  const editModalRef = useRef<Modalize>(null);
  const confirmDeleteModalRef = useRef<Modalize>(null);
  const modalCreateRegister = useRef<Modalize>(null);
  const modalAddImage = useRef<Modalize>(null);

  const [currentField, setCurrentField] = useState("");
  const [fieldValue, setFieldValue] = useState("");
  const [fieldDate, setFieldDate] = useState<Date | null>(null);
  const [fieldImage, setFieldImage] = useState<number | null>(null);
  const [registers, setRegisters] = useState<Register[]>([]);
  const [registerToDelete, setRegisterToDelete] = useState<Register | null>(null);

  const [animal, setAnimal] = useState<Animal | null>(null);
  const [notes, setNotes] = useState<Notes[]>([]);

  const { isDarkTheme } = useTheme();
  const colors = getDynamicColors(isDarkTheme);
  const styles = AnimalViewStyles(colors);

  const pickImageFromGallery = async () => {
    const options: ImageLibraryOptions = {
      mediaType: "photo",
      selectionLimit: 1,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };
  
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        Alert.alert("Selección cancelada");
      } else if (response.errorCode) {
        Alert.alert("Error", "No se pudo seleccionar la imagen");
      } else if (response.assets && response.assets[0].uri) {
        const newImage = response.assets[0].uri;
        // Preguntar antes de guardar
        confirmSaveImage(newImage);
      }
    });
  };
  const takePhoto = async () => {
    const options: CameraOptions = {
      mediaType: "photo",
      cameraType: "back",
      saveToPhotos: true,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };
  
    launchCamera(options, (response) => {
      if (response.didCancel) {
        Alert.alert("Captura cancelada");
      } else if (response.errorCode) {
        Alert.alert("Error", "No se pudo tomar la foto");
      } else if (response.assets && response.assets[0].uri) {
        const newImage = response.assets[0].uri;
        // Preguntar antes de guardar
        confirmSaveImage(newImage);
      }
    });
  };
  const confirmSaveImage = (newImage: string) => {
    Alert.alert(
      "Confirmar Guardado",
      "¿Estás seguro de que deseas guardar esta imagen?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Guardar cancelado"),
          style: "cancel",
        },
        {
          text: "Guardar",
          onPress: () => saveImage(newImage), // Guardar solo si el usuario confirma
        },
      ],
      { cancelable: true }
    );
  };
  const saveImage = async (newImage: string) => {
    const savedImagePath = await saveImagePermanently(newImage);
    if (fieldImage === 1) {
      await handleSave( "image",  savedImagePath!, id,() => {modalAddImage.current?.close();});
    } else if (fieldImage === 2) {
      await handleSave( "image2", savedImagePath!, id,() => {modalAddImage.current?.close();});
    } else if (fieldImage === 3) {
      await handleSave( "image3", savedImagePath!, id,() => {modalAddImage.current?.close();});
    }
    loadData();
  };

  const loadData = async () => {
    if (id) {
      try {
        const fetchAnimal = async () => {
          const loadedAnimal = await getDataAnimalbyId(id);
          setAnimal(loadedAnimal);
        };
        fetchAnimal();
      } catch (error) {
        console.error("Error al cargar el animal:", error);
      }
      try {
        const loadedNotes = await getDataNotas(id); 
        setNotes(loadedNotes); 
      } catch (error) {
          console.error("Error al cargar las notas:", error);
      }
      try {
        const fetchRegisters = async () => {
          const loadedRegisters = await getDataRegisters(id);
          setRegisters(loadedRegisters);
        };
        fetchRegisters();
      } catch (error) {
        console.error("Error al cargar los registros:", error);
      }
    }
  };

  // Cargar Registros y datos del animal
  useEffect(() => {
    loadData();
  }, [id]);

  if (!animal) {
    return <LoaderScreen />;
  }
  

  // Abre el modal con las opciones
  const handleOpenModal = () => {
    modalRef.current?.open();
  };
  const handelAddImage = (idImage: number) => {
    setFieldImage(idImage);
    modalRef.current?.close();
    modalAddImage.current?.open();
  }
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



  const handleDeletePrompt = (item: Register) => {
    setRegisterToDelete(item);
    confirmDeleteModalRef.current?.open();
  };
  const handleConfirmDelete = () => {
    if (registerToDelete) {
      deleteDataRegister(registerToDelete.id);
      Alert.alert("Registro eliminado", "El registro fue eliminado correctamente.");
      confirmDeleteModalRef.current?.close();
    }
  };





  return (
    <>
      <RequestGPTButton animal={animal} registers={registers} notes={notes} />
      <ButtonAddRegister onPress={handleOpenModal} />
      <ButtonAddEvent />
      <SwipeListView
        style={styles.swipeListContainer}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <CarouselImages
              sources={[animal!.image, animal!.image2, animal!.image3]}
            />
            <DataViewAnimal animal={animal} notas={notes} />
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

      { /* Modal para confirmar eliminación de registro */ }
      <Modalize ref={confirmDeleteModalRef} modalHeight={200} modalStyle={{ backgroundColor: colors.fondo }}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>¿Estás seguro de eliminar este registro?</Text>
          <View style={styles.modalActions}>
            <ModalButton text="Cancelar" onPress={() => confirmDeleteModalRef.current?.close()} />
            <ModalButton text="Eliminar" onPress={handleConfirmDelete} red />
          </View>
        </View>
      </Modalize>

      {/* Modal de Opciones */}
      <Modalize ref={modalRef} modalHeight={650} modalStyle={{ backgroundColor: colors.fondo }}> 
        <ContentModalSelecionaropcion 
          animal={animal}
          onPressEditNombre={() => handleEditField("nombre", animal!.nombre)}
          onPressEditImagen={() => handelAddImage(1)}
          onPressEditSecondImagen={() => handelAddImage(2)}
          onPressEditExtraImagen={() => handelAddImage(3)}
          onPressEditIdentificador={() => handleEditField("identificador", animal.identificador)}
          onPressEditPeso={() => handleEditField("peso", animal.peso)}
          onPressEditProposito={() => handleEditField("proposito", animal.proposito)}
          onPressEditUbicacion={() => handleEditField("ubicacion", animal.ubicacion)}
          onPressEditDescripcion={() => handleEditField("descripcion", animal.descripcion)}
          onPressEditFechaCalor={() => handleEditField("celo", animal.celo || '')}
          onPressRegistroPrenos={() => handleCreateRegisterModal("Registro Preñes")}
          onPressRegistroTratamiento={() => handleCreateRegisterModal("Registro Tratamiento")}
          onPressRegistroInseminacion={() => handleCreateRegisterModal("Registro Inseminacion")}
          onPressRegistroAborto={() => handleCreateRegisterModal("Registro Aborto")}
        />
      </Modalize>

      { /* Modal para seleccionar imagen */ }
      <Modalize ref={modalAddImage} modalHeight={600} modalStyle={{ backgroundColor: colors.fondo, padding: 20 }}>
        <ContentModalSelectImage 
          animal={animal}
          fieldImage={fieldImage!}
          pickImageFromGallery={pickImageFromGallery}
          takePhoto={takePhoto}
        />
      </Modalize>

      { /* Modal para actualizar datos */ }
      <Modalize ref={editModalRef} modalHeight={600} modalStyle={{ backgroundColor: colors.fondo }}>
        <View style={styles.modalContent}>
          {currentField === 'celo' ? 
          <>
            <CustomDatePicker 
              label={"Ingresa la última fecha de " + currentField} // Etiqueta dinámica
              value={fieldDate} // Estado que contiene la fecha seleccionada
              onDateChange={(date) => setFieldDate(date)} // Actualiza el estado con la fecha seleccionada
            /> 

            <CustomButton 
              text="Guardar" 
              onPress={() => {
                handleSaveCelo(animal.id, fieldDate!.toISOString(), () => {
                  editModalRef.current?.close(); // Cierra el modal
                  loadData(); // Recarga los datos del animal
                  setCurrentField(""); // Reinicia el campo actual
                  setFieldDate(new Date()); // Reinicia el valor de la fecha
                });
              }} 
            />
          </>
          : 
          <>
            <CustomButton text="Guardar" onPress={() => {
              handleSave(currentField, fieldValue, animal.id, () => {
                editModalRef.current?.close();
                loadData();
                setCurrentField("");
                setFieldValue("");
              });
            }} />
            <CustomInput
              label={"Ingresa el " +currentField}
              placeholder={currentField}
              value={fieldValue} 
              onChangeText={setFieldValue} 
            />
          </>
          }

          <CustomButton
            text="Cancelar"
            onPress={() => {
              setFieldValue("");
              setCurrentField("");
              editModalRef.current?.close();
            }}
            red
          />
        </View>
      </Modalize>

      <Modalize ref={modalCreateRegister} modalHeight={600} modalStyle={{ backgroundColor: colors.fondo }}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{currentField}</Text>
          {currentField === "Registro Preñes" && (
            <CustomInput label="Comentario" placeholder="Comentario" value={fieldValue} onChangeText={setFieldValue} />
          )}
          {currentField === "Registro Tratamiento" && (
            <CustomInput label="Comentario del tratamiento" placeholder="Tipo de tratamiento" value={fieldValue} onChangeText={setFieldValue} />
          )}
          {currentField === "Registro Inseminacion" && (
            <CustomInput label="Comentario de inseminación" placeholder="Proveedor del semen" value={fieldValue} onChangeText={setFieldValue} />
          )}
          <CustomButton text="Guardar" onPress={() => {
            handleCreateRegister(currentField, fieldValue, animal.id, animal.especie, () => {modalCreateRegister.current?.close(); loadData();})
          }} />
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


export default AnimalView;
