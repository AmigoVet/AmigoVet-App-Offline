import { Alert } from "react-native";
import { launchImageLibrary, launchCamera, ImageLibraryOptions, CameraOptions } from "react-native-image-picker";

/**
 * Función para seleccionar una imagen de la galería
 * @param setImage Función para actualizar la imagen seleccionada
 */
export const pickImageFromGallery = async (setImage: (uri: string) => void) => {
    const options: ImageLibraryOptions = {
        mediaType: "photo",
        selectionLimit: 1,
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
    };

    launchImageLibrary(options, (response) => {
        if (response.didCancel) {
            console.log("Selección de imagen cancelada");
        } else if (response.errorCode) {
            Alert.alert("Error", "No se pudo seleccionar la imagen");
        } else if (response.assets && response.assets[0].uri) {
            setImage(response.assets[0].uri);
        }
    });
};

/**
 * Función para tomar una foto con la cámara
 * @param setImage Función para actualizar la imagen capturada
 */
export const takePhoto = async (setImage: (uri: string) => void) => {
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
            console.log("Captura de foto cancelada");
        } else if (response.errorCode) {
            Alert.alert("Error", "No se pudo tomar la foto");
        } else if (response.assets && response.assets[0].uri) {
            setImage(response.assets[0].uri);
        }
    });
};
