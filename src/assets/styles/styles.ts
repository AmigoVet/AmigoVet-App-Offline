import { StyleSheet } from 'react-native'
import { colors } from './colors'

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fondo,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.blanco,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.naranja,
  }
})

