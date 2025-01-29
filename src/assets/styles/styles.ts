import { StyleSheet } from 'react-native';
import { getDynamicColors } from './colors';

export const createGlobalStyles = (isDarkTheme: boolean) => {
  const colors = getDynamicColors(isDarkTheme);

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.fondo,
      width: "100%",
      paddingHorizontal: 10,
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
      color: colors.verde,
    },
    textOrange: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.verde,
    },
    textWhite: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.blanco,
    },
    miniText: {
      fontSize: 12,
      fontWeight: 'medium',
      color: colors.blanco,
    },
    label: {
      fontSize: 16,
      fontWeight: '500',
      marginBottom: 5,
      color: colors.verde,
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.fondo,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.fondo,
    },
    error: {
      fontSize: 25,
      color: colors.rojo,
      fontWeight: 'bold',
      marginTop: 50,
      textAlign: 'center',
    },
    note: {
      fontSize: 13,
      fontWeight: '400',
      color: colors.verde,
    },
  });
};
