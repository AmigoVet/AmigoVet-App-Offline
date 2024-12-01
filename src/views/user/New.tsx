import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, Alert, TouchableOpacity, View } from "react-native";
import { colors, GlobalStyles } from "../../assets/styles";
import {
  CustomButton,
  CustomInput,
  CustomSelect,
  CustomImage,
} from "../../assets/components";
import { especiesRazasMap, generos, Especie } from "../../assets/interfaces/animal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  launchCamera,
  launchImageLibrary,
  CameraOptions,
  ImageLibraryOptions,
} from "react-native-image-picker";
import Ionicons from "react-native-vector-icons/Ionicons";

const New: React.FC = () => {
  const [nombre, setNombre] = useState<string>("");
  const [identificador, setIdentificador] = useState<string>("");
  const [especie, setEspecie] = useState<Especie | "">("");
  const [raza, setRaza] = useState<string>("");
  const [genero, setGenero] = useState<string>("");
  const [peso, setPeso] = useState<string>("");
  const [edad, setEdad] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [proposito, setProposito] = useState<string>("");
  const [ubicacion, setUbicacion] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);

  const razasDisponibles = especie ? especiesRazasMap[especie] : [];

  // Seleccionar imagen desde la galería
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
        console.log("Usuario canceló la selección de imagen");
      } else if (response.errorCode) {
        console.log("Error al seleccionar imagen:", response.errorMessage);
        Alert.alert("Error", "No se pudo seleccionar la imagen");
      } else if (response.assets && response.assets[0].uri) {
        setImage(response.assets[0].uri);
      }
    });
  };

  // Tomar foto con la cámara
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
        console.log("Usuario canceló la cámara");
      } else if (response.errorCode) {
        console.log("Error al tomar foto:", response.errorMessage);
        Alert.alert("Error", "No se pudo tomar la foto");
      } else if (response.assets && response.assets[0].uri) {
        setImage(response.assets[0].uri);
      }
    });
  };

  // Guardar datos en AsyncStorage
  const saveAnimalData = async (animal: any) => {
    try {
      const existingData = await AsyncStorage.getItem("animals");
      const parsedData = existingData ? JSON.parse(existingData) : [];
      parsedData.push(animal);
      await AsyncStorage.setItem("animals", JSON.stringify(parsedData));
      console.log("Animal guardado en AsyncStorage");
    } catch (error) {
      console.error("Error al guardar los datos:", error);
    }
  };

  const handleSubmit = () => {
    if (!nombre || !especie || !raza || !genero || !peso || !descripcion) {
      Alert.alert("Error", "Por favor, completa todos los campos obligatorios");
      return;
    }
    if (!image) {
      Alert.alert("Error", "Por favor, selecciona una imagen");
      return;
    }

    const animal = {
      id: Math.random().toString(36).substr(2, 9),
      nombre,
      identificador,
      especie,
      raza,
      edad,
      genero,
      peso,
      color,
      proposito,
      ubicacion,
      descripcion,
      image,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    saveAnimalData(animal);

    Alert.alert("Éxito", "Animal registrado correctamente");
    resetForm();
  };

  const resetForm = () => {
    setNombre("");
    setIdentificador("");
    setEspecie("");
    setRaza("");
    setGenero("");
    setPeso("");
    setEdad("");
    setColor("");
    setProposito("");
    setUbicacion("");
    setDescripcion("");
    setImage(null);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Registrar Animal</Text>

      {/* Selección de imagen */}
      <Text style={GlobalStyles.label}>Selecciona o toma una foto</Text>
      <View style={styles.imageContainer}>
        {image && <CustomImage source={image} />}
        <View style={styles.imageButtonContainer}>
          <TouchableOpacity style={styles.imageButton} onPress={pickImageFromGallery}>
            <Ionicons name="image-outline" size={40} color={colors.blanco} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.imageButton} onPress={takePhoto}>
            <Ionicons name="camera-outline" size={40} color={colors.blanco} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Campos de formulario */}
      <CustomInput
        label="Nombre"
        value={nombre}
        onChangeText={setNombre}
        placeholder="Nombre del animal"
      />

      <CustomInput
        label="Identificador"
        value={identificador}
        onChangeText={setIdentificador}
        placeholder="Identificador único del animal"
      />

      <CustomSelect
        label="Especie"
        value={especie}
        options={Object.keys(especiesRazasMap)}
        onValueChange={(value) => {
          setEspecie(value as Especie);
          setRaza("");
        }}
      />

      <CustomSelect
        label="Raza"
        value={raza}
        options={razasDisponibles}
        onValueChange={setRaza}
      />

      <CustomSelect
        label="Género"
        value={genero}
        options={generos}
        onValueChange={setGenero}
      />

      <CustomInput
        label="Color"
        value={color}
        onChangeText={setColor}
        placeholder="Color del animal"
      />

      <CustomInput
        label="Peso"
        value={peso}
        onChangeText={setPeso}
        placeholder="Peso en kg"
        type="number"
      />

      <CustomInput
        label="Proposito"
        value={proposito}
        onChangeText={setProposito}
        placeholder="Proposito del animal(Leche, Carne, etc.)"
      />

      <CustomInput
        label="Ubicación"
        value={ubicacion}
        onChangeText={setUbicacion}
        placeholder="Ubicación del animal"
      />

      <CustomInput
        label="Edad"
        value={edad}
        onChangeText={setEdad}
        placeholder="Edad del animal en años"
        type="number"
      />

      <CustomInput
        label="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
        placeholder="Descripción adicional"
        multiline
      />

      {/* Botón de guardar */}
      <CustomButton text="Guardar" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fondo,
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: colors.blancoLight,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
    borderColor: colors.naranja,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 15,
  },
  imageButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  imageButton: {
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 5,
  },
});

export default New;
