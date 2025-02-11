import { StyleSheet } from "react-native";
import { newColors } from "../../../../../assets/styles/colors";

export const addEventStyles = StyleSheet.create({
    btn: {
      backgroundColor: newColors.verde,
      position: 'absolute',
      zIndex: 10,
      bottom: 200,
      right: 20,
      borderRadius: 50,
      padding: 10,
      height: 50,
      width: 50,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modal: {
      backgroundColor: newColors.fondo_principal,
      padding: 20,
    },
    modalContent: {
      padding: 20,
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20,
      color: newColors.fondo_secundario,
      textAlign: 'center',
    },
    datePickerContainer: {
      borderRadius: 10,
      padding: 10,
      marginBottom: 20,
    },
    modalActions: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
    },
    modalButton: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
      minWidth: 100,
      alignItems: 'center',
    },
    cancelButton: {
      backgroundColor: newColors.rojo,
    },
    addButton: {
      backgroundColor: newColors.verde_light,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: newColors.fondo_principal,
    },
  });
  