import React, { useState } from "react";
import {
  ScrollView,
  Text,
  Alert,
  TouchableOpacity,
  View,
} from "react-native";
import {
  CustomButton,
  CustomInput,
  CustomSelect,
  CustomImage,
} from "../../assets/components";
import CustomDatePicker from "../../assets/components/CustomDatePicker";
import {
  especiesRazasMap,
  generos,
  propositosPorEspecie,
  Especie,
} from "../../assets/interfaces/animal";
import {
  launchCamera,
  launchImageLibrary,
  CameraOptions,
  ImageLibraryOptions,
} from "react-native-image-picker";
import useAuthStore from "../../assets/store/authStore";
import { calcularEdad, saveAnimalData } from "../../assets/functions";
import CustomIcon from "../../assets/components/CustomIcon";
import { useTheme } from "../../assets/context/ThemeContext";
import { getDynamicColors } from "../../assets/styles/colors";
import { createGlobalStyles } from "../../assets/styles/styles";
import { createNewStyles } from "../../assets/styles/NewStyles";

const New: React.FC = () => {
  const [nombre, setNombre] = useState<string>("");
  const [identificador, setIdentificador] = useState<string>("");
  const [especie, setEspecie] = useState<Especie | "Otro" | "">("");
  const [customEspecie, setCustomEspecie] = useState<string>(""); 
  const [raza, setRaza] = useState<string>("");
  const [customRaza, setCustomRaza] = useState<string>("");
  const [genero, setGenero] = useState<string>("");
  const [peso, setPeso] = useState<string>("");
  const [edad, setEdad] = useState<string>(""); 
  const [fechaNacimiento, setFechaNacimiento] = useState<Date | null>(null); 
  const [color, setColor] = useState<string>("");
  const [proposito, setProposito] = useState<string>("Otro");
  const [customProposito, setCustomProposito] = useState<string>(""); 
  const [ubicacion, setUbicacion] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);

  const user = useAuthStore((state) => state.user);

  const { isDarkTheme } = useTheme();
  const colors = getDynamicColors(isDarkTheme);
  const GlobalStyles = createGlobalStyles(isDarkTheme);
  const newStyles = createNewStyles(isDarkTheme);

  const razasDisponibles =
    especie && especie !== "Otro" ? especiesRazasMap[especie] : [];
  const propositosDisponibles =
    especie && especie !== "Otro" ? propositosPorEspecie[especie] : [];

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
      } else if (response.errorCode) {
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
      } else if (response.errorCode) {
        Alert.alert("Error", "No se pudo tomar la foto");
      } else if (response.assets && response.assets[0].uri) {
        setImage(response.assets[0].uri);
      }
    });
  };

  const handleSubmit = () => {
    if (
      !nombre ||
      (!especie && !customEspecie) ||
      (!raza && !customRaza) ||
      !genero ||
      !peso ||
      !descripcion ||
      !image
    ) {
      Alert.alert(
        "Error",
        "Por favor, completa todos los campos obligatorios antes de guardar."
      );
      return;
    }
  
    const animal = {
      ownerId: user?.userId,
      id: Math.random().toString(36).substr(2, 9),
      nombre,
      identificador: identificador || "Sin identificador",
      especie: especie === "Otro" ? customEspecie : especie,
      raza: raza === "Otro" ? customRaza : raza,
      edad,
      nacimiento: fechaNacimiento,
      genero,
      peso,
      color,
      proposito: proposito === "Otro" ? customProposito : proposito,
      ubicacion,
      descripcion,
      image,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      embarazada: false,
    };
  
    saveAnimalData(animal);
  
    Alert.alert("Éxito", "Animal registrado correctamente");
    resetForm();
  };
  
  const resetForm = () => {
    setNombre("");
    setIdentificador("");
    setEspecie("");
    setCustomEspecie("");
    setRaza("");
    setCustomRaza("");
    setGenero("");
    setPeso("");
    setEdad("");
    setFechaNacimiento(null);
    setColor("");
    setProposito("Otro");
    setCustomProposito("");
    setUbicacion("");
    setDescripcion("");
    setImage(null);
  };


  return (
    <ScrollView style={newStyles.container}>
      <Text style={newStyles.title}>Registrar Animal</Text>

      {/* Selector de imagen */}
      <Text style={GlobalStyles.label}>Selecciona o toma una foto</Text>
      <View style={newStyles.imageContainer}>
        {image && <CustomImage source={image} />}
        <View style={newStyles.imageButtonContainer}>
          <TouchableOpacity style={newStyles.imageButton} onPress={pickImageFromGallery}>
            <CustomIcon name="image-outline" size={40} color={colors.blanco} />
          </TouchableOpacity>
          <TouchableOpacity style={newStyles.imageButton} onPress={takePhoto}>
            <CustomIcon name="camera-outline" size={40} color={colors.blanco} />
          </TouchableOpacity>
        </View>
      </View>

      <CustomInput miniText="Obligatorio" label="Nombre" value={nombre} onChangeText={setNombre} placeholder="Nombre del animal" />
      <CustomInput miniText="Opcional" label="Identificador" value={identificador} onChangeText={setIdentificador} placeholder="Identificador único" />

      <CustomSelect
        label="Especie"
        miniText="Obligatorio"
        value={especie}
        options={[...Object.keys(especiesRazasMap), "Otro"]}
        onValueChange={(value) => {
          setEspecie(value as Especie | "Otro");
          setCustomEspecie("");
          setRaza("");
          setProposito("Otro");
        }}
      />
      {especie === "Otro" && (
        <CustomInput label="Especie Personalizada" value={customEspecie} onChangeText={setCustomEspecie} placeholder="Escribe la especie" />
      )}

      <CustomSelect
        label="Raza"
        miniText="Obligatorio"
        value={raza}
        options={[...razasDisponibles, "Otro"]}
        onValueChange={(value) => setRaza(value)}
      />
      {raza === "Otro" && (
        <CustomInput label="Raza Personalizada" value={customRaza} onChangeText={setCustomRaza} placeholder="Escribe la raza" />
      )}

      <CustomSelect
        label="Propósito"
        miniText="Obligatorio"
        value={proposito}
        options={[...propositosDisponibles, "Otro"]}
        onValueChange={(value) => setProposito(value)}
      />
      {proposito === "Otro" && (
        <CustomInput label="Propósito Personalizado" value={customProposito} onChangeText={setCustomProposito} placeholder="Escribe el propósito" />
      )}

      <CustomSelect
        label="Género"
        miniText="Obligatorio"
        value={genero}
        options={generos}
        onValueChange={(value) => setGenero(value)}
      />

      {/* Selector de Fecha o Edad */}
      <CustomDatePicker
        label="Fecha de Nacimiento"
        value={fechaNacimiento}
        onDateChange={(date) => {
          setFechaNacimiento(date);
          setEdad(calcularEdad(date)); 
        }}
        onAgeChange={(age) => {
          setEdad(age);
          setFechaNacimiento(null);
        }}
        ageValue={edad}
      />
      <CustomInput label="Edad" value={edad} placeholder="Edad calculada o ingresada" editable={false} />

      <CustomInput miniText="Obligatorio" label="Peso" value={peso} onChangeText={setPeso} placeholder="Peso en kg" type="number" />
      <CustomInput miniText="Obligatorio" label="Color" value={color} onChangeText={setColor} placeholder="Color del animal" />
      <CustomInput miniText="Obligatorio" label="Ubicación" value={ubicacion} onChangeText={setUbicacion} placeholder="Ubicación del animal" />
      <CustomInput
        label="Descripción"
        miniText="Opcional"
        value={descripcion}
        onChangeText={setDescripcion}
        placeholder="Descripción adicional"
        multiline
      />

      <CustomButton text="Guardar" onPress={handleSubmit} />
    </ScrollView>
  );
};

export default New;
