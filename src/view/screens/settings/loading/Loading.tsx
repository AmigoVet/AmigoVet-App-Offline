import { ActivityIndicator } from 'react-native';
import React from 'react';
import GlobalContainer from '../../../components/GlobalContainer';
import { newColors } from '../../../styles/colors';
import Iconlogo from '../../../assets/svgs/Iconlogo';

const Loading = () => {
  return (
    <GlobalContainer>
      <Iconlogo
        width={300}
        height={500}
        style={{ alignSelf: 'center', marginTop: 50 }}
        color={newColors.fondo_secundario}
      />
      <ActivityIndicator
        size="large"
        color={newColors.fondo_secundario}
        style={{ marginTop: 20 }}
      />
    </GlobalContainer>
  );
};

export default Loading;
