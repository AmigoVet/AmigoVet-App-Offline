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
      {!isLoading && <Icon name="send-outline" size={25} color="white" />}
      {isLoading && <ActivityIndicator size="small" color="white" />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: newColors.verde,
    borderRadius: constants.borderRadius,
    paddingHorizontal: 20,
    paddingVertical: 10,
    height: 50,
    flexDirection: 'row',
  },
});

export default SendButton;
