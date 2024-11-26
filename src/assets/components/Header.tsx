import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../styles';

const Header = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="menu" size={30} color="white" />
      <Image 
        source={require('../img/HeaderLogo.png')} 
        style={{ 
          width: 100, 
          alignSelf: 'center',
        }} 
        resizeMode="contain"
      />
      <Ionicons name="search" size={30} color="white" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.fondoDark,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    zIndex: 10,
    paddingHorizontal: 20,
  },
  text:{
    fontSize: 20,
    color: 'white',
  }
})

export default Header