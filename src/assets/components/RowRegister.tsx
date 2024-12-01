import { View, Text } from 'react-native'
import React from 'react'
import { Register } from '../interfaces/registers'
import { GlobalStyles } from '../styles';

interface RowRegisterProps {
    register: Register;
}

const RowRegister = ({register}: RowRegisterProps) => {
  return (
    <View style={GlobalStyles.container}>
      <Text>{register.fecha}</Text>
      <Text>{register.accion}</Text>
      <Text>{register.comentario}</Text>
    </View>
  )
}

export default RowRegister