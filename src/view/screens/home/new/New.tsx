import { View, Text, Alert, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import GlobalContainer from '../../../components/GlobalContainer'
import CustomSelect from '../../../components/customs/CustomSelect'
import { generos } from '../../../../lib/functions/Animal'
import Header from '../../../components/Header'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../../navigator/navigationTypes'
import { ScrollView } from 'react-native-gesture-handler'
import { GlobalStyles } from '../../../styles/GlobalStyles'
import CustomImage from '../../../components/customs/CustomImage'
import Icon from '@react-native-vector-icons/ionicons'
import { newStyles } from './styles'
import {launchCamera, launchImageLibrary, CameraOptions, ImageLibraryOptions} from "react-native-image-picker";
import { newColors } from '../../../styles/colors'

const New = () => {
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

  const [image, setImage] = useState<string | null>(null);
  const [especie, setEspecie] = useState<"Otro" | "">("");
  const [genero, setGenero] = useState<string>("");
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();


  return (
    <GlobalContainer>
      <Header title='Agrega un Animal'  onPress={() => Alert.alert("Deberia mostrar info de como agregar un animal y cosas asi")} />
      <ScrollView style={{padding: 20}} showsVerticalScrollIndicator={false}>
        <Text style={GlobalStyles.subtitle}>Selecciona o toma una foto</Text>
        <View style={newStyles.imageContainer}>
          {image && <CustomImage source={image} style={{ height: 250 }} />}
          <View style={newStyles.imageButtonContainer}>
            <TouchableOpacity style={newStyles.imageButton} onPress={pickImageFromGallery}>
              <Icon name="image-outline" size={40} color={newColors.fondo_secundario} />
            </TouchableOpacity>
            <TouchableOpacity style={newStyles.imageButton} onPress={takePhoto}>
              <Icon name="camera-outline" size={40} color={newColors.fondo_secundario} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </GlobalContainer>
  )
}

export default New