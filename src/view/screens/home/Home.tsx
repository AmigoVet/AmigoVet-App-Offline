import { View, Text } from 'react-native';
import React, { useEffect, useRef } from 'react';
import GlobalContainer from '../../components/GlobalContainer';
import { newColors } from '../../styles/colors';
import CustomButton from '../../components/customs/CustomButton';
import { Modalize } from 'react-native-modalize';
import { createTables } from '../../../lib/db/createTables';

const Home = () => {
  const modalizeRef = useRef<Modalize>(null);

  const openModal = () => {
    console.log('Attempting to open modal'); // Depuración
    modalizeRef.current?.open();
  };

  const closeModal = () => {
    console.log('Closing modal'); // Depuración
    modalizeRef.current?.close();
  };



  return (
    <GlobalContainer>
      <Text style={{ color: newColors.fondo_secundario }}>Home</Text>
      <CustomButton text="Prueba de Modal" onPress={openModal} />

      <Modalize
        ref={modalizeRef}
        adjustToContentHeight
        modalStyle={{
          backgroundColor: newColors.fondo_secundario,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
        handlePosition="outside"
        scrollViewProps={{ showsVerticalScrollIndicator: false }}
        onOpen={() => console.log('Modal opened')} // Depuración
        onClose={() => console.log('Modal closed')} // Depuración
      >
        <View style={{ padding: 20, minHeight: 200 }}>
          <Text style={{ color: newColors.fondo_principal, fontSize: 16 }}>
            Hola, soy un modal
          </Text>
          <CustomButton text="Cerrar" onPress={closeModal} />
        </View>
      </Modalize>
    </GlobalContainer>
  );
};

export default Home;