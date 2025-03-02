import { StyleSheet } from 'react-native';
import { getDynamicColors, newColors } from './colors';

export const createGlobalStyles = () => {
  const colors = newColors

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.fondo_principal,
      width: "100%",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.fondo_principal,
    },
    titleModal: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 15,
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
      color: colors.principal,
    },
    miniText: {
      fontSize: 12,
      fontWeight: 'medium',
      color: colors.fondo_secundario,
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
      color: colors.fondo_secundario,
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.fondo_principal,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.fondo_principal,
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
