import React from 'react';
import { FlatList, StyleSheet, View, Text, Alert } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NavigationProp, RootStackParamList } from '../../../../navigator/navigationTypes';
import CustomImage from '../../../../components/customs/CustomImage';
import { ImagesTable } from '../../../../../lib/interfaces/Animal';
import GlobalContainer from '../../../../components/GlobalContainer';
import Header from '../../../../components/Header';
import Separator from '../../../../components/Separator';
import { newColors } from '../../../../styles/colors';
import { constants } from '../../../../styles/constants';
import MiniButton from '../../../../components/MiniButton';
import RNFS from 'react-native-fs';
import { useAnimalStore } from '../../../../../lib/store/useAnimalStore';

type ViewImagesRouteProp = RouteProp<RootStackParamList, 'ViewImages'>;

const ViewImages = () => {
  const { images, animalName } = useRoute<ViewImagesRouteProp>().params;
  const { goBack } = useNavigation<NavigationProp>();
  const { deleteImage } = useAnimalStore();

  const handleDeleteImage = (image: ImagesTable) => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que quieres eliminar esta imagen? Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              // Delete the file from storage
              const filePath = image.url.replace('file://', '');
              const exists = await RNFS.exists(filePath);
              if (exists) {
                await RNFS.unlink(filePath);
              }

              // Delete the image from the database
              await deleteImage(image.id);

              Alert.alert('Éxito', 'Imagen eliminada correctamente');
            } catch (error: any) {
              console.error('[ERROR] Error al eliminar imagen:', error.message);
              Alert.alert('Error', `No se pudo eliminar la imagen: ${error.message || 'Error desconocido'}`);
            }
          },
        },
      ]
    );
  };

  return (
    <GlobalContainer>
      <Header
        title={'Fotos de ' + animalName}
        iconOnPress="chevron-back-outline"
        onPress={goBack}
      />
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={<Separator height={20} />}
          data={images}
          keyExtractor={(item) => item.id}
          renderItem={({ item }: { item: ImagesTable }) => (
            <ImageCard image={item} onDelete={() => handleDeleteImage(item)} />
          )}
        />
      </View>
    </GlobalContainer>
  );
};

const ImageCard = ({ image, onDelete }: { image: ImagesTable; onDelete: () => void }) => {
  // Format date to a readable format (e.g., "DD/MM/YYYY HH:mm")
  const formattedDate = new Date(image.fecha).toLocaleString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <View style={styles.imageCard}>
      <View style={styles.header}>
        <Text style={styles.text}>{formattedDate}</Text>
        <MiniButton
          icon="trash-outline"
          text="Eliminar"
          onPress={onDelete}
          backgroundColor={newColors.rojo}
          color={newColors.fondo_principal}
        />
      </View>
      <CustomImage source={image.url} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  imageCard: {
    backgroundColor: newColors.fondo_secundario,
    marginVertical: 10,
    borderRadius: constants.borderRadius,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 16,
    color: newColors.fondo_principal,
    fontFamily: constants.FontText,
    fontWeight: '600',
  },
  image: {
    width: '100%',
    height: 250,
  },
});

export default ViewImages;
