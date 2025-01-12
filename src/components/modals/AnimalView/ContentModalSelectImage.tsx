import { View, Text } from 'react-native'
import React from 'react'
import { useTheme } from '../../../lib/context/ThemeContext';
import { createGlobalStyles } from '../../../assets/styles/styles';
import { getDynamicColors } from '../../../assets/styles/colors';
import { createNewStyles } from '../../../assets/styles/NewStyles';
import { Animal } from '../../../lib/interfaces/animal';
import { CustomIcon, CustomImage } from '../../Customs';
import { TouchableOpacity } from 'react-native';

interface ContentModalSelectImageProps {
    animal: Animal;
    fieldImage: number;
    pickImageFromGallery: () => void;
    takePhoto: () => void;
}

const ContentModalSelectImage = ({ animal, fieldImage, pickImageFromGallery, takePhoto }: ContentModalSelectImageProps) =>{

    const {isDarkTheme} = useTheme();
    const colors = getDynamicColors(isDarkTheme);
    const GlobalStyles = createGlobalStyles(isDarkTheme);
    const newStyles = createNewStyles(isDarkTheme);

    return (
        <View>
            <Text style={GlobalStyles.label}>Selecciona o toma una foto</Text>
            <View style={newStyles.imageContainer}>
            {fieldImage === 1 ? (
                animal!.image && <CustomImage source={animal!.image} />
            ) : fieldImage === 2 ? (
                animal!.image2 && <CustomImage source={animal!.image2} />
            ) : fieldImage === 3 ? (
                animal!.image3 && <CustomImage source={animal!.image3} />
            ) : null}

            <View style={newStyles.imageButtonContainer}>
                <TouchableOpacity style={newStyles.imageButton} onPress={pickImageFromGallery}>
                <CustomIcon name="image-outline" size={40} color={colors.blanco} />
                </TouchableOpacity>
                <TouchableOpacity style={newStyles.imageButton} onPress={takePhoto}>
                <CustomIcon name="camera-outline" size={40} color={colors.blanco} />
                </TouchableOpacity>
            </View>
            </View>
        </View>
    )
}

export default ContentModalSelectImage