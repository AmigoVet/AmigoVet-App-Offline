import { StyleSheet } from "react-native";
import { getDynamicColors } from "./colors";

export const AnimalViewStyles = (colors: ReturnType<typeof getDynamicColors>) =>
    StyleSheet.create({
    swipeListContainer: {
      flex: 1,
      backgroundColor: colors.fondo,
      padding: 16,
    },
    headerContainer: {},
    container: {
      padding: 16,
      backgroundColor: colors.fondo,
    },
    modalContent: {
      padding: 16,
      justifyContent: "center",
      alignItems: "center",
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 16,
      color: colors.verdeLight,
      textAlign: "center",
    },
    modalActions: {
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },
    hiddenContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "flex-end",
      backgroundColor: colors.rojo,
    },
    lastHiddenContainer: {
      borderBottomRightRadius: 10,
      borderBottomLeftRadius: 10,
    },
    deleteButton: {
      width: 75,
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.rojo,
    },
    lastDeleteButton: {
      borderBottomRightRadius: 10,
      borderBottomLeftRadius: 10,
    },
    deleteText: {
      color: colors.fondo,
      fontWeight: "bold",
    },
  });