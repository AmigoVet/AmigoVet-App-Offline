import { View, Text } from 'react-native'
import React from 'react'
import GlobalContainer from '../../components/GlobalContainer'
import { newColors } from '../../styles/colors'

const Home = () => {
  return (
    <GlobalContainer>
      <Text style={{color: newColors.fondo_secundario}}>Home</Text>
    </GlobalContainer>
  )
}

export default Home