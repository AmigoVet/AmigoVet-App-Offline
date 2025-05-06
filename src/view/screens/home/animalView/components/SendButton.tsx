import {Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import React from 'react';
import { newColors } from '../../../../styles/colors';
import { constants } from '../../../../styles/constants';
import Icon from '@react-native-vector-icons/ionicons';

interface SendButtonProps {
  onPress: () => void;
  disable: boolean;
  isLoading: boolean;
}

const SendButton = ({ onPress, disable, isLoading }: SendButtonProps) => {
  return (
    <Pressable style={styles.btn} onPress={onPress} disabled={disable}>
      {!isLoading && <Icon name="send-outline" size={25} color={newColors.fondo_principal} />}
      {isLoading && <ActivityIndicator size="small" color={newColors.fondo_principal} />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn:{
    backgroundColor: newColors.verde_light,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: constants.borderRadius,
    height: 50,
    minWidth: 60,
  },
});

export default SendButton;
