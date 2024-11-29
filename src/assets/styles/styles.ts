import { StyleSheet } from 'react-native'
import { colors } from './colors'

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fondo,
    marginTop: -20,
    paddingTop: 30,
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
  },
  miniText:{
    fontSize: 12,
    fontWeight: 'medium',
    color: colors.blanco,
  },
  label:{
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    color: colors.naranja,
  },
  errorContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.fondo,
  },
  loadingContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.fondo,
  },
})

