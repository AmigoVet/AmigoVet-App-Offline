import { View, Text, Pressable, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import { CustomIcon } from '../../../../../components/Customs'
import { newColors } from '../../../../../assets/styles/colors'
import { constants } from '../../../../../assets/styles/constants'

interface SendButtonProps {
  onPress: () => void;
  disable: boolean;
  isLoading: boolean;
}

const SendButton = ({ onPress, disable, isLoading }: SendButtonProps) => {
  return (
    <Pressable style={styles.btn} onPress={onPress} disabled={disable}>
      {!isLoading && <CustomIcon name="send-outline" size={25} color="white" />}
      {isLoading && <ActivityIndicator size="small" color="white" />}
    </Pressable>
  )
}

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
  }
})

export default SendButton