import React, { useState } from 'react';
import { Alert } from 'react-native';
import GlobalContainer from '../../../components/GlobalContainer';
import Header from '../../../components/Header';
import { ScrollView } from 'react-native-gesture-handler';
import CustomImagePicker from '../../../components/customs/CustomImagePicker';

const New = () => {
  const [image, setImage] = useState<string | null>(null);

  return (
    <GlobalContainer>
      <Header
        title="Agrega un Animal"
        onPress={() => Alert.alert('Debería mostrar info de cómo agregar un animal y cosas así')}
      />
      <ScrollView style={{ padding: 20 }} showsVerticalScrollIndicator={false}>
        <CustomImagePicker onImageSelected={(uri) => setImage(uri)} />
      </ScrollView>
    </GlobalContainer>
  );
};

export default New;